// store/index.js
import { createStore } from "vuex";
import { createChatCompletion } from "../api/api.js";
import {
  defaultNumberOfSentences,
  defaultTheme,
  defaultName,
} from "@/consts/consts.js";
import { createSystemMessage } from "@/helpers/systemMessage.js";

const store = createStore({
  state: {
    numberOfSentences: defaultNumberOfSentences,
    theme: defaultTheme,
    name: defaultName,
    systemMessage: {},
    messages: [],
  },
  mutations: {
    addMessages(state, messages) {
      state.messages = [...state.messages, ...messages];
    },
    setSystemMessage(state, systemMessage) {
      state.systemMessage = systemMessage;
    },
  },
  actions: {
    startAdven7ure({ state, commit }) {
      const systemMessage = createSystemMessage(
        state.numberOfSentences,
        state.theme,
        state.name
      );
      commit("setSystemMessage", systemMessage);
      createChatCompletion([state.systemMessage])
        .then((res) => {
          console.log(res.choices[0].message.content);
          commit("addMessages", [
            { role: "assistant", content: res.choices[0].message.content },
          ]);
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    },
    submitMessage({ state, commit }, userInput) {
      console.log(userInput);
      const userMessage = { role: "user", content: userInput };
      commit("addMessages", [userMessage]);
      createChatCompletion([state.systemMessage, ...state.messages])
        .then((res) => {
          console.log(res.choices[0].message.content);
          commit("addMessages", [
            { role: "assistant", content: res.choices[0].message.content },
          ]);
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    },
  },
  getters: {
    getMessages: (state) => state.messages,
  },
});

export default store;
