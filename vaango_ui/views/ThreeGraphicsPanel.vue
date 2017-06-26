<template>
  <div id='three-graphics-container'>
    <div class="uk-card uk-card-default uk-card-large">
      <div class="uk-card-header">
        <h3 class="uk-card-title">THREE Graphics panel</h3>
      </div>
      <div class="uk-card-body">
        <three-renderer v-bind:size="{w:500, h:500}">
          <three-scene v-bind:size="size"> 
            <three-camera  v-bind:size="size"
                           v-bind:position="{x: 5,  y: 5, z: 5 }"> </three-camera>
            <three-sphere  v-bind:center="{x: -0.5, y: 0.0, z: 0.0}"
                           v-bind:radius=0.5></three-sphere> 
            <three-sphere  v-bind:center="{x: 0.5, y: 0.0, z: 0.0}"
                           v-bind:radius=0.5></three-sphere> 
            <three-ellipsoid-particles> </three-ellipsoid-particles>
          </three-scene>
        </three-renderer>
      </div>
    </div>
  </div>
</template>

<script src="./ThreeGraphicsPanel.ts">

</script>