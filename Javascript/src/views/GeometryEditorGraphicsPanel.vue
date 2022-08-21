<template>
  <div id='editor-graphics-container'>
    <div class="uk-card uk-card-default uk-card-large">
      <div class="uk-card-header">
        <h3 class="uk-card-title">Geometry editor</h3>
      </div>
      <div class="uk-card-body">
        <geometry-editor-renderer v-bind:size="{w:500, h:500}">
          <geometry-editor-scene v-bind:size="size"> 
            <geometry-editor-camera  
              v-bind:size="size"
              v-bind:position="{x: 5,  y: 5, z: 5 }"> 
            </geometry-editor-camera>
          </geometry-editor-scene>
        </geometry-editor-renderer>
      </div>
    </div>
  </div>
</template>

<script src="./GeometryEditorGraphicsPanel.js">

</script>