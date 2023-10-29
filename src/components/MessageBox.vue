<template>
  <div class="message">
    {{ messages[index].content }}
  </div>
</template>

<script>
  import { useStore } from "vuex";
  import { computed } from "vue";

  export default {
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
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    padding: 10px;
    margin: 5px 0;
    width: 70%;
    text-align: left;
  }
</style>
