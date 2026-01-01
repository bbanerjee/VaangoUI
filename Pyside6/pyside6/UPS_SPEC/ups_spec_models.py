from typing import List, Optional, Union, Dict, Any

# Base Class for all UPS Elements
class UpsElement:
    def __init__(self):
        self.tag_name = None
        self.attributes = {}
        self.children = []
        self.content = None # For text content if any

class Box(UpsElement):
    tag_name = 'box'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.label: Optional[str] = None
        # Children
        self.min: Optional[Any] = None
        self.max: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'box',
            'spec_type': 'NO_DATA',
            'attributes': {
                'label': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None},
            },
            'children_spec': [
                {'tag': 'min', 'spec': {'need': 'OPTIONAL', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'max', 'spec': {'need': 'OPTIONAL', 'type': 'VECTOR', 'valid_values': None}},
            ]
        }

class Cone(UpsElement):
    tag_name = 'cone'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.label: Optional[str] = None
        # Children
        self.bottom: Optional[Any] = None
        self.bottom_radius: Optional[Any] = None
        self.top: Optional[Any] = None
        self.top_radius: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'cone',
            'spec_type': 'NO_DATA',
            'attributes': {
                'label': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None},
            },
            'children_spec': [
                {'tag': 'bottom', 'spec': {'need': 'OPTIONAL', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'bottom_radius', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'top', 'spec': {'need': 'OPTIONAL', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'top_radius', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
            ]
        }

class Cylinder(UpsElement):
    tag_name = 'cylinder'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.label: Optional[str] = None
        # Children
        self.bottom: Optional[Any] = None
        self.top: Optional[Any] = None
        self.radius: Optional[Any] = None
        self.cylinder_end: Optional[Any] = None
        self.axisymmetric_end: Optional[Any] = None
        self.axisymmetric_side: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'cylinder',
            'spec_type': 'NO_DATA',
            'attributes': {
                'label': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None},
            },
            'children_spec': [
                {'tag': 'bottom', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'top', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'radius', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'cylinder_end', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'axisymmetric_end', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'axisymmetric_side', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
            ]
        }

class Torus(UpsElement):
    tag_name = 'torus'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.label: Optional[str] = None
        # Children
        self.center: Optional[Any] = None
        self.axis_vector: Optional[Any] = None
        self.major_radius: Optional[Any] = None
        self.minor_radius: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'torus',
            'spec_type': 'NO_DATA',
            'attributes': {
                'label': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None},
            },
            'children_spec': [
                {'tag': 'center', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'axis_vector', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'major_radius', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'minor_radius', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
            ]
        }

class Parallelepiped(UpsElement):
    tag_name = 'parallelepiped'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.label: Optional[str] = None
        # Children
        self.p1: Optional[Any] = None
        self.p2: Optional[Any] = None
        self.p3: Optional[Any] = None
        self.p4: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'parallelepiped',
            'spec_type': 'NO_DATA',
            'attributes': {
                'label': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None},
            },
            'children_spec': [
                {'tag': 'p1', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'p2', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'p3', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'p4', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
            ]
        }

class Sphere(UpsElement):
    tag_name = 'sphere'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.label: Optional[str] = None
        # Children
        self.origin: Optional[Any] = None
        self.radius: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'sphere',
            'spec_type': 'NO_DATA',
            'attributes': {
                'label': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None},
            },
            'children_spec': [
                {'tag': 'origin', 'spec': {'need': 'OPTIONAL', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'radius', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
            ]
        }

class Ellipsoid(UpsElement):
    tag_name = 'ellipsoid'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.label: Optional[str] = None
        # Children
        self.origin: Optional[Any] = None
        self.r1: Optional[Any] = None
        self.r2: Optional[Any] = None
        self.r3: Optional[Any] = None
        self.v1: Optional[Any] = None
        self.v2: Optional[Any] = None
        self.v3: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'ellipsoid',
            'spec_type': 'NO_DATA',
            'attributes': {
                'label': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None},
            },
            'children_spec': [
                {'tag': 'origin', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'r1', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'r2', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'r3', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'v1', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'v2', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'v3', 'spec': {'need': 'OPTIONAL', 'type': 'VECTOR', 'valid_values': None}},
            ]
        }

class Sphere_membrane(UpsElement):
    tag_name = 'sphere_membrane'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.label: Optional[str] = None
        # Children
        self.origin: Optional[Any] = None
        self.radius: Optional[Any] = None
        self.thickness: Optional[Any] = None
        self.num_lat: Optional[Any] = None
        self.num_long: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'sphere_membrane',
            'spec_type': 'NO_DATA',
            'attributes': {
                'label': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None},
            },
            'children_spec': [
                {'tag': 'origin', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'radius', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'thickness', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'num_lat', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'num_long', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
            ]
        }

class Sphere_shell(UpsElement):
    tag_name = 'sphere_shell'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.label: Optional[str] = None
        # Children
        self.origin: Optional[Any] = None
        self.radius: Optional[Any] = None
        self.thickness: Optional[Any] = None
        self.num_lat: Optional[Any] = None
        self.num_long: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'sphere_shell',
            'spec_type': 'NO_DATA',
            'attributes': {
                'label': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None},
            },
            'children_spec': [
                {'tag': 'origin', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'radius', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'thickness', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'num_lat', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'num_long', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
            ]
        }

class Cylinder_shell(UpsElement):
    tag_name = 'cylinder_shell'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.label: Optional[str] = None
        # Children
        self.top: Optional[Any] = None
        self.bottom: Optional[Any] = None
        self.radius: Optional[Any] = None
        self.thickness: Optional[Any] = None
        self.num_axis: Optional[Any] = None
        self.num_circum: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'cylinder_shell',
            'spec_type': 'NO_DATA',
            'attributes': {
                'label': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None},
            },
            'children_spec': [
                {'tag': 'top', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'bottom', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'radius', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'thickness', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'num_axis', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'num_circum', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
            ]
        }

class Plane_shell(UpsElement):
    tag_name = 'plane_shell'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.label: Optional[str] = None
        # Children
        self.center: Optional[Any] = None
        self.normal: Optional[Any] = None
        self.radius: Optional[Any] = None
        self.thickness: Optional[Any] = None
        self.num_radius: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'plane_shell',
            'spec_type': 'NO_DATA',
            'attributes': {
                'label': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None},
            },
            'children_spec': [
                {'tag': 'center', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'normal', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'radius', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'thickness', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'num_radius', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
            ]
        }

class Smoothcyl(UpsElement):
    tag_name = 'smoothcyl'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.label: Optional[str] = None
        # Children
        self.bottom: Optional[Any] = None
        self.top: Optional[Any] = None
        self.radius: Optional[Any] = None
        self.thickness: Optional[Any] = None
        self.endcap_thickness: Optional[Any] = None
        self.arc_start_angle_degree: Optional[Any] = None
        self.arc_angle_degree: Optional[Any] = None
        self.output_file: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'smoothcyl',
            'spec_type': 'NO_DATA',
            'attributes': {
                'label': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None},
            },
            'children_spec': [
                {'tag': 'bottom', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'top', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'radius', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'thickness', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'endcap_thickness', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'arc_start_angle_degree', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'arc_angle_degree', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'output_file', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None}},
            ]
        }

class Smooth_sphere(UpsElement):
    tag_name = 'smooth_sphere'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.label: Optional[str] = None
        # Children
        self.center: Optional[Any] = None
        self.outer_radius: Optional[Any] = None
        self.inner_radius: Optional[Any] = None
        self.num_radial_pts: Optional[Any] = None
        self.algorithm: Optional[Any] = None
        self.output_file: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'smooth_sphere',
            'spec_type': 'NO_DATA',
            'attributes': {
                'label': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None},
            },
            'children_spec': [
                {'tag': 'center', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'outer_radius', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'inner_radius', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'num_radial_pts', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'algorithm', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': 'spiral, equal_area'}},
                {'tag': 'output_file', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None}},
            ]
        }

class Tri(UpsElement):
    tag_name = 'tri'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.label: Optional[str] = None
        # Children
        self.file_name_prefix: Optional[Any] = None
        self.file_type: Optional[Any] = None
        self.scaling_factor: Optional[Any] = None
        self.translation_vector: Optional[Any] = None
        self.reflection_vector: Optional[Any] = None
        self.axis_sequence: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'tri',
            'spec_type': 'NO_DATA',
            'attributes': {
                'label': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None},
            },
            'children_spec': [
                {'tag': 'file_name_prefix', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'file_type', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'scaling_factor', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'translation_vector', 'spec': {'need': 'OPTIONAL', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'reflection_vector', 'spec': {'need': 'OPTIONAL', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'axis_sequence', 'spec': {'need': 'OPTIONAL', 'type': 'VECTOR', 'valid_values': None}},
            ]
        }

class Abaqus_mesh(UpsElement):
    tag_name = 'abaqus_mesh'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.label: Optional[str] = None
        # Children
        self.file_name: Optional[Any] = None
        self.scaling_factor: Optional[Any] = None
        self.translation_vector: Optional[Any] = None
        self.reflection_vector: Optional[Any] = None
        self.axis_sequence: Optional[Any] = None
        self.rotation_matrix_row0: Optional[Any] = None
        self.rotation_matrix_row1: Optional[Any] = None
        self.rotation_matrix_row2: Optional[Any] = None
        self.use_gauss_points: Optional[Any] = None
        self.num_gauss_points: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'abaqus_mesh',
            'spec_type': 'NO_DATA',
            'attributes': {
                'label': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None},
            },
            'children_spec': [
                {'tag': 'file_name', 'spec': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'scaling_factor', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'translation_vector', 'spec': {'need': 'OPTIONAL', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'reflection_vector', 'spec': {'need': 'OPTIONAL', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'axis_sequence', 'spec': {'need': 'OPTIONAL', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'rotation_matrix_row0', 'spec': {'need': 'OPTIONAL', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'rotation_matrix_row1', 'spec': {'need': 'OPTIONAL', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'rotation_matrix_row2', 'spec': {'need': 'OPTIONAL', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'use_gauss_points', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'num_gauss_points', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': None}},
            ]
        }

class Difference(UpsElement):
    tag_name = 'difference'
    
    def __init__(self):
        super().__init__()

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'difference',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
            ]
        }

class Union(UpsElement):
    tag_name = 'union'
    
    def __init__(self):
        super().__init__()

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'union',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
            ]
        }

class Intersection(UpsElement):
    tag_name = 'intersection'
    
    def __init__(self):
        super().__init__()

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'intersection',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
            ]
        }

class Union_2(UpsElement):
    tag_name = 'union'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.label: Optional[str] = None
        # Children
        self.box: List[Any] = []
        self.cone: List[Any] = []
        self.cylinder: List[Any] = []
        self.torus: List[Any] = []
        self.difference: List[Any] = []
        self.intersection: List[Any] = []
        self.ellipsoid: List[Any] = []
        self.sphere: List[Any] = []
        self.sphere_membrane: List[Any] = []
        self.sphere_shell: List[Any] = []
        self.cylinder_shell: List[Any] = []
        self.plane_shell: List[Any] = []
        self.tri: List[Any] = []
        self.union: List[Any] = []
        self.parallelepiped: List[Any] = []

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'union',
            'spec_type': 'NO_DATA',
            'attributes': {
                'label': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None},
            },
            'children_spec': [
                {'tag': 'box', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'cone', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'cylinder', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'torus', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'difference', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'intersection', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'ellipsoid', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'sphere', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'sphere_membrane', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'sphere_shell', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'cylinder_shell', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'plane_shell', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'tri', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'union', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'parallelepiped', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class Difference_2(UpsElement):
    tag_name = 'difference'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.label: Optional[str] = None
        # Children
        self.box: List[Any] = []
        self.cone: List[Any] = []
        self.cylinder: List[Any] = []
        self.torus: List[Any] = []
        self.difference: List[Any] = []
        self.intersection: List[Any] = []
        self.ellipsoid: List[Any] = []
        self.sphere: List[Any] = []
        self.sphere_membrane: List[Any] = []
        self.sphere_shell: List[Any] = []
        self.cylinder_shell: List[Any] = []
        self.plane_shell: List[Any] = []
        self.tri: List[Any] = []
        self.union: List[Any] = []
        self.parallelepiped: List[Any] = []

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'difference',
            'spec_type': 'NO_DATA',
            'attributes': {
                'label': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None},
            },
            'children_spec': [
                {'tag': 'box', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'cone', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'cylinder', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'torus', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'difference', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'intersection', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'ellipsoid', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'sphere', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'sphere_membrane', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'sphere_shell', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'cylinder_shell', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'plane_shell', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'tri', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'union', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'parallelepiped', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class Intersection_2(UpsElement):
    tag_name = 'intersection'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.label: Optional[str] = None
        # Children
        self.box: List[Any] = []
        self.cone: List[Any] = []
        self.cylinder: List[Any] = []
        self.torus: List[Any] = []
        self.difference: List[Any] = []
        self.intersection: List[Any] = []
        self.ellipsoid: List[Any] = []
        self.sphere: List[Any] = []
        self.sphere_membrane: List[Any] = []
        self.sphere_shell: List[Any] = []
        self.cylinder_shell: List[Any] = []
        self.plane_shell: List[Any] = []
        self.tri: List[Any] = []
        self.union: List[Any] = []
        self.parallelepiped: List[Any] = []

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'intersection',
            'spec_type': 'NO_DATA',
            'attributes': {
                'label': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None},
            },
            'children_spec': [
                {'tag': 'box', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'cone', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'cylinder', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'torus', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'difference', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'intersection', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'ellipsoid', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'sphere', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'sphere_membrane', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'sphere_shell', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'cylinder_shell', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'plane_shell', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'tri', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'union', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'parallelepiped', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class Geom_object(UpsElement):
    tag_name = 'geom_object'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.name: Optional[str] = None
        # Children
        self.box: List[Any] = []
        self.cone: List[Any] = []
        self.cylinder: List[Any] = []
        self.torus: List[Any] = []
        self.difference: List[Any] = []
        self.intersection: List[Any] = []
        self.ellipsoid: List[Any] = []
        self.sphere: List[Any] = []
        self.sphere_membrane: List[Any] = []
        self.sphere_shell: List[Any] = []
        self.cylinder_shell: List[Any] = []
        self.plane_shell: List[Any] = []
        self.smoothcyl: List[Any] = []
        self.smooth_sphere: List[Any] = []
        self.tri: List[Any] = []
        self.abaqus_mesh: List[Any] = []
        self.union: List[Any] = []
        self.parallelepiped: List[Any] = []
        self.file: Optional[Any] = None
        self.image: Optional[Any] = None
        self.res: Optional[Any] = None
        self.velocity: Optional[Any] = None
        self.level: Optional[Any] = None
        self.temperature: Optional[Any] = None
        self.color: Optional[Any] = None
        self.density: Optional[Any] = None
        self.pressure: Optional[Any] = None
        self.moment: Optional[Any] = None
        self.volumeFraction: Optional[Any] = None
        self.affineTransformation_A0: Optional[Any] = None
        self.affineTransformation_A1: Optional[Any] = None
        self.affineTransformation_A2: Optional[Any] = None
        self.affineTransformation_b: Optional[Any] = None
        self.null: Optional[Any] = None
        self.corrugated: Optional[Any] = None
        self.coeff: Optional[Any] = None
        self.cubicInitialize: Optional[Any] = None
        self.exponentialInitialize_1D: Optional[Any] = None
        self.freq: Optional[Any] = None
        self.linearInitialize: Optional[Any] = None
        self.scalar: Optional[Any] = None
        self.sinusoidalInitialize: Optional[Any] = None
        self.slope: Optional[Any] = None
        self.triangularInitialize: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'geom_object',
            'spec_type': 'NO_DATA',
            'attributes': {
                'name': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None},
            },
            'children_spec': [
                {'tag': 'box', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'cone', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'cylinder', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'torus', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'difference', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'intersection', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'ellipsoid', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'sphere', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'sphere_membrane', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'sphere_shell', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'cylinder_shell', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'plane_shell', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'smoothcyl', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'smooth_sphere', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'tri', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'abaqus_mesh', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'union', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'parallelepiped', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'file', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'image', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'res', 'spec': {'need': 'OPTIONAL', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'velocity', 'spec': {'need': 'OPTIONAL', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'level', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': None}},
                {'tag': 'temperature', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'color', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'density', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'pressure', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'moment', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'volumeFraction', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'affineTransformation_A0', 'spec': {'need': 'OPTIONAL', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'affineTransformation_A1', 'spec': {'need': 'OPTIONAL', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'affineTransformation_A2', 'spec': {'need': 'OPTIONAL', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'affineTransformation_b', 'spec': {'need': 'OPTIONAL', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'null', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'corrugated', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'coeff', 'spec': {'need': 'OPTIONAL', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'cubicInitialize', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'exponentialInitialize_1D', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'freq', 'spec': {'need': 'OPTIONAL', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'linearInitialize', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'scalar', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'sinusoidalInitialize', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'slope', 'spec': {'need': 'OPTIONAL', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'triangularInitialize', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
            ]
        }

class SimulationComponent(UpsElement):
    tag_name = 'SimulationComponent'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.type: Optional[str] = None
        # Children
        self.carry_over: List[Any] = []
        self.subcomponent: List[Any] = []

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'SimulationComponent',
            'spec_type': 'NO_DATA',
            'attributes': {
                'type': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'burger, ice, impm, mpm, mpm_usl, uofu_mpm,                                                                       mpmf, mpmice, amrmpm,                                                                       peridynamics,                                                                       reduce_uda,                                                                       advectslabs, advectslabsgpu, gpuschedulertest, unifiedschedulertest, poissongpu1,                                                                       poisson1, poisson2, poisson3, poisson4, benchmark, rigidmpmice, reduce_uda, combine_patches,                                                                        rmpmice, smpm, smpmice, switcher, wave, solvertest, particletest'},
            },
            'children_spec': [
                {'tag': 'carry_over', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'subcomponent', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class CommonTags(UpsElement):
    tag_name = 'CommonTags'
    
    def __init__(self):
        super().__init__()
        # Children
        self.box: Optional[Any] = None
        self.cone: Optional[Any] = None
        self.cylinder: Optional[Any] = None
        self.torus: Optional[Any] = None
        self.parallelepiped: Optional[Any] = None
        self.sphere: Optional[Any] = None
        self.ellipsoid: Optional[Any] = None
        self.sphere_membrane: Optional[Any] = None
        self.sphere_shell: Optional[Any] = None
        self.cylinder_shell: Optional[Any] = None
        self.plane_shell: Optional[Any] = None
        self.smoothcyl: Optional[Any] = None
        self.smooth_sphere: Optional[Any] = None
        self.tri: Optional[Any] = None
        self.abaqus_mesh: Optional[Any] = None
        self.difference: Optional[Any] = None
        self.union: Optional[Any] = None
        self.intersection: Optional[Any] = None
        self.union: Optional[Any] = None
        self.difference: Optional[Any] = None
        self.intersection: Optional[Any] = None
        self.geom_object: Optional[Any] = None
        self.SimulationComponent: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'CommonTags',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'box', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'cone', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'cylinder', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'torus', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'parallelepiped', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'sphere', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'ellipsoid', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'sphere_membrane', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'sphere_shell', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'cylinder_shell', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'plane_shell', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'smoothcyl', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'smooth_sphere', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'tri', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'abaqus_mesh', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'difference', 'spec': {'need': 'FORWARD_DECLARATION', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'union', 'spec': {'need': 'FORWARD_DECLARATION', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'intersection', 'spec': {'need': 'FORWARD_DECLARATION', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'union', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'difference', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'intersection', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'geom_object', 'spec': {'need': 'REQUIRED', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'SimulationComponent', 'spec': {'need': 'REQUIRED', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class Meta(UpsElement):
    tag_name = 'Meta'
    
    def __init__(self):
        super().__init__()
        # Children
        self.title: Optional[Any] = None
        self.info: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'Meta',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'title', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'info', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None}},
            ]
        }

class Unit(UpsElement):
    tag_name = 'Unit'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.name: Optional[str] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'Unit',
            'spec_type': 'NO_DATA',
            'attributes': {
                'name': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'KG^2'},
            },
            'children_spec': [
            ]
        }

class Time(UpsElement):
    tag_name = 'Time'
    
    def __init__(self):
        super().__init__()
        # Children
        self.maxTime: Optional[Any] = None
        self.max_timesteps: Optional[Any] = None
        self.end_on_max_time_exactly: Optional[Any] = None
        self.initTime: Optional[Any] = None
        self.delt_min: Optional[Any] = None
        self.delt_max: Optional[Any] = None
        self.delt_init: Optional[Any] = None
        self.max_delt_increase: Optional[Any] = None
        self.max_initial_delt: Optional[Any] = None
        self.initial_delt_range: Optional[Any] = None
        self.override_restart_delt: Optional[Any] = None
        self.timestep_multiplier: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'Time',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'maxTime', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'max_timesteps', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': 'positive'}},
                {'tag': 'end_on_max_time_exactly', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'initTime', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'delt_min', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'delt_max', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'delt_init', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'max_delt_increase', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'max_initial_delt', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'initial_delt_range', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'override_restart_delt', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'timestep_multiplier', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
            ]
        }

class DataArchiver(UpsElement):
    tag_name = 'DataArchiver'
    
    def __init__(self):
        super().__init__()
        # Children
        self.checkpoint: Optional[Any] = None
        self.compression: Optional[Any] = None
        self.filebase: Optional[Any] = None
        self.outputInterval: Optional[Any] = None
        self.outputInitTimestep: Optional[Any] = None
        self.outputTimestepInterval: Optional[Any] = None
        self.save: List[Any] = []
        self.save_crack_geometry: Optional[Any] = None
        self.outputDoubleAsFloat: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'DataArchiver',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'checkpoint', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'compression', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': 'gzip'}},
                {'tag': 'filebase', 'spec': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'outputInterval', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'outputInitTimestep', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'outputTimestepInterval', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': 'positive'}},
                {'tag': 'save', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'save_crack_geometry', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'outputDoubleAsFloat', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class Checkpoint(UpsElement):
    tag_name = 'checkpoint'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.interval: Optional[float] = None
        self.cycle: Optional[int] = None
        self.timestepInterval: Optional[int] = None
        self.walltimeStart: Optional[float] = None
        self.walltimeInterval: Optional[float] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'checkpoint',
            'spec_type': 'NO_DATA',
            'attributes': {
                'interval': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'},
                'cycle': {'need': 'REQUIRED', 'type': 'INTEGER', 'valid_values': 'positive'},
                'timestepInterval': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': 'positive'},
                'walltimeStart': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'},
                'walltimeInterval': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'},
            },
            'children_spec': [
            ]
        }

class OutputInitTimestep(UpsElement):
    tag_name = 'outputInitTimestep'
    
    def __init__(self):
        super().__init__()

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'outputInitTimestep',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
            ]
        }

class Save(UpsElement):
    tag_name = 'save'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.label: Optional[str] = None
        self.levels: Optional[str] = None
        self.material: Optional[str] = None
        self.table_lookup: Optional[bool] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'save',
            'spec_type': 'NO_DATA',
            'attributes': {
                'label': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': None},
                'levels': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None},
                'material': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None},
                'table_lookup': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None},
            },
            'children_spec': [
            ]
        }

class OutputDoubleAsFloat(UpsElement):
    tag_name = 'outputDoubleAsFloat'
    
    def __init__(self):
        super().__init__()

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'outputDoubleAsFloat',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
            ]
        }

class Debug(UpsElement):
    tag_name = 'Debug'
    
    def __init__(self):
        super().__init__()
        # Children
        self.dbg_timeStart: Optional[Any] = None
        self.dbg_timeStop: Optional[Any] = None
        self.dbg_outputInterval: Optional[Any] = None
        self.dbg_BeginIndex: Optional[Any] = None
        self.dbg_EndIndex: Optional[Any] = None
        self.dbg_Matls: Optional[Any] = None
        self.dbg_SigFigs: Optional[Any] = None
        self.dbg_Level: Optional[Any] = None
        self.dbg_SymmetryPlanes: Optional[Any] = None
        self.dbg_Sym_absolute_tol: Optional[Any] = None
        self.dbg_Sym_relative_tol: Optional[Any] = None
        self.dbg_Sym_cutoff_value: Optional[Any] = None
        self.debug: List[Any] = []

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'Debug',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'dbg_timeStart', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'dbg_timeStop', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'dbg_outputInterval', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'dbg_BeginIndex', 'spec': {'need': 'REQUIRED', 'type': 'MULTIPLE_VECTORS', 'valid_values': None}},
                {'tag': 'dbg_EndIndex', 'spec': {'need': 'REQUIRED', 'type': 'MULTIPLE_VECTORS', 'valid_values': None}},
                {'tag': 'dbg_Matls', 'spec': {'need': 'REQUIRED', 'type': 'MULTIPLE_INTEGERS', 'valid_values': None}},
                {'tag': 'dbg_SigFigs', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': '1, 20'}},
                {'tag': 'dbg_Level', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': '0, 20'}},
                {'tag': 'dbg_SymmetryPlanes', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': '1, 3'}},
                {'tag': 'dbg_Sym_absolute_tol', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'dbg_Sym_relative_tol', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'dbg_Sym_cutoff_value', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'debug', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class Debug_Debug(UpsElement):
    tag_name = 'debug'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.label: Optional[str] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'debug',
            'spec_type': 'NO_DATA',
            'attributes': {
                'label': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'switchTestConservation_abc,                                                                    switchDebug_Initialize,                                                                    switchDebug_equil_press,                                                                    switchDebug_PressDiffRF,                                                                    switchDebug_vel_FC,                                                                    switchDebug_Temp_FC,                                                                    switchDebug_Exchange_FC,                                                                    switchDebug_explicit_press,                                                                    switchDebug_setupMatrix,                                                                    switchDebug_setupRHS,                                                                    switchDebug_updatePressure,                                                                    switchDebug_computeDelP,                                                                    switchDebug_PressFC,                                                                    switchDebug_LagrangianValues,                                                                    switchDebug_LagrangianSpecificVol,                                                                    switchDebug_LagrangianTransportedVars,                                                                    switchDebug_MomentumExchange_CC,                                                                    switchDebug_Source_Sink,                                                                    switchDebug_advance_advect,                                                                    switchDebug_conserved_primitive,                                                                    switchDebug_AMR_refine,                                                                    switchDebug_AMR_refineInterface,                                                                    switchDebug_AMR_coarsen,                                                                    switchDebug_AMR_reflux,                                                                    switchDebug_InterpolateNCToCC_0,                                                                    switchDebug_InterpolateCCToNC,                                                                    switchDebug_InterpolatePAndGradP'},
            },
            'children_spec': [
            ]
        }

class InitialConditions(UpsElement):
    tag_name = 'InitialConditions'
    
    def __init__(self):
        super().__init__()
        # Children
        self.MPM: Optional[Any] = None
        self.ARCHES: Optional[Any] = None
        self.Peridynamics: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'InitialConditions',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'MPM', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'ARCHES', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'Peridynamics', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class MPM(UpsElement):
    tag_name = 'MPM'
    
    def __init__(self):
        super().__init__()

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'MPM',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
            ]
        }

class ARCHES(UpsElement):
    tag_name = 'ARCHES'
    
    def __init__(self):
        super().__init__()

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'ARCHES',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
            ]
        }

class Peridynamics(UpsElement):
    tag_name = 'Peridynamics'
    
    def __init__(self):
        super().__init__()

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'Peridynamics',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
            ]
        }

