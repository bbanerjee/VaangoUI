"""
DXF 3D Reader and Visualizer
Reads and visualizes 3D DXF CAD files with interactive plotting.

Requirements:
    pip install ezdxf matplotlib numpy
"""

import ezdxf
import matplotlib.pyplot as plt
from mpl_toolkits.mplot3d import Axes3D
from mpl_toolkits.mplot3d.art3d import Poly3DCollection
import numpy as np


class DXFReader:
    """Read and parse DXF files."""
    
    def __init__(self, filename):
        """
        Initialize DXF reader.
        
        Parameters:
        -----------
        filename : str
            Path to DXF file
        """
        self.filename = filename
        self.doc = None
        self.modelspace = None
        self.entities = {
            'lines': [],
            'polylines': [],
            'faces': [],
            'meshes': [],
            'circles': [],
            'arcs': [],
            'points': [],
            'text': []
        }
        
    def read(self):
        """Read the DXF file."""
        print(f"Reading DXF file: {self.filename}")
        try:
            self.doc = ezdxf.readfile(self.filename)
            self.modelspace = self.doc.modelspace()
            print(f"DXF version: {self.doc.dxfversion}")
            print(f"Total entities: {len(list(self.modelspace))}")
            return True
        except IOError:
            print(f"Error: File '{self.filename}' not found.")
            return False
        except ezdxf.DXFStructureError:
            print(f"Error: Invalid DXF file structure.")
            return False
    
    def parse_entities(self):
        """Parse all entities from modelspace."""
        print("\nParsing entities...")
        
        for entity in self.modelspace:
            entity_type = entity.dxftype()
            
            if entity_type == 'LINE':
                self._parse_line(entity)
            elif entity_type == 'LWPOLYLINE':
                self._parse_lwpolyline(entity)
            elif entity_type == 'POLYLINE':
                self._parse_polyline(entity)
            elif entity_type == '3DFACE':
                self._parse_3dface(entity)
            elif entity_type == 'MESH':
                self._parse_mesh(entity)
            elif entity_type == 'CIRCLE':
                self._parse_circle(entity)
            elif entity_type == 'ARC':
                self._parse_arc(entity)
            elif entity_type == 'POINT':
                self._parse_point(entity)
            elif entity_type == 'TEXT' or entity_type == 'MTEXT':
                self._parse_text(entity)
        
        self._print_summary()
    
    def _parse_line(self, entity):
        """Parse LINE entity."""
        start = entity.dxf.start
        end = entity.dxf.end
        self.entities['lines'].append({
            'start': (start.x, start.y, start.z),
            'end': (end.x, end.y, end.z),
            'layer': entity.dxf.layer
        })
    
    def _parse_lwpolyline(self, entity):
        """Parse LWPOLYLINE entity (2D)."""
        points = [(p[0], p[1], 0) for p in entity.get_points('xy')]
        if len(points) > 1:
            self.entities['polylines'].append({
                'points': points,
                'closed': entity.closed,
                'layer': entity.dxf.layer
            })
    
    def _parse_polyline(self, entity):
        """Parse POLYLINE entity (3D)."""
        points = [(v.dxf.location.x, v.dxf.location.y, v.dxf.location.z) 
                  for v in entity.vertices]
        if len(points) > 1:
            self.entities['polylines'].append({
                'points': points,
                'closed': entity.is_closed,
                'layer': entity.dxf.layer
            })
    
    def _parse_3dface(self, entity):
        """Parse 3DFACE entity."""
        vertices = []
        for i in range(4):
            try:
                v = entity.dxf.get(f'vtx{i}')
                vertices.append((v.x, v.y, v.z))
            except:
                break
        
        if len(vertices) >= 3:
            self.entities['faces'].append({
                'vertices': vertices,
                'layer': entity.dxf.layer
            })
    
    def _parse_mesh(self, entity):
        """Parse MESH entity."""
        vertices = [(v.x, v.y, v.z) for v in entity.vertices]
        faces = list(entity.faces)
        
        self.entities['meshes'].append({
            'vertices': vertices,
            'faces': faces,
            'layer': entity.dxf.layer
        })
    
    def _parse_circle(self, entity):
        """Parse CIRCLE entity."""
        center = entity.dxf.center
        self.entities['circles'].append({
            'center': (center.x, center.y, center.z),
            'radius': entity.dxf.radius,
            'layer': entity.dxf.layer
        })
    
    def _parse_arc(self, entity):
        """Parse ARC entity."""
        center = entity.dxf.center
        self.entities['arcs'].append({
            'center': (center.x, center.y, center.z),
            'radius': entity.dxf.radius,
            'start_angle': entity.dxf.start_angle,
            'end_angle': entity.dxf.end_angle,
            'layer': entity.dxf.layer
        })
    
    def _parse_point(self, entity):
        """Parse POINT entity."""
        loc = entity.dxf.location
        self.entities['points'].append({
            'location': (loc.x, loc.y, loc.z),
            'layer': entity.dxf.layer
        })
    
    def _parse_text(self, entity):
        """Parse TEXT/MTEXT entity."""
        loc = entity.dxf.insert if hasattr(entity.dxf, 'insert') else entity.dxf.location
        self.entities['text'].append({
            'location': (loc.x, loc.y, loc.z),
            'text': entity.dxf.text if hasattr(entity.dxf, 'text') else entity.text,
            'layer': entity.dxf.layer
        })
    
    def _print_summary(self):
        """Print summary of parsed entities."""
        print("\n=== Entity Summary ===")
        print(f"Lines: {len(self.entities['lines'])}")
        print(f"Polylines: {len(self.entities['polylines'])}")
        print(f"3D Faces: {len(self.entities['faces'])}")
        print(f"Meshes: {len(self.entities['meshes'])}")
        print(f"Circles: {len(self.entities['circles'])}")
        print(f"Arcs: {len(self.entities['arcs'])}")
        print(f"Points: {len(self.entities['points'])}")
        print(f"Text: {len(self.entities['text'])}")
    
    def get_bounds(self):
        """Calculate bounding box of all entities."""
        all_points = []
        
        # Collect all points from various entities
        for line in self.entities['lines']:
            all_points.extend([line['start'], line['end']])
        
        for polyline in self.entities['polylines']:
            all_points.extend(polyline['points'])
        
        for face in self.entities['faces']:
            all_points.extend(face['vertices'])
        
        for mesh in self.entities['meshes']:
            all_points.extend(mesh['vertices'])
        
        for circle in self.entities['circles']:
            c = circle['center']
            r = circle['radius']
            all_points.extend([
                (c[0]-r, c[1]-r, c[2]),
                (c[0]+r, c[1]+r, c[2])
            ])
        
        if not all_points:
            return None
        
        points = np.array(all_points)
        return {
            'min': points.min(axis=0),
            'max': points.max(axis=0),
            'center': points.mean(axis=0)
        }


