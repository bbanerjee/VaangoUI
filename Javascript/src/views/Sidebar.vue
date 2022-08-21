<template>
  <div id="sidebar-tab-list">
    <ul id="sidebar-tabnames" class="uk_nav-default uk-nav-parent-icon" uk-nav>
      <li id="sidebar-tab1" class="uk-active uk-parent">
        <a href="#">Vaango inputs</a>
        <vaango-inputs-sidebar
          v-on:activateSidebarTab="propagateActiveTab"> </vaango-inputs-sidebar>
      </li>
      <li id="sidebar-tab2" class="uk-parent">
        <a href="#">Generate particle distribution</a>
      </li>
    </ul>
  </div>
</template>

<script src="./Sidebar.js">
</script>

<style>
</style>
