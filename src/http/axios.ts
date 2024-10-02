import axios from "axios";
const prodURL = import.meta.env.VITE_PROD_URL;
const baseUrl = `${prodURL ? "/api" : "http://localhost:3001/api"}`;

console.log(baseUrl);

export const api = axios.create({
  baseURL: baseUrl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  timeout: 60000,
});
