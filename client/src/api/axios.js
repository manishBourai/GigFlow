// client/src/api/axios.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://ec2-98-83-42-149.compute-1.amazonaws.com/api/api",
  withCredentials:true
});

export default api;