<template>
  <div class="input-button-container">
    <textarea
      v-model="inputValue"
      type="text"
      :size="size"
      :placeholder="readOnly ? '' : 'Enter Something'"
      @input="onInput"
      @keyup.enter="onEnterPressed"
      :disabled="readOnly"
    />
    <button @click="onButtonClick" :disabled="readOnly">Submit</button>
  </div>
</template>

<script>
  import { ref } from "vue";

  export default {
    props: {
      variant: {
        type: Number,
        default: 0,
      },
      size: {
        type: Number,
        default: 100,
      },
      readOnly: {
        type: Boolean,
        default: false,
      },
    },
    setup(props, { emit }) {
      const inputValue = ref("");

      function onInput(event) {
        inputValue.value = event.target.value;
      }

      function onEnterPressed() {
        submitInput();
      }

      function onButtonClick() {
        submitInput();
      }

      function submitInput() {
        const cleanedInput = inputValue.value.replace(/\s+/g, "");
        if (cleanedInput.length > 0) {
          emit("submitInput", inputValue.value);
          inputValue.value = "";
        }
      }

      return {
        inputValue,
        onInput,
        onEnterPressed,
        onButtonClick,
      };
    },
  };
</script>

<style>
  textarea {
    width: 80%;
    max-width: 600px;
    min-height: 4em;
    height: auto; /* Allow the height to adjust based on content */
    resize: none;
  }

  .input-button-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    gap: 10px;
    margin: 10px;
  }

  /* Add more styling as needed */
</style>
