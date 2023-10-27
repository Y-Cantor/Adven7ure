<template>
  <div class="page-header">
    <h2>Create Your Own Adven7ure</h2>
  </div>
  <div class="container">
    <div class="settings-container">
      <AdventureSettings
        :variant="messages.length"
        @start="start"
        @update="update"
      />
    </div>
    <div v-if="messages.length" class="messages-container">
      <MessageBox
        v-for="(message, index) in messages"
        :key="index"
        :message="message"
      >
      </MessageBox>
    </div>
    <div v-if="isLoading" class="loader">Loading...</div>
    <div class="input-container">
      <h3>What Do You Do?</h3>
      <InputWithButton
        placeholder="Enter something"
        :buttonText="'Submit'"
        @submitInput="handleSubmitInput"
        v-model="inputValue"
      />
    </div>
  </div>
</template>

<script>
  import { ref } from "vue";
  import InputWithButton from "./InputWithButton.vue";
  import MessageBox from "./MessageBox.vue";
  import AdventureSettings from "./AdventureSettings.vue";

  import { useStore } from "vuex";
  import { computed } from "vue";

  export default {
    components: {
      InputWithButton,
      MessageBox,
      AdventureSettings,
    },
    setup() {
      const inputValue = ref("");
      const store = useStore();
      const messages = computed(() => store.getters.getMessages);
      const isLoading = computed(() => store.getters.isLoading);

      const start = () => {
        store.dispatch("startAdven7ure");
      };

      const update = () => {};
      const handleSubmitInput = (inputValue) => {
        console.log("handleSubmitInput with input:", inputValue);
        store.dispatch("submitMessage", inputValue);
      };

      return {
        inputValue,
        start,
        isLoading,
        update,
        handleSubmitInput,
        messages,
      };
    },
  };
</script>
<style>
  .page-header {
    text-align: center;
    position: relative; /* Add position relative to create a reference point */
    background-color: #f0f0f0; /* Optional: Add background color for better visibility */
  }

  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 60px;
  }

  .settings-container {
    border: 1px solid #ccc;
    border-radius: 5px;
    height: 200px;
  }

  .messages-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-height: 400px;
    overflow-y: auto;
  }

  .input-container {
    display: flex;
    flex-direction: column;
    gap: 0;
    position: absolute; /* Set the position of the input container to absolute */
    bottom: 0; /* Place it at the bottom of the parent container */
    width: 100%; /* Take up the full width of the parent container */
  }

  /* Add more styling as needed */
</style>
