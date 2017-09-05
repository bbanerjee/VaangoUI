<template>
  <div id='main-text-input-container'> 
    <div class="uk-card uk-card-default uk-card-large">
      <div class="uk-card-header">
         <!-- <h3 class="uk-card-title">Main panel</h3> -->
         <h3 v-if='sidebarTabName === ""' class="uk-card-title">Main panel</h3>
         <h3 v-else class="uk-card-title">{{sidebarTabName}}</h3>

      </div>
      <div class="uk-card-body">
        <keep-alive>
          <general-input-panel v-if='sidebarTabIndex === 0'> </general-input-panel>
        </keep-alive>
        <keep-alive>
          <time-input-panel v-if='sidebarTabName === "Timestep controls"'></time-input-panel>
        </keep-alive>
        <keep-alive>
          <mpm-input-panel v-if='sidebarTabIndex === 3'> </mpm-input-panel>
        </keep-alive>
        <keep-alive>
          <ice-input-panel v-if='sidebarTabIndex === 5'> </ice-input-panel>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script src="./MainTextPanel.js"> </script>