class Grid(UpsElement):
    tag_name = 'Grid'
    
    def __init__(self):
        super().__init__()
        # Children
        self.BoundaryConditions: Optional[Any] = None
        self.Level: List[Any] = []

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'Grid',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'BoundaryConditions', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'Level', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class BoundaryConditions(UpsElement):
    tag_name = 'BoundaryConditions'
    
    def __init__(self):
        super().__init__()
        # Children
        self.LODI: Optional[Any] = None
        self.SINE_BC: Optional[Any] = None
        self.microSlip: Optional[Any] = None
        self.Face: List[Any] = []

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'BoundaryConditions',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'LODI', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'SINE_BC', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'microSlip', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'Face', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class LODI(UpsElement):
    tag_name = 'LODI'
    
    def __init__(self):
        super().__init__()
        # Children
        self.press_infinity: Optional[Any] = None
        self.sigma: Optional[Any] = None
        self.Li_scale: Optional[Any] = None
        self.material: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'LODI',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'press_infinity', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'sigma', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': '0, 3.15'}},
                {'tag': 'Li_scale', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': '0, 1.0'}},
                {'tag': 'material', 'spec': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': None}},
            ]
        }

class SINE_BC(UpsElement):
    tag_name = 'SINE_BC'
    
    def __init__(self):
        super().__init__()
        # Children
        self.omega: Optional[Any] = None
        self.A: Optional[Any] = None
        self.reference_pressure: Optional[Any] = None
        self.reference_velocity: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'SINE_BC',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'omega', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'A', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'reference_pressure', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'reference_velocity', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': 'positive'}},
            ]
        }

class MicroSlip(UpsElement):
    tag_name = 'microSlip'
    
    def __init__(self):
        super().__init__()
        # Children
        self.alpha_momentum: Optional[Any] = None
        self.alpha_temperature: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'microSlip',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'alpha_momentum', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'alpha_temperature', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
            ]
        }

class Face(UpsElement):
    tag_name = 'Face'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.annulus: Optional[str] = None
        self.circle: Optional[str] = None
        self.inner_radius: Optional[float] = None
        self.origin: Optional[float] = None
        self.outer_radius: Optional[float] = None
        self.side: Optional[str] = None
        self.radius: Optional[float] = None
        self.rectangle: Optional[str] = None
        self.lower: Optional[float] = None
        self.upper: Optional[float] = None
        self.ellipse: Optional[str] = None
        self.major_radius: Optional[float] = None
        self.minor_radius: Optional[float] = None
        self.angle: Optional[float] = None
        self.name: Optional[str] = None
        # Children
        self.BCType: List[Any] = []

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'Face',
            'spec_type': 'NO_DATA',
            'attributes': {
                'annulus': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': 'x-, x+, y-, y+, z-, z+'},
                'circle': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': 'x-, x+, y-, y+, z-, z+'},
                'inner_radius': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'},
                'origin': {'need': 'OPTIONAL', 'type': 'MULTIPLE_DOUBLES', 'valid_values': None},
                'outer_radius': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'},
                'side': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': 'x-, x+, y-, y+, z-, z+'},
                'radius': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'},
                'rectangle': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': 'x-, x+, y-, y+, z-, z+'},
                'lower': {'need': 'OPTIONAL', 'type': 'MULTIPLE_DOUBLES', 'valid_values': None},
                'upper': {'need': 'OPTIONAL', 'type': 'MULTIPLE_DOUBLES', 'valid_values': None},
                'ellipse': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': 'x-, x+, y-, y+, z-, z+'},
                'major_radius': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'},
                'minor_radius': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'},
                'angle': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None},
                'name': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None},
            },
            'children_spec': [
                {'tag': 'BCType', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class BCType(UpsElement):
    tag_name = 'BCType'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.id: Optional[str] = None
        self.var: Optional[str] = None
        self.label: Optional[str] = None
        # Children
        self.value: Optional[Any] = None
        self.functor_name: Optional[Any] = None
        self.inputfile: Optional[Any] = None
        self.period: Optional[Any] = None
        self.timeperiod: Optional[Any] = None
        self.swirl_no: Optional[Any] = None
        self.swirl_centroid: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'BCType',
            'spec_type': 'NO_DATA',
            'attributes': {
                'id': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': '0,1,2,3,4,5,6,all'},
                'var': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'Neumann, Dirichlet, symmetry, LODI, computeFromDensity, Sine, creep, slip Custom,                                VelocityInlet, PressureBC, MomentBC, WallBC, OutletBC, VelocityFileInput, MassFlowInlet, Swirl, FromFile,                               TurbulentInlet, Tabulated '},
                'label': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': None},
            },
            'children_spec': [
                {'tag': 'value', 'spec': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'functor_name', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'inputfile', 'spec': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'period', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': 'positive'}},
                {'tag': 'timeperiod', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'swirl_no', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'swirl_centroid', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
            ]
        }

class Level(UpsElement):
    tag_name = 'Level'
    
    def __init__(self):
        super().__init__()
        # Children
        self.Box: List[Any] = []
        self.spacing: Optional[Any] = None
        self.periodic: Optional[Any] = None
        self.Stretch: List[Any] = []

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'Level',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'Box', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'spacing', 'spec': {'need': 'OPTIONAL', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'periodic', 'spec': {'need': 'OPTIONAL', 'type': 'VECTOR', 'valid_values': 'positive'}},
                {'tag': 'Stretch', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class Level_Box(UpsElement):
    tag_name = 'Box'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.label: Optional[str] = None
        # Children
        self.autoPatch: Optional[Any] = None
        self.lower: Optional[Any] = None
        self.upper: Optional[Any] = None
        self.resolution: Optional[Any] = None
        self.patches: Optional[Any] = None
        self.extraCells: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'Box',
            'spec_type': 'NO_DATA',
            'attributes': {
                'label': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None},
            },
            'children_spec': [
                {'tag': 'autoPatch', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': 'positive'}},
                {'tag': 'lower', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'upper', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'resolution', 'spec': {'need': 'OPTIONAL', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'patches', 'spec': {'need': 'OPTIONAL', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'extraCells', 'spec': {'need': 'OPTIONAL', 'type': 'VECTOR', 'valid_values': None}},
            ]
        }

class Stretch(UpsElement):
    tag_name = 'Stretch'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.axis: Optional[str] = None
        # Children
        self.linear: List[Any] = []
        self.uniform: List[Any] = []

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'Stretch',
            'spec_type': 'NO_DATA',
            'attributes': {
                'axis': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None},
            },
            'children_spec': [
                {'tag': 'linear', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'uniform', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class Linear(UpsElement):
    tag_name = 'linear'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.to: Optional[str] = None
        self.fromSpacing: Optional[str] = None
        self.toSpacing: Optional[str] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'linear',
            'spec_type': 'NO_DATA',
            'attributes': {
                'to': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None},
                'fromSpacing': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None},
                'toSpacing': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None},
            },
            'children_spec': [
            ]
        }

class Uniform(UpsElement):
    tag_name = 'uniform'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.to: Optional[str] = None
        self.spacing: Optional[str] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'uniform',
            'spec_type': 'NO_DATA',
            'attributes': {
                'to': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None},
                'spacing': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None},
            },
            'children_spec': [
            ]
        }

class PhysicalConstants(UpsElement):
    tag_name = 'PhysicalConstants'
    
    def __init__(self):
        super().__init__()
        # Children
        self.gravity: Optional[Any] = None
        self.reference_pressure: Optional[Any] = None
        self.reference_point: Optional[Any] = None
        self.viscosity: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'PhysicalConstants',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'gravity', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'reference_pressure', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'reference_point', 'spec': {'need': 'OPTIONAL', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'viscosity', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
            ]
        }

class MPMICE(UpsElement):
    tag_name = 'MPMICE'
    
    def __init__(self):
        super().__init__()
        # Children
        self.use_simple_equilibration_algorithm: Optional[Any] = None
        self.vol_frac_convergence_tolerance: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'MPMICE',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'use_simple_equilibration_algorithm', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'vol_frac_convergence_tolerance', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
            ]
        }

class CFD(UpsElement):
    tag_name = 'CFD'
    
    def __init__(self):
        super().__init__()
        # Children
        self.CanAddICEMaterial: Optional[Any] = None
        self.cfl: Optional[Any] = None
        self.ICE: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'CFD',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'CanAddICEMaterial', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'cfl', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': 'positive'}},
                {'tag': 'ICE', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class ICE(UpsElement):
    tag_name = 'ICE'
    
    def __init__(self):
        super().__init__()
        # Children
        self.advection: Optional[Any] = None
        self.ADD_HEAT: Optional[Any] = None
        self.ClampSpecificVolume: Optional[Any] = None
        self.turbulence: Optional[Any] = None
        self.customInitialization: Optional[Any] = None
        self.ImplicitSolver: Optional[Any] = None
        self.max_iteration_equilibration: Optional[Any] = None
        self.solution: Optional[Any] = None
        self.TimestepControl: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'ICE',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'advection', 'spec': {'need': 'REQUIRED', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'ADD_HEAT', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'ClampSpecificVolume', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'turbulence', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'customInitialization', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'ImplicitSolver', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'max_iteration_equilibration', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': 'positive'}},
                {'tag': 'solution', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'TimestepControl', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class Advection(UpsElement):
    tag_name = 'advection'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.type: Optional[str] = None
        self.useCompatibleFluxes: Optional[bool] = None
        self.compatibleFluxes: Optional[bool] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'advection',
            'spec_type': 'NO_DATA',
            'attributes': {
                'type': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'FirstOrder, FirstOrderGPU, SecondOrder'},
                'useCompatibleFluxes': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None},
                'compatibleFluxes': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None},
            },
            'children_spec': [
            ]
        }

class ADD_HEAT(UpsElement):
    tag_name = 'ADD_HEAT'
    
    def __init__(self):
        super().__init__()
        # Children
        self.add_heat_matls: Optional[Any] = None
        self.add_heat_coeff: Optional[Any] = None
        self.add_heat_t_start: Optional[Any] = None
        self.add_heat_t_final: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'ADD_HEAT',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'add_heat_matls', 'spec': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'add_heat_coeff', 'spec': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'add_heat_t_start', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'add_heat_t_final', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
            ]
        }

class Turbulence(UpsElement):
    tag_name = 'turbulence'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.model: Optional[str] = None
        # Children
        self.model_constant: Optional[Any] = None
        self.filter_width: Optional[Any] = None
        self.turb_Pr: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'turbulence',
            'spec_type': 'NO_DATA',
            'attributes': {
                'model': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'Smagorinsky Germano'},
            },
            'children_spec': [
                {'tag': 'model_constant', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'filter_width', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': '0,1'}},
                {'tag': 'turb_Pr', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': '0,1'}},
            ]
        }

class CustomInitialization(UpsElement):
    tag_name = 'customInitialization'
    
    def __init__(self):
        super().__init__()
        # Children
        self.manufacturedSolution: Optional[Any] = None
        self.vortices: Optional[Any] = None
        self.gaussianTemperature: Optional[Any] = None
        self.counterflow: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'customInitialization',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'manufacturedSolution', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'vortices', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'gaussianTemperature', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'counterflow', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class ManufacturedSolution(UpsElement):
    tag_name = 'manufacturedSolution'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.type: Optional[str] = None
        # Children
        self.A: Optional[Any] = None
        self.angle: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'manufacturedSolution',
            'spec_type': 'NO_DATA',
            'attributes': {
                'type': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'mms_1 mms_2 mms_3'},
            },
            'children_spec': [
                {'tag': 'A', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'angle', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
            ]
        }

class Vortices(UpsElement):
    tag_name = 'vortices'
    
    def __init__(self):
        super().__init__()
        # Children
        self.vortex: List[Any] = []

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'vortices',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'vortex', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class Vortex(UpsElement):
    tag_name = 'vortex'
    
    def __init__(self):
        super().__init__()
        # Children
        self.origin: Optional[Any] = None
        self.strength: Optional[Any] = None
        self.radius: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'vortex',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'origin', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'strength', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'radius', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
            ]
        }

class GaussianTemperature(UpsElement):
    tag_name = 'gaussianTemperature'
    
    def __init__(self):
        super().__init__()
        # Children
        self.origin: Optional[Any] = None
        self.spread_x: Optional[Any] = None
        self.spread_y: Optional[Any] = None
        self.amplitude: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'gaussianTemperature',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'origin', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'spread_x', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'spread_y', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'amplitude', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
            ]
        }

class Counterflow(UpsElement):
    tag_name = 'counterflow'
    
    def __init__(self):
        super().__init__()
        # Children
        self.strainRate: Optional[Any] = None
        self.referenceCell: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'counterflow',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'strainRate', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'referenceCell', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
            ]
        }

class ImplicitSolver(UpsElement):
    tag_name = 'ImplicitSolver'
    
    def __init__(self):
        super().__init__()
        # Children
        self.max_outer_iterations: Optional[Any] = None
        self.outer_iteration_tolerance: Optional[Any] = None
        self.iters_before_timestep_restart: Optional[Any] = None
        self.Parameters: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'ImplicitSolver',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'max_outer_iterations', 'spec': {'need': 'REQUIRED', 'type': 'INTEGER', 'valid_values': 'positive'}},
                {'tag': 'outer_iteration_tolerance', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'iters_before_timestep_restart', 'spec': {'need': 'REQUIRED', 'type': 'INTEGER', 'valid_values': 'positive'}},
                {'tag': 'Parameters', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class Parameters(UpsElement):
    tag_name = 'Parameters'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.variable: Optional[str] = None
        # Children
        self.initial_tolerance: Optional[Any] = None
        self.criteria: Optional[Any] = None
        self.jump: Optional[Any] = None
        self.logging: Optional[Any] = None
        self.maxiterations: Optional[Any] = None
        self.norm: Optional[Any] = None
        self.npost: Optional[Any] = None
        self.npre: Optional[Any] = None
        self.preconditioner: Optional[Any] = None
        self.outputEquations: Optional[Any] = None
        self.skip: Optional[Any] = None
        self.setupFrequency: Optional[Any] = None
        self.solver: Optional[Any] = None
        self.tolerance: Optional[Any] = None
        self.relax_type: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'Parameters',
            'spec_type': 'NO_DATA',
            'attributes': {
                'variable': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': 'implicitPressure'},
            },
            'children_spec': [
                {'tag': 'initial_tolerance', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'criteria', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': 'Absolute relative'}},
                {'tag': 'jump', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': None}},
                {'tag': 'logging', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': 'positive'}},
                {'tag': 'maxiterations', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': 'positive'}},
                {'tag': 'norm', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': 'LInfinity linfinity L1 l1 L2 l2'}},
                {'tag': 'npost', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': None}},
                {'tag': 'npre', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': None}},
                {'tag': 'preconditioner', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': 'none, pfmg, smg'}},
                {'tag': 'outputEquations', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'skip', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': None}},
                {'tag': 'setupFrequency', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': None}},
                {'tag': 'solver', 'spec': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'smg, SMG, PFMG, pfmg, SparseMSG, sparsemsg, CG, cg, Hybrid, hybrid, GMRES, gmres amg'}},
                {'tag': 'tolerance', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'relax_type', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': '0,3'}},
            ]
        }

class Solution(UpsElement):
    tag_name = 'solution'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.technique: Optional[str] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'solution',
            'spec_type': 'NO_DATA',
            'attributes': {
                'technique': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'EqForm'},
            },
            'children_spec': [
            ]
        }

class TimestepControl(UpsElement):
    tag_name = 'TimestepControl'
    
    def __init__(self):
        super().__init__()
        # Children
        self.Scheme_for_delT_calc: Optional[Any] = None
        self.knob_for_speedSound: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'TimestepControl',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'Scheme_for_delT_calc', 'spec': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'aggressive, conservative'}},
                {'tag': 'knob_for_speedSound', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': '0,1'}},
            ]
        }

class DataAnalysis(UpsElement):
    tag_name = 'DataAnalysis'
    
    def __init__(self):
        super().__init__()
        # Children
        self.Module: List[Any] = []

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'DataAnalysis',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'Module', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class Module(UpsElement):
    tag_name = 'Module'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.name: Optional[str] = None
        # Children
        self.material: Optional[Any] = None
        self.materialIndex: Optional[Any] = None
        self.samplingFrequency: Optional[Any] = None
        self.timeStart: Optional[Any] = None
        self.timeStop: Optional[Any] = None
        self.colorThreshold: Optional[Any] = None
        self.Variables: Optional[Any] = None
        self.lines: Optional[Any] = None
        self.plane: List[Any] = []
        self.objects: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'Module',
            'spec_type': 'NO_DATA',
            'attributes': {
                'name': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'lineExtract, containerExtract, particleExtract flatPlate_heatFlux'},
            },
            'children_spec': [
                {'tag': 'material', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'materialIndex', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': None}},
                {'tag': 'samplingFrequency', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'timeStart', 'spec': {'need': 'REQUIRED', 'type': 'INTEGER', 'valid_values': None}},
                {'tag': 'timeStop', 'spec': {'need': 'REQUIRED', 'type': 'INTEGER', 'valid_values': None}},
                {'tag': 'colorThreshold', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'Variables', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'lines', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'plane', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'objects', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class Variables(UpsElement):
    tag_name = 'Variables'
    
    def __init__(self):
        super().__init__()
        # Children
        self.analyze: List[Any] = []

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'Variables',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'analyze', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class Analyze(UpsElement):
    tag_name = 'analyze'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.label: Optional[str] = None
        self.matl: Optional[str] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'analyze',
            'spec_type': 'NO_DATA',
            'attributes': {
                'label': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': None},
                'matl': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None},
            },
            'children_spec': [
            ]
        }

class Lines(UpsElement):
    tag_name = 'lines'
    
    def __init__(self):
        super().__init__()
        # Children
        self.line: List[Any] = []

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'lines',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'line', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class Line(UpsElement):
    tag_name = 'line'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.name: Optional[str] = None
        # Children
        self.startingPt: Optional[Any] = None
        self.endingPt: Optional[Any] = None
        self.stepSize: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'line',
            'spec_type': 'NO_DATA',
            'attributes': {
                'name': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': None},
            },
            'children_spec': [
                {'tag': 'startingPt', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'endingPt', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'stepSize', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
            ]
        }

class Plane(UpsElement):
    tag_name = 'plane'
    
    def __init__(self):
        super().__init__()
        # Children
        self.startingPt: Optional[Any] = None
        self.endingPt: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'plane',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'startingPt', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'endingPt', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
            ]
        }

class Objects(UpsElement):
    tag_name = 'objects'
    
    def __init__(self):
        super().__init__()
        # Children
        self.geom_object: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'objects',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'geom_object', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA'}},
            ]
        }

class Objects_Geom_object(UpsElement):
    tag_name = 'geom_object'
    
    def __init__(self):
        super().__init__()
        # Children
        self.extract: List[Any] = []

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'geom_object',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'extract', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class Extract(UpsElement):
    tag_name = 'extract'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.var: Optional[str] = None
        self.mode: Optional[str] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'extract',
            'spec_type': 'NO_DATA',
            'attributes': {
                'var': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None},
                'mode': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'interior, surface, incident, net, velocity'},
            },
            'children_spec': [
            ]
        }

class AMR(UpsElement):
    tag_name = 'AMR'
    
    def __init__(self):
        super().__init__()
        # Children
        self.doMultiTaskgraphing: Optional[Any] = None
        self.useLockStep: Optional[Any] = None
        self.ICE: Optional[Any] = None
        self.MPM: Optional[Any] = None
        self.Regridder: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'AMR',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'doMultiTaskgraphing', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'useLockStep', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'ICE', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'MPM', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'Regridder', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class AMR_ICE(UpsElement):
    tag_name = 'ICE'
    
    def __init__(self):
        super().__init__()
        # Children
        self.orderOfInterpolation: Optional[Any] = None
        self.orderOf_CFI_Interpolation: Optional[Any] = None
        self.do_Refluxing: Optional[Any] = None
        self.Refinement_Criteria_Thresholds: Optional[Any] = None
        self.ClampSpecificVolume: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'ICE',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'orderOfInterpolation', 'spec': {'need': 'REQUIRED', 'type': 'INTEGER', 'valid_values': 'positive'}},
                {'tag': 'orderOf_CFI_Interpolation', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': 'positive'}},
                {'tag': 'do_Refluxing', 'spec': {'need': 'REQUIRED', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'Refinement_Criteria_Thresholds', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'ClampSpecificVolume', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
            ]
        }

class Refinement_Criteria_Thresholds(UpsElement):
    tag_name = 'Refinement_Criteria_Thresholds'
    
    def __init__(self):
        super().__init__()
        # Children
        self.Variable: List[Any] = []

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'Refinement_Criteria_Thresholds',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'Variable', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class Variable(UpsElement):
    tag_name = 'Variable'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.name: Optional[str] = None
        self.value: Optional[float] = None
        self.matl: Optional[str] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'Variable',
            'spec_type': 'NO_DATA',
            'attributes': {
                'name': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': None},
                'value': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None},
                'matl': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': None},
            },
            'children_spec': [
            ]
        }

