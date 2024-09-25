import axios from "axios";
import router from "./router";
import { API_BASE_URL, APP_NAME } from './config';

const axiosClientMax = axios.create({
  // baseURL: `http://192.168.1.7:8000/api/Admin/`,
  // baseURL: `https://e15d-41-33-169-170.ngrok-free.app/Admin/`,
  // baseURL: `https://fly.smartidea.tech/api/Admin/`,
  // baseURL: `https://taslem.gfoura.smartidea.tech/Admin/`,
  // baseURL: `https://git.gfoura.smartidea.tech/Admin_Max/`,
  // baseURL: `https://mosh.gfoura.smartidea.tech/Admin_Max/`,
  baseURL: `${API_BASE_URL}/Admin/`,
  // baseURL: `https://saad.learning-smart.pro/api/Admin/`,
});

axiosClientMax.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  config.headers.Authorization = `Bearer ${token}`;
  // config.headers["Cache-Control"] = "max-age=36000";
  // config.headers["Access-Control-Allow-Origin"] = "*";
  // console.log(token);
  return config;
});

axiosClientMax.interceptors.response.use(
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


export default axiosClientMax;
