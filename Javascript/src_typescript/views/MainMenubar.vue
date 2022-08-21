<template>
  <div id="main-menubar-container" class="main-menubar uk-child-width-1-1@m">
    <nav class="uk-navbar uk-navbar-container uk-background-primary">
      <div class="uk-navbar-left">
        <div>
          <a href="#menu" 
             id="main-menubar-dropdown-icon" 
             v-on:mouseover="addToggleMenu()"
             class="uk-navbar-toggle" uk-navbar-toggle-icon></a>
          <div id="main-menubar-dropdown-menu" class="main-menubar-dropdown uk-navbar-dropdown uk-width-auto" 
               uk-drop="mode: click; offset: -20;">
               <!--uk-drop="mode: click; cls-drop: uk-navbar-dropdown; 
                        boundary: !nav; flip: x; pos: bottom-justify"> -->
            <ul id="main-menubar-names" 
                class="main-menubar-ul uk_nav uk-nav-default uk-link-reset">
              <!-- v-bind:class="{main-menubar-li-active : selectedMenuIndex }" -->
              <li class="main-menubar-li"
                  v-for="(menuItem, menuIndex) in menuItems"
                  v-on:mouseover="selectMenu(menuItem, menuIndex)" 
                  v-on:click="removeToggleMenu(menuItem, menuIndex)"
                  v-bind:class="{'main-menubar-li-active': getSelectedMenuIndex === menuIndex}"
                  >
                <div class="uk-grid uk-visible-toggle">
                <a href="#">{{ menuItem }}</a>
                <input v-if="menuIndex === 0" 
                       type="file" 
                       v-on:change="readVTKXMLParticleFile"
                       class="main-menubar-input uk-input uk-width-auto uk-hidden-hover">
                <input v-else-if="menuIndex === 1" 
                       type="file" 
                       v-on:change="readGeneratedParticleFile"
                       class="main-menubar-input uk-input uk-width-auto uk-hidden-hover">
                <input v-else-if="menuIndex === 2" 
                       type="file" 
                       v-on:change="readVaangoInputFile"
                       class="main-menubar-input uk-input uk-width-auto uk-hidden-hover">
                <input v-else-if="menuIndex === 3" 
                       v-on:change="saveVaangoInputFile"
                       type="file" 
                       class="main-menubar-input uk-input uk-width-auto uk-hidden-hover">
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="product-name uk-navbar-right">
         VaangoUI 0.0.1
      </div>
    </nav>
  </div>
</template>

<script src="./MainMenubar.ts">
</script>

<style>
  .main-menubar {
    height: 3em;
  }
  .main-menubar-dropdown {
    box-shadow:0 5px 12px #0e6dcd;
  }
  .main-menubar-ul {
    text-indent: -30px;
    padding-left: 0em;
    margin-bottom: 0px;
  }
  .main-menubar-li {
    display: table-row;
  }
  .main-menubar-li-active {
    display: table-row;
    color:white;
    background-color: #333;
  }
  a:hover i {
    display: inline-block;
    text-decoration: none;
  }
  .main-menubar-input {
    margin-left: 30px;
    /*color:white;*/
    /*background-color: #333;*/
  }
  .produc-name-text {
    color: white;
  }
  .uk-navbar-container:not(.uk-navbar-transparent) {
    background-color: #333;
  }
  .uk-navbar-container {
    height: 2em;
  }
  .uk-navbar-left {
    height: 2em;
  }
  .uk-navbar-right {
    height: 2em;
    color: white;
  }
  .uk-navbar-toggle-icon {
    color: white;
  }
  .uk-navbar-dropdown {
    padding: 10px;
  }
  .uk-grid {
    margin-left: 0px;
  }
  .uk-drop {
    top: 20px;
  }
</style>