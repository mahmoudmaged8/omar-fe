import axios from "axios";
import router from "./router";
import { API_BASE_URL, APP_NAME } from './config';

const axiosClientF = axios.create({
  // baseURL: `http://192.168.1.7:8000/api/`,
  // baseURL: `https://e15d-41-33-169-170.ngrok-free.app/api/`,
  // baseURL: `https://fly.smartidea.tech/api/`,
  // baseURL: `https://dev.gfoura.smartidea.tech/api/`,
  // baseURL: `https://git.gfoura.smartidea.tech/api/`,
  // baseURL: `https://mosh.gfoura.smartidea.tech/api/`,
  baseURL: `${API_BASE_URL}/api/`,
  // baseURL: `https://saad.learning-smart.pro/api/`,
  
});

axiosClientF.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;
  // config.headers["Cache-Control"] = "max-age=36000";
  // console.log(token);
  return config;
});

axiosClientF.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      window.location.reload();
      router.navigate("/login");
      return error;
    }
    throw error;
  }
);

export default axiosClientF;
