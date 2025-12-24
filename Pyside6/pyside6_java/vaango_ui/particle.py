import math
from .point import Point

class Particle:
    CIRCLE = 1
    SPHERE = 2

    def __init__(self, type_val=CIRCLE, radius=0.0, length=1.0, thickness=0.0, 
                 rotation=0.0, center=None, mat_code=0):
        self._type = type_val
        self._radius = float(radius)
        self._length = float(length)
        self._thickness = float(thickness)
        self._rotation = float(rotation)
        self._mat_code = int(mat_code)
        
        if center is None:
            self._center = Point(0.0, 0.0, 0.0)
        else:
            self._center = Point(center)

    def get_type(self):
        return self._type

    def get_mat_code(self):
        return self._mat_code

    def get_radius(self):
        return self._radius

    def get_length(self):
        return self._length

    def get_thickness(self):
        return self._thickness

    def get_rotation(self):
        return self._rotation

    def get_center(self):
        return self._center

    def get_volume(self):
        if self._type == Particle.CIRCLE:
            return math.pi * self._radius * self._radius
        else:
            return math.pi * self._radius * self._radius * self._radius * (4.0 / 3.0)

    def set_type(self, type_val):
        self._type = type_val

    def set_mat_code(self, mat_code):
        self._mat_code = mat_code

    def set_radius(self, radius):
        self._radius = radius

    def set_length(self, length):
        self._length = length

    def set_thickness(self, thickness):
        self._thickness = thickness

    def set_rotation(self, rotation):
        self._rotation = rotation

    def set_center(self, center):
        self._center = center

    def print(self, file=None, tab=""):
        if file is None:
            print(f"Material Code = {self._mat_code} Type = {self._type} "
                  f"Rad = {self._radius} Length = {self._length} "
                  f"Thick = {self._thickness} Rotation = {self._rotation} "
                  f"Center = [{self._center.x()}, {self._center.y()}, {self._center.z()}]")
            return

        tab1 = tab + "  "
        if self._type == Particle.CIRCLE:
            file.write(f"{tab}<cylinder label=\"{self._mat_code}\">\n")
            file.write(f"{tab1}<bottom> [{self._center.x()}, {self._center.y()}, {self._center.z()}] </bottom>\n")
            zcoord = self._center.z() + self._length
            file.write(f"{tab1}<top> [{self._center.x()}, {self._center.y()}, {zcoord}] </top>\n")
            file.write(f"{tab1}<radius> {self._radius} </radius>\n")
            file.write(f"{tab1}<thickness> {self._thickness} </thickness>\n")
            file.write(f"{tab}</cylinder>\n")
        elif self._type == Particle.SPHERE:
            file.write(f"{tab}<sphere label=\"{self._mat_code}\">\n")
            file.write(f"{tab1}<center> [{self._center.x()}, {self._center.y()}, {self._center.z()}] </center>\n")
            file.write(f"{tab1}<radius> {self._radius} </radius>\n")
            file.write(f"{tab1}<thickness> {self._thickness} </thickness>\n")
            file.write(f"{tab}</sphere>\n")
        else:
            print(f"Not output method for particle type {self._type} implemented yet.")
