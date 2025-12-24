import math
import random
import numpy as np
from scipy.spatial import cKDTree
from .core import Point, ParticleShape
from .particle_utils import ParticleInRVE, ParticleList, ParticleSizeDist

class Vaango_UIGenerateRVEParticles:
    def __init__(self):
        self.s_part_list = ParticleList()
        self.s_size_dist = ParticleSizeDist()
        # Initialize default distribution calculation
        self.s_size_dist.calc_particle_dist()
        
        self.d_radii = [] # Mirrors kdtree points
        self.kdtree_points = [] # For rebuilding kdtree
        self.kdtree = None

    def distribute_particles(self, rve_size, periodic, part_shape, thickness):
        self.s_part_list.clear()
        self.d_radii = []
        self.kdtree_points = []
        self.kdtree = None
        
        self.estimate_rve_part_size_dist(rve_size, part_shape)
        
        if part_shape == ParticleShape.CIRCLE:
            self.distribute_circles_periodic(rve_size, -1.0, periodic)
        elif part_shape == ParticleShape.HOLLOW_CIRCLE:
            self.distribute_circles_periodic(rve_size, thickness, periodic)
        elif part_shape == ParticleShape.SPHERE:
            self.distribute_spheres_periodic(rve_size, -1.0, periodic)
        elif part_shape == ParticleShape.HOLLOW_SPHERE:
            self.distribute_spheres_periodic(rve_size, thickness, periodic)

    def distribute_circles_periodic(self, rve_size, thickness, periodic):
        MAX_ITER = 100
        mat_code = 0
        
        # In Python we rebuild the tree periodically or just use brute force if small enough.
        # But cKDTree is fast. We'll rebuild it when adding points.
        
        nof_sizes_calc = self.s_size_dist.num_sizes_calc
        rve_volume = rve_size * rve_size
        
        target_nof_parts = list(self.s_size_dist.freq_2d_calc)
        
        search_radius = 2.5 * self.s_size_dist.size_calc[nof_sizes_calc-1]
        total_volume = 0.0
        target_part_vol_frac = 0.0
        
        for ii in range(nof_sizes_calc, 0, -1):
            idx = ii - 1
            nof_parts = self.s_size_dist.freq_2d_calc[idx]
            
            part_rad = 0.5 * self.s_size_dist.size_calc[idx]
            part_vol = math.pi * part_rad**2
            target_part_vol_frac += target_nof_parts[idx] * part_vol / rve_volume
            
            box_in_min = part_rad
            box_in_max = rve_size - part_rad
            box_min = box_in_min
            box_max = box_in_max
            if periodic:
                box_min = -0.5 * part_rad
                box_max = rve_size + 0.5 * part_rad
                
            num_fitted = 0
            for jj in range(nof_parts):
                fit = False
                nof_iter = 0
                while not fit and nof_iter < MAX_ITER:
                    tx = random.random()
                    ty = random.random()
                    x_cent = (1-tx)*box_min + tx*box_max
                    y_cent = (1-ty)*box_min + ty*box_max
                    part_cent = Point(x_cent, y_cent, 0.0)
                    
                    # Update KDTree if needed
                    if len(self.kdtree_points) > 0:
                        self.kdtree = cKDTree(self.kdtree_points)
                    else:
                        self.kdtree = None

                    if self.in_limits(x_cent, box_in_min, box_in_max) and \
                       self.in_limits(y_cent, box_in_min, box_in_max):
                        
                        if not self.intersects_another(part_cent, part_rad, search_radius):
                            new_particle = ParticleInRVE(ParticleShape.CIRCLE, part_rad, 1.0, 
                                                       thickness, part_cent, mat_code)
                            self.s_part_list.add_particle(new_particle)
                            total_volume += new_particle.get_volume()
                            
                            self.kdtree_points.append(part_cent.as_list())
                            self.d_radii.append(part_rad)
                            fit = True
                            num_fitted += 1
                        nof_iter += 1
                    else:
                        if not periodic:
                            break
                        
                        if not self.intersects_another(part_cent, part_rad, search_radius):
                            intersects = False
                            locs = self.find_part_loc_circle(rve_size, part_rad, part_cent, 0, rve_size)
                            for pt in locs:
                                # Need to check intersections for periodic images too
                                # Note: intersects_another uses self.kdtree which is based on currently placed particles
                                if self.intersects_another(pt, part_rad, search_radius):
                                    intersects = True
                                    break
                            
                            if not intersects:
                                # Add original
                                new_particle = ParticleInRVE(ParticleShape.CIRCLE, part_rad, 1.0,
                                                           thickness, part_cent, mat_code)
                                self.s_part_list.add_particle(new_particle)
                                total_volume += new_particle.get_volume()
                                self.kdtree_points.append(part_cent.as_list())
                                self.d_radii.append(part_rad)
                                num_fitted += 1
                                
                                # Add periodic images
                                for pt in locs:
                                    new_p = ParticleInRVE(ParticleShape.CIRCLE, part_rad, 1.0,
                                                        thickness, pt, mat_code)
                                    self.s_part_list.add_particle(new_p)
                                    self.kdtree_points.append(pt.as_list())
                                    self.d_radii.append(part_rad)
                                fit = True
                        nof_iter += 1
        
        self.calculate_rve_part_size_dist(rve_size, ParticleShape.CIRCLE)

    def distribute_spheres_periodic(self, rve_size, thickness, periodic):
        MAX_ITER = 3000
        mat_code = 0
        rve_min = Point(0,0,0)
        rve_max = Point(rve_size, rve_size, rve_size)
        
        nof_sizes_calc = self.s_size_dist.num_sizes_calc
        search_radius = 2.5 * self.s_size_dist.size_calc[nof_sizes_calc-1]
        
        vol = 0.0
        
        for ii in range(nof_sizes_calc, 0, -1):
            idx = ii - 1
            nof_parts = self.s_size_dist.freq_3d_calc[idx]
            part_dia = self.s_size_dist.size_calc[idx]
            part_rad = 0.5 * part_dia
            
            for jj in range(nof_parts):
                box_min = part_rad
                box_max = rve_size - part_rad
                if periodic:
                    box_min = -0.45 * part_dia
                    box_max = rve_size + 0.45 * part_dia
                    
                fit = False
                nof_iter = 0
                while not fit and nof_iter < MAX_ITER:
                    nof_iter += 1
                    tx = random.random()
                    ty = random.random()
                    tz = random.random()
                    x_cent = (1-tx)*box_min + tx*box_max
                    y_cent = (1-ty)*box_min + ty*box_max
                    z_cent = (1-tz)*box_min + tz*box_max
                    part_cent = Point(x_cent, y_cent, z_cent)
                    
                    if len(self.kdtree_points) > 0:
                        self.kdtree = cKDTree(self.kdtree_points)
                    else:
                        self.kdtree = None
                        
                    # Check intersection for main particle
                    no_intersections = True
                    if self.intersects_another(part_cent, part_rad, search_radius):
                        no_intersections = False
                        
                    periodic_locs = []
                    if periodic and no_intersections:
                        periodic_locs = self.find_periodic_sphere_part_loc(part_cent, part_dia, rve_min, rve_max)
                        for pt in periodic_locs:
                            if self.intersects_another(pt, part_rad, search_radius):
                                no_intersections = False
                                break
                    
                    if no_intersections:
                        # Add main
                        new_p = ParticleInRVE(ParticleShape.SPHERE, part_rad, 0.0, 
                                            part_cent, mat_code, thickness)
                        self.s_part_list.add_particle(new_p)
                        self.kdtree_points.append(part_cent.as_list())
                        self.d_radii.append(part_rad)
                        
                        if periodic:
                            for pt in periodic_locs:
                                new_pp = ParticleInRVE(ParticleShape.SPHERE, part_rad, 0.0,
                                                     pt, mat_code, thickness)
                                self.s_part_list.add_particle(new_pp)
                                self.kdtree_points.append(pt.as_list())
                                self.d_radii.append(part_rad)
                        
                        vol += part_dia**3 * math.pi / 6.0
                        fit = True

        self.calculate_rve_part_size_dist(rve_size, ParticleShape.SPHERE)

    def intersects_another(self, center, radius, search_radius):
        if self.kdtree is None:
            return False
            
        # Find neighbors within search_radius
        # kdtree.query_ball_point returns indices
        query_pt = [center.x, center.y, center.z]
        indices = self.kdtree.query_ball_point(query_pt, search_radius)
        
        for idx in indices:
            neighbor_radius = self.d_radii[idx]
            neighbor_pt = Point(self.kdtree_points[idx][0], self.kdtree_points[idx][1], self.kdtree_points[idx][2])
            dist = center.dist(neighbor_pt)
            
            rad_sum = radius + neighbor_radius
            # Use a small tolerance
            if dist < rad_sum - 1e-6:
                return True
        return False

    def in_limits(self, x, min_val, max_val):
        return x == min_val or x == max_val or (x > min_val and x < max_val)

    def find_part_loc_circle(self, rve_size, rad, pt, min_val, max_val):
        loc = []
        xmin = pt.x - rad
        xmax = pt.x + rad
        ymin = pt.y - rad
        ymax = pt.y + rad
        
        # Logic mirroring C++ code for 8 regions around the box
        # Simplified logic: check shifts in x, y, xy
        shifts = []
        if xmin < min_val: shifts.append((rve_size, 0))
        if xmax > max_val: shifts.append((-rve_size, 0))
        if ymin < min_val: shifts.append((0, rve_size))
        if ymax > max_val: shifts.append((0, -rve_size))
        
        # This simple check might not catch corners correctly if processed sequentially.
        # The C++ code checks specific corner conditions.
        
        # Let's just generate all 8 neighbors and check intersection with RVE box
        possible_shifts = [
            (rve_size, 0), (-rve_size, 0), (0, rve_size), (0, -rve_size),
            (rve_size, rve_size), (rve_size, -rve_size),
            (-rve_size, rve_size), (-rve_size, -rve_size)
        ]
        
        for sx, sy in possible_shifts:
            new_pt = pt.translate(sx, sy, 0)
            # Check if this new circle intersects the original RVE box [0, rve_size]
            # Box of particle
            px_min, px_max = new_pt.x - rad, new_pt.x + rad
            py_min, py_max = new_pt.y - rad, new_pt.y + rad
            
            # Intersection with [0, rve_size] x [0, rve_size]
            if not (px_max < 0 or px_min > rve_size or py_max < 0 or py_min > rve_size):
                loc.append(new_pt)
                
        return loc

    def find_periodic_sphere_part_loc(self, center, diameter, rve_min, rve_max):
        periodic_loc = []
        x_rve = rve_max.x - rve_min.x
        y_rve = rve_max.y - rve_min.y
        z_rve = rve_max.z - rve_min.z
        
        shifts = []
        for i in [-1, 0, 1]:
            for j in [-1, 0, 1]:
                for k in [-1, 0, 1]:
                    if i==0 and j==0 and k==0: continue
                    shifts.append((i*x_rve, j*y_rve, k*z_rve))
        
        rad = 0.5 * diameter
        for sx, sy, sz in shifts:
            pt = center.translate(sx, sy, sz)
            # Check intersection with RVE box
            pt_box_min = pt.translate(-rad, -rad, -rad)
            pt_box_max = pt.translate(rad, rad, rad)
            
            if self.box_box_intersect(pt_box_min, pt_box_max, rve_min, rve_max):
                periodic_loc.append(pt)
        
        return periodic_loc

    def box_box_intersect(self, pt_min, pt_max, rve_min, rve_max):
        if pt_max.is_less_than(rve_min): return False
        if pt_min.is_greater_than(rve_max): return False
        return True

    def estimate_rve_part_size_dist(self, rve_size, shape):
        # Simply use the current calculated distribution but scaled?
        # The C++ code does an iterative scaling to match volume fraction.
        # For this prototype, we will skip the complex re-balancing to ensure volume fraction matches perfectly,
        # relying on the initial calculation in ParticleSizeDist
        pass

    def calculate_rve_part_size_dist(self, rve_size, shape):
        # Update statistics
        pass
