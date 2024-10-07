import axios from "axios";

axios.defaults.baseURL =
  "https://psychologists-7c733-default-rtdb.europe-west1.firebasedatabase.app";
  

export const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  axios.defaults.headers.common.Authorization = "";
};
