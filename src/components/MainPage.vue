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
    <div class="messages-container" id="messagesContainer">
      <MessageBox
        v-for="(message, index) in messages"
        :key="index"
        :message="message"
        :index="index"
      >
      </MessageBox>
      <div v-if="isLoading" class="loader">Loading...</div>
    </div>
    <div class="input-container">
      <h3 class="what-do-you-do-header">What Do You Do?</h3>
      <InputWithButton
        :read-only="readOnly"
        @submitInput="handleSubmitInput"
        v-model="inputValue"
      />
    </div>
  </div>
</template>

<script>
  import { ref, watch } from "vue";
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
      const messagesLength = computed(() => messages.value.length);
      const lastMessageLength = computed(() =>
        messages.value.length
          ? store.state.messages[messagesLength.value - 1].content.length
          : 0
      );

      const isLoading = computed(() => store.getters.isLoading);
      const isStreaming = computed(() => store.getters.isStreaming);

      const readOnly = computed(
        () =>
          messages.value.length === 0 || isLoading.value || isStreaming.value
      );

      const start = (settings) => {
        store.dispatch("startAdven7ure", settings);
      };

      const update = (settings) => {
        store.dispatch("updateAdven7ureSettings", settings);
      };

      const handleSubmitInput = (inputValue) => {
        store.dispatch("submitMessage", inputValue);
        setTimeout(scrollToBottom(), 500);
      };

      const scrollToBottom = () => {
        const scrollContainer = document.getElementById("messagesContainer");
        if (scrollContainer)
          scrollContainer.scrollTop = scrollContainer.scrollHeight;
      };

      watch(lastMessageLength, (newValue, oldValue) => {
        if (newValue > oldValue) scrollToBottom();
      });

      // eslint-disable-next-line
      watch(isLoading, (newValue, oldValue) => {
        console.log("isloading", newValue, oldValue);
        setTimeout(scrollToBottom(), 100);
        setTimeout(scrollToBottom(), 200);
        setTimeout(scrollToBottom(), 500);
        setTimeout(scrollToBottom(), 1000);
      });

      return {
        inputValue,
        start,
        isLoading,
        readOnly,
        update,
        handleSubmitInput,
        messages,
        lastMessageLength,
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
    gap: 20px;
  }

  .settings-container {
    border: 1px solid #ccc;
    border-radius: 5px;
    height: auto;
    padding: 10px;
    margin-block: 0;
  }

  .messages-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-height: 480px;
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

  .what-do-you-do-header {
    margin-block: 0;
  }

  /* Add more styling as needed */
</style>
