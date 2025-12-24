from enum import Enum, auto
import math

class ParticleShape(Enum):
    CIRCLE = auto()
    HOLLOW_CIRCLE = auto()
    SPHERE = auto()
    HOLLOW_SPHERE = auto()

class Point:
    def __init__(self, x=0.0, y=0.0, z=0.0):
        self.x = float(x)
        self.y = float(y)
        self.z = float(z)

    def translate(self, x_trans, y_trans, z_trans):
        return Point(self.x + x_trans, self.y + y_trans, self.z + z_trans)

    def is_less_than(self, other):
        return (self.x < other.x) or (self.y < other.y) or (self.z < other.z)

    def is_greater_than(self, other):
        return (self.x > other.x) or (self.y > other.y) or (self.z > other.z)

    def __repr__(self):
        return f"[{self.x}, {self.y}, {self.z}]"
    
    def as_list(self):
        return [self.x, self.y, self.z]

    def dist(self, other):
        return math.sqrt((self.x-other.x)**2 + (self.y-other.y)**2 + (self.z-other.z)**2)
