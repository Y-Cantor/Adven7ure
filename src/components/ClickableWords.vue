<template>
  <div>
    <span v-for="(word, index) in words" :key="index">
      <el-tooltip
        v-if="notBasicWord(word)"
        class="box-item"
        effect="dark"
        :content="dictionary[word] ?? word + ' תרגם את'"
        placement="top-start"
      >
        <span @click="handleWordClick(word)" class="single-word">{{
          word
        }}</span>
      </el-tooltip>
      <span v-else>{{ word }}</span>
      {{ " " }}
    </span>
  </div>
</template>

<script>
  import { basicWords } from "@/consts/consts";
  import { ref, computed } from "vue";
  import { translate } from "../api/api.js";
  export default {
    props: {
      text: String,
    },
    setup(props, { emit }) {
      const dictionary = ref({});

      const words = computed(() => {
        return props.text.split(" ");
      });

      const handleWordClick = async (word) => {
        emit("word-click", word);
        dictionary.value[word] = await translate(word);
      };

      const notBasicWord = (word) => {
        return !basicWords.includes(word.toLowerCase());
      };

      return {
        words,
        handleWordClick,
        notBasicWord,
        dictionary,
      };
    },
  };
</script>
<style scoped>
  .single-word {
    cursor: pointer;
  }

  .box-item {
    width: 10px;
    height: 10px;
    background: grey;
  }
</style>
