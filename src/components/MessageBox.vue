<template>
  <div class="message">
    {{ message.content }}
  </div>
</template>

<script>
  export default {
    props: {
      message: Object,
    },
  };
</script>

<style scoped>
  /* Add styling for your message component here */
  .message {
    background-color: #f0f0f0;
    border: 1px solid #ddd;
    padding: 10px;
    margin: 5px 0;
    width: 70%;
    text-align: left;
  }
</style>
