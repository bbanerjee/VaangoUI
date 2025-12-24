import math
from .core import ParticleShape, Point

class ParticleInRVE:
    def __init__(self, shape=ParticleShape.CIRCLE, radius=0.0, length=1.0, 
                 thickness=0.0, rotation=0.0, center=None, mat_code=0):
        self.shape = shape
        self.radius = radius
        self.length = length
        self.thickness = thickness
        self.rotation = rotation
        self.center = center if center else Point()
        self.mat_code = mat_code

    def get_volume(self):
        volume = 0.0
        if self.shape == ParticleShape.CIRCLE:
            volume = math.pi * self.radius**2
        elif self.shape == ParticleShape.HOLLOW_CIRCLE:
            r_in = self.radius - self.thickness
            volume = math.pi * (self.radius**2 - r_in**2)
        elif self.shape == ParticleShape.SPHERE:
            volume = math.pi * self.radius**3 * (4.0/3.0)
        elif self.shape == ParticleShape.HOLLOW_SPHERE:
            r_in = self.radius - self.thickness
            volume = math.pi * (self.radius**3 - r_in**3) * (4.0/3.0)
        return volume

class ParticleList:
    def __init__(self):
        # Dictionary mapping radius to list of particles
        self.particles = {}
        self.all_particles = []

    def add_particle(self, particle):
        if particle.radius not in self.particles:
            self.particles[particle.radius] = []
        self.particles[particle.radius].append(particle)
        self.all_particles.append(particle)

    def clear(self):
        self.particles.clear()
        self.all_particles.clear()
    
    def size(self):
        return len(self.all_particles)

class ParticleSizeDist:
    def __init__(self):
        self.material_name = "default"
        self.particle_vol_frac = 50.0
        self.max_particle_size = 1000.0
        self.num_sizes = 10
        
        # Input distribution
        self.size = []
        self.vol_frac = []
        
        # Initialize default linear distribution
        for ii in range(self.num_sizes):
            self.size.append((ii + 1) / float(self.num_sizes) * self.max_particle_size)
            self.vol_frac.append(10.0)

        # Calculated distribution for RVE generation
        self.num_sizes_calc = 0
        self.freq_2d_calc = []
        self.freq_3d_calc = []
        self.size_calc = []
        self.vol_frac_2d_calc = []
        self.vol_frac_3d_calc = []

    def calc_particle_dist(self):
        NUM_SIZES_MAX = 11
        LARGE_INT = 100000

        if self.num_sizes == 0:
            return

        if self.num_sizes == 1:
            self.num_sizes_calc = 1
            self.size_calc = [self.size[0]]
            self.freq_2d_calc = [LARGE_INT]
            self.freq_3d_calc = [LARGE_INT]
            return

        # Compute range of mean sizes and mean volume fractions
        mean_size_calc = []
        mean_vol_frac_calc = []
        
        min_size = self.size[0]
        max_size = self.max_particle_size
        size_incr = (max_size - min_size) / (NUM_SIZES_MAX - 1)
        
        self.size_calc = []
        if self.vol_frac[0] > 0.0:
            self.size_calc.append(0.5 * min_size)
        else:
            self.size_calc.append(min_size)
            
        for ii in range(1, NUM_SIZES_MAX):
            self.size_calc.append(min_size + ii * size_incr)

        for ii in range(NUM_SIZES_MAX - 1):
            size_start_bin = self.size_calc[ii]
            size_end_bin = self.size_calc[ii+1]
            mean = 0.5 * (size_start_bin + size_end_bin)
            
            intp = 0.0
            for jj in range(self.num_sizes):
                s_start = 0.0
                if jj > 0:
                    s_start = self.size[jj-1]
                s_end = self.size[jj]
                
                if abs(s_end - s_start) < 1e-9:
                    continue

                tt = (mean - s_start) / (s_end - s_start)
                if 0.0 <= tt <= 1.0:
                    if jj > 0:
                        intp = (1.0 - tt) * self.vol_frac[jj-1] + tt * self.vol_frac[jj]
                    else:
                        intp = tt * self.vol_frac[jj]
                    break
            
            mean_size_calc.append(mean)
            mean_vol_frac_calc.append(intp / 100.0)

        # Convert volume fraction into number of particles
        total_vol = 1000.0 * self.max_particle_size
        tot_vol_2d = 0.0
        tot_vol_3d = 0.0
        
        ball_dist = []
        for ii in range(len(mean_size_calc)):
            vf = mean_vol_frac_calc[ii]
            dia = mean_size_calc[ii]
            if dia < 1e-9: dia = 1e-9
            
            num_2d = math.ceil(vf * total_vol / (dia**2))
            num_3d = math.ceil(vf * total_vol / (dia**3))
            
            vol_2d = dia**2 * num_2d
            vol_3d = dia**3 * num_3d
            
            tot_vol_2d += vol_2d
            tot_vol_3d += vol_3d
            
            ball_dist.append({
                'num_2d': int(num_2d),
                'num_3d': int(num_3d),
                'dia': dia,
                'vol_2d': vol_2d,
                'vol_3d': vol_3d
            })
            
        self.num_sizes_calc = len(ball_dist)
        
        self.size_calc = []
        self.freq_2d_calc = []
        self.freq_3d_calc = []
        self.vol_frac_2d_calc = []
        self.vol_frac_3d_calc = []
        
        for ball in ball_dist:
            self.size_calc.append(ball['dia'])
            self.freq_2d_calc.append(ball['num_2d'])
            self.freq_3d_calc.append(ball['num_3d'])
            self.vol_frac_2d_calc.append(100.0 * ball['vol_2d'] / tot_vol_2d if tot_vol_2d > 0 else 0)
            self.vol_frac_3d_calc.append(100.0 * ball['vol_3d'] / tot_vol_3d if tot_vol_3d > 0 else 0)