class AMR_MPM(UpsElement):
    tag_name = 'MPM'
    
    def __init__(self):
        super().__init__()
        # Children
        self.min_grid_level: Optional[Any] = None
        self.max_grid_level: Optional[Any] = None
        self.manual_grid: Optional[Any] = None
        self.Refine_Regions: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'MPM',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'min_grid_level', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': None}},
                {'tag': 'max_grid_level', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': None}},
                {'tag': 'manual_grid', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'Refine_Regions', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class Refine_Regions(UpsElement):
    tag_name = 'Refine_Regions'
    
    def __init__(self):
        super().__init__()
        # Children
        self.geom_object: List[Any] = []

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'Refine_Regions',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'geom_object', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class Regridder(UpsElement):
    tag_name = 'Regridder'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.type: Optional[str] = None
        # Children
        self.adaptive: Optional[Any] = None
        self.max_levels: Optional[Any] = None
        self.cell_refinement_ratio: Optional[Any] = None
        self.min_boundary_cells: Optional[Any] = None
        self.amr_overhead_high: Optional[Any] = None
        self.amr_overhead_low: Optional[Any] = None
        self.cell_stability_dilation: Optional[Any] = None
        self.cell_regrid_dilation: Optional[Any] = None
        self.dynamic_dilation: Optional[Any] = None
        self.max_dilation: Optional[Any] = None
        self.max_timestep_interval: Optional[Any] = None
        self.min_timestep_interval: Optional[Any] = None
        self.min_patch_size: Optional[Any] = None
        self.patch_split_tolerance: Optional[Any] = None
        self.patch_combine_tolerance: Optional[Any] = None
        self.patch_ratio_to_target: Optional[Any] = None
        self.patches_per_level_per_proc: Optional[Any] = None
        self.lattice_refinement_ratio: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'Regridder',
            'spec_type': 'NO_DATA',
            'attributes': {
                'type': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'BNR, Hierarchical, Tiled'},
            },
            'children_spec': [
                {'tag': 'adaptive', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'max_levels', 'spec': {'need': 'REQUIRED', 'type': 'INTEGER', 'valid_values': 'positive'}},
                {'tag': 'cell_refinement_ratio', 'spec': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'min_boundary_cells', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'amr_overhead_high', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': '0,1'}},
                {'tag': 'amr_overhead_low', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': '0,1'}},
                {'tag': 'cell_stability_dilation', 'spec': {'need': 'OPTIONAL', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'cell_regrid_dilation', 'spec': {'need': 'OPTIONAL', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'dynamic_dilation', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'max_dilation', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'max_timestep_interval', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': None}},
                {'tag': 'min_timestep_interval', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': None}},
                {'tag': 'min_patch_size', 'spec': {'need': 'REQUIRED', 'type': 'MULTIPLE_VECTORS', 'valid_values': None}},
                {'tag': 'patch_split_tolerance', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': '0,1'}},
                {'tag': 'patch_combine_tolerance', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': '0,1'}},
                {'tag': 'patch_ratio_to_target', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': '0,1'}},
                {'tag': 'patches_per_level_per_proc', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'lattice_refinement_ratio', 'spec': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': None}},
            ]
        }

class Scheduler(UpsElement):
    tag_name = 'Scheduler'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.type: Optional[str] = None
        # Children
        self.small_messages: Optional[Any] = None
        self.taskReadyQueueAlg: Optional[Any] = None
        self.VarTracker: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'Scheduler',
            'spec_type': 'NO_DATA',
            'attributes': {
                'type': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': 'MPI DynamicMPI ThreadedMPI ThreadedMPI2 GPUThreadedMPI Unified'},
            },
            'children_spec': [
                {'tag': 'small_messages', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'taskReadyQueueAlg', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': 'MostChildren LeastChildren MostAllChildren LeastAllChildren MostL2Children LeastL2Children PatchOrder PatchOrderRandom MostMessages LeastMessages Random FCFS Stack'}},
                {'tag': 'VarTracker', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class VarTracker(UpsElement):
    tag_name = 'VarTracker'
    
    def __init__(self):
        super().__init__()
        # Children
        self.start_time: Optional[Any] = None
        self.end_time: Optional[Any] = None
        self.level: Optional[Any] = None
        self.start_index: Optional[Any] = None
        self.end_index: Optional[Any] = None
        self.var: List[Any] = []
        self.locations: Optional[Any] = None
        self.task: List[Any] = []

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'VarTracker',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'start_time', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'end_time', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'level', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': None}},
                {'tag': 'start_index', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'end_index', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'var', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'locations', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'task', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class Var(UpsElement):
    tag_name = 'var'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.label: Optional[str] = None
        self.dw: Optional[str] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'var',
            'spec_type': 'NO_DATA',
            'attributes': {
                'label': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': None},
                'dw': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'NewDW, OldDW'},
            },
            'children_spec': [
            ]
        }

class Locations(UpsElement):
    tag_name = 'locations'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.before_comm: Optional[bool] = None
        self.before_exec: Optional[bool] = None
        self.after_exec: Optional[bool] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'locations',
            'spec_type': 'NO_DATA',
            'attributes': {
                'before_comm': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None},
                'before_exec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None},
                'after_exec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None},
            },
            'children_spec': [
            ]
        }

class Task(UpsElement):
    tag_name = 'task'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.name: Optional[str] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'task',
            'spec_type': 'NO_DATA',
            'attributes': {
                'name': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': None},
            },
            'children_spec': [
            ]
        }

class PreprocessTools(UpsElement):
    tag_name = 'PreprocessTools'
    
    def __init__(self):
        super().__init__()
        # Children
        self.rawToUniqueGrains: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'PreprocessTools',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'rawToUniqueGrains', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class RawToUniqueGrains(UpsElement):
    tag_name = 'rawToUniqueGrains'
    
    def __init__(self):
        super().__init__()
        # Children
        self.image: Optional[Any] = None
        self.ppc: Optional[Any] = None
        self.res: Optional[Any] = None
        self.outputBasename: Optional[Any] = None
        self.matl: List[Any] = []
        self.uniqueGrains: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'rawToUniqueGrains',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'image', 'spec': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'ppc', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': 'positive'}},
                {'tag': 'res', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': 'positive'}},
                {'tag': 'outputBasename', 'spec': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'matl', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'uniqueGrains', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class Matl(UpsElement):
    tag_name = 'matl'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.index: Optional[str] = None
        # Children
        self.threshold: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'matl',
            'spec_type': 'NO_DATA',
            'attributes': {
                'index': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': None},
            },
            'children_spec': [
                {'tag': 'threshold', 'spec': {'need': 'REQUIRED', 'type': 'MULTIPLE_DOUBLES', 'valid_values': None}},
            ]
        }

class UniqueGrains(UpsElement):
    tag_name = 'uniqueGrains'
    
    def __init__(self):
        super().__init__()
        # Children
        self.matlIndex: Optional[Any] = None
        self.threshold: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'uniqueGrains',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'matlIndex', 'spec': {'need': 'REQUIRED', 'type': 'MULTIPLE_DOUBLES', 'valid_values': None}},
                {'tag': 'threshold', 'spec': {'need': 'REQUIRED', 'type': 'MULTIPLE_DOUBLES', 'valid_values': None}},
            ]
        }

class LoadBalancer(UpsElement):
    tag_name = 'LoadBalancer'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.type: Optional[str] = None
        # Children
        self.costAlgorithm: Optional[Any] = None
        self.dynamicAlgorithm: Optional[Any] = None
        self.doSpaceCurve: Optional[Any] = None
        self.hasParticles: Optional[Any] = None
        self.timestepInterval: Optional[Any] = None
        self.profileTimestepWindow: Optional[Any] = None
        self.gainThreshold: Optional[Any] = None
        self.levelIndependent: Optional[Any] = None
        self.outputNthProc: Optional[Any] = None
        self.zoltanAlgorithm: Optional[Any] = None
        self.zoltanIMBTol: Optional[Any] = None
        self.cellCost: Optional[Any] = None
        self.particleCost: Optional[Any] = None
        self.patchCost: Optional[Any] = None
        self.extraCellCost: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'LoadBalancer',
            'spec_type': 'NO_DATA',
            'attributes': {
                'type': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'DLB PLB SimpleLoadBalancer'},
            },
            'children_spec': [
                {'tag': 'costAlgorithm', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': 'Model,ModelLS,Kalman,Memory'}},
                {'tag': 'dynamicAlgorithm', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': 'particle3, patchFactor, patchFactorParticles, random, Zoltan'}},
                {'tag': 'doSpaceCurve', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'hasParticles', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'timestepInterval', 'spec': {'need': 'REQUIRED', 'type': 'INTEGER', 'valid_values': 'positive'}},
                {'tag': 'profileTimestepWindow', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': 'positive'}},
                {'tag': 'gainThreshold', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': '0,1'}},
                {'tag': 'levelIndependent', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'outputNthProc', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': 'positive'}},
                {'tag': 'zoltanAlgorithm', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': 'HSFC RIB RCB'}},
                {'tag': 'zoltanIMBTol', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'cellCost', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'particleCost', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'patchCost', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'extraCellCost', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
            ]
        }

class Multimaterial(UpsElement):
    tag_name = 'Multimaterial'
    
    def __init__(self):
        super().__init__()
        # Children
        self.fluidThermalConductivity: Optional[Any] = None
        self.heatExchange: Optional[Any] = None
        self.turbulentPrandtNo: Optional[Any] = None
        self.fluidHeatCapacity: Optional[Any] = None
        self.IfCutCell: Optional[Any] = None
        self.StationarySolid: Optional[Any] = None
        self.inviscid: Optional[Any] = None
        self.restart: Optional[Any] = None
        self.fixedCellType: Optional[Any] = None
        self.fixedTemp: Optional[Any] = None
        self.TestCutCells: Optional[Any] = None
        self.stairstep: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'Multimaterial',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'fluidThermalConductivity', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'heatExchange', 'spec': {'need': 'REQUIRED', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'turbulentPrandtNo', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'fluidHeatCapacity', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'IfCutCell', 'spec': {'need': 'REQUIRED', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'StationarySolid', 'spec': {'need': 'REQUIRED', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'inviscid', 'spec': {'need': 'REQUIRED', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'restart', 'spec': {'need': 'REQUIRED', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'fixedCellType', 'spec': {'need': 'REQUIRED', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'fixedTemp', 'spec': {'need': 'REQUIRED', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'TestCutCells', 'spec': {'need': 'REQUIRED', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'stairstep', 'spec': {'need': 'REQUIRED', 'type': 'BOOLEAN', 'valid_values': None}},
            ]
        }

class MPM_2(UpsElement):
    tag_name = 'MPM'
    
    def __init__(self):
        super().__init__()
        # Children
        self.refine_particles: Optional[Any] = None
        self.use_gradient_enhanced_velocity_projection: Optional[Any] = None
        self.deformation_gradient: Optional[Any] = None
        self.artificial_damping_coeff: Optional[Any] = None
        self.artificial_viscosity: Optional[Any] = None
        self.artificial_viscosity_heating: Optional[Any] = None
        self.artificial_viscosity_coeff1: Optional[Any] = None
        self.artificial_viscosity_coeff2: Optional[Any] = None
        self.axisymmetric: Optional[Any] = None
        self.can_add_MPM_material: Optional[Any] = None
        self.create_new_particles: Optional[Any] = None
        self.do_contact_friction_heating: Optional[Any] = None
        self.collinear_bimaterial_contact_normals: Optional[Any] = None
        self.do_grid_reset: Optional[Any] = None
        self.do_explicit_heat_conduction: Optional[Any] = None
        self.do_pressure_stabilization: Optional[Any] = None
        self.do_thermal_expansion: Optional[Any] = None
        self.compute_nodal_heat_flux: Optional[Any] = None
        self.erosion: Optional[Any] = None
        self.delete_rogue_particles: Optional[Any] = None
        self.forceBC_force_increment_factor: Optional[Any] = None
        self.manual_new_material: Optional[Any] = None
        self.num_iters_to_decrease_delT: Optional[Any] = None
        self.num_iters_to_increase_delT: Optional[Any] = None
        self.iters_before_timestep_restart: Optional[Any] = None
        self.boundary_traction_faces: Optional[Any] = None
        self.interpolate_particle_temp_to_grid_every_step: Optional[Any] = None
        self.time_integrator: Optional[Any] = None
        self.interpolator: Optional[Any] = None
        self.cpdi_lcrit: Optional[Any] = None
        self.minimum_particle_mass: Optional[Any] = None
        self.minimum_mass_for_acc: Optional[Any] = None
        self.maximum_particle_velocity: Optional[Any] = None
        self.temperature_solve: Optional[Any] = None
        self.test_for_neg_temps_mpm: Optional[Any] = None
        self.use_load_curves: Optional[Any] = None
        self.use_CBDI_boundary_condition: Optional[Any] = None
        self.use_cohesive_zones: Optional[Any] = None
        self.use_volume_integral: Optional[Any] = None
        self.use_prescribed_deformation: Optional[Any] = None
        self.prescribed_deformation_file: Optional[Any] = None
        self.exact_deformation: Optional[Any] = None
        self.insert_particles: Optional[Any] = None
        self.insert_particles_file: Optional[Any] = None
        self.with_color: Optional[Any] = None
        self.dynamic: Optional[Any] = None
        self.solver: Optional[Any] = None
        self.convergence_criteria_disp: Optional[Any] = None
        self.convergence_criteria_energy: Optional[Any] = None
        self.do_implicit_heat_conduction: Optional[Any] = None
        self.do_mechanics: Optional[Any] = None
        self.do_transient_implicit_heat_conduction: Optional[Any] = None
        self.delT_decrease_factor: Optional[Any] = None
        self.delT_increase_factor: Optional[Any] = None
        self.dadx: Optional[Any] = None
        self.smooth_crack_front: Optional[Any] = None
        self.calculate_fracture_parameters: Optional[Any] = None
        self.do_crack_propagation: Optional[Any] = None
        self.run_MMS_problem: Optional[Any] = None
        self.minimum_subcycles_for_F: Optional[Any] = None
        self.rotating_coordinate_system: Optional[Any] = None
        self.initialize_stress_using_body_force: Optional[Any] = None
        self.use_momentum_form: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'MPM',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'refine_particles', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'use_gradient_enhanced_velocity_projection', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'deformation_gradient', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'artificial_damping_coeff', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'artificial_viscosity', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'artificial_viscosity_heating', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'artificial_viscosity_coeff1', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'artificial_viscosity_coeff2', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'axisymmetric', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'can_add_MPM_material', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'create_new_particles', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'do_contact_friction_heating', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'collinear_bimaterial_contact_normals', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'do_grid_reset', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'do_explicit_heat_conduction', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'do_pressure_stabilization', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'do_thermal_expansion', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'compute_nodal_heat_flux', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'erosion', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'delete_rogue_particles', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'forceBC_force_increment_factor', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'manual_new_material', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'num_iters_to_decrease_delT', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': None}},
                {'tag': 'num_iters_to_increase_delT', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': None}},
                {'tag': 'iters_before_timestep_restart', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': None}},
                {'tag': 'boundary_traction_faces', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'interpolate_particle_temp_to_grid_every_step', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'time_integrator', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': 'explicit, fracture, implicit'}},
                {'tag': 'interpolator', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': 'linear, gimp, cpdi, cpti, 3rdorderBS, 4thorderBS'}},
                {'tag': 'cpdi_lcrit', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'minimum_particle_mass', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'minimum_mass_for_acc', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'maximum_particle_velocity', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'temperature_solve', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'test_for_neg_temps_mpm', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'use_load_curves', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'use_CBDI_boundary_condition', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'use_cohesive_zones', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'use_volume_integral', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'use_prescribed_deformation', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'prescribed_deformation_file', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'exact_deformation', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'insert_particles', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'insert_particles_file', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'with_color', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'dynamic', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'solver', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': 'petsc, simple'}},
                {'tag': 'convergence_criteria_disp', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'convergence_criteria_energy', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'do_implicit_heat_conduction', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'do_mechanics', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'do_transient_implicit_heat_conduction', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'delT_decrease_factor', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'delT_increase_factor', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'dadx', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'smooth_crack_front', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'calculate_fracture_parameters', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'do_crack_propagation', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'run_MMS_problem', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': 'AxisAligned, GeneralizedVortex , ExpandingRing, AxisAligned3L, UniaxialStrainHarmonic, UniaxialStrainHomogeneousLinear, UniaxialStrainHomogeneousQuadratic'}},
                {'tag': 'minimum_subcycles_for_F', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': None}},
                {'tag': 'rotating_coordinate_system', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'initialize_stress_using_body_force', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'use_momentum_form', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
            ]
        }

class Deformation_gradient(UpsElement):
    tag_name = 'deformation_gradient'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.algorithm: Optional[str] = None
        # Children
        self.num_terms: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'deformation_gradient',
            'spec_type': 'NO_DATA',
            'attributes': {
                'algorithm': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'first_order, subcycling, taylor_series, cayley_hamilton'},
            },
            'children_spec': [
                {'tag': 'num_terms', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': None}},
            ]
        }

class Erosion(UpsElement):
    tag_name = 'erosion'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.algorithm: Optional[str] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'erosion',
            'spec_type': 'NO_DATA',
            'attributes': {
                'algorithm': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'none, AllowNoTension, KeepStress, ZeroStress, RemoveMass, AllowNoShear, BrittleDamage, FailureCriterion'},
            },
            'children_spec': [
            ]
        }

class Rotating_coordinate_system(UpsElement):
    tag_name = 'rotating_coordinate_system'
    
    def __init__(self):
        super().__init__()
        # Children
        self.rotation_center: Optional[Any] = None
        self.rotation_axis: Optional[Any] = None
        self.rotation_speed_angular: Optional[Any] = None
        self.body_reference_point: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'rotating_coordinate_system',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'rotation_center', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'rotation_axis', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'rotation_speed_angular', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'body_reference_point', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
            ]
        }

class Peridynamics_2(UpsElement):
    tag_name = 'Peridynamics'
    
    def __init__(self):
        super().__init__()
        # Children
        self.gravity: Optional[Any] = None
        self.time_integrator: Optional[Any] = None
        self.num_cells_in_horizon: Optional[Any] = None
        self.interpolator: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'Peridynamics',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'gravity', 'spec': {'need': 'OPTIONAL', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'time_integrator', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': 'forward_euler, velocity_verlet, backward_euler'}},
                {'tag': 'num_cells_in_horizon', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'interpolator', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': 'linear, gimp, cpdi, 3rdorderBS, 4thorderBS'}},
            ]
        }

class MaterialProperties(UpsElement):
    tag_name = 'MaterialProperties'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.add: Optional[bool] = None
        # Children
        self.MPM: Optional[Any] = None
        self.ICE: Optional[Any] = None
        self.Peridynamics: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'MaterialProperties',
            'spec_type': 'NO_DATA',
            'attributes': {
                'add': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None},
            },
            'children_spec': [
                {'tag': 'MPM', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'ICE', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'Peridynamics', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class MaterialProperties_MPM(UpsElement):
    tag_name = 'MPM'
    
    def __init__(self):
        super().__init__()
        # Children
        self.contact: List[Any] = []
        self.material: List[Any] = []
        self.cohesive_zone: List[Any] = []
        self.thermal_contact: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'MPM',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'contact', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'material', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'cohesive_zone', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'thermal_contact', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class Contact(UpsElement):
    tag_name = 'contact'
    
    def __init__(self):
        super().__init__()
        # Children
        self.direction: Optional[Any] = None
        self.myu: Optional[Any] = None
        self.use_svf: Optional[Any] = None
        self.mu: Optional[Any] = None
        self.volume_constraint: Optional[Any] = None
        self.separation_factor: Optional[Any] = None
        self.one_or_two_step: Optional[Any] = None
        self.use_hardcoded_normals: Optional[Any] = None
        self.hardcoded_normal: List[Any] = []
        self.materials: Optional[Any] = None
        self.stop_time: Optional[Any] = None
        self.type: Optional[Any] = None
        self.vel_fields: Optional[Any] = None
        self.velocity_after_stop: Optional[Any] = None
        self.filename: Optional[Any] = None
        self.master_material: Optional[Any] = None
        self.master_material_is_rigid: Optional[Any] = None
        self.normal_only: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'contact',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'direction', 'spec': {'need': 'OPTIONAL', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'myu', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'use_svf', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'mu', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'volume_constraint', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'separation_factor', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'one_or_two_step', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': 'positive'}},
                {'tag': 'use_hardcoded_normals', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'hardcoded_normal', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'materials', 'spec': {'need': 'OPTIONAL', 'type': 'MULTIPLE_INTEGERS', 'valid_values': None}},
                {'tag': 'stop_time', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'type', 'spec': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'null, nodal_svf, single_velocity, rigid, specified, friction, friction_bard, friction_LR, approach'}},
                {'tag': 'vel_fields', 'spec': {'need': 'OPTIONAL', 'type': 'MULTIPLE_INTEGERS', 'valid_values': None}},
                {'tag': 'velocity_after_stop', 'spec': {'need': 'OPTIONAL', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'filename', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'master_material', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': None}},
                {'tag': 'master_material_is_rigid', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'normal_only', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
            ]
        }

class Hardcoded_normal(UpsElement):
    tag_name = 'hardcoded_normal'
    
    def __init__(self):
        super().__init__()
        # Children
        self.material_index: Optional[Any] = None
        self.coordinate_system: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'hardcoded_normal',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'material_index', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': None}},
                {'tag': 'coordinate_system', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class Coordinate_system(UpsElement):
    tag_name = 'coordinate_system'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.type: Optional[str] = None
        # Children
        self.axis: Optional[Any] = None
        self.center: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'coordinate_system',
            'spec_type': 'NO_DATA',
            'attributes': {
                'type': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'cylindrical, spherical, cartesian'},
            },
            'children_spec': [
                {'tag': 'axis', 'spec': {'need': 'OPTIONAL', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'center', 'spec': {'need': 'OPTIONAL', 'type': 'VECTOR', 'valid_values': None}},
            ]
        }

class Material(UpsElement):
    tag_name = 'material'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.name: Optional[str] = None
        # Children
        self.density: Optional[Any] = None
        self.constitutive_model: Optional[Any] = None
        self.specific_heat: Optional[Any] = None
        self.thermal_conductivity: Optional[Any] = None
        self.geom_object: List[Any] = []
        self.is_rigid: Optional[Any] = None
        self.C_p: Optional[Any] = None
        self.include_flow_work: Optional[Any] = None
        self.melt_temp: Optional[Any] = None
        self.room_temp: Optional[Any] = None
        self.do_basic_damage: Optional[Any] = None
        self.failure_criterion: Optional[Any] = None
        self.tensile_cutoff_fraction_of_cohesion: Optional[Any] = None
        self.friction_angle: Optional[Any] = None
        self.failure_mean: Optional[Any] = None
        self.failure_std: Optional[Any] = None
        self.failure_distrib: Optional[Any] = None
        self.scaling: Optional[Any] = None
        self.exponent: Optional[Any] = None
        self.failure_seed: Optional[Any] = None
        self.char_time: Optional[Any] = None
        self.brittle_damage_modulus: Optional[Any] = None
        self.brittle_damage_initial_threshold: Optional[Any] = None
        self.brittle_damage_fracture_energy: Optional[Any] = None
        self.brittle_damage_constant_D: Optional[Any] = None
        self.brittle_damage_max_damage_increment: Optional[Any] = None
        self.brittle_damage_allowRecovery: Optional[Any] = None
        self.brittle_damage_recoveryCoeff: Optional[Any] = None
        self.brittle_damage_printDamage: Optional[Any] = None
        self.fracture: Optional[Any] = None
        self.crack: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'material',
            'spec_type': 'NO_DATA',
            'attributes': {
                'name': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None},
            },
            'children_spec': [
                {'tag': 'density', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'constitutive_model', 'spec': {'need': 'REQUIRED', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'specific_heat', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'thermal_conductivity', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'geom_object', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'is_rigid', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'C_p', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'include_flow_work', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'melt_temp', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'room_temp', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'do_basic_damage', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'failure_criterion', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': 'MaximumPrincipalStress, MaximumPrincipalStrain, MohrCoulomb'}},
                {'tag': 'tensile_cutoff_fraction_of_cohesion', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'friction_angle', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'failure_mean', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'failure_std', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'failure_distrib', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': 'constant, gauss, weibull, uniform'}},
                {'tag': 'scaling', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': 'none, kayenta'}},
                {'tag': 'exponent', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'failure_seed', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': None}},
                {'tag': 'char_time', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'brittle_damage_modulus', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'brittle_damage_initial_threshold', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'brittle_damage_fracture_energy', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'brittle_damage_constant_D', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'brittle_damage_max_damage_increment', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'brittle_damage_allowRecovery', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'brittle_damage_recoveryCoeff', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'brittle_damage_printDamage', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'fracture', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'crack', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class Constitutive_model(UpsElement):
    tag_name = 'constitutive_model'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.type: Optional[str] = None
        # Children
        self.A: Optional[Any] = None
        self.allow_no_tension: Optional[Any] = None
        self.alpha: Optional[Any] = None
        self.alpha0: Optional[Any] = None
        self.Pe: Optional[Any] = None
        self.Ps: Optional[Any] = None
        self.b: Optional[Any] = None
        self.B: Optional[Any] = None
        self.Beta: Optional[Any] = None
        self.bulk_modulus: Optional[Any] = None
        self.bulkPrime: Optional[Any] = None
        self.C: Optional[Any] = None
        self.Cv: Optional[Any] = None
        self.c1: Optional[Any] = None
        self.c2: Optional[Any] = None
        self.c3: Optional[Any] = None
        self.c4: Optional[Any] = None
        self.c5: Optional[Any] = None
        self.fiber_stretch: Optional[Any] = None
        self.max_fiber_strain: Optional[Any] = None
        self.max_matrix_strain: Optional[Any] = None
        self.failure_option: Optional[Any] = None
        self.C1: Optional[Any] = None
        self.C2: Optional[Any] = None
        self.check_max_stress_failure: Optional[Any] = None
        self.check_TEPLA_failure_criterion: Optional[Any] = None
        self.check_failure: Optional[Any] = None
        self.failure_variable_mean: Optional[Any] = None
        self.failure_variable_std: Optional[Any] = None
        self.failure_variable_distrib: Optional[Any] = None
        self.Chi: Optional[Any] = None
        self.coeff_thermal_expansion: Optional[Any] = None
        self.CoeffThermalExpansion: Optional[Any] = None
        self.compute_specific_heat: Optional[Any] = None
        self.CrackFriction: Optional[Any] = None
        self.CrackParameterA: Optional[Any] = None
        self.CrackGrowthRate: Optional[Any] = None
        self.CrackMaxGrowthRate: Optional[Any] = None
        self.CrackPowerValue: Optional[Any] = None
        self.critical_porosity: Optional[Any] = None
        self.critical_scalar_damage: Optional[Any] = None
        self.critical_stress: Optional[Any] = None
        self.damage_cutoff: Optional[Any] = None
        self.damage_model: Optional[Any] = None
        self.deviatoric_stress_model: Optional[Any] = None
        self.DCp_DTemperature: Optional[Any] = None
        self.D: Optional[Any] = None
        self.starting_location: Optional[Any] = None
        self.direction_if_plane: Optional[Any] = None
        self.delH: Optional[Any] = None
        self.direction_of_symm: Optional[Any] = None
        self.do_melting: Optional[Any] = None
        self.dynamic_coeff_friction: Optional[Any] = None
        self.e_shear_modulus: Optional[Any] = None
        self.e_bulk_modulus: Optional[Any] = None
        self.ve_bulk_modulus: Optional[Any] = None
        self.ve_shear_modulus: Optional[Any] = None
        self.ve_volumetric_viscosity: Optional[Any] = None
        self.ve_deviatoric_viscosity: Optional[Any] = None
        self.EoverR: Optional[Any] = None
        self.evolve_damage: Optional[Any] = None
        self.evolve_porosity: Optional[Any] = None
        self.failure_by_stress: Optional[Any] = None
        self.scaling: Optional[Any] = None
        self.reference_volume: Optional[Any] = None
        self.failure_by_pressure: Optional[Any] = None
        self.fracture_toughness_curve: Optional[Any] = None
        self.G: Optional[Any] = None
        self.G1: Optional[Any] = None
        self.G2: Optional[Any] = None
        self.G3: Optional[Any] = None
        self.G4: Optional[Any] = None
        self.G5: Optional[Any] = None
        self.Gamma: Optional[Any] = None
        self.gamma: Optional[Any] = None
        self.reference_pressure: Optional[Any] = None
        self.reference_temperature: Optional[Any] = None
        self.hardening_modulus: Optional[Any] = None
        self.he_constant_1: Optional[Any] = None
        self.he_constant_2: Optional[Any] = None
        self.he_PR: Optional[Any] = None
        self.InitialCrackRadius: Optional[Any] = None
        self.initial_material_temperature: Optional[Any] = None
        self.initial_mean_porosity: Optional[Any] = None
        self.initial_mean_scalar_damage: Optional[Any] = None
        self.initial_porosity_distrib: Optional[Any] = None
        self.initial_scalar_damage_distrib: Optional[Any] = None
        self.initial_std_porosity: Optional[Any] = None
        self.initial_std_scalar_damage: Optional[Any] = None
        self.isothermal: Optional[Any] = None
        self.K: Optional[Any] = None
        self.K0: Optional[Any] = None
        self.Ks: Optional[Any] = None
        self.Ku: Optional[Any] = None
        self.n: Optional[Any] = None
        self.melting_temp_model: Optional[Any] = None
        self.om: Optional[Any] = None
        self.flow_model: Optional[Any] = None
        self.viscoplastic_flow_model: Optional[Any] = None
        self.pressure: Optional[Any] = None
        self.PR: Optional[Any] = None
        self.remove_particles: Optional[Any] = None
        self.randomize_parameters: Optional[Any] = None
        self.reduction_factor: Optional[Any] = None
        self.rho0: Optional[Any] = None
        self.rhoS: Optional[Any] = None
        self.R1: Optional[Any] = None
        self.R2: Optional[Any] = None
        self.RTau1: Optional[Any] = None
        self.RTau2: Optional[Any] = None
        self.RTau3: Optional[Any] = None
        self.RTau4: Optional[Any] = None
        self.RTau5: Optional[Any] = None
        self.shear_modulus: Optional[Any] = None
        self.equation_of_state: Optional[Any] = None
        self.shear_modulus_model: Optional[Any] = None
        self.specific_heat: Optional[Any] = None
        self.specific_heat_model: Optional[Any] = None
        self.stability_check: Optional[Any] = None
        self.frac_nucleation: Optional[Any] = None
        self.meanstrain_nucleation: Optional[Any] = None
        self.stddevstrain_nucleation: Optional[Any] = None
        self.strain_limit: Optional[Any] = None
        self.StressIntensityF: Optional[Any] = None
        self.T0: Optional[Any] = None
        self.T_0: Optional[Any] = None
        self.C_0: Optional[Any] = None
        self.Gamma_0: Optional[Any] = None
        self.S_alpha: Optional[Any] = None
        self.t1: Optional[Any] = None
        self.t2: Optional[Any] = None
        self.t3: Optional[Any] = None
        self.t4: Optional[Any] = None
        self.t5: Optional[Any] = None
        self.t6: Optional[Any] = None
        self.taylor_quinney_coeff: Optional[Any] = None
        self.tolerance: Optional[Any] = None
        self.useDamage: Optional[Any] = None
        self.useJWLEOS: Optional[Any] = None
        self.useJWLCEOS: Optional[Any] = None
        self.useMurnaghanEOS: Optional[Any] = None
        self.useBirchMurnaghanEOS: Optional[Any] = None
        self.useModifiedEOS: Optional[Any] = None
        self.useObjectiveRate: Optional[Any] = None
        self.usePlasticity: Optional[Any] = None
        self.UseArtificialViscosity: Optional[Any] = None
        self.use_polar_decomposition_RMB: Optional[Any] = None
        self.use_time_temperature_equation: Optional[Any] = None
        self.viscosity: Optional[Any] = None
        self.volfracHE: Optional[Any] = None
        self.yield_stress: Optional[Any] = None
        self.y1: Optional[Any] = None
        self.y2: Optional[Any] = None
        self.y3: Optional[Any] = None
        self.y4: Optional[Any] = None
        self.y5: Optional[Any] = None
        self.y6: Optional[Any] = None
        self.StrainEnergy: Optional[Any] = None
        self.Z: Optional[Any] = None
        self.zero_stress_upon_failure: Optional[Any] = None
        self.hugeJ: Optional[Any] = None
        self.B0: Optional[Any] = None
        self.B1: Optional[Any] = None
        self.B2: Optional[Any] = None
        self.B3: Optional[Any] = None
        self.B4: Optional[Any] = None
        self.G0: Optional[Any] = None
        self.G1: Optional[Any] = None
        self.G2: Optional[Any] = None
        self.G3: Optional[Any] = None
        self.G4: Optional[Any] = None
        self.RJS: Optional[Any] = None
        self.RKS: Optional[Any] = None
        self.RKN: Optional[Any] = None
        self.A1: Optional[Any] = None
        self.A2: Optional[Any] = None
        self.A3: Optional[Any] = None
        self.A4: Optional[Any] = None
        self.P0: Optional[Any] = None
        self.P1: Optional[Any] = None
        self.P2: Optional[Any] = None
        self.P3: Optional[Any] = None
        self.CR: Optional[Any] = None
        self.RK: Optional[Any] = None
        self.RN: Optional[Any] = None
        self.HC: Optional[Any] = None
        self.CTI1: Optional[Any] = None
        self.CTPS: Optional[Any] = None
        self.T1: Optional[Any] = None
        self.T2: Optional[Any] = None
        self.T3: Optional[Any] = None
        self.T4: Optional[Any] = None
        self.T5: Optional[Any] = None
        self.T6: Optional[Any] = None
        self.T7: Optional[Any] = None
        self.J3TYPE: Optional[Any] = None
        self.A2PF: Optional[Any] = None
        self.A4PF: Optional[Any] = None
        self.CRPF: Optional[Any] = None
        self.RKPF: Optional[Any] = None
        self.SUBX: Optional[Any] = None
        self.DEJAVU: Optional[Any] = None
        self.FAIL0: Optional[Any] = None
        self.FAIL1: Optional[Any] = None
        self.FAIL2: Optional[Any] = None
        self.FAIL3: Optional[Any] = None
        self.FAIL4: Optional[Any] = None
        self.FAIL5: Optional[Any] = None
        self.FAIL6: Optional[Any] = None
        self.FAIL7: Optional[Any] = None
        self.FAIL8: Optional[Any] = None
        self.FAIL9: Optional[Any] = None
        self.PEAKI1I: Optional[Any] = None
        self.STRENI: Optional[Any] = None
        self.FSLOPEI: Optional[Any] = None
        self.PEAKI1F: Optional[Any] = None
        self.STRENF: Optional[Any] = None
        self.SOFTENING: Optional[Any] = None
        self.FSLOPEF: Optional[Any] = None
        self.FAILSTAT: Optional[Any] = None
        self.EOSID: Optional[Any] = None
        self.USEHOSTEOS: Optional[Any] = None
        self.DILATLIM: Optional[Any] = None
        self.FREE01: Optional[Any] = None
        self.FREE02: Optional[Any] = None
        self.FREE03: Optional[Any] = None
        self.FREE04: Optional[Any] = None
        self.FREE05: Optional[Any] = None
        self.CTPSF: Optional[Any] = None
        self.YSLOPEI: Optional[Any] = None
        self.YSLOPEF: Optional[Any] = None
        self.TMPRXP: Optional[Any] = None
        self.THERM01: Optional[Any] = None
        self.THERM02: Optional[Any] = None
        self.THERM03: Optional[Any] = None
        self.TMPRM0: Optional[Any] = None
        self.RHO0: Optional[Any] = None
        self.TMPR0: Optional[Any] = None
        self.SNDSP0: Optional[Any] = None
        self.S1MG: Optional[Any] = None
        self.GRPAR: Optional[Any] = None
        self.CV: Optional[Any] = None
        self.ESFT: Optional[Any] = None
        self.RP: Optional[Any] = None
        self.PS: Optional[Any] = None
        self.PE: Optional[Any] = None
        self.CE: Optional[Any] = None
        self.NSUB: Optional[Any] = None
        self.S2MG: Optional[Any] = None
        self.TYP: Optional[Any] = None
        self.RO: Optional[Any] = None
        self.TO: Optional[Any] = None
        self.S: Optional[Any] = None
        self.GRPARO: Optional[Any] = None
        self.B: Optional[Any] = None
        self.XB: Optional[Any] = None
        self.NB: Optional[Any] = None
        self.PWR: Optional[Any] = None
        self.A1MG: Optional[Any] = None
        self.A2MG: Optional[Any] = None
        self.A3MG: Optional[Any] = None
        self.A4MG: Optional[Any] = None
        self.A5MG: Optional[Any] = None
        self.A0MG: Optional[Any] = None
        self.AEMG: Optional[Any] = None
        self.FK0: Optional[Any] = None
        self.AF: Optional[Any] = None
        self.PF: Optional[Any] = None
        self.XF: Optional[Any] = None
        self.CF: Optional[Any] = None
        self.RMX: Optional[Any] = None
        self.WB0: Optional[Any] = None
        self.WB1: Optional[Any] = None
        self.WB2: Optional[Any] = None
        self.WB3: Optional[Any] = None
        self.WB4: Optional[Any] = None
        self.WG0: Optional[Any] = None
        self.WG1: Optional[Any] = None
        self.WG2: Optional[Any] = None
        self.WG3: Optional[Any] = None
        self.WG4: Optional[Any] = None
        self.WRJS: Optional[Any] = None
        self.WRKS: Optional[Any] = None
        self.WRKN: Optional[Any] = None
        self.WA1: Optional[Any] = None
        self.WA2: Optional[Any] = None
        self.WA3: Optional[Any] = None
        self.WA4: Optional[Any] = None
        self.WP0: Optional[Any] = None
        self.WP1: Optional[Any] = None
        self.WP2: Optional[Any] = None
        self.WP3: Optional[Any] = None
        self.WCR: Optional[Any] = None
        self.WRK: Optional[Any] = None
        self.WRN: Optional[Any] = None
        self.WHC: Optional[Any] = None
        self.WCTI1: Optional[Any] = None
        self.WCTPS: Optional[Any] = None
        self.WT1: Optional[Any] = None
        self.WT2: Optional[Any] = None
        self.WT3: Optional[Any] = None
        self.WT4: Optional[Any] = None
        self.WT5: Optional[Any] = None
        self.WT6: Optional[Any] = None
        self.WT7: Optional[Any] = None
        self.WJ3TYPE: Optional[Any] = None
        self.WA2PF: Optional[Any] = None
        self.WA4PF: Optional[Any] = None
        self.WCRPF: Optional[Any] = None
        self.WRKPF: Optional[Any] = None
        self.WSUBX: Optional[Any] = None
        self.WDEJAVU: Optional[Any] = None
        self.WFAIL0: Optional[Any] = None
        self.WFAIL1: Optional[Any] = None
        self.WFAIL2: Optional[Any] = None
        self.WFAIL3: Optional[Any] = None
        self.WFAIL4: Optional[Any] = None
        self.WFAIL5: Optional[Any] = None
        self.WFAIL6: Optional[Any] = None
        self.WFAIL7: Optional[Any] = None
        self.WFAIL8: Optional[Any] = None
        self.WFAIL9: Optional[Any] = None
        self.WPEAKI1I: Optional[Any] = None
        self.WSTRENI: Optional[Any] = None
        self.WFSLOPEI: Optional[Any] = None
        self.WPEAKI1F: Optional[Any] = None
        self.WSTRENF: Optional[Any] = None
        self.WSOFTENING: Optional[Any] = None
        self.WFSLOPEF: Optional[Any] = None
        self.WFAILSTAT: Optional[Any] = None
        self.WEOSID: Optional[Any] = None
        self.WUSEHOSTEOS: Optional[Any] = None
        self.WDILATLIM: Optional[Any] = None
        self.WFREE01: Optional[Any] = None
        self.WFREE02: Optional[Any] = None
        self.WFREE03: Optional[Any] = None
        self.WFREE04: Optional[Any] = None
        self.WFREE05: Optional[Any] = None
        self.WCTPSF: Optional[Any] = None
        self.WYSLOPEI: Optional[Any] = None
        self.WYSLOPEF: Optional[Any] = None
        self.WTMPRXP: Optional[Any] = None
        self.WTHERM01: Optional[Any] = None
        self.WTHERM02: Optional[Any] = None
        self.WTHERM03: Optional[Any] = None
        self.WTMPRM0: Optional[Any] = None
        self.WRHO0: Optional[Any] = None
        self.WTMPR0: Optional[Any] = None
        self.WSNDSP0: Optional[Any] = None
        self.WS1MG: Optional[Any] = None
        self.WGRPAR: Optional[Any] = None
        self.WCV: Optional[Any] = None
        self.WESFT: Optional[Any] = None
        self.WRP: Optional[Any] = None
        self.WPS: Optional[Any] = None
        self.WPE: Optional[Any] = None
        self.WCE: Optional[Any] = None
        self.WNSUB: Optional[Any] = None
        self.WS2MG: Optional[Any] = None
        self.WTYP: Optional[Any] = None
        self.WRO: Optional[Any] = None
        self.WTO: Optional[Any] = None
        self.WS: Optional[Any] = None
        self.WGRPARO: Optional[Any] = None
        self.WB: Optional[Any] = None
        self.WXB: Optional[Any] = None
        self.WNB: Optional[Any] = None
        self.WPWR: Optional[Any] = None
        self.WA1MG: Optional[Any] = None
        self.WA2MG: Optional[Any] = None
        self.WA3MG: Optional[Any] = None
        self.WA4MG: Optional[Any] = None
        self.WA5MG: Optional[Any] = None
        self.WA0MG: Optional[Any] = None
        self.WAEMG: Optional[Any] = None
        self.WFK0: Optional[Any] = None
        self.WAF: Optional[Any] = None
        self.WPF: Optional[Any] = None
        self.WXF: Optional[Any] = None
        self.WCF: Optional[Any] = None
        self.WRMX: Optional[Any] = None
        self.PEAKI1IDIST: Optional[Any] = None
        self.B0: Optional[Any] = None
        self.B1: Optional[Any] = None
        self.B2: Optional[Any] = None
        self.G0: Optional[Any] = None
        self.G1: Optional[Any] = None
        self.G2: Optional[Any] = None
        self.G3: Optional[Any] = None
        self.A1: Optional[Any] = None
        self.A2: Optional[Any] = None
        self.A3: Optional[Any] = None
        self.A4: Optional[Any] = None
        self.A5: Optional[Any] = None
        self.A6: Optional[Any] = None
        self.AN: Optional[Any] = None
        self.R0: Optional[Any] = None
        self.T0: Optional[Any] = None
        self.C0: Optional[Any] = None
        self.S1: Optional[Any] = None
        self.GP: Optional[Any] = None
        self.CV: Optional[Any] = None
        self.TM: Optional[Any] = None
        self.T1: Optional[Any] = None
        self.T2: Optional[Any] = None
        self.T3: Optional[Any] = None
        self.T4: Optional[Any] = None
        self.XP: Optional[Any] = None
        self.SC: Optional[Any] = None
        self.IDK: Optional[Any] = None
        self.IDG: Optional[Any] = None
        self.A2PF: Optional[Any] = None
        self.TQC: Optional[Any] = None
        self.F1: Optional[Any] = None
        self.TEST: Optional[Any] = None
        self.DEJAVU: Optional[Any] = None
        self.DC1: Optional[Any] = None
        self.DC2: Optional[Any] = None
        self.DC3: Optional[Any] = None
        self.DC4: Optional[Any] = None
        self.DC5: Optional[Any] = None
        self.DC6: Optional[Any] = None
        self.DC7: Optional[Any] = None
        self.DC8: Optional[Any] = None
        self.DC9: Optional[Any] = None
        self.DC10: Optional[Any] = None
        self.DC11: Optional[Any] = None
        self.DC12: Optional[Any] = None
        self.DC13: Optional[Any] = None
        self.alpha: Optional[Any] = None
        self.alpha_p: Optional[Any] = None
        self.k_o: Optional[Any] = None
        self.k_o_dist: Optional[Any] = None
        self.h_local: Optional[Any] = None
        self.h_nonlocal: Optional[Any] = None
        self.l_nonlocal: Optional[Any] = None
        self.minimum_yield_stress: Optional[Any] = None
        self.initial_xstress: Optional[Any] = None
        self.initial_ystress: Optional[Any] = None
        self.initial_zstress: Optional[Any] = None
        self.Use_Disaggregation_Algorithm: Optional[Any] = None
        self.FSLOPE: Optional[Any] = None
        self.FSLOPE_p: Optional[Any] = None
        self.PEAKI1: Optional[Any] = None
        self.STREN: Optional[Any] = None
        self.YSLOPE: Optional[Any] = None
        self.BETA_nonassociativity: Optional[Any] = None
        self.B0: Optional[Any] = None
        self.B01: Optional[Any] = None
        self.B1: Optional[Any] = None
        self.B2: Optional[Any] = None
        self.B3: Optional[Any] = None
        self.B4: Optional[Any] = None
        self.G0: Optional[Any] = None
        self.G1: Optional[Any] = None
        self.G2: Optional[Any] = None
        self.G3: Optional[Any] = None
        self.G4: Optional[Any] = None
        self.p0_crush_curve: Optional[Any] = None
        self.p1_crush_curve: Optional[Any] = None
        self.p2_crush_curve: Optional[Any] = None
        self.p3_crush_curve: Optional[Any] = None
        self.CR: Optional[Any] = None
        self.T1_rate_dependence: Optional[Any] = None
        self.T2_rate_dependence: Optional[Any] = None
        self.kinematic_hardening_constant: Optional[Any] = None
        self.fluid_B0: Optional[Any] = None
        self.fluid_pressure_initial: Optional[Any] = None
        self.p4_fluid_effect: Optional[Any] = None
        self.gruneisen_parameter: Optional[Any] = None
        self.subcycling_characteristic_number: Optional[Any] = None
        self.J3_type: Optional[Any] = None
        self.J3_psi: Optional[Any] = None
        self.principal_stress_cutoff: Optional[Any] = None
        self.K0_Murnaghan_EOS: Optional[Any] = None
        self.n_Murnaghan_EOS: Optional[Any] = None
        self.reference_porosity: Optional[Any] = None
        self.initial_porosity: Optional[Any] = None
        self.initial_saturation: Optional[Any] = None
        self.initial_fluid_pressure: Optional[Any] = None
        self.p0: Optional[Any] = None
        self.p1: Optional[Any] = None
        self.p1_sat: Optional[Any] = None
        self.p1_density_scale_fac: Optional[Any] = None
        self.p2: Optional[Any] = None
        self.p3: Optional[Any] = None
        self.use_disaggregation_algorithm: Optional[Any] = None
        self.do_damage: Optional[Any] = None
        self.fspeed: Optional[Any] = None
        self.time_at_failure: Optional[Any] = None
        self.eq_plastic_strain_at_failure: Optional[Any] = None
        self.yield_surface_radius_scaling_factor: Optional[Any] = None
        self.consistency_bisection_tolerance: Optional[Any] = None
        self.decrease_substep_at_high_curvature: Optional[Any] = None
        self.initialize_with_body_force: Optional[Any] = None
        self.surface_reference_point: Optional[Any] = None
        self.vol_frac_phase1: Optional[Any] = None
        self.p0_phase1: Optional[Any] = None
        self.p1_phase1: Optional[Any] = None
        self.p1_sat_phase1: Optional[Any] = None
        self.p1_density_scale_fac_phase1: Optional[Any] = None
        self.p2_phase1: Optional[Any] = None
        self.p3_phase1: Optional[Any] = None
        self.p0_phase2: Optional[Any] = None
        self.p1_phase2: Optional[Any] = None
        self.p1_sat_phase2: Optional[Any] = None
        self.p1_density_scale_fac_phase2: Optional[Any] = None
        self.p2_phase2: Optional[Any] = None
        self.p3_phase2: Optional[Any] = None
        self.K0_Murnaghan_EOS_phase1: Optional[Any] = None
        self.n_Murnaghan_EOS_phase1: Optional[Any] = None
        self.K0_Murnaghan_EOS_phase2: Optional[Any] = None
        self.n_Murnaghan_EOS_phase2: Optional[Any] = None
        self.useInitialStress: Optional[Any] = None
        self.initial_pressure: Optional[Any] = None
        self.yield_distrib: Optional[Any] = None
        self.yield_range: Optional[Any] = None
        self.yield_seed: Optional[Any] = None
        self.useEOSFactory: Optional[Any] = None
        self.Kprime: Optional[Any] = None
        self.ignition_pressure: Optional[Any] = None
        self.murnaghan_K: Optional[Any] = None
        self.murnaghan_n: Optional[Any] = None
        self.jwl_A: Optional[Any] = None
        self.jwl_B: Optional[Any] = None
        self.jwl_C: Optional[Any] = None
        self.jwl_R1: Optional[Any] = None
        self.jwl_R2: Optional[Any] = None
        self.jwl_om: Optional[Any] = None
        self.jwl_rho0: Optional[Any] = None
        self.reaction_G: Optional[Any] = None
        self.reaction_b: Optional[Any] = None
        self.max_burn_timestep_size: Optional[Any] = None
        self.max_burned_fraction: Optional[Any] = None
        self.doFastStressCompute: Optional[Any] = None
        self.tolerance_for_Newton_iterations: Optional[Any] = None
        self.max_number_of_Newton_iterations: Optional[Any] = None
        self.useTaylorSeriesForDefGrad: Optional[Any] = None
        self.num_taylor_terms: Optional[Any] = None
        self.G00: Optional[Any] = None
        self.G01: Optional[Any] = None
        self.G02: Optional[Any] = None
        self.G03: Optional[Any] = None
        self.G04: Optional[Any] = None
        self.G05: Optional[Any] = None
        self.G06: Optional[Any] = None
        self.G07: Optional[Any] = None
        self.G08: Optional[Any] = None
        self.G09: Optional[Any] = None
        self.G10: Optional[Any] = None
        self.Tau01: Optional[Any] = None
        self.Tau02: Optional[Any] = None
        self.Tau03: Optional[Any] = None
        self.Tau04: Optional[Any] = None
        self.Tau05: Optional[Any] = None
        self.Tau06: Optional[Any] = None
        self.Tau07: Optional[Any] = None
        self.Tau08: Optional[Any] = None
        self.Tau09: Optional[Any] = None
        self.Tau10: Optional[Any] = None
        self.C1_WLF: Optional[Any] = None
        self.C2_WLF: Optional[Any] = None
        self.Tref_WLF: Optional[Any] = None
        self.model_type: Optional[Any] = None
        self.model_parameters: Optional[Any] = None
        self.integration_parameters: Optional[Any] = None
        self.elastic_moduli_model: Optional[Any] = None
        self.yield_condition: Optional[Any] = None
        self.internal_variable_model: Optional[Any] = None
        self.kinematic_hardening_model: Optional[Any] = None
        self.symmetry_axis_top: Optional[Any] = None
        self.symmetry_axis_bottom: Optional[Any] = None
        self.E_r: Optional[Any] = None
        self.E_theta: Optional[Any] = None
        self.E_z: Optional[Any] = None
        self.nu_theta_r: Optional[Any] = None
        self.nu_z_r: Optional[Any] = None
        self.nu_z_theta: Optional[Any] = None
        self.G_theta_z: Optional[Any] = None
        self.G_z_r: Optional[Any] = None
        self.G_r_theta: Optional[Any] = None
        self.filename: Optional[Any] = None
        self.independent_variables: Optional[Any] = None
        self.dependent_variables: Optional[Any] = None
        self.interpolation: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'constitutive_model',
            'spec_type': 'NO_DATA',
            'attributes': {
                'type': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'comp_mooney_rivlin,                                        comp_neo_hook,                                        comp_neo_hook_plastic,                                       elastic_plastic,                                        hypo_elastic,                                        hypo_elastic_fortran,                                        hypo_elastic_fracture,                                        hypo_elastic_mms,                                        elastic_plastic_hp,                                       ideal_gas,                                        membrane,                                        murnaghanMPM,                                        mw_visco_elastic,                                        rigid,                                        shell_CNH,                                       trans_iso_hyper,                                        visco_plastic,                                       visco_scram,                                        visco_trans_iso_hyper,                                        water,                                        kayenta,                                        diamm,                                        cnh_mms,                                       cnh_damage,                                        cnhp_damage,                                        UCNH,                                        program_burn,                                       jwlpp_mpm,                                        p_alpha,                                        nonlocal_drucker_prager,                                        Arenisca,                                        Arenisca3,                                        arena,                                        arena_mixture,                                        Arenisca4,                                        soil_model_brannon,                                        tabular_eos,                                        tabular_plasticity,                                        tabular_plasticity_cap,                                        mohr_coulomb,                                       camclay,                                       polar_orthotropic_hypoelastic,                                       viscoelastic_fortran'},
            },
            'children_spec': [
                {'tag': 'A', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'allow_no_tension', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'alpha', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'alpha0', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'Pe', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'Ps', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'b', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'B', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'Beta', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'bulk_modulus', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'bulkPrime', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'C', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'Cv', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'c1', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'c2', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'c3', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'c4', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'c5', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'fiber_stretch', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'max_fiber_strain', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'max_matrix_strain', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'failure_option', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'C1', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'C2', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'check_max_stress_failure', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'check_TEPLA_failure_criterion', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'check_failure', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'failure_variable_mean', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'failure_variable_std', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'failure_variable_distrib', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'Chi', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'coeff_thermal_expansion', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'CoeffThermalExpansion', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'compute_specific_heat', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'CrackFriction', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'CrackParameterA', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'CrackGrowthRate', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'CrackMaxGrowthRate', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'CrackPowerValue', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'critical_porosity', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'critical_scalar_damage', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'critical_stress', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'damage_cutoff', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'damage_model', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'deviatoric_stress_model', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'DCp_DTemperature', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'D', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'starting_location', 'spec': {'need': 'OPTIONAL', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'direction_if_plane', 'spec': {'need': 'OPTIONAL', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'delH', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'direction_of_symm', 'spec': {'need': 'OPTIONAL', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'do_melting', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'dynamic_coeff_friction', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'e_shear_modulus', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'e_bulk_modulus', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 've_bulk_modulus', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 've_shear_modulus', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 've_volumetric_viscosity', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 've_deviatoric_viscosity', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'EoverR', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'evolve_damage', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'evolve_porosity', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'failure_by_stress', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'scaling', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': 'none, kayenta'}},
                {'tag': 'reference_volume', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'failure_by_pressure', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'fracture_toughness_curve', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'G', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'G1', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'G2', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'G3', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'G4', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'G5', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'Gamma', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'gamma', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'reference_pressure', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'reference_temperature', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'hardening_modulus', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'he_constant_1', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'he_constant_2', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'he_PR', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'InitialCrackRadius', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'initial_material_temperature', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'initial_mean_porosity', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'initial_mean_scalar_damage', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'initial_porosity_distrib', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': 'constant, gauss'}},
                {'tag': 'initial_scalar_damage_distrib', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': 'constant, gauss'}},
                {'tag': 'initial_std_porosity', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'initial_std_scalar_damage', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'isothermal', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'K', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'K0', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'Ks', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'Ku', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'n', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'melting_temp_model', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'om', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'flow_model', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'viscoplastic_flow_model', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'pressure', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'PR', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'remove_particles', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'randomize_parameters', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'reduction_factor', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'rho0', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'rhoS', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'R1', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'R2', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'RTau1', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'RTau2', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'RTau3', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'RTau4', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'RTau5', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'shear_modulus', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'equation_of_state', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'shear_modulus_model', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'specific_heat', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'specific_heat_model', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'stability_check', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'frac_nucleation', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'meanstrain_nucleation', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'stddevstrain_nucleation', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'strain_limit', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'StressIntensityF', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'T0', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'T_0', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'C_0', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'Gamma_0', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'S_alpha', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 't1', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 't2', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 't3', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 't4', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 't5', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 't6', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'taylor_quinney_coeff', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'tolerance', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'useDamage', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'useJWLEOS', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'useJWLCEOS', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'useMurnaghanEOS', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'useBirchMurnaghanEOS', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'useModifiedEOS', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'useObjectiveRate', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'usePlasticity', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'UseArtificialViscosity', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'use_polar_decomposition_RMB', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'use_time_temperature_equation', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'viscosity', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'volfracHE', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'yield_stress', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'y1', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'y2', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'y3', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'y4', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'y5', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'y6', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'StrainEnergy', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'Z', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'zero_stress_upon_failure', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'hugeJ', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'B0', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'B1', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'B2', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'B3', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'B4', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'G0', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'G1', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'G2', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'G3', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'G4', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'RJS', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'RKS', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'RKN', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'A1', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'A2', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'A3', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'A4', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'P0', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'P1', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'P2', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'P3', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'CR', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'RK', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'RN', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'HC', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'CTI1', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'CTPS', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'T1', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'T2', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'T3', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'T4', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'T5', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'T6', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'T7', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'J3TYPE', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'A2PF', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'A4PF', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'CRPF', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'RKPF', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'SUBX', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'DEJAVU', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'FAIL0', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'FAIL1', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'FAIL2', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'FAIL3', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'FAIL4', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'FAIL5', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'FAIL6', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'FAIL7', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'FAIL8', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'FAIL9', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'PEAKI1I', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'STRENI', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'FSLOPEI', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'PEAKI1F', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'STRENF', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'SOFTENING', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'FSLOPEF', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'FAILSTAT', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'EOSID', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'USEHOSTEOS', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'DILATLIM', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'FREE01', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'FREE02', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'FREE03', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'FREE04', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'FREE05', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'CTPSF', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'YSLOPEI', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'YSLOPEF', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'TMPRXP', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'THERM01', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'THERM02', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'THERM03', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'TMPRM0', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'RHO0', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'TMPR0', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'SNDSP0', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'S1MG', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'GRPAR', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'CV', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'ESFT', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'RP', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'PS', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'PE', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'CE', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'NSUB', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'S2MG', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'TYP', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'RO', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'TO', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'S', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'GRPARO', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'B', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'XB', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'NB', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'PWR', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'A1MG', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'A2MG', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'A3MG', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'A4MG', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'A5MG', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'A0MG', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'AEMG', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'FK0', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'AF', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'PF', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'XF', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'CF', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'RMX', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WB0', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WB1', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WB2', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WB3', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WB4', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WG0', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WG1', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WG2', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WG3', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WG4', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WRJS', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WRKS', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WRKN', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WA1', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WA2', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WA3', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WA4', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WP0', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WP1', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WP2', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WP3', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WCR', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WRK', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WRN', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WHC', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WCTI1', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WCTPS', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WT1', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WT2', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WT3', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WT4', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WT5', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WT6', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WT7', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WJ3TYPE', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WA2PF', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WA4PF', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WCRPF', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WRKPF', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WSUBX', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WDEJAVU', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WFAIL0', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WFAIL1', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WFAIL2', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WFAIL3', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WFAIL4', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WFAIL5', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WFAIL6', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WFAIL7', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WFAIL8', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WFAIL9', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WPEAKI1I', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WSTRENI', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WFSLOPEI', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WPEAKI1F', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WSTRENF', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WSOFTENING', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WFSLOPEF', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WFAILSTAT', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WEOSID', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WUSEHOSTEOS', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WDILATLIM', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WFREE01', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WFREE02', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WFREE03', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WFREE04', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WFREE05', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WCTPSF', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WYSLOPEI', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WYSLOPEF', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WTMPRXP', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WTHERM01', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WTHERM02', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WTHERM03', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WTMPRM0', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WRHO0', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WTMPR0', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WSNDSP0', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WS1MG', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WGRPAR', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WCV', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WESFT', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WRP', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WPS', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WPE', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WCE', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WNSUB', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WS2MG', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WTYP', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WRO', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WTO', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WS', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WGRPARO', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WB', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WXB', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WNB', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WPWR', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WA1MG', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WA2MG', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WA3MG', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WA4MG', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WA5MG', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WA0MG', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WAEMG', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WFK0', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WAF', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WPF', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WXF', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WCF', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'WRMX', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'PEAKI1IDIST', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'B0', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'B1', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'B2', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'G0', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'G1', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'G2', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'G3', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'A1', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'A2', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'A3', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'A4', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'A5', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'A6', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'AN', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'R0', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'T0', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'C0', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'S1', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'GP', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'CV', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'TM', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'T1', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'T2', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'T3', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'T4', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'XP', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'SC', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'IDK', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'IDG', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'A2PF', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'TQC', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'F1', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'TEST', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'DEJAVU', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'DC1', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'DC2', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'DC3', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'DC4', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'DC5', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'DC6', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'DC7', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'DC8', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'DC9', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'DC10', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'DC11', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'DC12', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'DC13', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'alpha', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'alpha_p', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'k_o', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'k_o_dist', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'h_local', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'h_nonlocal', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'l_nonlocal', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'minimum_yield_stress', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'initial_xstress', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'initial_ystress', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'initial_zstress', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'Use_Disaggregation_Algorithm', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'FSLOPE', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'FSLOPE_p', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'PEAKI1', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'STREN', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'YSLOPE', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'BETA_nonassociativity', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'B0', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'B01', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'B1', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'B2', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'B3', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'B4', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'G0', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'G1', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'G2', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'G3', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'G4', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'p0_crush_curve', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'p1_crush_curve', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'p2_crush_curve', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'p3_crush_curve', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'CR', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'T1_rate_dependence', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'T2_rate_dependence', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'kinematic_hardening_constant', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'fluid_B0', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'fluid_pressure_initial', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'p4_fluid_effect', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'gruneisen_parameter', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'subcycling_characteristic_number', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'J3_type', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': None}},
                {'tag': 'J3_psi', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': None}},
                {'tag': 'principal_stress_cutoff', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': None}},
                {'tag': 'K0_Murnaghan_EOS', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'n_Murnaghan_EOS', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'reference_porosity', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'initial_porosity', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'initial_saturation', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'initial_fluid_pressure', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'p0', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'p1', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'p1_sat', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'p1_density_scale_fac', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'p2', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'p3', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'use_disaggregation_algorithm', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'do_damage', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'fspeed', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'time_at_failure', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'eq_plastic_strain_at_failure', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'yield_surface_radius_scaling_factor', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'consistency_bisection_tolerance', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'decrease_substep_at_high_curvature', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'initialize_with_body_force', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'surface_reference_point', 'spec': {'need': 'OPTIONAL', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'vol_frac.phase1', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'p0.phase1', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'p1.phase1', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'p1_sat.phase1', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'p1_density_scale_fac.phase1', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'p2.phase1', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'p3.phase1', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'p0.phase2', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'p1.phase2', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'p1_sat.phase2', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'p1_density_scale_fac.phase2', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'p2.phase2', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'p3.phase2', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'K0_Murnaghan_EOS.phase1', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'n_Murnaghan_EOS.phase1', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'K0_Murnaghan_EOS.phase2', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'n_Murnaghan_EOS.phase2', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'useInitialStress', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'initial_pressure', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'yield_distrib', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': 'constant, uniform'}},
                {'tag': 'yield_range', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'yield_seed', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': None}},
                {'tag': 'useEOSFactory', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'Kprime', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'ignition_pressure', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'murnaghan_K', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'murnaghan_n', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'jwl_A', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'jwl_B', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'jwl_C', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'jwl_R1', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'jwl_R2', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'jwl_om', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'jwl_rho0', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'reaction_G', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'reaction_b', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'max_burn_timestep_size', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'max_burned_fraction', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'doFastStressCompute', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'tolerance_for_Newton_iterations', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'max_number_of_Newton_iterations', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'useTaylorSeriesForDefGrad', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'num_taylor_terms', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': 'positive'}},
                {'tag': 'G00', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'G01', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'G02', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'G03', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'G04', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'G05', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'G06', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'G07', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'G08', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'G09', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'G10', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'Tau01', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'Tau02', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'Tau03', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'Tau04', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'Tau05', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'Tau06', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'Tau07', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'Tau08', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'Tau09', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'Tau10', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'C1_WLF', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'C2_WLF', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'Tref_WLF', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'model_type', 'spec': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'classic, classic_semiimplicit, sheng'}},
                {'tag': 'model_parameters', 'spec': {'need': 'REQUIRED', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'integration_parameters', 'spec': {'need': 'REQUIRED', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'elastic_moduli_model', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'yield_condition', 'spec': {'need': 'REQUIRED', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'internal_variable_model', 'spec': {'need': 'REQUIRED', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'kinematic_hardening_model', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'symmetry_axis_top', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'symmetry_axis_bottom', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'E_r', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'E_theta', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'E_z', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'nu_theta_r', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'nu_z_r', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'nu_z_theta', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'G_theta_z', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'G_z_r', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'G_r_theta', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'filename', 'spec': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'independent_variables', 'spec': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'dependent_variables', 'spec': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'interpolation', 'spec': {'need': 'REQUIRED', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class Damage_model(UpsElement):
    tag_name = 'damage_model'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.type: Optional[str] = None
        # Children
        self.Dc: Optional[Any] = None
        self.D0: Optional[Any] = None
        self.D1: Optional[Any] = None
        self.D2: Optional[Any] = None
        self.D3: Optional[Any] = None
        self.D4: Optional[Any] = None
        self.D5: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'damage_model',
            'spec_type': 'NO_DATA',
            'attributes': {
                'type': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'hancock_mackenzie, johnson_cook'},
            },
            'children_spec': [
                {'tag': 'Dc', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'D0', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'D1', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'D2', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'D3', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'D4', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'D5', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
            ]
        }

class Deviatoric_stress_model(UpsElement):
    tag_name = 'deviatoric_stress_model'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.type: Optional[str] = None
        # Children
        self.tau: Optional[Any] = None
        self.mu: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'deviatoric_stress_model',
            'spec_type': 'NO_DATA',
            'attributes': {
                'type': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'hypoElastic, hypoViscoElastic'},
            },
            'children_spec': [
                {'tag': 'tau', 'spec': {'need': 'REQUIRED', 'type': 'MULTIPLE_DOUBLES', 'valid_values': None}},
                {'tag': 'mu', 'spec': {'need': 'REQUIRED', 'type': 'MULTIPLE_DOUBLES', 'valid_values': None}},
            ]
        }

class Fracture_toughness_curve(UpsElement):
    tag_name = 'fracture_toughness_curve'
    
    def __init__(self):
        super().__init__()
        # Children
        self.crack_propagation_criterion: Optional[Any] = None
        self.p: Optional[Any] = None
        self.q: Optional[Any] = None
        self.r: Optional[Any] = None
        self.point: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'fracture_toughness_curve',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'crack_propagation_criterion', 'spec': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'max_hoop_stress, empirical_criterion, max_principal_stress, max_energy_release_rate, strain_energy_density'}},
                {'tag': 'p', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'q', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'r', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'point', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class Point(UpsElement):
    tag_name = 'point'
    
    def __init__(self):
        super().__init__()
        # Children
        self.Vc: Optional[Any] = None
        self.KIc: Optional[Any] = None
        self.KIIc: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'point',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'Vc', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'KIc', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'KIIc', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
            ]
        }

class Melting_temp_model(UpsElement):
    tag_name = 'melting_temp_model'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.type: Optional[str] = None
        # Children
        self.a: Optional[Any] = None
        self.b: Optional[Any] = None
        self.Gamma_0: Optional[Any] = None
        self.K_T: Optional[Any] = None
        self.T_m0: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'melting_temp_model',
            'spec_type': 'NO_DATA',
            'attributes': {
                'type': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'constant_Tm, linear_Tm, scg_Tm, bps_Tm'},
            },
            'children_spec': [
                {'tag': 'a', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'b', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'Gamma_0', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'K_T', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'T_m0', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
            ]
        }

class Flow_model(UpsElement):
    tag_name = 'flow_model'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.type: Optional[str] = None
        # Children
        self.K: Optional[Any] = None
        self.sigma_0: Optional[Any] = None
        self.A: Optional[Any] = None
        self.B: Optional[Any] = None
        self.C: Optional[Any] = None
        self.m: Optional[Any] = None
        self.n: Optional[Any] = None
        self.T_r: Optional[Any] = None
        self.T_m: Optional[Any] = None
        self.epdot_0: Optional[Any] = None
        self.mu_0: Optional[Any] = None
        self.beta: Optional[Any] = None
        self.epsilon_p0: Optional[Any] = None
        self.Y_max: Optional[Any] = None
        self.T_m0: Optional[Any] = None
        self.a: Optional[Any] = None
        self.Gamma_0: Optional[Any] = None
        self.C1: Optional[Any] = None
        self.C2: Optional[Any] = None
        self.dislocation_density: Optional[Any] = None
        self.length_of_dislocation_segment: Optional[Any] = None
        self.distance_between_Peierls_valleys: Optional[Any] = None
        self.length_of_Burger_vector: Optional[Any] = None
        self.Debye_frequency: Optional[Any] = None
        self.width_of_kink_loop: Optional[Any] = None
        self.drag_coefficient: Optional[Any] = None
        self.energy_to_form_kink_pair: Optional[Any] = None
        self.Boltzmann_constant: Optional[Any] = None
        self.Peierls_stress: Optional[Any] = None
        self.c_0: Optional[Any] = None
        self.sigma_g: Optional[Any] = None
        self.k_H: Optional[Any] = None
        self.sqrt_l_inv: Optional[Any] = None
        self.beta_0: Optional[Any] = None
        self.beta_1: Optional[Any] = None
        self.B_0: Optional[Any] = None
        self.alpha_0: Optional[Any] = None
        self.alpha_1: Optional[Any] = None
        self.sigma_a: Optional[Any] = None
        self.D: Optional[Any] = None
        self.T_0: Optional[Any] = None
        self.koverbcubed: Optional[Any] = None
        self.g_0i: Optional[Any] = None
        self.g_0e: Optional[Any] = None
        self.edot_0i: Optional[Any] = None
        self.edot_0e: Optional[Any] = None
        self.p_i: Optional[Any] = None
        self.q_i: Optional[Any] = None
        self.p_e: Optional[Any] = None
        self.q_e: Optional[Any] = None
        self.sigma_i: Optional[Any] = None
        self.a_0: Optional[Any] = None
        self.a_1: Optional[Any] = None
        self.a_2: Optional[Any] = None
        self.a_3: Optional[Any] = None
        self.theta_IV: Optional[Any] = None
        self.alpha: Optional[Any] = None
        self.edot_es0: Optional[Any] = None
        self.g_0es: Optional[Any] = None
        self.sigma_es0: Optional[Any] = None
        self.T_c: Optional[Any] = None
        self.g_0i_c: Optional[Any] = None
        self.sigma_i_c: Optional[Any] = None
        self.g_0es_c: Optional[Any] = None
        self.sigma_es0_c: Optional[Any] = None
        self.a_0_c: Optional[Any] = None
        self.a_3_c: Optional[Any] = None
        self.theta: Optional[Any] = None
        self.p: Optional[Any] = None
        self.s0: Optional[Any] = None
        self.sinf: Optional[Any] = None
        self.kappa: Optional[Any] = None
        self.gamma: Optional[Any] = None
        self.y0: Optional[Any] = None
        self.yinf: Optional[Any] = None
        self.y1: Optional[Any] = None
        self.y2: Optional[Any] = None
        self.M: Optional[Any] = None
        self.G0: Optional[Any] = None
        self.alphap: Optional[Any] = None
        self.B_pa: Optional[Any] = None
        self.B_pb: Optional[Any] = None
        self.B_pn: Optional[Any] = None
        self.B_0pa: Optional[Any] = None
        self.B_0pb: Optional[Any] = None
        self.B_0pn: Optional[Any] = None
        self.omega_a: Optional[Any] = None
        self.omega_b: Optional[Any] = None
        self.omega_p: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'flow_model',
            'spec_type': 'NO_DATA',
            'attributes': {
                'type': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'linear, johnson_cook, mechanical_threshold_stress,                                                   preston_tonks_wallace, steinberg_cochran_guinan,                                                   zerilli_armstrong, zerilli_armstrong_polymer'},
            },
            'children_spec': [
                {'tag': 'K', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'sigma_0', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'A', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'B', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'C', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'm', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'n', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'T_r', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'T_m', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'epdot_0', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'mu_0', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'beta', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'epsilon_p0', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'Y_max', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'T_m0', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'a', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'Gamma_0', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'C1', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'C2', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'dislocation_density', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'length_of_dislocation_segment', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'distance_between_Peierls_valleys', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'length_of_Burger_vector', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'Debye_frequency', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'width_of_kink_loop', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'drag_coefficient', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'energy_to_form_kink_pair', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'Boltzmann_constant', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'Peierls_stress', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'c_0', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'sigma_g', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'k_H', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'sqrt_l_inv', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'beta_0', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'beta_1', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'B_0', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'alpha_0', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'alpha_1', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'sigma_a', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'D', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'T_0', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'koverbcubed', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'g_0i', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'g_0e', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'edot_0i', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'edot_0e', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'p_i', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'q_i', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'p_e', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'q_e', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'sigma_i', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'a_0', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'a_1', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'a_2', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'a_3', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'theta_IV', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'alpha', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'edot_es0', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'g_0es', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'sigma_es0', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'T_c', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'g_0i_c', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'sigma_i_c', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'g_0es_c', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'sigma_es0_c', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'a_0_c', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'a_3_c', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'theta', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'p', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 's0', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'sinf', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'kappa', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'gamma', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'y0', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'yinf', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'y1', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'y2', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'M', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'G0', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'alphap', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'B_pa', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'B_pb', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'B_pn', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'B_0pa', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'B_0pb', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'B_0pn', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'omega_a', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'omega_b', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'omega_p', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
            ]
        }

class Viscoplastic_flow_model(UpsElement):
    tag_name = 'viscoplastic_flow_model'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.type: Optional[str] = None
        # Children
        self.coeff_backstress_evol: Optional[Any] = None
        self.exponent_backstress_evol: Optional[Any] = None
        self.normalizing_backstress: Optional[Any] = None
        self.coeff_saturation_backstress: Optional[Any] = None
        self.exponent_backstress: Optional[Any] = None
        self.ref_strainrate: Optional[Any] = None
        self.normalizing_inelastic_strainrate: Optional[Any] = None
        self.activation_energy: Optional[Any] = None
        self.universal_gas_constant: Optional[Any] = None
        self.temperature: Optional[Any] = None
        self.exponent_inelastic_strainrate: Optional[Any] = None
        self.coeff_yieldstress_saturation: Optional[Any] = None
        self.exponent_yieldstress: Optional[Any] = None
        self.coeff_yieldstress_evol: Optional[Any] = None
        self.exponent_dragstress: Optional[Any] = None
        self.coeff_dragstress_evol: Optional[Any] = None
        self.coeff_stress_saturation: Optional[Any] = None
        self.intial_drag: Optional[Any] = None
        self.initial_yield: Optional[Any] = None
        self.integration_parameter_theta: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'viscoplastic_flow_model',
            'spec_type': 'NO_DATA',
            'attributes': {
                'type': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'suvic_i'},
            },
            'children_spec': [
                {'tag': 'coeff_backstress_evol', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'exponent_backstress_evol', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'normalizing_backstress', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'coeff_saturation_backstress', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'exponent_backstress', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'ref_strainrate', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'normalizing_inelastic_strainrate', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'activation_energy', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'universal_gas_constant', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'temperature', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'exponent_inelastic_strainrate', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'coeff_yieldstress_saturation', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'exponent_yieldstress', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'coeff_yieldstress_evol', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'exponent_dragstress', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'coeff_dragstress_evol', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'coeff_stress_saturation', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'intial_drag', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'initial_yield', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'integration_parameter_theta', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
            ]
        }

class Equation_of_state(UpsElement):
    tag_name = 'equation_of_state'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.type: Optional[str] = None
        # Children
        self.bulk_modulus: Optional[Any] = None
        self.C_0: Optional[Any] = None
        self.Gamma_0: Optional[Any] = None
        self.S_alpha: Optional[Any] = None
        self.S_2: Optional[Any] = None
        self.S_3: Optional[Any] = None
        self.rho_0: Optional[Any] = None
        self.p0: Optional[Any] = None
        self.alpha: Optional[Any] = None
        self.kappatilde: Optional[Any] = None
        self.epse_v0: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'equation_of_state',
            'spec_type': 'NO_DATA',
            'attributes': {
                'type': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'default_hyper, default_hypo, mie_gruneisen, mie_gruneisen_energy, borja_pressure, air, water, granite'},
            },
            'children_spec': [
                {'tag': 'bulk_modulus', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'C_0', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'Gamma_0', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'S_alpha', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'S_2', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'S_3', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'rho_0', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'p0', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'negative'}},
                {'tag': 'alpha', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'kappatilde', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'epse_v0', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
            ]
        }

class Shear_modulus_model(UpsElement):
    tag_name = 'shear_modulus_model'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.type: Optional[str] = None
        # Children
        self.shear_modulus: Optional[Any] = None
        self.mu_0: Optional[Any] = None
        self.A: Optional[Any] = None
        self.B: Optional[Any] = None
        self.C: Optional[Any] = None
        self.D: Optional[Any] = None
        self.m: Optional[Any] = None
        self.slope_mu_p_over_mu0: Optional[Any] = None
        self.T_0: Optional[Any] = None
        self.zeta: Optional[Any] = None
        self.alpha: Optional[Any] = None
        self.alphap: Optional[Any] = None
        self.mu0: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'shear_modulus_model',
            'spec_type': 'NO_DATA',
            'attributes': {
                'type': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'borja_shear, constant_shear, mts_shear, np_shear, ptw_shear, scg_shear'},
            },
            'children_spec': [
                {'tag': 'shear_modulus', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'mu_0', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'A', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'B', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'C', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'D', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'm', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'slope_mu_p_over_mu0', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'T_0', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'zeta', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'alpha', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'alphap', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'mu0', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
            ]
        }

class Specific_heat_model(UpsElement):
    tag_name = 'specific_heat_model'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.type: Optional[str] = None
        # Children
        self.T_transition: Optional[Any] = None
        self.A_LowT: Optional[Any] = None
        self.B_LowT: Optional[Any] = None
        self.C_LowT: Optional[Any] = None
        self.n_LowT: Optional[Any] = None
        self.A_HighT: Optional[Any] = None
        self.B_HighT: Optional[Any] = None
        self.C_HighT: Optional[Any] = None
        self.n_HighT: Optional[Any] = None
        self.a: Optional[Any] = None
        self.b: Optional[Any] = None
        self.beta: Optional[Any] = None
        self.c0: Optional[Any] = None
        self.c1: Optional[Any] = None
        self.c2: Optional[Any] = None
        self.c3: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'specific_heat_model',
            'spec_type': 'NO_DATA',
            'attributes': {
                'type': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'constant_Cp, cubic_Cp, copper_Cp, steel_Cp'},
            },
            'children_spec': [
                {'tag': 'T_transition', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'A_LowT', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'B_LowT', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'C_LowT', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'n_LowT', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'A_HighT', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'B_HighT', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'C_HighT', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'n_HighT', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'a', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'b', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'beta', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'c0', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'c1', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'c2', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'c3', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
            ]
        }

class Stability_check(UpsElement):
    tag_name = 'stability_check'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.type: Optional[str] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'stability_check',
            'spec_type': 'NO_DATA',
            'attributes': {
                'type': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'acoustic, becker, drucker, drucker_becker, none'},
            },
            'children_spec': [
            ]
        }

class Model_parameters(UpsElement):
    tag_name = 'model_parameters'
    
    def __init__(self):
        super().__init__()
        # Children
        self.shear_modulus: Optional[Any] = None
        self.bulk_modulus: Optional[Any] = None
        self.cohesion: Optional[Any] = None
        self.angle_internal_friction: Optional[Any] = None
        self.angle_dilation: Optional[Any] = None
        self.max_hydrostatic_tension: Optional[Any] = None
        self.initial_suction: Optional[Any] = None
        self.phi_b: Optional[Any] = None
        self.use_water_retention: Optional[Any] = None
        self.water_retention_param_1: Optional[Any] = None
        self.water_retention_param_2: Optional[Any] = None
        self.water_retention_param_3: Optional[Any] = None
        self.water_retention_param_4: Optional[Any] = None
        self.use_undrained_shear_transition: Optional[Any] = None
        self.water_influence_A1: Optional[Any] = None
        self.water_influence_B1: Optional[Any] = None
        self.water_influence_W: Optional[Any] = None
        self.beta_strain_rate: Optional[Any] = None
        self.ref_strain_rate: Optional[Any] = None
        self.use_variable_elastic_modulus: Optional[Any] = None
        self.variable_modulus_m: Optional[Any] = None
        self.variable_modulus_nu_y: Optional[Any] = None
        self.use_linearly_varying_cohesion: Optional[Any] = None
        self.linear_cohesion_a: Optional[Any] = None
        self.linear_cohesion_y_ref: Optional[Any] = None
        self.linear_cohesion_depth_direction: Optional[Any] = None
        self.use_softening: Optional[Any] = None
        self.softening_St: Optional[Any] = None
        self.softening_strain_95: Optional[Any] = None
        self.use_regularized_nonlocal_softening: Optional[Any] = None
        self.regularization_t_FE: Optional[Any] = None
        self.regularization_t_shear: Optional[Any] = None
        self.use_nonlocal_correction: Optional[Any] = None
        self.nonlocal_n: Optional[Any] = None
        self.nonlocal_l: Optional[Any] = None
        self.retention_model: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'model_parameters',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'shear_modulus', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'bulk_modulus', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'cohesion', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'angle_internal_friction', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'angle_dilation', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'max_hydrostatic_tension', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'initial_suction', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'phi_b', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'use_water_retention', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'water_retention_param_1', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'water_retention_param_2', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'water_retention_param_3', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'water_retention_param_4', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'use_undrained_shear_transition', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'water_influence_A1', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'water_influence_B1', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'water_influence_W', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'beta_strain_rate', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'ref_strain_rate', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'use_variable_elastic_modulus', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'variable_modulus_m', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'variable_modulus_nu_y', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'use_linearly_varying_cohesion', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'linear_cohesion_a', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'linear_cohesion_y_ref', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'linear_cohesion_depth_direction', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': 'x-, x+, y-, y+, z-, z+'}},
                {'tag': 'use_softening', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'softening_St', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'softening_strain_95', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'use_regularized_nonlocal_softening', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'regularization_t_FE', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'regularization_t_shear', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'use_nonlocal_correction', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'nonlocal_n', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'nonlocal_l', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'retention_model', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': 'state_surface, van_genuchten, gallipoli'}},
            ]
        }

class Integration_parameters(UpsElement):
    tag_name = 'integration_parameters'
    
    def __init__(self):
        super().__init__()
        # Children
        self.max_iterations_pegasus: Optional[Any] = None
        self.alpha_check_pegasus: Optional[Any] = None
        self.alpha_change_pegasus: Optional[Any] = None
        self.alpha_ratio_pegasus: Optional[Any] = None
        self.yield_tolerance: Optional[Any] = None
        self.integration_tolerance: Optional[Any] = None
        self.beta_safety_factor: Optional[Any] = None
        self.minimum_mean_stress: Optional[Any] = None
        self.suction_tolerance: Optional[Any] = None
        self.drift_correction_algorithm: Optional[Any] = None
        self.tolerance_algorithm: Optional[Any] = None
        self.solution_algorithm: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'integration_parameters',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'max_iterations_pegasus', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'alpha_check_pegasus', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'alpha_change_pegasus', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'alpha_ratio_pegasus', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'yield_tolerance', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'integration_tolerance', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'beta_safety_factor', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'minimum_mean_stress', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'suction_tolerance', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'drift_correction_algorithm', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': 'none, at_begin, at_end'}},
                {'tag': 'tolerance_algorithm', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': 'relative, sloan'}},
                {'tag': 'solution_algorithm', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': 'modified_euler, RK3, RK3_Bogacki, RK4, RK5_England,                                                  RK5_Cash, RK5_Dormand, RK5_Bogacki, extrapolation'}},
            ]
        }

class Elastic_moduli_model(UpsElement):
    tag_name = 'elastic_moduli_model'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.type: Optional[str] = None
        # Children
        self.bulk_modulus: Optional[Any] = None
        self.shear_modulus: Optional[Any] = None
        self.B0: Optional[Any] = None
        self.B1: Optional[Any] = None
        self.B2: Optional[Any] = None
        self.B3: Optional[Any] = None
        self.B4: Optional[Any] = None
        self.G0: Optional[Any] = None
        self.G1: Optional[Any] = None
        self.G2: Optional[Any] = None
        self.G3: Optional[Any] = None
        self.G4: Optional[Any] = None
        self.b0: Optional[Any] = None
        self.b1: Optional[Any] = None
        self.b2: Optional[Any] = None
        self.b3: Optional[Any] = None
        self.b4: Optional[Any] = None
        self.nu1: Optional[Any] = None
        self.nu2: Optional[Any] = None
        self.vol_frac_phase1: Optional[Any] = None
        self.b0_phase1: Optional[Any] = None
        self.b1_phase1: Optional[Any] = None
        self.b2_phase1: Optional[Any] = None
        self.b3_phase1: Optional[Any] = None
        self.b4_phase1: Optional[Any] = None
        self.G0_phase1: Optional[Any] = None
        self.nu1_phase1: Optional[Any] = None
        self.nu2_phase1: Optional[Any] = None
        self.b0_phase2: Optional[Any] = None
        self.b1_phase2: Optional[Any] = None
        self.b2_phase2: Optional[Any] = None
        self.b3_phase2: Optional[Any] = None
        self.b4_phase2: Optional[Any] = None
        self.G0_phase2: Optional[Any] = None
        self.nu1_phase2: Optional[Any] = None
        self.nu2_phase2: Optional[Any] = None
        self.filename: Optional[Any] = None
        self.independent_variables: Optional[Any] = None
        self.dependent_variables: Optional[Any] = None
        self.interpolation: Optional[Any] = None
        self.nu: Optional[Any] = None
        self.min_strain: Optional[Any] = None
        self.max_strain: Optional[Any] = None
        self.min_pressure: Optional[Any] = None
        self.max_pressure: Optional[Any] = None
        self.mean_elastic_strain: Optional[Any] = None
        self.std_dev_elastic_strain: Optional[Any] = None
        self.mean_plastic_strain: Optional[Any] = None
        self.std_dev_plastic_strain: Optional[Any] = None
        self.mean_bulk_modulus: Optional[Any] = None
        self.std_dev_bulk_modulus: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'elastic_moduli_model',
            'spec_type': 'NO_DATA',
            'attributes': {
                'type': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'constant  arenisca3  arena  arena_mixture  metal_iso neural_net neural_net_bulk support_vector soil_model_brannon tabular tabular_bulk tabular_bulk_pressure'},
            },
            'children_spec': [
                {'tag': 'bulk_modulus', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'shear_modulus', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'B0', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'B1', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'B2', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'B3', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'B4', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'G0', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'G1', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'G2', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'G3', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'G4', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'b0', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'b1', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'b2', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'b3', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'b4', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'nu1', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'nu2', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'vol_frac.phase1', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'b0.phase1', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'b1.phase1', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'b2.phase1', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'b3.phase1', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'b4.phase1', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'G0.phase1', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'nu1.phase1', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'nu2.phase1', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'b0.phase2', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'b1.phase2', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'b2.phase2', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'b3.phase2', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'b4.phase2', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'G0.phase2', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'nu1.phase2', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'nu2.phase2', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'filename', 'spec': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'independent_variables', 'spec': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'dependent_variables', 'spec': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'interpolation', 'spec': {'need': 'REQUIRED', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'nu', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'min_strain', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'max_strain', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'min_pressure', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'max_pressure', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'mean_elastic_strain', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'std_dev_elastic_strain', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'mean_plastic_strain', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'std_dev_plastic_strain', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'mean_bulk_modulus', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'std_dev_bulk_modulus', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
            ]
        }

class Interpolation(UpsElement):
    tag_name = 'interpolation'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.type: Optional[str] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'interpolation',
            'spec_type': 'NO_DATA',
            'attributes': {
                'type': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'linear, cubic'},
            },
            'children_spec': [
            ]
        }

class Yield_condition(UpsElement):
    tag_name = 'yield_condition'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.type: Optional[str] = None
        # Children
        self.M: Optional[Any] = None
        self.q1: Optional[Any] = None
        self.q2: Optional[Any] = None
        self.q3: Optional[Any] = None
        self.k: Optional[Any] = None
        self.f_c: Optional[Any] = None
        self.D: Optional[Any] = None
        self.sigma_1: Optional[Any] = None
        self.PEAKI1: Optional[Any] = None
        self.FSLOPE: Optional[Any] = None
        self.STREN: Optional[Any] = None
        self.YSLOPE: Optional[Any] = None
        self.PEAKI1_failed: Optional[Any] = None
        self.FSLOPE_failed: Optional[Any] = None
        self.STREN_failed: Optional[Any] = None
        self.YSLOPE_failed: Optional[Any] = None
        self.BETA: Optional[Any] = None
        self.CR: Optional[Any] = None
        self.T1: Optional[Any] = None
        self.T2: Optional[Any] = None
        self.weibullDist_PEAKI1: Optional[Any] = None
        self.weibullDist_FSLOPE: Optional[Any] = None
        self.weibullDist_STREN: Optional[Any] = None
        self.weibullDist_YSLOPE: Optional[Any] = None
        self.weibullDist_BETA: Optional[Any] = None
        self.weibullDist_CR: Optional[Any] = None
        self.weibullDist_T1: Optional[Any] = None
        self.weibullDist_T2: Optional[Any] = None
        self.vol_frac_phase1: Optional[Any] = None
        self.PEAKI1_phase1: Optional[Any] = None
        self.FSLOPE_phase1: Optional[Any] = None
        self.STREN_phase1: Optional[Any] = None
        self.YSLOPE_phase1: Optional[Any] = None
        self.PEAKI1_failed_phase1: Optional[Any] = None
        self.FSLOPE_failed_phase1: Optional[Any] = None
        self.STREN_failed_phase1: Optional[Any] = None
        self.YSLOPE_failed_phase1: Optional[Any] = None
        self.BETA_phase1: Optional[Any] = None
        self.CR_phase1: Optional[Any] = None
        self.T1_phase1: Optional[Any] = None
        self.T2_phase1: Optional[Any] = None
        self.PEAKI1_phase2: Optional[Any] = None
        self.FSLOPE_phase2: Optional[Any] = None
        self.STREN_phase2: Optional[Any] = None
        self.YSLOPE_phase2: Optional[Any] = None
        self.PEAKI1_failed_phase2: Optional[Any] = None
        self.FSLOPE_failed_phase2: Optional[Any] = None
        self.STREN_failed_phase2: Optional[Any] = None
        self.YSLOPE_failed_phase2: Optional[Any] = None
        self.BETA_phase2: Optional[Any] = None
        self.CR_phase2: Optional[Any] = None
        self.T1_phase2: Optional[Any] = None
        self.T2_phase2: Optional[Any] = None
        self.filename: Optional[Any] = None
        self.independent_variables: Optional[Any] = None
        self.dependent_variables: Optional[Any] = None
        self.interpolation: Optional[Any] = None
        self.cap_ellipticity_ratio: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'yield_condition',
            'spec_type': 'NO_DATA',
            'attributes': {
                'type': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'gurson rousselier camclay arena arena_mixture tabular tabular_cap von_mises'},
            },
            'children_spec': [
                {'tag': 'M', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'q1', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'q2', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'q3', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'k', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'f_c', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'D', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'sigma_1', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'PEAKI1', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'FSLOPE', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'STREN', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'YSLOPE', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'PEAKI1_failed', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'FSLOPE_failed', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'STREN_failed', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'YSLOPE_failed', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'BETA', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'CR', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'T1', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'T2', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'weibullDist_PEAKI1', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'weibullDist_FSLOPE', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'weibullDist_STREN', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'weibullDist_YSLOPE', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'weibullDist_BETA', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'weibullDist_CR', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'weibullDist_T1', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'weibullDist_T2', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'vol_frac.phase1', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'PEAKI1.phase1', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'FSLOPE.phase1', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'STREN.phase1', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'YSLOPE.phase1', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'PEAKI1_failed.phase1', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'FSLOPE_failed.phase1', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'STREN_failed.phase1', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'YSLOPE_failed.phase1', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'BETA.phase1', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'CR.phase1', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'T1.phase1', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'T2.phase1', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'PEAKI1.phase2', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'FSLOPE.phase2', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'STREN.phase2', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'YSLOPE.phase2', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'PEAKI1_failed.phase2', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'FSLOPE_failed.phase2', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'STREN_failed.phase2', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'YSLOPE_failed.phase2', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'BETA.phase2', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'CR.phase2', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'T1.phase2', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'T2.phase2', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'filename', 'spec': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'independent_variables', 'spec': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'dependent_variables', 'spec': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'interpolation', 'spec': {'need': 'REQUIRED', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'cap_ellipticity_ratio', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
            ]
        }

class Yield_condition_Interpolation(UpsElement):
    tag_name = 'interpolation'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.type: Optional[str] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'interpolation',
            'spec_type': 'NO_DATA',
            'attributes': {
                'type': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'linear, cubic'},
            },
            'children_spec': [
            ]
        }

class Internal_variable_model(UpsElement):
    tag_name = 'internal_variable_model'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.type: Optional[str] = None
        # Children
        self.p0: Optional[Any] = None
        self.p1: Optional[Any] = None
        self.p2: Optional[Any] = None
        self.p3: Optional[Any] = None
        self.use_disaggregation_algorithm: Optional[Any] = None
        self.pc0: Optional[Any] = None
        self.lambdatilde: Optional[Any] = None
        self.vol_frac_nucleation: Optional[Any] = None
        self.mean_strain_nucleation: Optional[Any] = None
        self.stddev_strain_nucleation: Optional[Any] = None
        self.soil_model_brannon_fSlope: Optional[Any] = None
        self.soil_model_brannon_peakI1: Optional[Any] = None
        self.soil_model_brannon_Cr: Optional[Any] = None
        self.soil_model_brannon_B0: Optional[Any] = None
        self.soil_model_brannon_p0: Optional[Any] = None
        self.soil_model_brannon_p1: Optional[Any] = None
        self.soil_model_brannon_p3: Optional[Any] = None
        self.soil_model_brannon_p4: Optional[Any] = None
        self.filename: Optional[Any] = None
        self.independent_variables: Optional[Any] = None
        self.dependent_variables: Optional[Any] = None
        self.interpolation: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'internal_variable_model',
            'spec_type': 'NO_DATA',
            'attributes': {
                'type': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'arena borja_consolidation_pressure metal_internal_var soil_model_brannon_kappa tabular_cap'},
            },
            'children_spec': [
                {'tag': 'p0', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'p1', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'p2', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'p3', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'use_disaggregation_algorithm', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'pc0', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'negative'}},
                {'tag': 'lambdatilde', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'vol_frac_nucleation', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'mean_strain_nucleation', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'stddev_strain_nucleation', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'soil_model_brannon_fSlope', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'soil_model_brannon_peakI1', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'soil_model_brannon_Cr', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'soil_model_brannon_B0', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'soil_model_brannon_p0', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'soil_model_brannon_p1', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'soil_model_brannon_p3', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'soil_model_brannon_p4', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'filename', 'spec': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'independent_variables', 'spec': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'dependent_variables', 'spec': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'interpolation', 'spec': {'need': 'REQUIRED', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class Internal_variable_model_Interpolation(UpsElement):
    tag_name = 'interpolation'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.type: Optional[str] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'interpolation',
            'spec_type': 'NO_DATA',
            'attributes': {
                'type': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'linear, cubic'},
            },
            'children_spec': [
            ]
        }

class Kinematic_hardening_model(UpsElement):
    tag_name = 'kinematic_hardening_model'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.type: Optional[str] = None
        # Children
        self.fluid_pressure_initial: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'kinematic_hardening_model',
            'spec_type': 'NO_DATA',
            'attributes': {
                'type': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'none, prager, armstrong_frederick, arena'},
            },
            'children_spec': [
                {'tag': 'fluid_pressure_initial', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
            ]
        }

class Constitutive_model_Interpolation(UpsElement):
    tag_name = 'interpolation'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.type: Optional[str] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'interpolation',
            'spec_type': 'NO_DATA',
            'attributes': {
                'type': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'linear, cubic'},
            },
            'children_spec': [
            ]
        }

class Fracture(UpsElement):
    tag_name = 'fracture'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.type: Optional[str] = None
        # Children
        self.constraint: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'fracture',
            'spec_type': 'NO_DATA',
            'attributes': {
                'type': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'normal'},
            },
            'children_spec': [
                {'tag': 'constraint', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
            ]
        }

class Crack(UpsElement):
    tag_name = 'crack'
    
    def __init__(self):
        super().__init__()
        # Children
        self.type: Optional[Any] = None
        self.mu: Optional[Any] = None
        self.crack_segments: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'crack',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'type', 'spec': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'friction'}},
                {'tag': 'mu', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'crack_segments', 'spec': {'need': 'REQUIRED', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class Crack_segments(UpsElement):
    tag_name = 'crack_segments'
    
    def __init__(self):
        super().__init__()
        # Children
        self.quad: Optional[Any] = None
        self.curved_quad: Optional[Any] = None
        self.partial_ellipse: Optional[Any] = None
        self.ellipse: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'crack_segments',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'quad', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'curved_quad', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'partial_ellipse', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'ellipse', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class Quad(UpsElement):
    tag_name = 'quad'
    
    def __init__(self):
        super().__init__()
        # Children
        self.p1: Optional[Any] = None
        self.p2: Optional[Any] = None
        self.p3: Optional[Any] = None
        self.p4: Optional[Any] = None
        self.resolution_p1_p2: Optional[Any] = None
        self.resolution_p2_p3: Optional[Any] = None
        self.crack_front_sides: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'quad',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'p1', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'p2', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'p3', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'p4', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'resolution_p1_p2', 'spec': {'need': 'REQUIRED', 'type': 'INTEGER', 'valid_values': None}},
                {'tag': 'resolution_p2_p3', 'spec': {'need': 'REQUIRED', 'type': 'INTEGER', 'valid_values': None}},
                {'tag': 'crack_front_sides', 'spec': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'NYNN'}},
            ]
        }

class Curved_quad(UpsElement):
    tag_name = 'curved_quad'
    
    def __init__(self):
        super().__init__()
        # Children
        self.p1: Optional[Any] = None
        self.p2: Optional[Any] = None
        self.p3: Optional[Any] = None
        self.p4: Optional[Any] = None
        self.resolution_straight_sides: Optional[Any] = None
        self.points_curved_side2: Optional[Any] = None
        self.points_curved_side4: Optional[Any] = None
        self.crack_front_sides: Optional[Any] = None
        self.repetition: Optional[Any] = None
        self.offset: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'curved_quad',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'p1', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'p2', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'p3', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'p4', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'resolution_straight_sides', 'spec': {'need': 'REQUIRED', 'type': 'INTEGER', 'valid_values': None}},
                {'tag': 'points_curved_side2', 'spec': {'need': 'REQUIRED', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'points_curved_side4', 'spec': {'need': 'REQUIRED', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'crack_front_sides', 'spec': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'repetition', 'spec': {'need': 'REQUIRED', 'type': 'INTEGER', 'valid_values': None}},
                {'tag': 'offset', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
            ]
        }

class Points_curved_side2(UpsElement):
    tag_name = 'points_curved_side2'
    
    def __init__(self):
        super().__init__()
        # Children
        self.point: Optional[Any] = None
        self.point: Optional[Any] = None
        self.point: Optional[Any] = None
        self.point: Optional[Any] = None
        self.point: Optional[Any] = None
        self.point: Optional[Any] = None
        self.point: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'points_curved_side2',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'point', 'spec': {'need': 'REQUIRED', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'point', 'spec': {'need': 'REQUIRED', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'point', 'spec': {'need': 'REQUIRED', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'point', 'spec': {'need': 'REQUIRED', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'point', 'spec': {'need': 'REQUIRED', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'point', 'spec': {'need': 'REQUIRED', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'point', 'spec': {'need': 'REQUIRED', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class Points_curved_side2_Point(UpsElement):
    tag_name = 'point'
    
    def __init__(self):
        super().__init__()
        # Children
        self.val: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'point',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'val', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
            ]
        }

class Points_curved_side2_Point_2(UpsElement):
    tag_name = 'point'
    
    def __init__(self):
        super().__init__()
        # Children
        self.val: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'point',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'val', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
            ]
        }

class Points_curved_side2_Point_3(UpsElement):
    tag_name = 'point'
    
    def __init__(self):
        super().__init__()
        # Children
        self.val: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'point',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'val', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
            ]
        }

class Points_curved_side2_Point_4(UpsElement):
    tag_name = 'point'
    
    def __init__(self):
        super().__init__()
        # Children
        self.val: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'point',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'val', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
            ]
        }

class Points_curved_side2_Point_5(UpsElement):
    tag_name = 'point'
    
    def __init__(self):
        super().__init__()
        # Children
        self.val: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'point',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'val', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
            ]
        }

class Points_curved_side2_Point_6(UpsElement):
    tag_name = 'point'
    
    def __init__(self):
        super().__init__()
        # Children
        self.val: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'point',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'val', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
            ]
        }

class Points_curved_side2_Point_7(UpsElement):
    tag_name = 'point'
    
    def __init__(self):
        super().__init__()
        # Children
        self.val: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'point',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'val', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
            ]
        }

class Points_curved_side4(UpsElement):
    tag_name = 'points_curved_side4'
    
    def __init__(self):
        super().__init__()
        # Children
        self.point: Optional[Any] = None
        self.point: Optional[Any] = None
        self.point: Optional[Any] = None
        self.point: Optional[Any] = None
        self.point: Optional[Any] = None
        self.point: Optional[Any] = None
        self.point: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'points_curved_side4',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'point', 'spec': {'need': 'REQUIRED', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'point', 'spec': {'need': 'REQUIRED', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'point', 'spec': {'need': 'REQUIRED', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'point', 'spec': {'need': 'REQUIRED', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'point', 'spec': {'need': 'REQUIRED', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'point', 'spec': {'need': 'REQUIRED', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'point', 'spec': {'need': 'REQUIRED', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class Points_curved_side4_Point(UpsElement):
    tag_name = 'point'
    
    def __init__(self):
        super().__init__()
        # Children
        self.val: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'point',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'val', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
            ]
        }

class Points_curved_side4_Point_2(UpsElement):
    tag_name = 'point'
    
    def __init__(self):
        super().__init__()
        # Children
        self.val: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'point',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'val', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
            ]
        }

class Points_curved_side4_Point_3(UpsElement):
    tag_name = 'point'
    
    def __init__(self):
        super().__init__()
        # Children
        self.val: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'point',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'val', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
            ]
        }

class Points_curved_side4_Point_4(UpsElement):
    tag_name = 'point'
    
    def __init__(self):
        super().__init__()
        # Children
        self.val: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'point',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'val', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
            ]
        }

class Points_curved_side4_Point_5(UpsElement):
    tag_name = 'point'
    
    def __init__(self):
        super().__init__()
        # Children
        self.val: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'point',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'val', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
            ]
        }

class Points_curved_side4_Point_6(UpsElement):
    tag_name = 'point'
    
    def __init__(self):
        super().__init__()
        # Children
        self.val: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'point',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'val', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
            ]
        }

class Points_curved_side4_Point_7(UpsElement):
    tag_name = 'point'
    
    def __init__(self):
        super().__init__()
        # Children
        self.val: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'point',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'val', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
            ]
        }

