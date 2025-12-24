import xml.etree.ElementTree as ET
from .particle import Particle
from .point import Point
from .polygon_double import PolygonDouble
from .voronoi import Voronoi

class ParticleList:
    def __init__(self, particle_file=None):
        self.d_rve_size = 100.0
        self.d_particle_list = []
        self.d_triangle_list = []
        self.d_voronoi_list = []

        if particle_file:
            self.read_from_file(particle_file)

    def set_rve_size(self, rve_size):
        self.d_rve_size = rve_size

    def get_rve_size(self):
        return self.d_rve_size

    def size(self):
        return len(self.d_particle_list)

    def get_particle(self, index):
        if 0 <= index < len(self.d_particle_list):
            return self.d_particle_list[index]
        return None

    def add_particle(self, particle):
        if particle:
            self.d_particle_list.append(particle)

    def is_empty(self):
        return len(self.d_particle_list) == 0

    def clear(self):
        self.d_particle_list = []
        self.d_triangle_list = []
        self.d_voronoi_list = []

    def triangulate(self):
        vor = Voronoi(self)
        vor.process()

    def add_triangle(self, p):
        self.d_triangle_list.append(p)

    def get_triangles(self):
        return self.d_triangle_list

    def add_voronoi_vertex(self, p):
        self.d_voronoi_list.append(p)

    def get_voronoi_vertices(self):
        return self.d_voronoi_list

    def save_to_file(self, particle_file, part_type):
        try:
            with open(particle_file, 'w') as f:
                tab = "  "
                nof_parts = self.size()
                f.write("<?xml version='1.0' encoding='ISO-8859-1' ?>\n")
                f.write("<Uintah_Include>\n")
                f.write("<!--\n")
                f.write("# RVE Size\n")
                f.write(f"{self.d_rve_size}\n")
                f.write("Number of objects\n")
                f.write(f"{nof_parts}\n")
                f.write("Particle type\n")
                f.write(f"{part_type}\n")
                f.write("-->\n")
                f.write("<RVE_size>\n")
                f.write(f"{tab}{self.d_rve_size}\n")
                f.write("</RVE_size>\n")
                f.write("<union>\n")
                for ii in range(nof_parts):
                    part = self.get_particle(ii)
                    part.print(f, tab)
                f.write("</union>\n")
                f.write("</Uintah_Include>\n")
        except IOError as e:
            print(f"Could not write to {particle_file}: {e}")

    def read_from_file(self, particle_file):
        self.clear()
        try:
            tree = ET.parse(particle_file)
            root = tree.getroot()
            
            # print(f"Root element :{root.tag}")
            
            # RVE Size
            rve_node = root.find("RVE_size")
            if rve_node is not None:
                self.d_rve_size = float(rve_node.text)

            # Cylinders
            for cylinder in root.findall(".//cylinder"):
                bottom = Point()
                top = Point()
                radius = 0.0
                thickness = 0.0

                bottom_node = cylinder.find("bottom")
                if bottom_node is not None:
                    text = bottom_node.text.replace("[", "").replace("]", "").replace(",", " ")
                    parts = text.split()
                    bottom.set_x(float(parts[0]))
                    bottom.set_y(float(parts[1]))
                    bottom.set_z(float(parts[2]))

                top_node = cylinder.find("top")
                if top_node is not None:
                    text = top_node.text.replace("[", "").replace("]", "").replace(",", " ")
                    parts = text.split()
                    top.set_x(float(parts[0]))
                    top.set_y(float(parts[1]))
                    top.set_z(float(parts[2]))

                radius_node = cylinder.find("radius")
                if radius_node is not None:
                    radius = float(radius_node.text)

                thickness_node = cylinder.find("thickness")
                if thickness_node is not None:
                    thickness = float(thickness_node.text)

                particle = Particle(Particle.CIRCLE, radius, 0.0, thickness, bottom, 1)
                self.add_particle(particle)

            # Spheres
            for sphere in root.findall(".//sphere"):
                center = Point()
                radius = 0.0
                thickness = 0.0

                center_node = sphere.find("center")
                if center_node is None:
                    center_node = sphere.find("origin")
                
                if center_node is not None:
                    text = center_node.text.replace("[", "").replace("]", "").replace(",", " ")
                    parts = text.split()
                    center.set_x(float(parts[0]))
                    center.set_y(float(parts[1]))
                    center.set_z(float(parts[2]))

                radius_node = sphere.find("radius")
                if radius_node is not None:
                    radius = float(radius_node.text)

                thickness_node = sphere.find("thickness")
                if thickness_node is not None:
                    thickness = float(thickness_node.text)

                particle = Particle(Particle.SPHERE, radius, 0.0, thickness, center, 1)
                self.add_particle(particle)

        except Exception as e:
            print(f"Could not read from {particle_file}: {e}")

    def save_to_file_old_format(self, particle_file, part_type):
        try:
            with open(particle_file, 'w') as f:
                nof_parts = self.size()
                f.write("# RVE Size\n")
                f.write(f"{self.d_rve_size}\n")
                f.write("Number of objects\n")
                f.write(f"{nof_parts}\n")
                f.write("# Particle List\n")
                f.write("# type  radius  thickness rotation  xCent  yCent  zCent  matCode\n")
                
                for ii in range(nof_parts):
                    part = self.get_particle(ii)
                    f.write(f"# Particle {ii}\n")
                    f.write(f"{part_type} {part.get_radius():.6f} {part.get_thickness():.6f} "
                            f"{part.get_rotation():.6f} {part.get_center().x():.6f} "
                            f"{part.get_center().y():.6f} {part.get_center().z():.6f} "
                            f"{part.get_mat_code()}\n")
        except IOError as e:
            print(f"Could not write to {particle_file}: {e}")

    def read_from_file_old_format(self, particle_file):
        self.clear()
        try:
            with open(particle_file, 'r') as f:
                tokens = []
                for line in f:
                    line = line.strip()
                    if not line or line.startswith('#'):
                        continue
                    tokens.extend(line.split())
                
                iterator = iter(tokens)
                try:
                    self.d_rve_size = float(next(iterator))
                    # Skip "Number of objects" equivalent if strictly following token stream
                    # But the Java code just grabs numbers.
                    # Wait, Java StreamTokenizer skips strings if not configured otherwise, 
                    # but TT_NUMBER is checked.
                    # The Java code logic:
                    # 1. First number is RVE Size.
                    # 2. Then it loops. Inside loop it counts numbers.
                    # 3. After 8 numbers, it expects EOL.
                    
                    # My python tokenizer flattens everything. I need to handle this carefully.
                    # Actually, the Java code relies on EOL to reset the count.
                    # So I should process line by line.
                except StopIteration:
                    return

            # Re-implementation line by line
            with open(particle_file, 'r') as f:
                first = True
                count = 0
                current_data = []
                
                for line in f:
                    line = line.strip()
                    if not line or line.startswith('#'):
                        continue
                    
                    # Remove inline comments if any (though logic says startsWith #)
                    parts = line.split()
                    for part in parts:
                        try:
                            val = float(part)
                            if first:
                                self.d_rve_size = val
                                first = False
                            else:
                                current_data.append(val)
                                count += 1
                                if count == 8:
                                    type_val = int(current_data[0])
                                    radius = current_data[1]
                                    thickness = current_data[2]
                                    rotation = current_data[3]
                                    xx = current_data[4]
                                    yy = current_data[5]
                                    zz = current_data[6]
                                    mat_code = int(current_data[7])
                                    
                                    center = Point(xx, yy, zz)
                                    particle = Particle(type_val, radius, rotation, thickness, center, mat_code)
                                    self.add_particle(particle)
                                    
                                    current_data = []
                                    count = 0
                        except ValueError:
                            # Not a number, skip
                            pass

        except Exception as e:
            print(f"Could not read from {particle_file}: {e}")