class DXFVisualizer:
    """Visualize 3D DXF data using matplotlib."""
    
    def __init__(self, reader):
        """
        Initialize visualizer.
        
        Parameters:
        -----------
        reader : DXFReader
            DXFReader instance with parsed entities
        """
        self.reader = reader
        self.fig = None
        self.ax = None
    
    def plot(self, show_grid=True, show_axes=True, figsize=(12, 9)):
        """
        Create 3D visualization.
        
        Parameters:
        -----------
        show_grid : bool
            Show grid lines
        show_axes : bool
            Show axis labels
        figsize : tuple
            Figure size (width, height)
        """
        self.fig = plt.figure(figsize=figsize)
        self.ax = self.fig.add_subplot(111, projection='3d')
        
        # Plot different entity types
        self._plot_lines()
        self._plot_polylines()
        self._plot_faces()
        self._plot_meshes()
        self._plot_circles()
        self._plot_arcs()
        self._plot_points()
        
        # Set labels and styling
        self.ax.set_xlabel('X')
        self.ax.set_ylabel('Y')
        self.ax.set_zlabel('Z')
        self.ax.set_title('DXF 3D Viewer', fontsize=14, fontweight='bold')
        
        # Set equal aspect ratio
        bounds = self.reader.get_bounds()
        if bounds:
            self._set_axes_equal(bounds)
        
        if not show_grid:
            self.ax.grid(False)
        
        if not show_axes:
            self.ax.set_axis_off()
        
        plt.tight_layout()
        plt.show()
    
    def _plot_lines(self):
        """Plot LINE entities."""
        for line in self.reader.entities['lines']:
            start = line['start']
            end = line['end']
            self.ax.plot3D(
                [start[0], end[0]], 
                [start[1], end[1]], 
                [start[2], end[2]], 
                'b-', linewidth=1, alpha=0.7
            )
    
    def _plot_polylines(self):
        """Plot POLYLINE entities."""
        for polyline in self.reader.entities['polylines']:
            points = np.array(polyline['points'])
            if polyline['closed']:
                points = np.vstack([points, points[0]])
            
            self.ax.plot3D(
                points[:, 0], 
                points[:, 1], 
                points[:, 2], 
                'g-', linewidth=1.5, alpha=0.8
            )
    
    def _plot_faces(self):
        """Plot 3DFACE entities."""
        faces = []
        for face in self.reader.entities['faces']:
            vertices = face['vertices']
            faces.append(vertices)
        
        if faces:
            collection = Poly3DCollection(
                faces, 
                alpha=0.5, 
                facecolor='cyan', 
                edgecolor='darkblue',
                linewidths=0.5
            )
            self.ax.add_collection3d(collection)
    
    def _plot_meshes(self):
        """Plot MESH entities."""
        for mesh in self.reader.entities['meshes']:
            vertices = np.array(mesh['vertices'])
            faces = mesh['faces']
            
            face_vertices = []
            for face in faces:
                face_verts = [vertices[i] for i in face]
                face_vertices.append(face_verts)
            
            collection = Poly3DCollection(
                face_vertices,
                alpha=0.6,
                facecolor='yellow',
                edgecolor='orange',
                linewidths=0.5
            )
            self.ax.add_collection3d(collection)
    
    def _plot_circles(self):
        """Plot CIRCLE entities as 3D circles."""
        for circle in self.reader.entities['circles']:
            center = circle['center']
            radius = circle['radius']
            
            theta = np.linspace(0, 2*np.pi, 50)
            x = center[0] + radius * np.cos(theta)
            y = center[1] + radius * np.sin(theta)
            z = np.full_like(x, center[2])
            
            self.ax.plot3D(x, y, z, 'r-', linewidth=1.5, alpha=0.7)
    
    def _plot_arcs(self):
        """Plot ARC entities."""
        for arc in self.reader.entities['arcs']:
            center = arc['center']
            radius = arc['radius']
            start_angle = np.radians(arc['start_angle'])
            end_angle = np.radians(arc['end_angle'])
            
            theta = np.linspace(start_angle, end_angle, 50)
            x = center[0] + radius * np.cos(theta)
            y = center[1] + radius * np.sin(theta)
            z = np.full_like(x, center[2])
            
            self.ax.plot3D(x, y, z, 'm-', linewidth=1.5, alpha=0.7)
    
    def _plot_points(self):
        """Plot POINT entities."""
        if self.reader.entities['points']:
            points = np.array([p['location'] for p in self.reader.entities['points']])
            self.ax.scatter3D(
                points[:, 0], 
                points[:, 1], 
                points[:, 2], 
                c='red', 
                marker='o', 
                s=20
            )
    
    def _set_axes_equal(self, bounds):
        """Set 3D plot axes to equal scale."""
        min_vals = bounds['min']
        max_vals = bounds['max']
        
        max_range = (max_vals - min_vals).max() / 2.0
        mid = bounds['center']
        
        self.ax.set_xlim(mid[0] - max_range, mid[0] + max_range)
        self.ax.set_ylim(mid[1] - max_range, mid[1] + max_range)
        self.ax.set_zlim(mid[2] - max_range, mid[2] + max_range)


