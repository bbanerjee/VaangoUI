<template>
  <div id='ice-input-container' style="font-size:0.75rem;">
    <form class="uk-form-horizontal">

      <!-- 3D or axisymmetric -->
      <div class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
        <span class="uk-form-label">Dimensions</span>
        <div class="uk-form-controls uk-form-controls-text">
          <label v-for="(dimLabel, dimIndex) in d_dimensionLabels">
            <input v-model="d_dimension" :value="dimIndex" class="uk-radio" type="radio" name="dimRadioBtn"> {{dimLabel}} 
          </label>
        </div>
      </div>

      <!-- Solution technique -->
      <div class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
        <label class="uk-form-label" for="integration-type">{{d_iceAlgoLabel}}</label>
        <div class="uk-form-controls">
          <select v-model="d_iceAlgo" 
                  :value="d_iceAlgo"
                  @change="updateICEAlgo()"
                  class="uk-select uk-form-width-small" 
                  id="integration-type">
            <option v-for="(label, index) in d_iceAlgoItems">{{label}}</option>
          </select>
        </div>
      </div>

      <!-- Advection algorithm -->
      <div class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
        <label class="uk-form-label" for="interpolation-type">{{d_advectAlgoLabel}}</label>
        <div class="uk-form-controls">
          <select v-model="d_advectAlgo" 
                  :value="d_advectAlgo"
                  @change="updateAdvectAlgo()"
                  class="uk-select uk-form-width-small" 
                  id="interpolation-type">
            <option v-for="(label, index) in d_advectAlgoItems">{{label}}</option>
          </select>
        </div>
      </div>

      <!-- ICE simulation flags -->
      <div class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
        <label class="uk-form-label" for="ice-flags">{{d_iceFlagLabel}}</label>
        <div class="uk-form-controls">
          <select v-model="d_iceFlags" 
                  @change="updateICEFlags()"
                  class="uk-select uk-form-width-medium" 
                  id="ice-flags" multiple>
            <option v-for="(label, index) in d_iceFlagItems"
                    v-bind:value="{label: label, index: index}">{{label}}</option>
          </select>
        </div>
      </div>

      <!-- Limiting conditions -->
      <div class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
        <hr class="uk-hr">
        Simulation limits
      </div>
      <div class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
        <label class="uk-form-label-large" for="cfl">{{d_cflLabel}}</label>
        <div class="uk-form-controls">
          <input v-model="d_cfl" :value="d_cfl"
                 class="uk-input uk-form-width-small" id="cfl" 
                 type="text">
        </div>
        <label class="uk-form-label-large" for="eqit">{{d_maxEqItLabel}}</label>
        <div class="uk-form-controls">
          <input v-model="d_maxEqIt" :value="d_maxEqIt"
                 class="uk-input uk-form-width-small" id="eqit" 
                 type="text">
        </div>
        <label class="uk-form-label-large" for="minlevel">{{d_minLevelLabel}}</label>
        <div class="uk-form-controls">
          <input v-model="d_minLevel" :value="d_minLevel"
                 class="uk-input uk-form-width-small" id="minlevel" 
                 type="text">
        </div>
        <label class="uk-form-label-large" for="maxlevel">{{d_maxLevelLabel}}</label>
        <div class="uk-form-controls">
          <input v-model="d_maxLevel" :value="d_maxLevel"
                 class="uk-input uk-form-width-small" id="maxlevel" 
                 type="text">
        </div>
      </div>

      <!-- Heat addition -->
      <div v-if="c_addHeat"
           style="background-color:rgba(218, 247, 166, 100);"
           class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
        <hr class="uk-hr">
        Heat addition
        <div class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
          <label class="uk-form-label" for="num-mat">{{d_numAddHeatMatLabel}}</label>
          <div class="uk-form-controls">
            <input v-model="d_numAddHeatMat" 
                   class="uk-input uk-form-width-small" id="num-mat" 
                   type="text">
          </div>
          <label class="uk-form-label" for="start-time">{{d_addHeatStartTimeLabel}}</label>
          <div class="uk-form-controls">
            <input v-model="d_addHeatStartTime" 
                   class="uk-input uk-form-width-small" id="start-time" 
                   type="text">
          </div>
          <label class="uk-form-label" for="end-time">{{d_addHeatEndTimeLabel}}</label>
          <div class="uk-form-controls">
            <input v-model="d_addHeatEndTime" 
                   class="uk-input uk-form-width-small" id="end-time" 
                   type="text">
          </div>
        </div>
      </div>
      
      <!-- **TODO** Add materials and coeffs for heat addition -->

    </form>
    <button @click="printICEParameters" class="uk-button uk-button-default">Print</button>
  </div>
</template>

<script src="./ICEInputPanel.js">

</script>