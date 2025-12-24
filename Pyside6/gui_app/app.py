import math
from viewer_3d import Viewer3D


class PipelineApp:
    """Singleton application class"""
    _instance = None
    
    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance
    
    def __init__(self):
        if PipelineApp._instance is not None:
            raise RuntimeError("Use get_instance() instead")
        
        self.node_editor = None
        self.property_editor = None
        self.nodes = {}  # node_id -> node instance
        self.viewer_3d = Viewer3D()
        
        # Auto-layout state
        self._layout_angle = 0.0
        self._layout_radius = 200.0
        self._layout_spiral_step = 80.0
    
    @property
    def viewer(self):
        return self.viewer_3d
    
    def get_next_node_position(self):
        """Golden-angle spiral layout – always finds free space"""
        angle = self._layout_angle
        radius = self._layout_radius
        
        x = 300 + radius * math.cos(angle)
        y = 200 + radius * math.sin(angle)
        
        # Update for next node
        self._layout_angle += 2.39996  # ~137.5° golden angle in radians
        self._layout_radius += self._layout_spiral_step / (2 * math.pi)
        
        # Optional: reset spiral after ~30 nodes
        if self._layout_radius > 1200:
            self._layout_radius = 200
            self._layout_angle = 0
        
        return [x, y]
    
    def reset_layout(self):
        """Reset layout position generator"""
        self._layout_angle = 0.0
        self._layout_radius = 200.0
