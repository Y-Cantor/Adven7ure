import axios from "axios";
const apiUrl = "/api/0a039933-3473-45ff-9c22-9bc0e0a69026";

import OpenAI from "openai";

export const createChatCompletion = async (messages) => {
  let openai;

  if (process.env.VUE_APP_OPEN_AI_API_KEY) {
    const configuration = {
      apiKey: process.env.VUE_APP_OPEN_AI_API_KEY,
      dangerouslyAllowBrowser: true,
    };
    openai = new OpenAI(configuration);
  } else {
    throw "No API key";
  }

  return openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages,
  });
};

export const createStreamChatCompletion = async (messages) => {
  console.log(messages[0]);
  let openai;

  if (process.env.VUE_APP_OPEN_AI_API_KEY) {
    const configuration = {
      apiKey: process.env.VUE_APP_OPEN_AI_API_KEY,
      dangerouslyAllowBrowser: true,
    };
    openai = new OpenAI(configuration);
  } else {
    throw "No API key";
  }

  const stream = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    // model: "gpt-4",
    messages,
    stream: true,
  });

  return stream;
};

export const makeRequest = async (endpoint, method = "GET", data = null) => {
  try {
    const response = await axios({
      method: method,
      url: `${apiUrl}${endpoint}`,
      data: data,
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const translate = async (text) => {
  const options = {
    method: "GET",
    url: "https://translated-mymemory---translation-memory.p.rapidapi.com/get",
    params: {
      langpair: "en|he",
      q: text,
      mt: "1",
      onlyprivate: "0",
      de: "a@b.c",
    },
    headers: {
      "X-RapidAPI-Key": "e792e00f12mshd3d906deb5629abp1fdfc1jsnbc0dbebaddc5",
      "X-RapidAPI-Host":
        "translated-mymemory---translation-memory.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    return response.data.responseData.translatedText;
  } catch (error) {
    console.error(error);
  }
};
