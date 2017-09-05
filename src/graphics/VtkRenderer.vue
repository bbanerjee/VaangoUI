<template>
  <div>
    <slot name="vtk"></slot>
    <div v-on:click="zoomIn($event)" 
         v-on:dblclick="zoomOut($event)"
         ref="vtk-graphics-container"></div>
    <slot></slot>
  </div>
</template>

<script src="./VtkRenderer.js"> </script>
