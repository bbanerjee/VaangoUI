<template>
  <div id='vtk-graphics-container'>
    <div class="uk-card uk-card-default uk-card-large">
      <div class="uk-card-header">
        <h3 class="uk-card-title">VTK Graphics panel</h3>
      </div>
      <div class="uk-card-body">
        <vtk-renderer v-bind:size="size">
          <vtk-sphere  v-bind:center="{x: -0.5, y: 0.0, z: 0.0}"
                       v-bind:radius=0.5></vtk-sphere> 
          <vtk-sphere  v-bind:center="{x: 0.5, y: 0.0, z: 0.0}"
                       v-bind:radius=0.5></vtk-sphere> 
          <vtk-ellipsoid-particles> </vtk-ellipsoid-particles>
        </vtk-renderer>
      </div>
    </div>
  </div>
</template>

<script src="./VtkGraphicsPanel.ts">

</script>