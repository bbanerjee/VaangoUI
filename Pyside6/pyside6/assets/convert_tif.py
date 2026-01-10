# pip install numpy rasterio numpy-stl

import rasterio
import numpy as np
from stl import mesh

def tif_to_stl(input_tif, output_stl, z_exaggeration=1.0, downsample_factor=1):
    # 1. Load the TIFF data
    with rasterio.open(input_tif) as src:
        # Read the elevation data (Band 1)
        # downsample_factor > 1 reduces resolution for faster processing
        elev_data = src.read(1, out_shape=(
            src.count,
            int(src.height // downsample_factor),
            int(src.width // downsample_factor)
        ))
        
        # Get the pixel dimensions in meters (assuming projected CRS like UTM)
        res_x, res_y = src.res[0] * downsample_factor, src.res[1] * downsample_factor
        
    rows, cols = elev_data.shape
    
    # 2. Create the grid of vertices
    # X and Y are generated based on pixel resolution, Z is the elevation
    x = np.arange(0, cols * res_x, res_x)
    y = np.arange(0, rows * res_y, res_y)
    x_grid, y_grid = np.meshgrid(x, y)
    
    # Flatten grids for processing
    z_grid = elev_data * z_exaggeration
    
    # 3. Define the triangles (faces)
    # A grid of (rows, cols) has (rows-1) * (cols-1) quadrilaterals
    # Each quad consists of two triangles
    num_triangles = (rows - 1) * (cols - 1) * 2
    surface_mesh = mesh.Mesh(np.zeros(num_triangles, dtype=mesh.Mesh.dtype))
    
    count = 0
    for i in range(rows - 1):
        for j in range(cols - 1):
            # Define the 4 corners of the pixel cell
            p1 = [x_grid[i, j], y_grid[i, j], z_grid[i, j]]
            p2 = [x_grid[i, j+1], y_grid[i, j+1], z_grid[i, j+1]]
            p3 = [x_grid[i+1, j], y_grid[i+1, j], z_grid[i+1, j]]
            p4 = [x_grid[i+1, j+1], y_grid[i+1, j+1], z_grid[i+1, j+1]]
            
            # Triangle 1
            surface_mesh.vectors[count] = np.array([p1, p2, p3])
            # Triangle 2
            surface_mesh.vectors[count + 1] = np.array([p2, p4, p3])
            
            count += 2

    # 4. Save the STL
    surface_mesh.save(output_stl)
    print(f"Successfully saved {output_stl}")

# Example Usage:
# tif_to_stl("chuquicamata_2019.tif", "mine_surface.stl", z_exaggeration=1.5, downsample_factor=2)
#tif_to_stl("output_hh.tif", "output_hh_surf.stl", z_exaggeration=1.0, downsample_factor=2)
tif_to_stl("viz.hh_hillshade.tif", "output_hh_surf.stl", z_exaggeration=1.0, downsample_factor=2)
