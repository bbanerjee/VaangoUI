<template>
  <div id='general-input-container'>
    <form class="uk-form-stacked">

      <div class="uk-margin">
        <label class="uk-form-label" for="form-stacked-text">Simulation title</label>
        <div class="uk-form-controls">
          <input class="uk-input" id="form-stacked-text" type="text" 
                 placeholder="Test simulation">
        </div>
      </div>

      <div class="uk-margin">
        <div class="uk-form-label">Simulation component</div>
        <div class="uk-form-controls">
          <label><input class="uk-radio" type="radio" name="radio1"> MPM</label><br>
          <label><input class="uk-radio" type="radio" name="radio1"> MPMICE</label>
        </div>
      </div>

    </form>
  </div>
</template>

<script src="./GeneralInputPanel.ts">

</script>