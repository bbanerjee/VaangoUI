import abc
from .point import Point
from .vector3d import Vector3D

class GeomObject:
    def __init__(self):
        self.d_name = "Default"
        self.d_resolution = Vector3D()
        self.d_velocity = Vector3D()
        self.d_temperature = 0.0
        self.d_density = 0.0
        self.d_pressure = 0.0
        self.d_geom_piece_vector = []

    def get_name(self):
        return self.d_name

    def set_name(self, name):
        self.d_name = name

    def set_resolution(self, x, y, z):
        self.d_resolution.set(x, y, z)

    def set_velocity(self, x, y, z):
        self.d_velocity.set(x, y, z)

    def set_pressure(self, pressure):
        self.d_pressure = pressure

    def set_temperature(self, temperature):
        self.d_temperature = temperature

    def set_density(self, density):
        self.d_density = density

    def add_geom_piece(self, geom_piece):
        self.d_geom_piece_vector.append(geom_piece)

    def remove_geom_piece_at(self, index):
        if 0 <= index < len(self.d_geom_piece_vector):
            del self.d_geom_piece_vector[index]

    def write_uintah(self, file, tab):
        tab1 = tab + "  "
        file.write(f"{tab}<geom_object>\n")
        file.write(f"{tab1}<res> [{int(self.d_resolution.x())}, {int(self.d_resolution.y())}, {int(self.d_resolution.z())}] </res>\n")
        file.write(f"{tab1}<velocity> [{self.d_velocity.x()}, {self.d_velocity.y()}, {self.d_velocity.z()}] </velocity>\n")
        file.write(f"{tab1}<temperature> {self.d_temperature} </temperature>\n")
        if self.d_density > 0.0:
            file.write(f"{tab1}<density> {self.d_density} </density>\n")
            file.write(f"{tab1}<pressure> {self.d_pressure} </pressure>\n")
        
        for geom_piece in self.d_geom_piece_vector:
            geom_piece.write_uintah(file, tab1)

        file.write(f"{tab}</geom_object>\n")

    def print(self):
        tab1 = "  "
        print("<geom_object>")
        print(f"{tab1}<res> [{int(self.d_resolution.x())}, {int(self.d_resolution.y())}, {int(self.d_resolution.z())}] </res>")
        print(f"{tab1}<velocity> [{self.d_velocity.x()}, {self.d_velocity.y()}, {self.d_velocity.z()}] </velocity>")
        print(f"{tab1}<temperature> {self.d_temperature} </temperature>")
        print(f"{tab1}<density> {self.d_density} </density>")
        print(f"{tab1}<pressure> {self.d_pressure} </pressure>")
        
        for geom_piece in self.d_geom_piece_vector:
            geom_piece.print()

        print("</geom_object>")
