<template>
  <div id='mpm-input-container'>
    <form class="uk-form-horizontal">

      <div class="uk-margin">
        <label class="uk-form-label" for="form-h-text">Text</label>
        <div class="uk-form-controls">
          <input class="uk-input uk-form-width-large" id="form-h-text" type="text" placeholder="Some text...">
        </div>
      </div>

      <div class="uk-margin">
        <label class="uk-form-label" for="form-h-select">Select</label>
        <div class="uk-form-controls">
          <select class="uk-select uk-form-width-large" id="form-h-select">
                                    <option>Option 01</option>
                                    <option>Option 02</option>
                                </select>
        </div>
      </div>

      <div class="uk-margin">
        <label class="uk-form-label" for="form-h-textarea">Textarea</label>
        <div class="uk-form-controls">
          <textarea class="uk-textarea uk-form-width-large" id="form-h-textarea" rows="5" placeholder="Some text..."></textarea>
        </div>
      </div>

      <div class="uk-margin">
        <span class="uk-form-label">Radio</span>
        <div class="uk-form-controls uk-form-controls-text">
          <label><input class="uk-radio" type="radio" name="radio1"> Option 01</label><br>
          <label><input class="uk-radio" type="radio" name="radio1"> Option 02</label>
          <div class="uk-margin uk-grid-small uk-child-width-auto" uk-grid>
            <label><input class="uk-radio" type="radio" name="radio2"> A</label>
            <label><input class="uk-radio" type="radio" name="radio2"> B</label>
            <label><input class="uk-radio" type="radio" name="radio2"> C</label>
            <label><input class="uk-radio" type="radio" name="radio2"> D</label>
          </div>
        </div>
      </div>

      <div class="uk-margin">
        <span class="uk-form-label">Checkbox</span>
        <div class="uk-form-controls uk-form-controls-text">
          <label><input class="uk-checkbox" type="checkbox"> Option 01</label><br>
          <label><input class="uk-checkbox" type="checkbox"> Option 02</label>
          <div class="uk-margin uk-grid-small uk-child-width-auto" uk-grid>
            <label><input class="uk-checkbox" type="checkbox"> A</label>
            <label><input class="uk-checkbox" type="checkbox"> B</label>
            <label><input class="uk-checkbox" type="checkbox"> C</label>
            <label><input class="uk-checkbox" type="checkbox"> D</label>
          </div>
        </div>
      </div>

      <div class="uk-margin">
        <label class="uk-form-label" for="form-h-multiple">Multiple</label>
        <div class="uk-form-controls">
          <select class="uk-select uk-form-width-large" id="form-h-multiple" multiple>
                                    <option>Option 01</option>
                                    <option>Option 02</option>
                                    <option>Option 03</option>
                                    <option>Option 04</option>
                                </select>
        </div>
      </div>

    </form>
  </div>
</template>

<script src="./MPMInputPanel.ts">

</script>