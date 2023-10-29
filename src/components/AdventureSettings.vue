<template>
  <div>
    <div v-if="variant > 0">
      <h3 class="update-adventure-header">Update Your Settings</h3>
    </div>
    <div v-else class="start-adventure">
      <h3 class="start-adventure-header">Choose your settings</h3>
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
            :readonly="variant > 0"
            :class="{ 'read-only-input': variant > 0 }"
          />
        </div>
        <div class="form-field">
          <label for="theme">Theme</label>
          <input
            type="text"
            id="theme"
            v-model="formData.theme"
            :required="false"
            :readonly="variant > 0"
            :class="{ 'read-only-input': variant > 0 }"
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
        <button v-if="variant > 0" type="submit">Update</button>
        <button v-else type="submit">Start</button>
      </div>
    </form>
  </div>
</template>

<script>
  import { ref } from "vue";
  import { defaultNumberOfSentences } from "../consts/consts";

  export default {
    props: {
      variant: {
        type: Number,
        default: 0,
      },
    },
    emits: ["start", "update"],
    setup(props, { emit }) {
      const formData = ref({
        name: "Lupin's Adventure",
        theme: "Harry Potter",
        numOfSentences: defaultNumberOfSentences,
      });

      const handleSubmit = (event) => {
        event.preventDefault();
        const numOfSentences = parseInt(formData.value.numOfSentences, 10);

        if (props.variant === 0) {
          emit("start", {
            numOfSentences,
          });
        } else {
          emit("update", {
            numOfSentences,
          });
        }
      };

      return {
        formData,
        handleSubmit,
      };
    },
  };
</script>

<style scoped>
  .form {
    display: flex;
    flex-direction: column;
    gap: 0.5em;
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

  .start-adventure-header,
  .update-adventure-header {
    margin-block: 0;
  }
</style>
