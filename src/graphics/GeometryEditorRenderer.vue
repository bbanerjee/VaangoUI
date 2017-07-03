<template>
  <div id = "geometry-editor--div">
    <slot></slot>
    <div v-on:keydown="keydown($event)" 
         v-on:keyup="keyup($event)"
         v-on:mousedown="mousedown($event)"
         v-on:mousemove="mousemove($event)"
         v-on:mouseup="mouseup($event)"
         v-on:mousewheel="mousewheel($event)"
         v-on:mousedown.ctrl="startRotation($event)"
         v-on:mouseup.ctrl="endRotation($event)"
         v-on:contextmenu="contextmenu($event)"
         ref = "editor-container"
         id = "editor-graphics-div">
    </div>
  </div>
</template>

<script src="./GeometryEditorRenderer.js"> </script>
