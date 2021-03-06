<template>
  <div id='mpm-input-container' style="font-size:0.75rem;">
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

      <!-- Integration type -->
      <div class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
        <label class="uk-form-label" for="integration-type">Time integration</label>
        <div class="uk-form-controls">
          <select v-model="d_integration" 
                  :value="d_integration"
                  @change="updateIntegrationIndex()"
                  class="uk-select uk-form-width-small" 
                  id="integration-type">
            <option v-for="(label, index) in d_integrationTypeLabels">{{label}}</option>
          </select>
        </div>
      </div>

      <!-- Interpolation type -->
      <div class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
        <label class="uk-form-label" for="interpolation-type">MPM interpolation</label>
        <div class="uk-form-controls">
          <select v-model="d_interpolation" 
                  :value="d_interpolation"
                  class="uk-select uk-form-width-small" 
                  id="interpolation-type">
            <option v-for="(label, index) in d_interpolationTypeLabels">{{label}}</option>
          </select>
        </div>
      </div>

      <!-- Flags -->
      <div class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
        <label class="uk-form-label" for="mpm-flags">MPM Options</label>
        <div class="uk-form-controls">
          <select v-model="d_mpmFlags" 
                  @change="updateMPMFlags()"
                  class="uk-select uk-form-width-medium" 
                  id="mpm-flags" multiple>
            <option v-for="(label, index) in d_mpmFlagLabels"
                    v-bind:value="{label: label, index: index}">{{label}}</option>
          </select>
        </div>
      </div>

      <!-- Simulation limits -->
      <div class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
        <hr class="uk-hr">
        Simulation limits
      </div>
      <div class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
        <label class="uk-form-label-large" for="min-part-mass">Minimum particle mass</label>
        <div class="uk-form-controls">
          <input v-model="d_minPartMass" :value="d_minPartMass"
                 class="uk-input uk-form-width-small" id="min-part-mass" 
                 type="text">
        </div>
        <label class="uk-form-label-large" for="max-part-vel">Maximum particle velocity</label>
        <div class="uk-form-controls">
          <input v-model="d_maxPartVel" :value="d_maxPartVel"
                 class="uk-input uk-form-width-small" id="max-part-vel" 
                 type="text">
        </div>
      </div>

      <!-- Numerical damping -->
      <div class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right"
           style="background-color:rgba(218, 247, 166, 100);"
           v-if="c_doNumericalDamping">
        <hr class="uk-hr">
        <div class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
          <label class="uk-form-label" for="dampCoeff">Damping Coefficient</label>
          <div class="uk-form-controls">
            <input v-model="artViscC1" class="uk-input uk-form-width-small" id="dampCoeff" type="text" placeholder="0.2">
          </div>
        </div>
      </div>

      <!-- Artificial viscosity flags -->
      <div class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right"
           style="background-color:rgba(218, 247, 166, 100);"
           v-if="c_doArtificialViscosity">
        <hr class="uk-hr">
        Artificial viscosity parameters 
        <div class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
          <label class="uk-form-label" for="c1">C1</label>
          <div class="uk-form-controls">
            <input v-model="artViscC1" class="uk-input uk-form-width-small" id="c1" type="text" placeholder="0.2">
          </div>
          <label class="uk-form-label" for="c2">C2</label>
          <div class="uk-form-controls">
            <input v-model="artViscC2" class="uk-input uk-form-width-small" id="c2" type="text" placeholder="0.05">
          </div>
        </div>
      </div>

      <!-- Gradient computation -->
      <div class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
        <hr class="uk-hr">
        Deformation gradient
        <div class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
          <label class="uk-form-label">Algorithm</label>
          <div class="uk-form-controls">
            <select v-model="d_defGradAlgo" 
                    @change="updateDefGradAlgo()"
                    class="uk-select uk-form-width-small" 
                    id="def-grad-algo">
              <option v-for="(label, index) in d_defGradAlgoLabels">{{label}}</option>
            </select>
          </div>
        </div>
        <div v-if="c_doPrescribedDefGrad"
             style="background-color:rgba(218, 247, 166, 100);"
             class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
          <label class="uk-form-label" for="def-grad-file">Prescribed def.grad. file</label>
          <div class="uk-form-controls">
            <input v-model="defGradFile" class="uk-input uk-form-width-medium" id="def-grad-file" type="text" placeholder="None">
          </div>
        </div>
        <div v-if="c_doTaylorDefGrad"
             style="background-color:rgba(218, 247, 166, 100);"
             class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
          <label class="uk-form-label" for="def-grad-taylor-terms"># Taylor terms</label>
          <div class="uk-form-controls">
            <input v-model="defGradTaylorTerms" class="uk-input uk-form-width-xsmall" id="def-grad-taylor-terms" type="text" placeholder="5">
          </div>
        </div>
        <!--
        <div class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
          <div class="uk-form-controls uk-form-controls-text">
            <label>Gradient-enhanced velocity projection <input v-model="doVelProj" class="uk-checkbox" type="checkbox" name="do_vel_proj"></label>
          </div>
        </div>
        -->
      </div>

      <!-- Rotating coord system -->
      <div v-if="c_useRotatingCoord"
           class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
        <hr class="uk-hr">
        Rotating coordinate system
        <div class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
          <label class="uk-form-label" for="form-rot-cen">Rotation center</label>
          <div class="uk-form-controls">
            <input v-model="d_rotCen" 
                   class="uk-input uk-form-width-small" id="form-rot-cen" 
                   type="text">
          </div>
          <label class="uk-form-label" for="form-rot-axis">Rotation axis</label>
          <div class="uk-form-controls">
            <input v-model="d_rotAxis" 
                   class="uk-input uk-form-width-small" id="form-rot-axis" 
                   type="text">
          </div>
          <label class="uk-form-label" for="form-rot-vel">Angular velocity</label>
          <div class="uk-form-controls">
            <input v-model="d_rotVel" 
                   class="uk-input uk-form-width-small" id="form-rot-vel" 
                   type="text">
          </div>
        </div>
      </div>

      <!-- AMR -->
      <div v-if="c_doAdaptiveRefine"
           class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
        <hr class="uk-hr">
        Adaptive refinement
        <div class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
          <div class="uk-form-controls uk-form-controls-text">
            <label><input v-model="d_doGridAMR" class="uk-checkbox" type="checkbox" name="do_grid_amr"> Do grid refinement</label> <br>
            <label><input v-model="d_doPartAMR" class="uk-checkbox" type="checkbox" name="do_part_amr"> Do particle refinement</label>
          </div>
        </div>
      </div>

    </form>
    <button @click="printMPMParameters" class="uk-button uk-button-default">Print</button>
  </div>
</template>

<script src="./MPMInputPanel.js">

</script>