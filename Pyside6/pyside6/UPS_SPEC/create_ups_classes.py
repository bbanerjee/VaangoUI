import os
import xml.etree.ElementTree as ET
import re
from collections import defaultdict
import keyword

# --- Configuration ---
ROOT_FILE = 'ups_spec.xml'
OUTPUT_FILE = 'ups_spec_models.py'
OUTPUT_DIR = 'ups_classes'

# --- Parsing Helpers ---

def load_xml(file_path):
    try:
        tree = ET.parse(file_path)
        return tree.getroot()
    except ET.ParseError as e:
        print(f"Error parsing {file_path}: {e}")
        return None
    except FileNotFoundError:
        print(f"File not found: {file_path}")
        return None

def resolve_includes(element, base_dir):
    """
    Recursively resolve <include> tags.
    """
    # Iterate over a copy of children since we might modify the list
    for i, child in enumerate(list(element)):
        if child.tag == 'include':
            href = child.get('href')
            section = child.get('section')
            
            if not href:
                continue

            include_path = os.path.join(base_dir, href)
            included_root = load_xml(include_path)
            
            if included_root is None:
                continue
            
            # Recurse into the included file first
            resolve_includes(included_root, base_dir)

            nodes_to_insert = []
            
            if section:
                # Find the specific section (simple path traversal)
                parts = section.split('/')
                current_node = included_root
                found = True
                
                # Handling the case where included_root IS the first part
                start_index = 0
                if included_root.tag == parts[0]:
                    start_index = 1
                
                for part in parts[start_index:]:
                    next_node = None
                    for sub in current_node:
                        if sub.tag == part:
                            next_node = sub
                            break
                    if next_node is None:
                        # Fallback: check if the root itself was the target but implicit
                        print(f"Warning: Section {section} not found in {href} (failed at {part})")
                        found = False
                        break
                    current_node = next_node
                
                if found:
                    nodes_to_insert = [current_node]
            else:
                nodes_to_insert = list(included_root)

            # Remove the <include> tag
            element.remove(child)
            
            # Insert new nodes in reverse order so they end up in correct order
            for node in reversed(nodes_to_insert):
                element.insert(i, node)
                
        else:
            resolve_includes(child, base_dir)

def parse_spec_attribute(spec_str):
    """
    Parses the 'spec' attribute string: "need type [validValues]"
    Returns dict: {'need': ..., 'type': ..., 'valid_values': ...}
    """
    if not spec_str:
        return {'need': 'OPTIONAL', 'type': 'NO_DATA'}
    
    parts = spec_str.split(maxsplit=2)
    need = parts[0]
    dtype = parts[1] if len(parts) > 1 else 'NO_DATA'
    valid_values = parts[2] if len(parts) > 2 else None
    
    # Clean up quotes in valid_values
    if valid_values:
        valid_values = valid_values.strip("'\"")
        
    return {'need': need, 'type': dtype, 'valid_values': valid_values}


def parse_need_applies_to(raw: str):
    """Parse a need_applies_to string like 'type a b' or 'name x,y' into {'key': key, 'values': [...]}."""
    if not raw:
        return None
    raw = raw.strip()
    parts = raw.split(None, 1)
    if len(parts) == 1:
        key = parts[0]
        vals = []
    else:
        key = parts[0]
        vals = parts[1]
        if ',' in vals:
            vals = [v.strip() for v in vals.split(',') if v.strip()]
        else:
            vals = [v.strip() for v in vals.split() if v.strip()]
    return {'key': key, 'values': vals}

# --- Class Modeling ---

class TagDefinition:
    def __init__(self, name, node, path_hint=""):
        self.name = name
        self.node = node
        self.path_hint = path_hint
        self.spec = parse_spec_attribute(node.get('spec', ''))
        self.need_applies_to = node.get('need_applies_to')
        self.attributes = {} # name -> spec_dict
        self.children_rules = {} # index -> string (e.g. children1="...")
        self.explicit_children = [] # List of TagDefinitions (nested)
        
        self.parse_attributes_and_children()

    def parse_attributes_and_children(self):
        # 1. XML Attributes (attribute#="name spec")
        for key, value in self.node.attrib.items():
            if key.startswith('attribute'):
                # Format: name need type [values]
                # But sometimes: name spec (where spec contains need type...)
                # The schema description says: attribute#="name _spec_"
                # So we split on first space
                parts = value.split(maxsplit=1)
                attr_name = parts[0]
                attr_spec_str = parts[1] if len(parts) > 1 else ""
                self.attributes[attr_name] = parse_spec_attribute(attr_spec_str)
            
            elif key.startswith('children'):
                self.children_rules[key] = value

        # 2. Child Tags (Nested elements)
        for child in self.node:
            # Skip comments (handled by ET), but check tag type
            if not isinstance(child.tag, str): 
                continue 
                
            # If it's a "ref" to a common tag (e.g. <box spec="MULTIPLE"/>), 
            # we treat it as a child.
            # If it has a full definition, it's a nested class.
            
            child_spec = parse_spec_attribute(child.get('spec', ''))
            
            # Logic to determine if it's a definition or a reference:
            # If it has attributes (attribute#) or children tags, it's likely a definition.
            # If it only has spec="MULTIPLE" (or similar) and no other attributes/children, it's a ref.
            
            is_def = False
            for k in child.attrib:
                if k.startswith('attribute') or k.startswith('children'):
                    is_def = True
                    break
            if len(list(child)) > 0:
                is_def = True
                
            self.explicit_children.append({
                'tag': child.tag,
                'is_definition': is_def,
                'node': child,
                'spec': child_spec,
                'need_applies_to': child.get('need_applies_to')
            })