class Partial_ellipse(UpsElement):
    tag_name = 'partial_ellipse'
    
    def __init__(self):
        super().__init__()
        # Children
        self.center: Optional[Any] = None
        self.point_axis1: Optional[Any] = None
        self.point_axis2: Optional[Any] = None
        self.extent: Optional[Any] = None
        self.resolution_circumference: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'partial_ellipse',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'center', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'point_axis1', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'point_axis2', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'extent', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'resolution_circumference', 'spec': {'need': 'REQUIRED', 'type': 'INTEGER', 'valid_values': None}},
            ]
        }

class Ellipse(UpsElement):
    tag_name = 'ellipse'
    
    def __init__(self):
        super().__init__()
        # Children
        self.point1_axis1: Optional[Any] = None
        self.point_axis2: Optional[Any] = None
        self.point2_axis1: Optional[Any] = None
        self.resolution_circumference: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'ellipse',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'point1_axis1', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'point_axis2', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'point2_axis1', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'resolution_circumference', 'spec': {'need': 'REQUIRED', 'type': 'INTEGER', 'valid_values': None}},
            ]
        }

class Cohesive_zone(UpsElement):
    tag_name = 'cohesive_zone'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.name: Optional[str] = None
        # Children
        self.delta_n: Optional[Any] = None
        self.delta_t: Optional[Any] = None
        self.sig_max: Optional[Any] = None
        self.tau_max: Optional[Any] = None
        self.cz_filename: Optional[Any] = None
        self.do_rotation: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'cohesive_zone',
            'spec_type': 'NO_DATA',
            'attributes': {
                'name': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None},
            },
            'children_spec': [
                {'tag': 'delta_n', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'delta_t', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'sig_max', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'tau_max', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'cz_filename', 'spec': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'do_rotation', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
            ]
        }

