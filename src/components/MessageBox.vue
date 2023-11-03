<template>
  <div
    class="message"
    :class="{
      'user-message': messages[index].role === 'user',
      'assistant-message': messages[index].role === 'assistant',
    }"
  >
    <clickable-words :text="messages[index].content"></clickable-words>
  </div>
</template>

<script>
  import { useStore } from "vuex";
  import { computed } from "vue";
  import ClickableWords from "./ClickableWords.vue";

  export default {
    components: {
      ClickableWords,
    },
    props: {
      index: Number,
      message: Object,
    },
    setup() {
      const store = useStore();
      const messages = computed(() => store.getters.getMessages);

      return { messages };
    },
  };
</script>

<style scoped>
  .message {
    border: 0px solid #ddd;
    border-radius: 10px;
    padding: 10px;
    margin: 15px 0;
    text-align: left;
    font-size: x-large;
  }

  .user-message {
    background: var(--beige);
    border: 10px;
    box-shadow: 0 0 10px 1px rgb(175, 170, 151, 1);
  }

  .assistant-message {
    background: var(--yellow-beige);
    border: 10px;
    box-shadow: 0 0 10px 1px rgb(175, 170, 151, 1);
  }
</style>
