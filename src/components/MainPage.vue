<template>
  <el-container v-if="true">
    <el-header height="40px"><h2>Create Your Own Adven7ure</h2></el-header>
    <el-main>
      <el-container class="settings-component-container">
        <el-main class="settings-component">
          <AdventureSettings
            :variant="messages.length"
            @start="start"
            @update="update"
          />
        </el-main>
      </el-container>
      <el-container class="messages-component-container">
        <el-main class="messages-component" id="messagesContainer">
          <MessageBox
            v-for="(message, index) in messages"
            :key="index"
            :message="message"
            :index="index"
          >
          </MessageBox>
        </el-main>
      </el-container>
    </el-main>
    <el-footer>
      <h3 class="what-do-you-do-header">What Do You Do?</h3>
      <InputWithButton
        :read-only="readOnly"
        @submitInput="handleSubmitInput"
        v-model="inputValue"
        v-loading="isLoading"
        element-loading-background="rgba(0, 0, 0, 0)"
      />
    </el-footer>
  </el-container>
  <el-container v-else>
    <el-header>Create Your Own Adven7ure</el-header>
    <el-container>
      <el-aside width="400px">
        <AdventureSettings
          :variant="messages.length"
          @start="start"
          @update="update"
      /></el-aside>
      <el-container>
        <el-main>
          <MessageBox
            v-for="(message, index) in messages"
            :key="index"
            :message="message"
            :index="index"
          >
          </MessageBox>
        </el-main>
        <el-footer>
          <h3 class="what-do-you-do-header">What Do You Do?</h3>
          <InputWithButton
            :read-only="readOnly"
            @submitInput="handleSubmitInput"
            v-model="inputValue"
          />
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
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
  .messages-component {
    max-height: 400px;
    overflow-y: auto;
    /* background: lightblue; */
  }

  .messages-component-container .el-main {
    position: relative;
    padding: 0 15% 0 15%;
  }
  .settings-component-container .el-main {
    padding: 0;
  }
</style>