# Main usage example
def view_dxf(filename, show_grid=True, show_axes=True):
    """
    Read and visualize a DXF file.
    
    Parameters:
    -----------
    filename : str
        Path to DXF file
    show_grid : bool
        Show grid in visualization
    show_axes : bool
        Show axis labels
    """
    # Read DXF file
    reader = DXFReader(filename)
    if not reader.read():
        return
    
    # Parse entities
    reader.parse_entities()
    
    # Get and print bounds
    bounds = reader.get_bounds()
    if bounds:
        print(f"\n=== Bounding Box ===")
        print(f"Min: {bounds['min']}")
        print(f"Max: {bounds['max']}")
        print(f"Center: {bounds['center']}")
    
    # Visualize
    print("\nCreating visualization...")
    visualizer = DXFVisualizer(reader)
    visualizer.plot(show_grid=show_grid, show_axes=show_axes)


if __name__ == "__main__":
    # Example usage
    view_dxf("model.dxf", show_grid=True, show_axes=True)
    
    # Or with more control:
    # reader = DXFReader("model.dxf")
    # reader.read()
    # reader.parse_entities()
    # visualizer = DXFVisualizer(reader)
    # visualizer.plot()

### Simple usage
#from dxf_viewer import view_dxf

# Simple usage
#view_dxf("model.dxf")

# With options
#view_dxf("model.dxf", show_grid=True, show_axes=True)

### Advanced usage
#from dxf_viewer import DXFReader, DXFVisualizer

# Read and parse
#reader = DXFReader("model.dxf")
#reader.read()
#reader.parse_entities()

# Access parsed data
#print(f"Found {len(reader.entities['lines'])} lines")
#print(f"Found {len(reader.entities['faces'])} faces")

# Get bounding box
#bounds = reader.get_bounds()
#print(f"Model center: {bounds['center']}")

# Visualize
#visualizer = DXFVisualizer(reader)
#visualizer.plot(figsize=(14, 10))
```

## Features

#**Supported DXF Entities:**
#- ✅ **LINE** - 3D lines
#- ✅ **POLYLINE** - 3D polylines
#- ✅ **LWPOLYLINE** - Lightweight polylines (2D)
#- ✅ **3DFACE** - Triangular/quad faces
#- ✅ **MESH** - 3D meshes
#- ✅ **CIRCLE** - 3D circles
#- ✅ **ARC** - 3D arcs
#- ✅ **POINT** - 3D points
#- ✅ **TEXT/MTEXT** - Text entities (parsed but not displayed)

#**Visualization Features:**
#- Interactive 3D rotation and zoom
#- Color-coded entity types
#- Automatic bounding box calculation
#- Equal aspect ratio for accurate proportions
#- Customizable grid and axes

## Output Example

#The script will print:
#```
#Reading DXF file: model.dxf
#DXF version: AC1027
#Total entities: 1234
#
#=== Entity Summary ===
#Lines: 456
#Polylines: 78
#3D Faces: 234
#Meshes: 12
#...
#
#=== Bounding Box ===
#Min: [0.0, 0.0, 0.0]
#Max: [100.0, 100.0, 50.0]
#Center: [50.0, 50.0, 25.0]
