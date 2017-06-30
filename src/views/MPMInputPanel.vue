<template>
  <div id='mpm-input-container' style="font-size:0.75rem;">
    <form class="uk-form-horizontal">

      <!-- 3D or axisymmetric -->
      <div class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
        <span class="uk-form-label">Dimensions</span>
        <div class="uk-form-controls uk-form-controls-text">
          <label><input v-model="threeD" class="uk-radio" type="radio" name="dimensions"> 3D</label>
          <label><input v-model="twoD" class="uk-radio" type="radio" name="dimensions"> 2D Axisymmetric</label>
        </div>
      </div>

      <!-- Integration type -->
      <div class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
        <label class="uk-form-label" for="integration-type">Time integration</label>
        <div class="uk-form-controls">
          <select v-model="integrationType" class="uk-select uk-form-width-small" id="integration-type">
                                    <option>Explicit</option>
                                    <option>Explicit: Fracture</option>
                                    <option>Implicit</option>
                                </select>
        </div>
      </div>

      <!-- Interpolation type -->
      <div class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
        <label class="uk-form-label" for="interpolation-type">MPM interpolation</label>
        <div class="uk-form-controls">
          <select v-model="interpolationType" class="uk-select uk-form-width-small" id="interpolation-type">
                                    <option>Linear</option>
                                    <option>GIMP</option>
                                    <option>ThirdOrderBS</option>
                                    <option>CPDI</option>
                                    <option>CPTI</option>
                                </select>
        </div>
      </div>

      <!-- Flags -->
      <div class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
        <label class="uk-form-label" for="mpm-flags">MPM Options</label>
        <div class="uk-form-controls">
          <select v-model="mpmFlags" class="uk-select uk-form-width-medium" id="mpm-flags" multiple>
                                    <option>Do not reset grid</option>
                                    <option>Add particle colors</option>
                                    <option>Use artificial viscosity</option>
                                    <option>Do pressure stabilization</option>
                                    <option>Do explicit heat conduction</option>
                                    <option>Do thermal expansion</option>
                                    <option>Do viscous heating</option>
                                    <option>Do contact friction heating</option>
                                    <option>Use load curves</option>
                                    <option>Use exact deformation</option>
                                    <option>Use CBDI boundary condition</option>
                                    <option>Use cohesive zones</option>
                                    <option>Create new particles</option>
                                    <option>Allow adding new material</option>
                                    <option>Manually add new material</option>
                                    <option>Allow particle insertion</option>
                                    <option>Delete rogue particles</option>
                                </select>
        </div>
      </div>

      <!-- Simulation limits -->
      <hr>
      <div class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
        Simulation limits
      </div>
      <div class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
        <label class="uk-form-label-large" for="min-part-mass">Minimum particle mass</label>
        <div class="uk-form-controls">
          <input v-model="minPartMass" class="uk-input uk-form-width-small" id="min-part-mass" type="text" placeholder="1.0e-16">
        </div>
      </div>
      <div class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
        <label class="uk-form-label-large" for="max-part-vel">Maximum particle velocity</label>
        <div class="uk-form-controls">
          <input v-model="maxPartVel" class="uk-input uk-form-width-small" id="max-part-vel" type="text" placeholder="1.0e16">
        </div>
      </div>

      <!-- Artificial viscosity flags -->
      <hr>
      <div class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
        Artificial viscosity parameters 
      </div>
      <div class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
        <label class="uk-form-label" for="c1">C1</label>
        <div class="uk-form-controls">
          <input v-model="artViscC1" class="uk-input uk-form-width-small" id="c1" type="text" placeholder="0.2">
        </div>
      </div>
      <div class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
        <label class="uk-form-label" for="c2">C2</label>
        <div class="uk-form-controls">
          <input v-model="artViscC2" class="uk-input uk-form-width-small" id="c2" type="text" placeholder="0.05">
        </div>
      </div>

      <!-- Gradient computation -->
      <hr>
      <div class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
        Deformation gradient
      </div>
      <div class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
        <label class="uk-form-label">Algorithm</label>
        <div class="uk-form-controls">
          <select v-model="defGradAlgo" class="uk-select uk-form-width-small" id="def-grad-algo">
                                    <option>Prescribed</option>
                                    <option>Linear</option>
                                    <option>Taylor series</option>
                                    <option>Subcycling</option>
                                </select>
        </div>
      </div>
      <div class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
        <label class="uk-form-label" for="def-grad-file">Prescribed def.grad. file</label>
        <div class="uk-form-controls">
          <input v-model="defGradFile" class="uk-input uk-form-width-small" id="def-grad-file" type="text" placeholder="None">
        </div>
      </div>
      <div class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
        <label class="uk-form-label" for="def-grad-taylor-terms"># Taylor terms</label>
        <div class="uk-form-controls">
          <input v-model="defGradTaylorTerms" class="uk-input uk-form-width-small" id="def-grad-taylor-terms" type="text" placeholder="5">
        </div>
      </div>
      <div class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
        <div class="uk-form-controls uk-form-controls-text">
          <label>Gradient-enhanced velocity projection <input v-model="doVelProj" class="uk-checkbox" type="checkbox" name="do_vel_proj"></label>
        </div>
      </div>

      <!-- Rotating coord system -->
      <hr>
      <div class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
        <label class="uk-form-label-large">Use rotating coordinate system</label>
        <input v-model="doRotCoord" class="uk-checkbox" type="checkbox" name="do_rot_coord">
      </div>
      <div class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
        <label class="uk-form-label" for="form-rot-cen">Rotation center</label>
        <div class="uk-form-controls">
          <input v-model="rotCen" class="uk-input uk-form-width-small" id="form-rot-cen" type="text" placeholder="0, 0, 0">
        </div>
      </div>
      <div class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
        <label class="uk-form-label" for="form-rot-axis">Rotation axis</label>
        <div class="uk-form-controls">
          <input v-model="rotAxis" class="uk-input uk-form-width-small" id="form-rot-axis" type="text" placeholder="0, 0, 0">
        </div>
      </div>
      <div class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
        <label class="uk-form-label" for="form-rot-vel">Angular velocity</label>
        <div class="uk-form-controls">
          <input v-model="rotVel" class="uk-input uk-form-width-small" id="form-rot-vel" type="text" placeholder="0, 0, 0">
        </div>
      </div>

      <!-- AMR -->
      <hr>
      <div class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
        Adaptive refinement
      </div>
      <div class="uk-margin-small uk-margin-small-top uk-margin-small-left uk-margin-small-right">
        <div class="uk-form-controls uk-form-controls-text">
          <label><input v-model="doGridAMR" class="uk-checkbox" type="checkbox" name="do_grid_amr"> Do grid refinement</label> <br>
          <label><input v-model="doPartAMR" class="uk-checkbox" type="checkbox" name="do_part_amr"> Do particle refinement</label>
        </div>
      </div>

    </form>
    <button @click="printMPMParameters" class="uk-button uk-button-default">Print</button>
  </div>
</template>

<script src="./MPMInputPanel.js">

</script>