# --- Generator ---

class ClassGenerator:
    def __init__(self):
        self.classes = {} # class_name -> TagDefinition
        self.tag_to_class_map = {} # tag_name -> class_name (for common/unambiguous tags)
        self.class_name_counts = defaultdict(int)

    def sanitize_name(self, name):
        # Convert to CamelCase if not already
        # But also handle existing naming.
        # Simple approach: UpperFirst
        clean = re.sub(r'[^a-zA-Z0-9_]', '', name)
        if not clean: return "Unknown"
        return clean[0].upper() + clean[1:]

    def generate_class_name(self, tag_name, context_path=[]):
        # Base name
        base = self.sanitize_name(tag_name)
        
        # If ambiguous, use context
        # But for pass 2, we generate names. We need to store them to check for collisions *relative to structure*?
        # No, Python classes must have unique names in the module.
        
        # If 'base' is already taken by a different definition, we need a variant.
        # But we haven't stored definitions yet in a way to check content equality.
        # For now, simplistic approach: Collision = rename.
        
        candidate = base
        if candidate in self.classes:
             # Try context
             if context_path:
                 prefix = self.sanitize_name(context_path[-1])
                 candidate = f"{prefix}_{base}"
        
        # If still collision, append number (simplest fallback)
        i = 2
        original_candidate = candidate
        while candidate in self.classes:
            candidate = f"{original_candidate}_{i}"
            i += 1
            
        return candidate

    def collect_definitions(self, root):
        # Pass 1: CommonTags (Global Types)
        common = root.find('CommonTags')
        if common is not None:
            for node in common:
                if not isinstance(node.tag, str): continue
                # These are "Types"
                cname = self.generate_class_name(node.tag)
                self.classes[cname] = TagDefinition(node.tag, node)
                self.tag_to_class_map[node.tag] = cname

        # Pass 2: Traverse Tree for inline definitions
        self._traverse_and_collect(root, context=[])

    def _traverse_and_collect(self, element, context):
        if element.tag == 'CommonTags':
            return # Already handled

        # We process children. 
        for child in element:
            if not isinstance(child.tag, str): continue
            
            # Check if this child is a definition
            is_def = False
            for k in child.attrib:
                if k.startswith('attribute') or k.startswith('children'):
                    is_def = True
                    break
            if len(list(child)) > 0:
                is_def = True
                
            # If spec is just MULTIPLE/OPTIONAL/REQUIRED NO_DATA with no attrs/kids, it's a field, not a class.
            spec = parse_spec_attribute(child.get('spec', ''))
            
            # Logic:
            # If it's a reference to a known type (in tag_to_class_map) AND has no extra definitions (attributes/children), skip it.
            # If it IS a definition, generate a class.
            
            if not is_def and child.tag in self.tag_to_class_map and spec['type'] == 'NO_DATA':
                # Likely a ref.
                pass
            elif spec['type'] != 'NO_DATA' and not is_def:
                # Leaf
                pass
            else:
                # Definition
                cname = self.generate_class_name(child.tag, context)
                td = TagDefinition(child.tag, child)
                self.classes[cname] = td

                # If unique so far, map the xml tag name to this class
                if child.tag not in self.tag_to_class_map:
                    self.tag_to_class_map[child.tag] = cname

                # If this tag has need_applies_to, create variant classes for each listed value
                if td.need_applies_to:
                    parsed = parse_need_applies_to(td.need_applies_to)
                    if parsed and parsed.get('values'):
                        # Only handle simple cases where key is 'type' or 'name' or 'var'
                        for val in parsed['values']:
                            # Create a new TagDefinition that uses the variant name
                            new_td = TagDefinition(val, child)
                            # Generate a class name for this variant
                            cname2 = self.generate_class_name(val, context)
                            # Only add if not already present
                            if cname2 not in self.classes:
                                self.classes[cname2] = new_td
                                # Map the variant tag/name to this class for lookups
                                if val not in self.tag_to_class_map:
                                    self.tag_to_class_map[val] = cname2
                
                # Recurse
                self._traverse_and_collect(child, context + [child.tag])

    def write_classes_package(self, dirname):
        # Create package dir
        os.makedirs(dirname, exist_ok=True)

        # 1) Write base class
        base_path = os.path.join(dirname, 'base.py')
        with open(base_path, 'w') as bf:
            bf.write('from typing import List, Optional, Any\n\n')
            bf.write('class UpsElement:\n')
            bf.write('    def __init__(self):\n')
            bf.write('        self.tag_name = None\n')
            bf.write('        self.attributes = {}\n')
            bf.write('        self.children = []\n')
            bf.write('        self.content = None # For text content if any\n')

        # 2) Write each class to its own module
        for class_name, definition in self.classes.items():
            file_path = os.path.join(dirname, f"{class_name}.py")
            with open(file_path, 'w') as cf:
                cf.write("from typing import List, Optional, Union, Dict, Any\n")
                cf.write("from .base import UpsElement\n\n")
                # Use existing writer to emit class body into this file
                self.write_class(cf, class_name, definition)

        # 3) Write __init__.py to re-export classes and build tag map
        init_path = os.path.join(dirname, '__init__.py')
        with open(init_path, 'w') as initf:
            # import all classes
            for class_name in self.classes.keys():
                initf.write(f"from .{class_name} import {class_name}\n")
            initf.write('\n')
            # __all__
            all_list = ', '.join([f"'{n}'" for n in self.classes.keys()])
            initf.write(f"__all__ = [{all_list}]\n\n")
            initf.write("# Build a mapping from tag name to class for convenience\n")
            initf.write("TAG_MAP = {}\n")
            initf.write("for _n in __all__:\n")
            initf.write("    _cls = globals()[_n]\n")
            initf.write("    try:\n")
            initf.write("        TAG_MAP[_cls.tag_name] = _cls\n")
            initf.write("    except Exception:\n")
            initf.write("        pass\n")

    def write_class(self, f, class_name, definition: TagDefinition):
        f.write(f"class {class_name}(UpsElement):\n")
        f.write(f"    tag_name = '{definition.name}'\n")
        f.write(f"    \n")
        f.write(f"    def __init__(self):\n")
        f.write(f"        super().__init__()\n")
        
        # Attributes
        if definition.attributes:
            f.write("        # Attributes\n")
            for attr_name, spec in definition.attributes.items():
                py_type = self.map_type(spec['type'])
                f.write(f"        self.{self.clean_field_name(attr_name)}: Optional[{py_type}] = None\n")
        
        # Children / Content
        if definition.spec['type'] != 'NO_DATA':
             py_type = self.map_type(definition.spec['type'])
             f.write(f"        self.value: Optional[{py_type}] = None\n")

        # Explicit Children (Sub-tags)
        if definition.explicit_children:
             f.write("        # Children\n")
             for child_info in definition.explicit_children:
                 tag = child_info['tag']
                 field_name = self.clean_field_name(tag)
                 child_spec = child_info['spec']
                 
                 if child_spec['need'] == 'MULTIPLE':
                     f.write(f"        self.{field_name}: List[Any] = []\n")
                 else:
                     f.write(f"        self.{field_name}: Optional[Any] = None\n")
        
        f.write("\n")
        
        # Add metadata method
        f.write("    @classmethod\n")
        f.write("    def get_spec(cls):\n")
        f.write("        return {\n")
        f.write(f"            'tag': '{definition.name}',\n")
        f.write(f"            'need_applies_to': {repr(definition.need_applies_to)},\n")
        f.write(f"            'spec_type': '{definition.spec['type']}',\n")
        f.write("            'attributes': {\n")
        for aname, aspec in definition.attributes.items():
            f.write(f"                '{aname}': {aspec},\n")
        f.write("            },\n")
        f.write("            'children_spec': [\n")
        for child_info in definition.explicit_children:
            f.write(f"                {{'tag': '{child_info['tag']}', 'spec': {child_info['spec']}, 'need_applies_to': {repr(child_info.get('need_applies_to'))}}},\n")
        f.write("            ]\n")
        f.write("        }\n")
        f.write("\n")

    def map_type(self, xml_type):
        if 'DOUBLE' in xml_type: return 'float'
        if 'INTEGER' in xml_type: return 'int'
        if 'BOOLEAN' in xml_type: return 'bool'
        if 'STRING' in xml_type: return 'str'
        return 'str'

    def clean_field_name(self, name):
        name = name.replace('-', '_').replace('.', '_')
        if keyword.iskeyword(name):
            return name + "_"
        return name

# --- Main Execution ---

def main():
    print(f"Loading {ROOT_FILE}...")
    root = load_xml(ROOT_FILE)
    if root is None:
        return

    print("Resolving includes...")
    resolve_includes(root, os.getcwd())
    
    print("Collecting class definitions...")
    generator = ClassGenerator()
    generator.collect_definitions(root)
    
    print(f"Generating {len(generator.classes)} classes into package {OUTPUT_DIR}...")
    generator.write_classes_package(OUTPUT_DIR)
    print("Done.")

if __name__ == "__main__":
    main()
