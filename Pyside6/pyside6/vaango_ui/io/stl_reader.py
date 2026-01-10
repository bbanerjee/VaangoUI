import numpy as np
import struct
from typing import Tuple

class STLReader:
    """Simple STL file reader supporting both ASCII and binary formats"""
    
    @staticmethod
    def read_stl(filename: str) -> Tuple[np.ndarray, np.ndarray]:
        """Read STL file and return vertices and faces"""
        with open(filename, 'rb') as f:
            # Check if binary or ASCII
            header = f.read(80)
            if b'solid' in header[:5].lower():
                f.seek(0)
                return STLReader._read_ascii_stl(f)
            else:
                return STLReader._read_binary_stl(f)
    
    @staticmethod
    def _read_binary_stl(f) -> Tuple[np.ndarray, np.ndarray]:
        """Read binary STL format"""
        f.seek(80)  # Skip header
        num_triangles = struct.unpack('<I', f.read(4))[0]
        
        vertices = []
        faces = []
        vertex_map = {}
        vertex_count = 0
        
        for i in range(num_triangles):
            # Skip normal vector (3 floats)
            f.read(12)
            
            # Read 3 vertices
            triangle_vertices = []
            for j in range(3):
                x, y, z = struct.unpack('<fff', f.read(12))
                vertex = (x, y, z)
                
                if vertex not in vertex_map:
                    vertex_map[vertex] = vertex_count
                    vertices.append(vertex)
                    vertex_count += 1
                
                triangle_vertices.append(vertex_map[vertex])
            
            faces.append(triangle_vertices)
            f.read(2)  # Skip attribute byte count
        
        return np.array(vertices), np.array(faces)
    
    @staticmethod
    def _read_ascii_stl(f) -> Tuple[np.ndarray, np.ndarray]:
        """Read ASCII STL format"""
        vertices = []
        faces = []
        vertex_map = {}
        vertex_count = 0
        
        lines = f.read().decode('utf-8').split('\n')
        i = 0
        
        while i < len(lines):
            line = lines[i].strip().lower()
            if line.startswith('facet normal'):
                i += 2  # Skip to first vertex
                triangle_vertices = []
                
                # Read 3 vertices
                for j in range(3):
                    if i < len(lines):
                        vertex_line = lines[i].strip()
                        if vertex_line.startswith('vertex'):
                            coords = vertex_line.split()[1:4]
                            vertex = (float(coords[0]), float(coords[1]), float(coords[2]))
                            
                            if vertex not in vertex_map:
                                vertex_map[vertex] = vertex_count
                                vertices.append(vertex)
                                vertex_count += 1
                            
                            triangle_vertices.append(vertex_map[vertex])
                    i += 1
                
                if len(triangle_vertices) == 3:
                    faces.append(triangle_vertices)
                i += 1  # Skip 'endfacet'
            else:
                i += 1
        
        return np.array(vertices), np.array(faces)
