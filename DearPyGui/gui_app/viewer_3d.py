# viewer_3d.py
import dearpygui.dearpygui as dpg
import pymeshlab
import numpy as np

class Viewer3D:
    def __init__(self, window_tag="3d_viewer", width=800, height=600):
        self.window_tag = window_tag
        self.plot_tag = f"{window_tag}_plot"
        self.plot3d_tag = f"{window_tag}_plot3d"
        self.width = width
        self.height = height
        
        # Mesh data storage
        self.mesh_actor = None

        # View state
        self.rotation = [0, 0, 0]
        self.center = [0, 0, 0]
        self.scale = 1.0

    def show(self, pos = None):
        if not dpg.does_item_exist(self.window_tag):
            print("Creating 3D viewer window")
            with dpg.window(label="3D Viewer",
                            #tag=self.window_tag,
                            #width=self.width,
                            #height=self.height,
                            #pos=pos,
                            #on_close=self._on_close
                            ):

                # Control panel
                print("Adding control panel")
                with dpg.group(horizontal=True):
                    dpg.add_button(label="Reset View", callback=self._reset_view)
                    dpg.add_button(label="Clear Mesh", callback=self.clear_mesh)
                    dpg.add_text("Scale:")
                    dpg.add_slider_float(
                        tag=f"{self.window_tag}_scale",
                        default_value=1.0,
                        min_value=0.1,
                        max_value=5.0,
                        width=150,
                        callback=self._on_scale_change
                    )
                
                dpg.add_separator()
                
                # 3D plot
                print("Adding 3D plot")
                with dpg.plot(
                    label="",
                    tag=self.plot_tag,
                    width=-1,
                    height=-1,
                    equal_aspects=True
                ):
                    print("Adding 3D plot legend")
                    dpg.add_plot_legend()
                    
                    # Configure axes
                    print("Adding 3D plot axes")
                    dpg.add_plot_axis(dpg.mvXAxis, label="X", tag=f"{self.plot_tag}_x")
                    dpg.add_plot_axis(dpg.mvYAxis, label="Y", tag=f"{self.plot_tag}_y")
                    
                    print("Adding Z axis")
                    with dpg.plot_axis(dpg.mvZAxis, label="Z", tag=f"{self.plot_tag}_z"):
                        pass

    def load_mesh(self, ml_mesh, wireframe=False, opacity=1.0):
        self.show()
        verts = np.array(ml_mesh.vertex_matrix(), dtype=float)
        faces = np.array(ml_mesh.face_matrix(), dtype=int) if ml_mesh.face_number() > 0 \
                else np.array(ml_mesh.cell_matrix()[:, :4], dtype=int)  # tet faces

        if self.mesh_actor:
            dpg.delete_item(self.mesh_actor)

        flat_faces = faces.flatten()
        color = [100, 180, 255, int(255 * opacity)]

        self.mesh_actor = dpg.add_mesh(
            parent=self.plot_tag,
            vertices=verts.tolist(),
            faces=flat_faces.tolist(),
            face_count=len(faces),
            color=color,
            shading=True,
            wireframe=wireframe
        )

        # Auto-fit view
        for axis in (dpg.mvXAxis, dpg.mvYAxis, dpg.mvZAxis):
            dpg.fit_axis_data(dpg.get_axis_tag(self.plot_tag, axis))

    def clear_mesh(self):
        """Remove all mesh data from the viewer."""
        self.mesh_actor = None 
        # Remove all mesh series
        #for series_tag in self.mesh_series:
        #    if dpg.does_item_exist(series_tag):
        #        dpg.delete_item(series_tag)
        #self.mesh_series.clear()

    def _on_close(self):
        """Handle window close event."""
        self.clear_mesh()

    def update(self):
        pass

# Global instance
viewer_3d = Viewer3D()