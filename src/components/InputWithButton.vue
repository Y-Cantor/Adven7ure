<template>
  <div class="input-button-container">
    <textarea
      v-model="inputValue"
      :type="type"
      :size="size"
      :placeholder="placeholder"
      @input="onInput"
      @keyup.enter="onEnterPressed"
    />
    <button @click="onButtonClick">{{ buttonText }}</button>
  </div>
</template>

<script>
  export default {
    props: {
      type: {
        type: String,
        default: "text",
      },
      placeholder: String,
      size: {
        type: Number,
        default: 100,
      },
      buttonText: {
        type: String,
        default: "Submit",
      },
    },
    data() {
      return {
        inputValue: "",
      };
    },
    methods: {
      onInput(event) {
        this.inputValue = event.target.value;
      },
      onEnterPressed() {
        this.submitInput();
      },
      onButtonClick() {
        this.submitInput();
      },
      submitInput() {
        this.$emit("submitInput", this.inputValue);
        this.inputValue = "";
      },
    },
  };
</script>

<style>
  textarea {
    width: 80%;
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
