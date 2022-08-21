<template>
  <div id='vaango-main-panel' 
       class="uk-container uk-container-center uk-margin-remove-top 
              uk-margin-remove-left uk-margin-remove-right 
              uk-margin-large-bottom"> 

    <main-menubar class="uk-child-width-1-1"> 
    </main-menubar>

    <div id="container" class="uk-flex uk-flex-around">

      <div class="uk-flex-vertical uk-flex-around">

        <sidebar
          class="uk-width-small"
          v-on:propagateActiveTab="updateActiveTab">
        </sidebar>

        <main-text-panel
          class="uk-width-medium"
          v-bind:sidebar-tab-index="sidebarTabIndex"
          v-bind:sidebar-tab-name="sidebarTabName">
        </main-text-panel>

      </div>

      <div class="uk-flex-vertical">

        <div v-if="taskgraphEditorIsActive === false" class="uk-width-xxlarge">
          <three-graphics-panel class="uk-width-xxlarge">
          </three-graphics-panel>
        </div>

        <div v-else class="uk-width-xxlarge">
          <task-graph-editor-panel>
          </task-graph-editor-panel>
        </div> 

        <div v-if="geometryEditorIsActive === false && 
                  taskgraphEditorIsActive === false" class="uk-width-xxlarge">
          <vtk-graphics-panel>
          </vtk-graphics-panel>
        </div> 

        <div v-else class="uk-width-xxlarge">
          <geometry-editor-graphics-panel>
          </geometry-editor-graphics-panel>
        </div> 

      </div>

    </div>

  </div>
</template>

<script src="./VaangoMainPanel.js"> </script>

<style>
 .uk-container {
   padding-left: 5px;
   padding-right: 5px;
 }
</style>
