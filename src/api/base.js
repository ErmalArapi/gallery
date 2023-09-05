import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;
const config = {
  headers: {
    Authorization: `Client-ID ${apiKey}`,
  },
};

export const baseApi = axios.create({
  baseURL: "https://api.imgur.com/3/gallery/hot/viral/0.json",
  headers: config.headers,
});
