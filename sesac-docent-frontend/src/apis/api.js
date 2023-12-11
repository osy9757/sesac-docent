import axios from "axios";

const api = axios.create({
  // baseURL: process.env.SPRING_SERVER_URL || "http://localhost",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    // Authorization: localStorage.getItem("jwtToken"),
  },
  withCredentials: true,
});

export default api;
