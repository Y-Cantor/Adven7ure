import axios from "axios";

const apiUrl = "/api/0a039933-3473-45ff-9c22-9bc0e0a69026";

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