class Thermal_contact(UpsElement):
    tag_name = 'thermal_contact'
    
    def __init__(self):
        super().__init__()

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'thermal_contact',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
            ]
        }

class MaterialProperties_ICE(UpsElement):
    tag_name = 'ICE'
    
    def __init__(self):
        super().__init__()
        # Children
        self.material: List[Any] = []

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'ICE',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'material', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class ICE_Material(UpsElement):
    tag_name = 'material'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.name: Optional[str] = None
        # Children
        self.dynamic_viscosity: Optional[Any] = None
        self.EOS: Optional[Any] = None
        self.SpecificHeatModel: Optional[Any] = None
        self.gamma: Optional[Any] = None
        self.tiny_rho: Optional[Any] = None
        self.geom_object: List[Any] = []
        self.includeFlowWork: Optional[Any] = None
        self.isSurroundingMatl: Optional[Any] = None
        self.specific_heat: Optional[Any] = None
        self.thermal_conductivity: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'material',
            'spec_type': 'NO_DATA',
            'attributes': {
                'name': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None},
            },
            'children_spec': [
                {'tag': 'dynamic_viscosity', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'EOS', 'spec': {'need': 'REQUIRED', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'SpecificHeatModel', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'gamma', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'tiny_rho', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'geom_object', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'includeFlowWork', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'isSurroundingMatl', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'specific_heat', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'thermal_conductivity', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
            ]
        }

class EOS(UpsElement):
    tag_name = 'EOS'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.type: Optional[str] = None
        # Children
        self.a: Optional[Any] = None
        self.a: Optional[Any] = None
        self.b: Optional[Any] = None
        self.b: Optional[Any] = None
        self.Gamma: Optional[Any] = None
        self.u: Optional[Any] = None
        self.w: Optional[Any] = None
        self.gas_constant: Optional[Any] = None
        self.A: Optional[Any] = None
        self.B: Optional[Any] = None
        self.C: Optional[Any] = None
        self.R1: Optional[Any] = None
        self.R2: Optional[Any] = None
        self.om: Optional[Any] = None
        self.rho0: Optional[Any] = None
        self.rho0: Optional[Any] = None
        self.n: Optional[Any] = None
        self.K: Optional[Any] = None
        self.rho0: Optional[Any] = None
        self.B0: Optional[Any] = None
        self.B0prime: Optional[Any] = None
        self.lambda_: Optional[Any] = None
        self.useSpecificHeatModel: Optional[Any] = None
        self.c0: Optional[Any] = None
        self.c1: Optional[Any] = None
        self.c2: Optional[Any] = None
        self.c3: Optional[Any] = None
        self.K: Optional[Any] = None
        self.P0: Optional[Any] = None
        self.T0: Optional[Any] = None
        self.T0: Optional[Any] = None
        self.S0: Optional[Any] = None
        self.S: Optional[Any] = None
        self.co: Optional[Any] = None
        self.ko: Optional[Any] = None
        self.To: Optional[Any] = None
        self.L: Optional[Any] = None
        self.vo: Optional[Any] = None
        self.E0: Optional[Any] = None
        self.Es: Optional[Any] = None
        self.Esp: Optional[Any] = None
        self.alpha: Optional[Any] = None
        self.beta: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'EOS',
            'spec_type': 'NO_DATA',
            'attributes': {
                'type': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'ideal_gas, hard_sphere_gas, TST, Thomsen_Hartka_water, JWL, JWLC, Murnaghan, BirchMurnaghan, Gruneisen, Tillotson, KnaussSeaWater, KumariDass'},
            },
            'children_spec': [
                {'tag': 'a', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'a', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'b', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'b', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'Gamma', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'u', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'w', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'gas_constant', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'A', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'B', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'C', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'R1', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'R2', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'om', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'rho0', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'rho0', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'n', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'K', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'rho0', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'B0', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'B0prime', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'lambda', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'useSpecificHeatModel', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'c0', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'c1', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'c2', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'c3', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'K', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'P0', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'T0', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'T0', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'S0', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'S', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'co', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'ko', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'To', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'L', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'vo', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'E0', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'Es', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'Esp', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'alpha', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'beta', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
            ]
        }

