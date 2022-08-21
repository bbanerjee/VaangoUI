<template>
  <div id='time-control-container' style="font-size:0.75rem;">
    <form class="uk-form-horizontal">

      <div class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
        <label class="uk-form-label" for="init-time-entry">Initial time</label>
        <div class="uk-form-controls">
          <input v-model="initTime" class="uk-input uk-form-width-small" id="init-time-entry" type="text" 
                 v-bind:placeholder="initTime">
          <!--
          <input v-bind:init-time="initTime" 
                 @input="updateInitTime($event.target.value)" class="uk-input uk-form-small" id="init-time-entry" type="text" 
                 placeholder="0.0">
          -->
        </div>
      </div>
      <div class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
        <label class="uk-form-label" for="max-time-entry">Maximum time</label>
        <div class="uk-form-controls">
          <input v-model="maxTime" class="uk-input uk-form-width-small" id="max-time-entry" type="text" 
                 placeholder="1.0">
        </div>
      </div>
      <div class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
        <label class="uk-form-label" for="max-num-steps-entry">Maximum timesteps</label>
        <div class="uk-form-controls">
          <input v-model="maxNumSteps" class="uk-input uk-form-width-small" id="max-num-steps-entry" type="text" 
                 placeholder="99999">
        </div>
      </div>
      <div class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
        <label class="uk-form-label" for="delt-init-entry">Initial timestep size</label>
        <div class="uk-form-controls">
          <input v-model="deltInit" class="uk-input uk-form-width-small" id="delt-init-entry" type="text" 
                 placeholder="1.0e-9">
        </div>
      </div>
      <div class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
        <label class="uk-form-label-large" for="delt-min-entry">Minimum timestep size</label>
        <div class="uk-form-controls">
          <input v-model="deltMin" class="uk-input uk-form-width-small" id="delt-min-entry" type="text" 
                 placeholder="0.0">
        </div>
      </div>
      <div class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
        <label class="uk-form-label-large" for="delt-max-entry">Maximum timestep size</label>
        <div class="uk-form-controls">
          <input v-model="deltMax" class="uk-input uk-form-width-small" id="delt-max-entry" type="text" 
                 placeholder="0.1">
        </div>
      </div>
      <div class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
        <label class="uk-form-label-large" for="max-delt-inc-entry">Maximum timestep increase factor</label>
        <div class="uk-form-controls">
          <input v-model="maxDeltInc" class="uk-input uk-form-width-small" id="max-delt-inc-entry" type="text" 
                 placeholder="1.0">
        </div>
      </div>
      <div class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
        <label class="uk-form-label-large" for="delt-multiplier-entry">CFL timestep mutiplier</label>
        <div class="uk-form-controls">
          <input v-model="deltMultiplier" class="uk-input uk-form-width-small" id="delt-multiplier-entry" type="text" 
                 placeholder="0.3">
        </div>
      </div>
    </form>
    <div>
      <p>
      Init time = {{initTime}}
      </p>
    </div>
  </div>
</template>

<script src="./TimeInputPanel.js">

</script>