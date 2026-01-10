%matplotlib inline

import glob
import xarray as xr
import rioxarray

import sys
sys.path.insert(1, '../Tools/')
from dea_tools.datahandling import paths_to_datetimeindex
from dea_tools.plotting import rgb

geotiff_path = '../Supplementary_data/Opening_GeoTIFFs_NetCDFs/geotiff_red_2018-01-03.tif'
netcdf_path = '../Supplementary_data/Opening_GeoTIFFs_NetCDFs/netcdf_2018-01-03.nc'

# Open into an xarray.DataArray
geotiff_da = rioxarray.open_rasterio(geotiff_path)

# Covert our xarray.DataArray into a xarray.Dataset
geotiff_ds = geotiff_da.to_dataset('band')

# Rename the variable to a more useful name
geotiff_ds = geotiff_ds.rename({1: 'red'})

geotiff_ds.red.plot()


