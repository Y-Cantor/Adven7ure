<template>
  <h3>{{ variant > 0 ? "Update Your Settings" : "Choose your settings" }}</h3>
  <div class="settings-form">
    <el-form
      :inline="false"
      :model="formInline"
      class="form-inline"
      :label-position="'right'"
      label-width="150px"
    >
      <div class="form-row">
        <el-form-item label="Adven7ure Name">
          <el-input v-model="formInline.name" :disabled="variant > 0" />
        </el-form-item>
        <el-form-item label="Theme">
          <el-input v-model="formInline.theme" :disabled="variant > 0" />
        </el-form-item>
      </div>
      <div class="form-row">
        <el-form-item label="# of Sentences">
          <el-select v-model="formInline.numberOfSentences">
            <el-option
              v-for="(num, index) in [3, 4, 5, 6, 7]"
              :key="index"
              :label="num"
              :value="num"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="English Level">
          <el-select v-model="formInline.englishLevel">
            <el-option
              v-for="(level, index) in [
                'Beginner',
                'Intermediate',
                'Proficient',
              ]"
              :key="index"
              :label="level"
              :value="level"
          /></el-select>
        </el-form-item>
      </div>
      <div class="form-row">
        <el-form-item class="start-button">
          <el-button type="primary" @click="handleSubmit">{{
            variant > 0 ? "Update" : "Start"
          }}</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
  import {
    defaultNumberOfSentences,
    defaultTheme,
    defaultName,
    defaultEnglishLevel,
  } from "../consts/consts";
  import { reactive } from "vue";

  export default {
    props: {
      variant: {
        type: Number,
        default: 0,
      },
    },
    emits: ["start", "update"],
    setup(props, { emit }) {
      const handleSubmit = (event) => {
        event.preventDefault();
        const numberOfSentences = parseInt(formInline.numberOfSentences, 10);

        const storySettings = {
          numberOfSentences,
          theme: formInline.theme,
          name: formInline.name,
          englishLevel: formInline.englishLevel,
        };

        if (props.variant === 0) {
          emit("start", storySettings);
        } else {
          emit("update", storySettings);
        }
      };

      const formInline = reactive({
        name: defaultName,
        theme: defaultTheme,
        numberOfSentences: defaultNumberOfSentences,
        englishLevel: defaultEnglishLevel,
      });

      return {
        handleSubmit,
        formInline,
      };
    },
  };
</script>
<style>
  .settings-form {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .form-inline {
    width: 800px;
  }

  .form-inline .el-input {
    --el-input-width: 150px;
  }

  .form-row {
    display: flex;
    justify-content: center;
    margin-bottom: 10px; /* Add spacing between rows as needed */
  }

  .start-button .el-button--primary {
    margin-left: -105px;
  }
</style>
