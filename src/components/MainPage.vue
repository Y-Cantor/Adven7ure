<template>
  <div class="container">
    <div class="header-container">
      <!-- replace with components -->
      <div v-if="messages.length" class="update-adventure">
        <h3>Update Your Adven7ure</h3>
        <button @click="update" class="start-button">UPDATE</button>
      </div>
      <div v-else class="start-adventure">
        <h2>Create Your Own Adven7ure</h2>
        <button @click="start" class="start-button">START</button>
      </div>
    </div>
    <div v-if="messages.length" class="messages-container">
      <MessageBox
        v-for="(message, index) in messages"
        :key="index"
        :message="message"
      >
      </MessageBox>
    </div>
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
  import MessageBox from "./MessageBox.vue"; // Import the Message component

  import { useStore } from "vuex";
  import { computed } from "vue";

  export default {
    components: {
      InputWithButton,
      MessageBox,
    },
    setup() {
      const inputValue = ref("");
      const store = useStore();
      const messages = computed(() => store.getters.getMessages);

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
        update,
        handleSubmitInput,
        messages,
      };
    },
  };
</script>
<style>
  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 60px;
  }

  .header-container {
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
