<template>
  <div class="uk-card uk-card-default">
    <ul id="vaango-input-tabnames" class="uk_nav-sub">
      <li v-for="(tabName, tabIndex) in tabNames">
        <a href="#" @click="activateSidebarTab(tabIndex, tabName)">{{ tabName }}</a>
      </li>
    </ul>
  </div>
</template>

<script src="./VaangoInputsSidebar.ts"> </script>

<style>
</style>
