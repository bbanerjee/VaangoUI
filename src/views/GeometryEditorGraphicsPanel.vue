<template>
  <div id='editor-graphics-container'>
    <div class="uk-card uk-card-default uk-card-large">
      <div class="uk-card-header">
        <h3 class="uk-card-title">Geometry editor</h3>
      </div>
      <div class="uk-card-body">
        <editor-renderer v-bind:size="{w:500, h:500}">
          <editor-scene v-bind:size="size"> 
            <editor-camera  v-bind:size="size"
                           v-bind:position="{x: 5,  y: 5, z: 5 }"> </editor-camera>
          </editor-scene>
        </editor-renderer>
      </div>
    </div>
  </div>
</template>

<script src="./GeometryEditorGraphicsPanel.js">

</script>