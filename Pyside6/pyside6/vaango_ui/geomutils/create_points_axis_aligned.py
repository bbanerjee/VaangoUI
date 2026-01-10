import numpy as np
import random

class PointGeneratorAxisAligned:
    """Generate points inside a triangulated surface"""
    
    @staticmethod
    def point_in_triangle(p1: np.ndarray, p2: np.ndarray, p3: np.ndarray) -> np.ndarray:
        """Generate random point inside triangle using barycentric coordinates"""
        r1, r2 = random.random(), random.random()
        if r1 + r2 > 1:
            r1, r2 = 1 - r1, 1 - r2
        r3 = 1 - r1 - r2
        return r1 * p1 + r2 * p2 + r3 * p3
    
    @staticmethod
    def is_point_inside_mesh(point: np.ndarray, vertices: np.ndarray, faces: np.ndarray) -> bool:
        """Ray casting algorithm to check if point is inside mesh"""
        ray_dir = np.array([1.0, 0.0, 0.0])  # Cast ray in X direction
        intersections = 0
        
        for face in faces:
            v0, v1, v2 = vertices[face]
            
            # Ray-triangle intersection using Möller-Trumbore algorithm
            edge1 = v1 - v0
            edge2 = v2 - v0
            h = np.cross(ray_dir, edge2)
            a = np.dot(edge1, h)
            
            if abs(a) < 1e-8:
                continue
            
            f = 1.0 / a
            s = point - v0
            u = f * np.dot(s, h)
            
            if u < 0.0 or u > 1.0:
                continue
            
            q = np.cross(s, edge1)
            v = f * np.dot(ray_dir, q)
            
            if v < 0.0 or u + v > 1.0:
                continue
            
            t = f * np.dot(edge2, q)
            
            if t > 1e-8:  # Ray intersects triangle
                intersections += 1
        
        return intersections % 2 == 1
    
    @staticmethod
    def generate_interior_points(vertices: np.ndarray, faces: np.ndarray, num_points: int) -> np.ndarray:
        """Generate points inside the mesh using rejection sampling"""
        if len(vertices) == 0:
            return np.array([])
        
        # Get bounding box
        min_bounds = np.min(vertices, axis=0)
        max_bounds = np.max(vertices, axis=0)
        
        interior_points = []
        attempts = 0
        max_attempts = num_points * 100  # Prevent infinite loops
        
        while len(interior_points) < num_points and attempts < max_attempts:
            # Generate random point in bounding box
            point = np.random.uniform(min_bounds, max_bounds)
            
            if PointGenerator.is_point_inside_mesh(point, vertices, faces):
                interior_points.append(point)
            
            attempts += 1
        
        return np.array(interior_points)
