"""
GeoTIFF to STL Converter
Converts elevation data from GeoTIFF raster into a 3D printable STL mesh.

Requirements:
    pip install numpy-stl rasterio numpy scipy
"""

import numpy as np
from stl import mesh
import rasterio
from scipy.ndimage import zoom


def geotiff_to_stl(
    input_file,
    output_file,
    z_scale=1.0,
    base_height=2.0,
    max_size=500,
    simplify=True
):
    """
    Convert GeoTIFF elevation data to STL 3D model.
    
    Parameters:
    -----------
    input_file : str
        Path to input GeoTIFF file
    output_file : str
        Path to output STL file
    z_scale : float
        Vertical exaggeration factor (default: 1.0)
    base_height : float
        Height of the base/platform in units (default: 2.0)
    max_size : int
        Maximum dimension for resampling (default: 500)
    simplify : bool
        Whether to resample large rasters (default: True)
    """
    
    print(f"Reading GeoTIFF: {input_file}")
    
    # Read the GeoTIFF file
    with rasterio.open(input_file) as src:
        elevation = src.read(1)  # Read first band
        
        # Get metadata
        print(f"Original size: {elevation.shape}")
        print(f"Data type: {elevation.dtype}")
        print(f"CRS: {src.crs}")
        print(f"Bounds: {src.bounds}")
        
        # Handle nodata values
        if src.nodata is not None:
            elevation = np.where(elevation == src.nodata, np.nan, elevation)
    
    # Resample if too large
    if simplify and (elevation.shape[0] > max_size or elevation.shape[1] > max_size):
        scale_factor = max_size / max(elevation.shape)
        print(f"Resampling with factor: {scale_factor:.3f}")
        elevation = zoom(elevation, scale_factor, order=1)
        print(f"New size: {elevation.shape}")
    
    # Replace NaN with mean or zero
    if np.any(np.isnan(elevation)):
        mean_val = np.nanmean(elevation)
        elevation = np.nan_to_num(elevation, nan=mean_val)
    
    # Normalize elevation data
    min_elev = np.min(elevation)
    max_elev = np.max(elevation)
    elev_range = max_elev - min_elev
    
    print(f"Elevation range: {min_elev:.2f} to {max_elev:.2f}")
    
    if elev_range == 0:
        print("Warning: Flat surface detected (no elevation variation)")
        elev_range = 1.0
    
    # Normalize to 0-1 range and apply z-scale
    elevation_normalized = ((elevation - min_elev) / elev_range) * z_scale
    
    height, width = elevation.shape
    
    # Create mesh
    print("Creating 3D mesh...")
    vertices, faces = create_terrain_mesh(
        elevation_normalized, 
        width, 
        height, 
        base_height
    )
    
    print(f"Total vertices: {len(vertices)}")
    print(f"Total faces: {len(faces)}")
    
    # Create STL mesh
    terrain_mesh = mesh.Mesh(np.zeros(len(faces), dtype=mesh.Mesh.dtype))
    
    for i, face in enumerate(faces):
        for j in range(3):
            terrain_mesh.vectors[i][j] = vertices[face[j]]
    
    # Save to file
    print(f"Saving STL to: {output_file}")
    terrain_mesh.save(output_file)
    
    print("Conversion complete!")
    print(f"Model dimensions: {width} x {height} x {z_scale}")
    

def create_terrain_mesh(elevation, width, height, base_height):
    """
    Create vertices and faces for the terrain mesh with base.
    
    Returns:
    --------
    vertices : list of [x, y, z] coordinates
    faces : list of [v1, v2, v3] vertex indices
    """
    vertices = []
    faces = []
    
    # Create top surface vertices
    for y in range(height):
        for x in range(width):
            z = elevation[y, x]
            vertices.append([x, y, z])
    
    # Create base vertices
    base_start = len(vertices)
    for y in range(height):
        for x in range(width):
            vertices.append([x, y, -base_height])
    
    # Create top surface triangles
    for y in range(height - 1):
        for x in range(width - 1):
            i = y * width + x
            
            # Triangle 1
            faces.append([i, i + 1, i + width])
            # Triangle 2
            faces.append([i + 1, i + width + 1, i + width])
    
    # Create bottom surface triangles (reverse winding)
    for y in range(height - 1):
        for x in range(width - 1):
            i = base_start + y * width + x
            
            # Triangle 1
            faces.append([i, i + width, i + 1])
            # Triangle 2
            faces.append([i + 1, i + width, i + width + 1])
    
    # Create side walls
    # Front wall (y=0)
    for x in range(width - 1):
        faces.append([x, base_start + x, x + 1])
        faces.append([x + 1, base_start + x, base_start + x + 1])
    
    # Back wall (y=height-1)
    for x in range(width - 1):
        i = (height - 1) * width + x
        faces.append([i, i + 1, base_start + i])
        faces.append([i + 1, base_start + i + 1, base_start + i])
    
    # Left wall (x=0)
    for y in range(height - 1):
        i = y * width
        faces.append([i, i + width, base_start + i])
        faces.append([i + width, base_start + i + width, base_start + i])
    
    # Right wall (x=width-1)
    for y in range(height - 1):
        i = y * width + width - 1
        faces.append([i, base_start + i, i + width])
        faces.append([i + width, base_start + i, base_start + i + width])
    
    return vertices, faces


# Example usage
if __name__ == "__main__":
    # Basic conversion
    geotiff_to_stl(
        input_file="output_hh.tif",
        output_file="terrain.stl",
        z_scale=2.0,          # 2x vertical exaggeration
        base_height=2.0,      # 2 unit base height
        max_size=500          # Resample to max 500x500
    )
    
    # High detail conversion (no resampling)
    # geotiff_to_stl(
    #     input_file="output_hh.tif",
    #     output_file="terrain_detailed.stl",
    #     z_scale=1.5,
    #     base_height=1.0,
    #     simplify=False  # Keep original resolution
    # )
