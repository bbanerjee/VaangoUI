import math

class Vector3D:
    def __init__(self, x=0.0, y=0.0, z=0.0):
        if isinstance(x, Vector3D):
            self._x = x.x()
            self._y = x.y()
            self._z = x.z()
        else:
            self._x = float(x)
            self._y = float(y)
            self._z = float(z)

    def x(self, val=None):
        if val is not None:
            self._x = val
        return self._x

    def y(self, val=None):
        if val is not None:
            self._y = val
        return self._y

    def z(self, val=None):
        if val is not None:
            self._z = val
        return self._z

    def set(self, x, y=None, z=None):
        if isinstance(x, Vector3D):
            self._x = x.x()
            self._y = x.y()
            self._z = x.z()
        elif y is not None and z is not None:
            self._x = x
            self._y = y
            self._z = z

    def add(self, vec):
        self._x += vec.x()
        self._y += vec.y()
        self._z += vec.z()

    def norm(self):
        return math.sqrt(self._x**2 + self._y**2 + self._z**2)

    def dot(self, vec):
        return (self._x * vec.x()) + (self._y * vec.y()) + (self._z * vec.z())

    def print(self, file=None):
        out_str = f"[{self._x}, {self._y}, {self._z}]"
        if file:
            file.write(out_str)
        else:
            print(out_str, end="")

    def __repr__(self):
        return f"Vector3D({self._x}, {self._y}, {self._z})"
