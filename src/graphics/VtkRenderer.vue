<template>
  <div>
    <slot name="vtk">
    <div v-on:click="zoomIn($event)" 
         v-on:dblclick="zoomOut($event)"
         ref="vtk-graphics-container"></div>
    <slot>
  </div>
</template>

<script src="./VtkRenderer.js"> </script>
