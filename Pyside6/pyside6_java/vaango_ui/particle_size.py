class ParticleSize:
    NOF_SIZES = 100

    def __init__(self, part_size_dist=None):
        if part_size_dist:
            self.copy(part_size_dist)
        else:
            self.composite_name = "Default"
            self.vol_frac_in_composite = 100.0
            self.nof_sizes_inp = 2
            self.size_inp = [0.0] * self.NOF_SIZES
            self.vol_frac_inp = [0.0] * self.NOF_SIZES
            
            self.nof_sizes_calc = 2
            self.size_calc = [0.0] * self.NOF_SIZES
            self.freq_2d_calc = [0] * self.NOF_SIZES
            self.freq_3d_calc = [0] * self.NOF_SIZES
            self.vol_frac_2d_calc = [0.0] * self.NOF_SIZES
            self.vol_frac_3d_calc = [0.0] * self.NOF_SIZES

            self.size_inp[0] = 100.0
            self.vol_frac_inp[0] = 10.0
            self.size_calc[0] = 100.0
            self.freq_2d_calc[0] = 10
            self.freq_3d_calc[0] = 10
            self.vol_frac_2d_calc[0] = 0.001
            self.vol_frac_3d_calc[0] = 0.001

            self.size_inp[1] = 1000.0
            self.vol_frac_inp[1] = 90.0
            self.size_calc[1] = 1000.0
            self.freq_2d_calc[1] = 90
            self.freq_3d_calc[1] = 90
            self.vol_frac_2d_calc[1] = 0.999
            self.vol_frac_3d_calc[1] = 0.999

    def copy(self, part_size_dist):
        self.composite_name = part_size_dist.composite_name
        self.vol_frac_in_composite = part_size_dist.vol_frac_in_composite

        self.nof_sizes_inp = part_size_dist.nof_sizes_inp
        self.size_inp = list(part_size_dist.size_inp)
        self.vol_frac_inp = list(part_size_dist.vol_frac_inp)

        self.nof_sizes_calc = part_size_dist.nof_sizes_calc
        self.size_calc = list(part_size_dist.size_calc)
        self.freq_2d_calc = list(part_size_dist.freq_2d_calc)
        self.freq_3d_calc = list(part_size_dist.freq_3d_calc)
        self.vol_frac_2d_calc = list(part_size_dist.vol_frac_2d_calc)
        self.vol_frac_3d_calc = list(part_size_dist.vol_frac_3d_calc)

    def print(self):
        print("Input")
        print("Size ... Vol.Frac")
        for ii in range(self.nof_sizes_inp):
            print(f"{self.size_inp[ii]:.2E}    {self.vol_frac_inp[ii]:.2E}")
        
        print("Calculated")
        print("Size ... Number (2D) .. Vol.Frac (2D)... Number (3D) .. Vol.Frac (3D)")
        for ii in range(self.nof_sizes_calc):
            print(f"{self.size_calc[ii]:.2E}    {self.freq_2d_calc[ii]}     "
                  f"{self.vol_frac_2d_calc[ii]:.2E}      {self.freq_3d_calc[ii]}     "
                  f"{self.vol_frac_3d_calc[ii]:.2E}")
