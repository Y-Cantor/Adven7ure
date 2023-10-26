// store/index.js
import { createStore } from "vuex";
import { makeRequest } from "../api/api.js";

const store = createStore({
  state: {
    messages: [],
  },
  mutations: {
    addMessages(state, messages) {
      state.messages = [...state.messages, ...messages];
    },
  },
  actions: {
    startAdven7ure({ commit }) {
      commit("addMessages", [
        {
          role: "assistant",
          text: "You find yourself standing in the heart of the Forbidden Forest, concealed by its thick and dark trees. You have a wand in your hand, sweaty from the fearful tension. Do you decide to walk deeper into the forest or do you wish to turn back towards Hogwarts castle?",
        },
      ]);
    },
    submitMessage({ commit }, userMessage) {
      console.log(userMessage);
      const message = { role: "user", text: userMessage };
      makeRequest("/", "POST", message)
        .then((data) => {
          // Handle the data
          console.log(data);
          commit("addMessages", [
            message,
            { role: "assistant", text: "PLACEHOLDER" },
          ]);
        })
        .catch((error) => {
          // Handle errors
          console.error(error);
        });
    },
  },
  getters: {
    getMessages: (state) => state.messages,
  },
});

export default store;