class SpecificHeatModel(UpsElement):
    tag_name = 'SpecificHeatModel'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.type: Optional[str] = None
        # Children
        self.Atoms: Optional[Any] = None
        self.DebyeTemperature: Optional[Any] = None
        self.XCO2: Optional[Any] = None
        self.XCO: Optional[Any] = None
        self.XH2O: Optional[Any] = None
        self.XO2: Optional[Any] = None
        self.XN2: Optional[Any] = None
        self.XOH: Optional[Any] = None
        self.XNO: Optional[Any] = None
        self.XO: Optional[Any] = None
        self.XH: Optional[Any] = None
        self.XH2: Optional[Any] = None
        self.MaxOrder: Optional[Any] = None
        self.Tmin: Optional[Any] = None
        self.Tmax: Optional[Any] = None
        self.coefficient: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'SpecificHeatModel',
            'spec_type': 'NO_DATA',
            'attributes': {
                'type': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'Debye Component Polynomial'},
            },
            'children_spec': [
                {'tag': 'Atoms', 'spec': {'need': 'REQUIRED', 'type': 'INTEGER', 'valid_values': 'positive'}},
                {'tag': 'DebyeTemperature', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'XCO2', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'XCO', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'XH2O', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'XO2', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'XN2', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'XOH', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'XNO', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'XO', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'XH', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'XH2', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'MaxOrder', 'spec': {'need': 'REQUIRED', 'type': 'INTEGER', 'valid_values': 'positive'}},
                {'tag': 'Tmin', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'Tmax', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'coefficient', 'spec': {'need': 'OPTIONAL', 'type': 'MULTIPLE_DOUBLES', 'valid_values': None}},
            ]
        }

