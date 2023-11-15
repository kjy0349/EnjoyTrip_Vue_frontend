import axios from "axios";

const { VITE_VUE_API_URL, VITE_VUE_API_URL_BOARD, VITE_VUE_API_URL_USER } =
  import.meta.env;

function localAxios() {
  const instance = axios.create({
    baseURL: VITE_VUE_API_URL,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return instance;
}

function boardAxios() {
  const instance = axios.create({
    baseURL: VITE_VUE_API_URL_BOARD,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return instance;
}

function userAxios() {
  const instance = axios.create({
    baseURL: VITE_VUE_API_URL_USER,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return instance;
}

function commentAxios() {
  const instance = axios.create({
    baseURL: VITE_VUE_API_URL_USER,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  return instance;
}

export { localAxios, boardAxios, userAxios, commentAxios };
