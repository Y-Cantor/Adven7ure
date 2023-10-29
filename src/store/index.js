// store/index.js
import { createStore } from "vuex";
import {
  createChatCompletion,
  createStreamChatCompletion,
} from "../api/api.js";
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
    isLoading: false,
  },
  mutations: {
    addMessages(state, messages) {
      state.messages = [...state.messages, ...messages];
    },
    updateLastMessage(state, message) {
      state.messages = [...state.messages.slice(0, -1), message];
    },
    setSystemMessage(state, systemMessage) {
      state.systemMessage = systemMessage;
    },
    setIsLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    setNumberOfSentences(state, numOfSentences) {
      state.numberOfSentences = numOfSentences;
    },
  },
  actions: {
    async createAnswer({ commit }, { messages, streamText }) {
      if (streamText) {
        const stream = await createStreamChatCompletion(messages);
        const answer = { role: "assistant", content: "" };
        commit("addMessages", [answer]);
        commit("setIsLoading", false);
        for await (const part of stream) {
          const chunk = part.choices[0]?.delta.content || "";

          if (chunk) {
            answer.content += chunk;
          }
          commit("updateLastMessage", answer);
        }
      } else {
        createChatCompletion(messages)
          .then((res) => {
            commit("addMessages", [
              { role: "assistant", content: res.choices[0].message.content },
            ]);
            commit("setIsLoading", false);
          })
          .catch((err) => {
            console.log("Error:", err);
          });
      }
    },
    async startAdven7ure(
      { state, commit },
      { numOfSentences, streamText = true }
    ) {
      commit("setIsLoading", true);
      commit("setNumberOfSentences", numOfSentences);
      const systemMessage = createSystemMessage(
        state.numberOfSentences,
        state.theme,
        state.name
      );
      commit("setSystemMessage", systemMessage);
      this.dispatch("createAnswer", {
        messages: [state.systemMessage],
        streamText: streamText,
      });
    },
    async submitMessage({ state, commit }, userInput, streamText = true) {
      commit("setIsLoading", true);
      const userMessage = { role: "user", content: userInput };
      commit("addMessages", [userMessage]);
      this.dispatch("createAnswer", {
        messages: [state.systemMessage, ...state.messages],
        streamText: streamText,
      });
    },
    async updateAdven7ureSettings({ state, commit }, { numOfSentences }) {
      commit("setNumberOfSentences", numOfSentences);
      const systemMessage = createSystemMessage(
        state.numberOfSentences,
        state.theme,
        state.name
      );
      commit("setSystemMessage", systemMessage);
    },
  },
  getters: {
    getMessages: (state) => state.messages,
    isLoading: (state) => state.isLoading,
  },
});

export default store;