class MaterialProperties_Peridynamics(UpsElement):
    tag_name = 'Peridynamics'
    
    def __init__(self):
        super().__init__()
        # Children
        self.material: List[Any] = []
        self.ContactModel: List[Any] = []

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'Peridynamics',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'material', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'ContactModel', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class Peridynamics_Material(UpsElement):
    tag_name = 'material'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.name: Optional[str] = None
        # Children
        self.density: Optional[Any] = None
        self.material_model: Optional[Any] = None
        self.damage_model: Optional[Any] = None
        self.geom_object: List[Any] = []

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'material',
            'spec_type': 'NO_DATA',
            'attributes': {
                'name': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None},
            },
            'children_spec': [
                {'tag': 'density', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'material_model', 'spec': {'need': 'REQUIRED', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'damage_model', 'spec': {'need': 'REQUIRED', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'geom_object', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class Material_model(UpsElement):
    tag_name = 'material_model'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.type: Optional[str] = None
        # Children
        self.young_modulus: Optional[Any] = None
        self.poisson_ratio: Optional[Any] = None
        self.shear_modulus: Optional[Any] = None
        self.bulk_modulus: Optional[Any] = None
        self.symm_axis_top: Optional[Any] = None
        self.symm_axis_bottom: Optional[Any] = None
        self.E_r: Optional[Any] = None
        self.E_theta: Optional[Any] = None
        self.E_z: Optional[Any] = None
        self.nu_theta_r: Optional[Any] = None
        self.nu_z_r: Optional[Any] = None
        self.nu_z_theta: Optional[Any] = None
        self.G_theta_z: Optional[Any] = None
        self.G_z_r: Optional[Any] = None
        self.G_r_theta: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'material_model',
            'spec_type': 'NO_DATA',
            'attributes': {
                'type': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'linear_elastic_bond, elastic_neo_hookean_state, polar_orthotropic_linear_elastic_state'},
            },
            'children_spec': [
                {'tag': 'young_modulus', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'poisson_ratio', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'shear_modulus', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'bulk_modulus', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'symm_axis_top', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'symm_axis_bottom', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'E_r', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'E_theta', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'E_z', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'nu_theta_r', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'nu_z_r', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'nu_z_theta', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'G_theta_z', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'G_z_r', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'G_r_theta', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
            ]
        }

class Material_Damage_model(UpsElement):
    tag_name = 'damage_model'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.type: Optional[str] = None
        # Children
        self.G_Ic: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'damage_model',
            'spec_type': 'NO_DATA',
            'attributes': {
                'type': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'spherical_strain_energy'},
            },
            'children_spec': [
                {'tag': 'G_Ic', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
            ]
        }

class ContactModel(UpsElement):
    tag_name = 'ContactModel'
    
    def __init__(self):
        super().__init__()
        # Children
        self.type: Optional[Any] = None
        self.materials: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'ContactModel',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'type', 'spec': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'null, single_velocity'}},
                {'tag': 'materials', 'spec': {'need': 'OPTIONAL', 'type': 'MULTIPLE_INTEGERS', 'valid_values': None}},
            ]
        }

class Models(UpsElement):
    tag_name = 'Models'
    
    def __init__(self):
        super().__init__()
        # Children
        self.Model: List[Any] = []

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'Models',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'Model', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class Model(UpsElement):
    tag_name = 'Model'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.type: Optional[str] = None
        # Children
        self.Active: Optional[Any] = None
        self.b: Optional[Any] = None
        self.E0: Optional[Any] = None
        self.energy_src: Optional[Any] = None
        self.G: Optional[Any] = None
        self.mass_src: Optional[Any] = None
        self.momentum_src: Optional[Any] = None
        self.mme_src_t_start: Optional[Any] = None
        self.mme_src_t_final: Optional[Any] = None
        self.rate: Optional[Any] = None
        self.Test: Optional[Any] = None
        self.LightTime: Optional[Any] = None
        self.SimpleRxn: Optional[Any] = None
        self.AfterMelting: Optional[Any] = None
        self.ActEnergyCondPh: Optional[Any] = None
        self.BoundaryParticles: Optional[Any] = None
        self.BurnCoeff: Optional[Any] = None
        self.burnMaterial: Optional[Any] = None
        self.BurnrateModCoef: Optional[Any] = None
        self.CondPhaseHeat: Optional[Any] = None
        self.CondUnsteadyCoef: Optional[Any] = None
        self.CrackVolThreshold: Optional[Any] = None
        self.Cv: Optional[Any] = None
        self.Enthalpy: Optional[Any] = None
        self.fromMaterial: Optional[Any] = None
        self.GasPhaseHeat: Optional[Any] = None
        self.GasUnsteadyCoef: Optional[Any] = None
        self.Gcrack: Optional[Any] = None
        self.HeatConductGasPh: Optional[Any] = None
        self.HeatConductCondPh: Optional[Any] = None
        self.IdealGasConst: Optional[Any] = None
        self.IgnitionTemp: Optional[Any] = None
        self.k: Optional[Any] = None
        self.material: Optional[Any] = None
        self.MoleWeightGasPh: Optional[Any] = None
        self.nCrack: Optional[Any] = None
        self.PreExpCondPh: Optional[Any] = None
        self.PreExpGasPh: Optional[Any] = None
        self.RadiationModel: Optional[Any] = None
        self.SolidReactionModel: Optional[Any] = None
        self.refPressure: Optional[Any] = None
        self.rho0: Optional[Any] = None
        self.scalar: Optional[Any] = None
        self.SpecificHeatBoth: Optional[Any] = None
        self.Ta: Optional[Any] = None
        self.table: Optional[Any] = None
        self.tableValue: List[Any] = []
        self.toMaterial: Optional[Any] = None
        self.ThresholdPressure: Optional[Any] = None
        self.ThresholdvolFrac: Optional[Any] = None
        self.ThresholdPressureJWL: Optional[Any] = None
        self.ThresholdPressureSB: Optional[Any] = None
        self.ThresholdTemp: Optional[Any] = None
        self.ThresholdVolFrac: Optional[Any] = None
        self.varianceMax: Optional[Any] = None
        self.varianceScale: Optional[Any] = None
        self.useCrackModel: Optional[Any] = None
        self.useInductionTime: Optional[Any] = None
        self.IgnitionConst: Optional[Any] = None
        self.PressureShift: Optional[Any] = None
        self.ExponentialConst: Optional[Any] = None
        self.PreexpoConst: Optional[Any] = None
        self.IandG: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'Model',
            'spec_type': 'NO_DATA',
            'attributes': {
                'type': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'SimpleRxn, AdiabaticTable, Gruneisen, hard_sphere_gas, IandG, JWL, JWLC, JWLpp, ZeroOrder, LightTime, Radiation, Simple_Burn, Steady_Burn, Test, Unsteady_Burn, mass_momentum_energy_src, Murnaghan PassiveScalar Thomsen_Hartka_water Tillotson, flameSheet_rxn, DDT0, DDT1, SolidReactionModel, MesoBurn'},
            },
            'children_spec': [
                {'tag': 'Active', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'b', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'E0', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'energy_src', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'G', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'mass_src', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'momentum_src', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'mme_src_t_start', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'mme_src_t_final', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'rate', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'Test', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'LightTime', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'SimpleRxn', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'AfterMelting', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'ActEnergyCondPh', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'BoundaryParticles', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': None}},
                {'tag': 'BurnCoeff', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'burnMaterial', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'BurnrateModCoef', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'CondPhaseHeat', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'CondUnsteadyCoef', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'CrackVolThreshold', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'Cv', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'Enthalpy', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'fromMaterial', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'GasPhaseHeat', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'GasUnsteadyCoef', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'Gcrack', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'HeatConductGasPh', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'HeatConductCondPh', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'IdealGasConst', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'IgnitionTemp', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'k', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'material', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'MoleWeightGasPh', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'nCrack', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'PreExpCondPh', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'PreExpGasPh', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'RadiationModel', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'SolidReactionModel', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'refPressure', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'rho0', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'scalar', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'SpecificHeatBoth', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'Ta', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'table', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'tableValue', 'spec': {'need': 'MULTIPLE', 'type': 'STRING', 'valid_values': 'CO2, H2O, Temp, density'}},
                {'tag': 'toMaterial', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'ThresholdPressure', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'ThresholdvolFrac', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'ThresholdPressureJWL', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'ThresholdPressureSB', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'ThresholdTemp', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'ThresholdVolFrac', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'varianceMax', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'varianceScale', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'useCrackModel', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'useInductionTime', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'IgnitionConst', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'PressureShift', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'ExponentialConst', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'PreexpoConst', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'IandG', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class Test(UpsElement):
    tag_name = 'Test'
    
    def __init__(self):
        super().__init__()
        # Children
        self.fromMaterial: Optional[Any] = None
        self.toMaterial: Optional[Any] = None
        self.rate: Optional[Any] = None
        self.startTime: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'Test',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'fromMaterial', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'toMaterial', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'rate', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'startTime', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
            ]
        }

class LightTime(UpsElement):
    tag_name = 'LightTime'
    
    def __init__(self):
        super().__init__()
        # Children
        self.fromMaterial: Optional[Any] = None
        self.toMaterial: Optional[Any] = None
        self.D: Optional[Any] = None
        self.E0: Optional[Any] = None
        self.starting_location: Optional[Any] = None
        self.react_mixed_cells: Optional[Any] = None
        self.direction_if_plane: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'LightTime',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'fromMaterial', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'toMaterial', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'D', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'E0', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'starting_location', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'react_mixed_cells', 'spec': {'need': 'REQUIRED', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'direction_if_plane', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
            ]
        }

class SimpleRxn(UpsElement):
    tag_name = 'SimpleRxn'
    
    def __init__(self):
        super().__init__()
        # Children
        self.material: Optional[Any] = None
        self.scalar: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'SimpleRxn',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'material', 'spec': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'scalar', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class Scalar(UpsElement):
    tag_name = 'scalar'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.name: Optional[str] = None
        # Children
        self.constants: Optional[Any] = None
        self.geom_object: List[Any] = []
        self.test_conservation: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'scalar',
            'spec_type': 'NO_DATA',
            'attributes': {
                'name': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': None},
            },
            'children_spec': [
                {'tag': 'constants', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'geom_object', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'test_conservation', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
            ]
        }

class Constants(UpsElement):
    tag_name = 'constants'
    
    def __init__(self):
        super().__init__()
        # Children
        self.f_stoichometric: Optional[Any] = None
        self.diffusivity: Optional[Any] = None
        self.rho_air: Optional[Any] = None
        self.rho_fuel: Optional[Any] = None
        self.cv_air: Optional[Any] = None
        self.cv_fuel: Optional[Any] = None
        self.R_air: Optional[Any] = None
        self.R_fuel: Optional[Any] = None
        self.thermalCond_air: Optional[Any] = None
        self.thermalCond_fuel: Optional[Any] = None
        self.viscosity_air: Optional[Any] = None
        self.viscosity_fuel: Optional[Any] = None
        self.initialize_diffusion_knob: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'constants',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'f_stoichometric', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': '0,1'}},
                {'tag': 'diffusivity', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'rho_air', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'rho_fuel', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'cv_air', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'cv_fuel', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'R_air', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'R_fuel', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'thermalCond_air', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'thermalCond_fuel', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'viscosity_air', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'viscosity_fuel', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'initialize_diffusion_knob', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
            ]
        }

