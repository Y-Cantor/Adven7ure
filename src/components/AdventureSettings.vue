<template>
  <div>
    <div v-if="variant === 1" class="update-adventure">
      <h3>Update Your Settings</h3>
      <!-- <button @click="update" class="start-button">UPDATE</button> -->
    </div>
    <div v-else class="start-adventure">
      <h3>Choose your settings</h3>
      <!-- <button @click="start" class="start-button">START</button> -->
    </div>
  </div>
  <div>
    <form @submit="handleSubmit" class="form">
      <div class="form-fields">
        <div class="form-field">
          <label for="name">Adven7ure Name</label>
          <input
            type="text"
            id="name"
            v-model="formData.name"
            :required="false"
            :readonly="variant === 1"
            :class="{ 'read-only-input': variant === 1 }"
          />
        </div>
        <div class="form-field">
          <label for="theme">Theme</label>
          <input
            type="text"
            id="theme"
            v-model="formData.theme"
            :required="false"
            :readonly="variant === 1"
            :class="{ 'read-only-input': variant === 1 }"
          />
        </div>
        <div class="form-field">
          <label for="numOfSentences">Number of sentences</label>
          <input
            type="text"
            id="numOfSentences"
            v-model="formData.numOfSentences"
            :required="false"
          />
        </div>
      </div>
      <div class="submit-button">
        <button v-if="variant === 1" type="submit">Update</button>
        <button v-else type="submit">Start</button>
      </div>
    </form>
  </div>
</template>

<script>
  export default {
    props: {
      variant: {
        type: Number,
        default: 0,
      },
    },
    data() {
      return {
        formData: {
          name: "Lupin's Adventure",
          theme: "Harry Potter",
          numOfSentences: 3,
        },
        submitted: false,
      };
    },
    methods: {
      handleSubmit(event) {
        event.preventDefault(); // Prevent the form from actually submitting

        // You can handle the form data here, for example, send it to an API
        // For this example, we'll just set the "submitted" flag to true.
        this.submitted = true;
        this.$emit("start");
      },
    },
  };
</script>

<style scoped>
  .form {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  .form-fields {
    display: flex;
    justify-content: center;
    /* flex-wrap: wrap; */
  }

  .form-field {
    display: flex;
    flex-direction: column;
    /* flex: 0 0 50%; */
    padding: 8px;
  }

  .form-field label {
    /* color: purple; */
    font: 0.8em sans-serif;
  }

  .form-field input {
    /* color: purple; */
    text-align: center;
  }

  .read-only-input {
    background-color: #f0f0f0;
    color: #555;
    pointer-events: none; /* Prevent interaction with the input */
  }
</style>
