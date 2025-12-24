import math

class Point:
    def __init__(self, x=0.0, y=0.0, z=0.0):
        if isinstance(x, Point):
            self._x = x.x()
            self._y = x.y()
            self._z = x.z()
        else:
            self._x = float(x)
            self._y = float(y)
            self._z = float(z)

    def x(self):
        return self._x

    def y(self):
        return self._y

    def z(self):
        return self._z

    def set_x(self, val):
        self._x = val

    def set_y(self, val):
        self._y = val

    def set_z(self, val):
        self._z = val

    def translate(self, x_trans, y_trans, z_trans):
        return Point(self._x + x_trans, self._y + y_trans, self._z + z_trans)

    def is_less_than(self, pt):
        return (self._x < pt.x()) or (self._y < pt.y()) or (self._z < pt.z())

    def is_greater_than(self, pt):
        return (self._x > pt.x()) or (self._y > pt.y()) or (self._z > pt.z())

    def __repr__(self):
        return f"Point({self._x}, {self._y}, {self._z})"