class RadiationModel(UpsElement):
    tag_name = 'RadiationModel'
    
    def __init__(self):
        super().__init__()
        # Children
        self.radiatingGas: Optional[Any] = None
        self.absorbingSolid: Optional[Any] = None
        self.calcFreq: Optional[Any] = None
        self.calcInterval: Optional[Any] = None
        self.table_or_ice_temp_density: Optional[Any] = None
        self.useTableValues: Optional[Any] = None
        self.DORadiationModel: Optional[Any] = None
        self.geom_object: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'RadiationModel',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'radiatingGas', 'spec': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'absorbingSolid', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'calcFreq', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': None}},
                {'tag': 'calcInterval', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'table_or_ice_temp_density', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': 'ice table'}},
                {'tag': 'useTableValues', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'DORadiationModel', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'geom_object', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class DORadiationModel(UpsElement):
    tag_name = 'DORadiationModel'
    
    def __init__(self):
        super().__init__()
        # Children
        self.ordinates: Optional[Any] = None
        self.opl: Optional[Any] = None
        self.property_model: Optional[Any] = None
        self.spherical_harmonics: Optional[Any] = None
        self.test_problem: Optional[Any] = None
        self.test_problem_number: Optional[Any] = None
        self.linear_solver: Optional[Any] = None
        self.LinearSolver: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'DORadiationModel',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'ordinates', 'spec': {'need': 'REQUIRED', 'type': 'INTEGER', 'valid_values': '2,8'}},
                {'tag': 'opl', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': '0,1'}},
                {'tag': 'property_model', 'spec': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'radcoef patchmean wsggm'}},
                {'tag': 'spherical_harmonics', 'spec': {'need': 'REQUIRED', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'test_problem', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'test_problem_number', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': None}},
                {'tag': 'linear_solver', 'spec': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'hypre petsc'}},
                {'tag': 'LinearSolver', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class LinearSolver(UpsElement):
    tag_name = 'LinearSolver'
    
    def __init__(self):
        super().__init__()
        # Children
        self.solver: Optional[Any] = None
        self.preconditioner: Optional[Any] = None
        self.max_iter: Optional[Any] = None
        self.tolerance: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'LinearSolver',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'solver', 'spec': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'gmres'}},
                {'tag': 'preconditioner', 'spec': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'jacobi'}},
                {'tag': 'max_iter', 'spec': {'need': 'REQUIRED', 'type': 'INTEGER', 'valid_values': 'positive'}},
                {'tag': 'tolerance', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
            ]
        }

class SolidReactionModel(UpsElement):
    tag_name = 'SolidReactionModel'
    
    def __init__(self):
        super().__init__()
        # Children
        self.RateConstantModel: Optional[Any] = None
        self.RateModel: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'SolidReactionModel',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'RateConstantModel', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'RateModel', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class RateConstantModel(UpsElement):
    tag_name = 'RateConstantModel'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.type: Optional[str] = None
        # Children
        self.A: Optional[Any] = None
        self.Ea: Optional[Any] = None
        self.b: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'RateConstantModel',
            'spec_type': 'NO_DATA',
            'attributes': {
                'type': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'Arrhenius, ModifiedArrhenius'},
            },
            'children_spec': [
                {'tag': 'A', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'Ea', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'b', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
            ]
        }

class RateModel(UpsElement):
    tag_name = 'RateModel'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.type: Optional[str] = None
        # Children
        self.a: Optional[Any] = None
        self.b: Optional[Any] = None
        self.dimension: Optional[Any] = None
        self.n: Optional[Any] = None
        self.q: Optional[Any] = None
        self.p: Optional[Any] = None
        self.m: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'RateModel',
            'spec_type': 'NO_DATA',
            'attributes': {
                'type': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'AvaramiErofeev, ContractingCylinder, ContractingSphere, Diffusion,                                                                        NthOrder, Power, ProutTompkins'},
            },
            'children_spec': [
                {'tag': 'a', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'b', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'dimension', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'n', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'q', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'p', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'm', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
            ]
        }

class Model_Scalar(UpsElement):
    tag_name = 'scalar'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.name: Optional[str] = None
        # Children
        self.material: Optional[Any] = None
        self.test_conservation: Optional[Any] = None
        self.doTableTest: Optional[Any] = None
        self.constants: Optional[Any] = None
        self.reaction_constants: Optional[Any] = None
        self.geom_object: List[Any] = []

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'scalar',
            'spec_type': 'NO_DATA',
            'attributes': {
                'name': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': None},
            },
            'children_spec': [
                {'tag': 'material', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'test_conservation', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'doTableTest', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'constants', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'reaction_constants', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'geom_object', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class Scalar_Constants(UpsElement):
    tag_name = 'constants'
    
    def __init__(self):
        super().__init__()
        # Children
        self.AMR_Refinement_Criteria: Optional[Any] = None
        self.diffusivity: Optional[Any] = None
        self.initialize_diffusion_knob: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'constants',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'AMR_Refinement_Criteria', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'diffusivity', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'initialize_diffusion_knob', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
            ]
        }

class Reaction_constants(UpsElement):
    tag_name = 'reaction_constants'
    
    def __init__(self):
        super().__init__()
        # Children
        self.f_stoichometric: Optional[Any] = None
        self.delta_H_combustion: Optional[Any] = None
        self.oxidizer_temp_infinity: Optional[Any] = None
        self.initial_fuel_temp: Optional[Any] = None
        self.diffusivity: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'reaction_constants',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'f_stoichometric', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'delta_H_combustion', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'oxidizer_temp_infinity', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'initial_fuel_temp', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'diffusivity', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
            ]
        }

class Table(UpsElement):
    tag_name = 'table'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.name: Optional[str] = None
        self.type: Optional[str] = None
        # Children
        self.defaultValue: List[Any] = []
        self.derivedValue: List[Any] = []
        self.constantValue: List[Any] = []
        self.filename: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'table',
            'spec_type': 'NO_DATA',
            'attributes': {
                'name': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'adiabatic'},
                'type': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'Arches'},
            },
            'children_spec': [
                {'tag': 'defaultValue', 'spec': {'need': 'MULTIPLE', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'derivedValue', 'spec': {'need': 'MULTIPLE', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'constantValue', 'spec': {'need': 'MULTIPLE', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'filename', 'spec': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': None}},
            ]
        }

class DefaultValue(UpsElement):
    tag_name = 'defaultValue'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.name: Optional[str] = None
        self.value: Optional[float] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'defaultValue',
            'spec_type': 'DOUBLE',
            'attributes': {
                'name': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'heat_loss, mixture_fraction_variance'},
            },
            'children_spec': [
            ]
        }

class DerivedValue(UpsElement):
    tag_name = 'derivedValue'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.name: Optional[str] = None
        self.value: Optional[str] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'derivedValue',
            'spec_type': 'STRING',
            'attributes': {
                'name': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'heat_capac_Cv, gamma, reference_heat_capac_Cp,                                                                    reference_mixture_molecular_weight, reference_heat_capac_Cv, reference_gamma'},
            },
            'children_spec': [
            ]
        }

class ConstantValue(UpsElement):
    tag_name = 'constantValue'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.name: Optional[str] = None
        self.value: Optional[float] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'constantValue',
            'spec_type': 'DOUBLE',
            'attributes': {
                'name': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'viscosity, thermal_conductivity, reference_Temp'},
            },
            'children_spec': [
            ]
        }

class IandG(UpsElement):
    tag_name = 'IandG'
    
    def __init__(self):
        super().__init__()
        # Children
        self.fromMaterial: Optional[Any] = None
        self.toMaterial: Optional[Any] = None
        self.I: Optional[Any] = None
        self.G1: Optional[Any] = None
        self.G2: Optional[Any] = None
        self.a: Optional[Any] = None
        self.b: Optional[Any] = None
        self.c: Optional[Any] = None
        self.d: Optional[Any] = None
        self.e: Optional[Any] = None
        self.g: Optional[Any] = None
        self.x: Optional[Any] = None
        self.y: Optional[Any] = None
        self.z: Optional[Any] = None
        self.Figmax: Optional[Any] = None
        self.FG1max: Optional[Any] = None
        self.FG2min: Optional[Any] = None
        self.rho0: Optional[Any] = None
        self.E0: Optional[Any] = None
        self.ThresholdPressure: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'IandG',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'fromMaterial', 'spec': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'toMaterial', 'spec': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'I', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'G1', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'G2', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'a', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'b', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'c', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'd', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'e', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'g', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'x', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'y', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'z', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'Figmax', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'FG1max', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'FG2min', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'rho0', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'E0', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'ThresholdPressure', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
            ]
        }

class PhysicalBC(UpsElement):
    tag_name = 'PhysicalBC'
    
    def __init__(self):
        super().__init__()
        # Children
        self.MPM: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'PhysicalBC',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'MPM', 'spec': {'need': 'REQUIRED', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class PhysicalBC_MPM(UpsElement):
    tag_name = 'MPM'
    
    def __init__(self):
        super().__init__()
        # Children
        self.arches_heat_flux: Optional[Any] = None
        self.force: List[Any] = []
        self.pressure: List[Any] = []
        self.velocity: List[Any] = []
        self.moment: List[Any] = []
        self.heat_flux: List[Any] = []

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'MPM',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'arches_heat_flux', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'force', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'pressure', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'velocity', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'moment', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'heat_flux', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class Arches_heat_flux(UpsElement):
    tag_name = 'arches_heat_flux'
    
    def __init__(self):
        super().__init__()
        # Children
        self.geom_object: Optional[Any] = None
        self.load_curve: Optional[Any] = None
        self.polynomial_data: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'arches_heat_flux',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'geom_object', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA'}},
                {'tag': 'load_curve', 'spec': {'need': 'REQUIRED', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'polynomial_data', 'spec': {'need': 'REQUIRED', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class Load_curve(UpsElement):
    tag_name = 'load_curve'
    
    def __init__(self):
        super().__init__()
        # Children
        self.id: Optional[Any] = None
        self.time_point: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'load_curve',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'id', 'spec': {'need': 'REQUIRED', 'type': 'INTEGER', 'valid_values': None}},
                {'tag': 'time_point', 'spec': {'need': 'REQUIRED', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class Time_point(UpsElement):
    tag_name = 'time_point'
    
    def __init__(self):
        super().__init__()
        # Children
        self.time: Optional[Any] = None
        self.load: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'time_point',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'time', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'load', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
            ]
        }

class Polynomial_data(UpsElement):
    tag_name = 'polynomial_data'
    
    def __init__(self):
        super().__init__()
        # Children
        self.file: List[Any] = []

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'polynomial_data',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'file', 'spec': {'need': 'MULTIPLE', 'type': 'STRING', 'valid_values': None}},
            ]
        }

class Force(UpsElement):
    tag_name = 'force'
    
    def __init__(self):
        super().__init__()
        # Children
        self.lower: Optional[Any] = None
        self.upper: Optional[Any] = None
        self.force_density: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'force',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'lower', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'upper', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'force_density', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
            ]
        }

class Pressure(UpsElement):
    tag_name = 'pressure'
    
    def __init__(self):
        super().__init__()
        # Children
        self.geom_object: Optional[Any] = None
        self.outward_normal: Optional[Any] = None
        self.load_curve: Optional[Any] = None
        self.res: Optional[Any] = None
        self.volume_fraction_inside_domain: Optional[Any] = None
        self.load_curve_scaling_function: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'pressure',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'geom_object', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA'}},
                {'tag': 'outward_normal', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'load_curve', 'spec': {'need': 'REQUIRED', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'res', 'spec': {'need': 'OPTIONAL', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'volume_fraction_inside_domain', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'load_curve_scaling_function', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None}},
            ]
        }

class Pressure_Load_curve(UpsElement):
    tag_name = 'load_curve'
    
    def __init__(self):
        super().__init__()
        # Children
        self.id: Optional[Any] = None
        self.time_point: List[Any] = []

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'load_curve',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'id', 'spec': {'need': 'REQUIRED', 'type': 'INTEGER', 'valid_values': None}},
                {'tag': 'time_point', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class Load_curve_Time_point(UpsElement):
    tag_name = 'time_point'
    
    def __init__(self):
        super().__init__()
        # Children
        self.time: Optional[Any] = None
        self.load: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'time_point',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'time', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'load', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
            ]
        }

class Velocity(UpsElement):
    tag_name = 'velocity'
    
    def __init__(self):
        super().__init__()
        # Children
        self.geom_object: Optional[Any] = None
        self.load_curve: Optional[Any] = None
        self.res: Optional[Any] = None
        self.load_curve_scaling_function: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'velocity',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'geom_object', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA'}},
                {'tag': 'load_curve', 'spec': {'need': 'REQUIRED', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'res', 'spec': {'need': 'OPTIONAL', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'load_curve_scaling_function', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None}},
            ]
        }

class Velocity_Load_curve(UpsElement):
    tag_name = 'load_curve'
    
    def __init__(self):
        super().__init__()
        # Children
        self.id: Optional[Any] = None
        self.time_point: List[Any] = []

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'load_curve',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'id', 'spec': {'need': 'REQUIRED', 'type': 'INTEGER', 'valid_values': None}},
                {'tag': 'time_point', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class Load_curve_Time_point_2(UpsElement):
    tag_name = 'time_point'
    
    def __init__(self):
        super().__init__()
        # Children
        self.time: Optional[Any] = None
        self.load: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'time_point',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'time', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'load', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
            ]
        }

class Moment(UpsElement):
    tag_name = 'moment'
    
    def __init__(self):
        super().__init__()
        # Children
        self.geom_object: Optional[Any] = None
        self.outward_normal: Optional[Any] = None
        self.load_curve: Optional[Any] = None
        self.normal_plane: Optional[Any] = None
        self.res: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'moment',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'geom_object', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA'}},
                {'tag': 'outward_normal', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'load_curve', 'spec': {'need': 'REQUIRED', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'normal_plane', 'spec': {'need': 'REQUIRED', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'res', 'spec': {'need': 'OPTIONAL', 'type': 'VECTOR', 'valid_values': None}},
            ]
        }

class Moment_Load_curve(UpsElement):
    tag_name = 'load_curve'
    
    def __init__(self):
        super().__init__()
        # Children
        self.id: Optional[Any] = None
        self.time_point: List[Any] = []

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'load_curve',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'id', 'spec': {'need': 'REQUIRED', 'type': 'INTEGER', 'valid_values': None}},
                {'tag': 'time_point', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class Load_curve_Time_point_3(UpsElement):
    tag_name = 'time_point'
    
    def __init__(self):
        super().__init__()
        # Children
        self.time: Optional[Any] = None
        self.load: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'time_point',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'time', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'load', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
            ]
        }

class Normal_plane(UpsElement):
    tag_name = 'normal_plane'
    
    def __init__(self):
        super().__init__()
        # Children
        self.normal: Optional[Any] = None
        self.point: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'normal_plane',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'normal', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
                {'tag': 'point', 'spec': {'need': 'REQUIRED', 'type': 'VECTOR', 'valid_values': None}},
            ]
        }

class Heat_flux(UpsElement):
    tag_name = 'heat_flux'
    
    def __init__(self):
        super().__init__()
        # Children
        self.geom_object: Optional[Any] = None
        self.load_curve: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'heat_flux',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'geom_object', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA'}},
                {'tag': 'load_curve', 'spec': {'need': 'REQUIRED', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class Heat_flux_Load_curve(UpsElement):
    tag_name = 'load_curve'
    
    def __init__(self):
        super().__init__()
        # Children
        self.id: Optional[Any] = None
        self.time_point: List[Any] = []

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'load_curve',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'id', 'spec': {'need': 'REQUIRED', 'type': 'INTEGER', 'valid_values': None}},
                {'tag': 'time_point', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class Load_curve_Time_point_4(UpsElement):
    tag_name = 'time_point'
    
    def __init__(self):
        super().__init__()
        # Children
        self.time: Optional[Any] = None
        self.load: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'time_point',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'time', 'spec': {'need': 'REQUIRED', 'type': 'INTEGER', 'valid_values': None}},
                {'tag': 'load', 'spec': {'need': 'REQUIRED', 'type': 'INTEGER', 'valid_values': None}},
            ]
        }

class ParticleBC(UpsElement):
    tag_name = 'ParticleBC'
    
    def __init__(self):
        super().__init__()
        # Children
        self.Load: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'ParticleBC',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'Load', 'spec': {'need': 'REQUIRED', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class Load(UpsElement):
    tag_name = 'Load'
    
    def __init__(self):
        super().__init__()
        # Children
        self.force: List[Any] = []

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'Load',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'force', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class Load_Force(UpsElement):
    tag_name = 'force'
    
    def __init__(self):
        super().__init__()
        # Children
        self.geom_object: Optional[Any] = None
        self.load_curve: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'force',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'geom_object', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA'}},
                {'tag': 'load_curve', 'spec': {'need': 'REQUIRED', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class Force_Load_curve(UpsElement):
    tag_name = 'load_curve'
    
    def __init__(self):
        super().__init__()
        # Children
        self.id: Optional[Any] = None
        self.time_point: List[Any] = []

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'load_curve',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'id', 'spec': {'need': 'REQUIRED', 'type': 'INTEGER', 'valid_values': None}},
                {'tag': 'time_point', 'spec': {'need': 'MULTIPLE', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class Load_curve_Time_point_5(UpsElement):
    tag_name = 'time_point'
    
    def __init__(self):
        super().__init__()
        # Children
        self.time: Optional[Any] = None
        self.load: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'time_point',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'time', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'load', 'spec': {'need': 'REQUIRED', 'type': 'MULTIPLE_DOUBLES', 'valid_values': None}},
            ]
        }

class Solver(UpsElement):
    tag_name = 'Solver'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.type: Optional[str] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'Solver',
            'spec_type': 'NO_DATA',
            'attributes': {
                'type': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'CGSolver, direct, hypre, hypreamr'},
            },
            'children_spec': [
            ]
        }

class Burger(UpsElement):
    tag_name = 'Burger'
    
    def __init__(self):
        super().__init__()
        # Children
        self.delt: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'Burger',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'delt', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
            ]
        }

class Poisson(UpsElement):
    tag_name = 'Poisson'
    
    def __init__(self):
        super().__init__()
        # Children
        self.delt: Optional[Any] = None
        self.maxresidual: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'Poisson',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'delt', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'maxresidual', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
            ]
        }

class AdvectSlabs(UpsElement):
    tag_name = 'AdvectSlabs'
    
    def __init__(self):
        super().__init__()
        # Children
        self.delt: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'AdvectSlabs',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'delt', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
            ]
        }

class AdvectSlabsGPU(UpsElement):
    tag_name = 'AdvectSlabsGPU'
    
    def __init__(self):
        super().__init__()
        # Children
        self.delt: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'AdvectSlabsGPU',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'delt', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
            ]
        }

class GPUSchedulerTest(UpsElement):
    tag_name = 'GPUSchedulerTest'
    
    def __init__(self):
        super().__init__()
        # Children
        self.delt: Optional[Any] = None
        self.maxresidual: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'GPUSchedulerTest',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'delt', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'maxresidual', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
            ]
        }

class UnifiedSchedulerTest(UpsElement):
    tag_name = 'UnifiedSchedulerTest'
    
    def __init__(self):
        super().__init__()
        # Children
        self.delt: Optional[Any] = None
        self.maxresidual: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'UnifiedSchedulerTest',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'delt', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'maxresidual', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
            ]
        }

class ParticleTest1(UpsElement):
    tag_name = 'ParticleTest1'
    
    def __init__(self):
        super().__init__()
        # Children
        self.doOutput: Optional[Any] = None
        self.doGhostCells: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'ParticleTest1',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'doOutput', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': None}},
                {'tag': 'doGhostCells', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': None}},
            ]
        }

class Wave(UpsElement):
    tag_name = 'Wave'
    
    def __init__(self):
        super().__init__()
        # Children
        self.radius: Optional[Any] = None
        self.initial_condition: Optional[Any] = None
        self.integration: Optional[Any] = None
        self.refine_threshold: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'Wave',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'radius', 'spec': {'need': 'OPTIONAL', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'initial_condition', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'integration', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': None}},
                {'tag': 'refine_threshold', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': None}},
            ]
        }

class SolverTest(UpsElement):
    tag_name = 'SolverTest'
    
    def __init__(self):
        super().__init__()
        # Children
        self.delt: Optional[Any] = None
        self.X_Laplacian: Optional[Any] = None
        self.Y_Laplacian: Optional[Any] = None
        self.Z_Laplacian: Optional[Any] = None
        self.Parameters: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'SolverTest',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
                {'tag': 'delt', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': 'positive'}},
                {'tag': 'X_Laplacian', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'Y_Laplacian', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'Z_Laplacian', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
                {'tag': 'Parameters', 'spec': {'need': 'OPTIONAL', 'type': 'NO_DATA', 'valid_values': None}},
            ]
        }

class X_Laplacian(UpsElement):
    tag_name = 'X_Laplacian'
    
    def __init__(self):
        super().__init__()

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'X_Laplacian',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
            ]
        }

class Y_Laplacian(UpsElement):
    tag_name = 'Y_Laplacian'
    
    def __init__(self):
        super().__init__()

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'Y_Laplacian',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
            ]
        }

class Z_Laplacian(UpsElement):
    tag_name = 'Z_Laplacian'
    
    def __init__(self):
        super().__init__()

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'Z_Laplacian',
            'spec_type': 'NO_DATA',
            'attributes': {
            },
            'children_spec': [
            ]
        }

class SolverTest_Parameters(UpsElement):
    tag_name = 'Parameters'
    
    def __init__(self):
        super().__init__()
        # Attributes
        self.variable: Optional[str] = None
        # Children
        self.criteria: Optional[Any] = None
        self.jump: Optional[Any] = None
        self.logging: Optional[Any] = None
        self.maxiterations: Optional[Any] = None
        self.norm: Optional[Any] = None
        self.npost: Optional[Any] = None
        self.npre: Optional[Any] = None
        self.preconditioner: Optional[Any] = None
        self.outputEquations: Optional[Any] = None
        self.skip: Optional[Any] = None
        self.setupFrequency: Optional[Any] = None
        self.solver: Optional[Any] = None
        self.tolerance: Optional[Any] = None
        self.relax_type: Optional[Any] = None

    @classmethod
    def get_spec(cls):
        return {
            'tag': 'Parameters',
            'spec_type': 'NO_DATA',
            'attributes': {
                'variable': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': 'implicitPressure'},
            },
            'children_spec': [
                {'tag': 'criteria', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': 'Absolute relative'}},
                {'tag': 'jump', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': None}},
                {'tag': 'logging', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': 'positive'}},
                {'tag': 'maxiterations', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': 'positive'}},
                {'tag': 'norm', 'spec': {'need': 'OPTIONAL', 'type': 'STRING', 'valid_values': 'LInfinity linfinity L1 l1 L2 l2'}},
                {'tag': 'npost', 'spec': {'need': 'REQUIRED', 'type': 'INTEGER', 'valid_values': None}},
                {'tag': 'npre', 'spec': {'need': 'REQUIRED', 'type': 'INTEGER', 'valid_values': None}},
                {'tag': 'preconditioner', 'spec': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'none, pfmg, smg'}},
                {'tag': 'outputEquations', 'spec': {'need': 'OPTIONAL', 'type': 'BOOLEAN', 'valid_values': None}},
                {'tag': 'skip', 'spec': {'need': 'REQUIRED', 'type': 'INTEGER', 'valid_values': None}},
                {'tag': 'setupFrequency', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': None}},
                {'tag': 'solver', 'spec': {'need': 'REQUIRED', 'type': 'STRING', 'valid_values': 'smg, SMG, PFMG, pfmg, SparseMSG, sparsemsg, CG, cg, Hybrid, hybrid, GMRES, gmres amg'}},
                {'tag': 'tolerance', 'spec': {'need': 'REQUIRED', 'type': 'DOUBLE', 'valid_values': None}},
                {'tag': 'relax_type', 'spec': {'need': 'OPTIONAL', 'type': 'INTEGER', 'valid_values': '0,3'}},
            ]
        }

