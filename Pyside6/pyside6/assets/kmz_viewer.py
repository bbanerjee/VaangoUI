import zipfile
from xml.etree import ElementTree as ET

def view_kmz(kmz_file):
    with zipfile.ZipFile(kmz_file, 'r') as kmz:
        # Find the KML file inside
        kml_file = [f for f in kmz.namelist() if f.endswith('.kml')][0]
        
        # Read and parse KML
        with kmz.open(kml_file) as kml:
            tree = ET.parse(kml)
            root = tree.getroot()
            
            # Extract placemarks
            ns = {'kml': 'http://www.opengis.net/kml/2.2'}
            for placemark in root.findall('.//kml:Placemark', ns):
                name = placemark.find('kml:name', ns)
                coords = placemark.find('.//kml:coordinates', ns)
                
                print(f"Name: {name.text if name is not None else 'N/A'}")
                print(f"Coords: {coords.text if coords is not None else 'N/A'}")
                print("---")

# Usage
view_kmz('viz.hh_hillshade.kmz')
