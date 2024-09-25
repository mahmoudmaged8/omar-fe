import axios from "axios";
import router from "./router";
import { API_BASE_URL, APP_NAME } from './config';

const axiosClientImage = axios.create({
  // baseURL: `http://192.168.1.7:8000/`,
  // baseURL: `https://e15d-41-33-169-170.ngrok-free.app/`,
  // baseURL: `https://fly.smartidea.tech/`,
  // baseURL: `https://dev.gfoura.smartidea.tech/`,
  // baseURL: `https://git.gfoura.smartidea.tech/`,
  baseURL: API_BASE_URL,
  // baseURL: `https://saad.learning-smart.pro/`,
});


axiosClientImage.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  // config.headers["Cache-Control"] = "max-age=36000";
  return config;
});
axiosClientImage.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      window.location.reload();
      router.navigate("/Home");
      return error;
    }
    throw error;
  }
);


export default axiosClientImage;
