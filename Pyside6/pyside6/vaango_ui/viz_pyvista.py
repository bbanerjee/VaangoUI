"""
PyVista-based 3D view alternative for Vaango UI.
Provides a `Vaango3DWindow` widget with the same minimal API used
by `main_window.py`: `update_particles(particle_list)`,
`add_domain_box(box_min, box_max, color, opacity)`, and `clear_domain_box()`.

This module uses `pyvista` and `pyvistaqt` when available; if not,
it provides a placeholder widget that displays an error message.
"""

from PySide6.QtWidgets import QWidget, QVBoxLayout, QLabel
from PySide6.QtCore import Qt

try:
    import pyvista as pv
    from pyvistaqt import QtInteractor
    _HAS_PYVISTA = True
except Exception:
    pv = None
    QtInteractor = None
    _HAS_PYVISTA = False


class Vaango3DWindow(QWidget):
    """A QWidget that embeds a PyVista QtInteractor.

    Methods expected by the rest of the application:
    - update_particles(particle_list)
    - add_domain_box(box_min, box_max, color="green", opacity=0.3)
    - clear_domain_box()

    The particle objects are expected to provide at least: center (with x,y,z),
    radius, shape (optional). This implementation is best-effort and lightweight.
    """

    def __init__(self, parent=None):
        super().__init__(parent)
        layout = QVBoxLayout(self)
        layout.setContentsMargins(0, 0, 0, 0)

        if not _HAS_PYVISTA:
            lbl = QLabel("PyVista/pyvistaqt not available. Install pyvista and pyvistaqt to enable 3D view.")
            lbl.setAlignment(Qt.AlignCenter)
            layout.addWidget(lbl)
            self.plotter = None
            self._domain_actor = None
            self._mesh_actor = None
            self._particle_actors = []
            return

        # Create the PyVista QtInteractor
        self.plotter = QtInteractor(self)
        layout.addWidget(self.plotter)

        # configure plotter
        try:
            self.plotter.set_background('black')
        except Exception:
            try:
                self.plotter.set_background((0, 0, 0))
            except Exception:
                pass

        # Add an axes orientation widget for user reference
        try:
            # Build axes actor
            axes = pv.Axes()
            axes_actor = axes.axes_actor
            try:
                # Use a simple shaft style (0) and set white axis colors
                axes_actor.shaft_type = 0
                try:
                    axes_actor.x_axis_shaft_properties.color = (1.0, 1.0, 1.0)
                    axes_actor.y_axis_shaft_properties.color = (1.0, 1.0, 1.0)
                    axes_actor.z_axis_shaft_properties.color = (1.0, 1.0, 1.0)
                except Exception:
                    pass
            except Exception:
                pass

            try:
                # Place the orientation widget in the lower-left quadrant
                _ = self.plotter.add_orientation_widget(axes_actor, viewport=(0, 0, 0.5, 0.5))
            except Exception:
                # Older/newer pyvista versions may differ; ignore if unavailable
                pass
        except Exception:
            pass

        # store references so we can remove later
        self._particle_actors = []
        self._domain_actor = None
        self._mesh_actor = None

        # initial camera setup
        try:
            self.plotter.enable_trackball_style()
        except Exception:
            pass

    def update_particles(self, particle_list):
        """Clear existing particle actors and add new ones."""
        if not _HAS_PYVISTA or self.plotter is None:
            return
        try:
            # remove previous actors
            for actor in list(self._particle_actors):
                try:
                    self.plotter.remove_actor(actor)
                except Exception:
                    try:
                        self.plotter.remove_actor(actor, reset_camera=False)
                    except Exception:
                        pass
            self._particle_actors = []

            for p in particle_list:
                try:
                    cx = float(p.center.x)
                    cy = float(p.center.y)
                    cz = float(p.center.z)
                    r = float(getattr(p, 'radius', getattr(p, 'r', 0.1)))
                    # create sphere mesh and add
                    mesh = pv.Sphere(radius=r, center=(cx, cy, cz), theta_resolution=24, phi_resolution=24)
                    actor = self.plotter.add_mesh(mesh, color='red', opacity=1.0)
                    self._particle_actors.append(actor)
                except Exception:
                    continue
            try:
                self.plotter.render()
            except Exception:
                pass
        except Exception:
            pass

    def add_domain_box(self, box_min, box_max, color="green", opacity=0.3):
        """Add or update a box representing the simulation domain.
        Creates a solid/outline box and recenters the camera on it.
        """
        if not _HAS_PYVISTA or self.plotter is None:
            return
        try:
            minx, miny, minz = float(box_min[0]), float(box_min[1]), float(box_min[2])
            maxx, maxy, maxz = float(box_max[0]), float(box_max[1]), float(box_max[2])
            sx = maxx - minx
            sy = maxy - miny
            sz = maxz - minz
            # avoid degenerate extents
            sx = sx if sx != 0 else 1e-3
            sy = sy if sy != 0 else 1e-3
            sz = sz if sz != 0 else 1e-3

            cx = (minx + maxx) / 2.0
            cy = (miny + maxy) / 2.0
            cz = (minz + maxz) / 2.0

            # remove existing domain actor
            try:
                if self._domain_actor is not None:
                    try:
                        self.plotter.remove_actor(self._domain_actor)
                    except Exception:
                        pass
                    self._domain_actor = None
            except Exception:
                pass

            # create a cube (box)
            try:
                cube = pv.Cube(center=(cx, cy, cz), x_length=sx, y_length=sy, z_length=sz)
                # add solid transparent surface
                surf_actor = self.plotter.add_mesh(cube, color=color, opacity=opacity, show_edges=False)
                # add outline for wireframe visibility
                outline = cube.outline()
                outline_actor = self.plotter.add_mesh(outline, color='white', line_width=2)

                # keep reference so we can remove later (store tuple)
                self._domain_actor = (surf_actor, outline_actor)

                # position camera to see the box
                try:
                    self.plotter.set_focus((cx, cy, cz))
                    # move camera back along z by a distance scaled to max extent
                    dist = max(sx, sy, sz) * 3.0 + 10.0
                    # current camera position retrieval depends on pyvista version; use reset_camera with bounds
                    self.plotter.reset_camera()
                except Exception:
                    pass

                try:
                    self.plotter.render()
                except Exception:
                    pass
            except Exception:
                pass
        except Exception:
            pass

    def clear_domain_box(self):
        if not _HAS_PYVISTA or self.plotter is None:
            return
        try:
            if self._domain_actor is not None:
                try:
                    for a in self._domain_actor:
                        try:
                            self.plotter.remove_actor(a)
                        except Exception:
                            pass
                except Exception:
                    try:
                        self.plotter.remove_actor(self._domain_actor)
                    except Exception:
                        pass
                self._domain_actor = None
            try:
                self.plotter.render()
            except Exception:
                pass
        except Exception:
            pass

    def add_stl_mesh(self, vertices, faces):
        """Add an STL mesh given vertices and faces arrays."""
        if not _HAS_PYVISTA or self.plotter is None:
            return
        print(f"[Vaango3DWindow] add_stl_mesh called with {len(vertices)} vertices and {len(faces)} faces")

        try:
            import numpy as np

            # Remove existing mesh
            if self._mesh_actor is not None:
                self.plotter.remove_actor(self._mesh_actor)
            
            if len(vertices) > 0 and len(faces) > 0:
                # Create PyVista mesh
                # Convert faces to PyVista format (prepend triangle count)
                pv_faces = []
                for face in faces:
                    pv_faces.extend([3, face[0], face[1], face[2]])
                
                mesh = pv.PolyData(vertices, np.array(pv_faces))
                
                # Add mesh with wireframe and surface
                #self._mesh_actor = self.plotter.add_mesh(
                #    mesh, 
                #    color='lightblue', 
                #    show_edges=True,
                #    edge_color='white',
                #    opacity=0.7,
                #    name='mesh'
                #)

                # Shaded surface
                self._mesh_actor = self.plotter.add_mesh(
                    mesh, 
                    color='lightblue', 
                    smooth_shading=True,
                    opacity=1.0,
                    name='mesh'
                )
                
                # Fit camera to mesh
                self.plotter.reset_camera()
                
        except Exception as e:
            print(f"Error updating mesh: {e}")

if __name__ == '__main__':
    # Tiny demo when run directly
    from PySide6.QtWidgets import QApplication
    import sys

    app = QApplication(sys.argv)
    win = Vaango3DWindow()
    win.resize(800, 600)
    win.show()
    if _HAS_PYVISTA:
        # demo box
        win.add_domain_box((0, 0, 0), (1, 1, 1))
    sys.exit(app.exec())
