class PolygonDouble:
    def __init__(self, x=None, y=None, n_pts=0):
        if x is not None and y is not None:
            self.d_n_pts = n_pts
            self.d_x = list(x)
            self.d_y = list(y)
        else:
            self.d_n_pts = 0
            self.d_x = []
            self.d_y = []

    def nof_points(self):
        return self.d_n_pts

    def x(self, index):
        return self.d_x[index]

    def y(self, index):
        return self.d_y[index]

    def add(self, x, y):
        self.d_x.append(x)
        self.d_y.append(y)
        self.d_n_pts += 1

    def print(self):
        print(f"NofPts = {self.d_n_pts}")
        for ii in range(self.d_n_pts):
            print(f"x = {self.d_x[ii]} y = {self.d_y[ii]}")
