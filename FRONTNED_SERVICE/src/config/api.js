import axios from "axios";

export const baseURL = "http://localhost:2000/api";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// const setAuthorizationToken = () => {
//   const token = localStorage.getItem("access_token");
//   if (token) {
//     console.log("setting header with token", token);
//     api.defaults.headers["x-access-token"] = `${token}`;
//   } else {
//     delete api.defaults.headers["x-access-token"];
//   }
// };

let isTokenSet = false; // Track if token is already set

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    config.headers["x-access-token"] = token;
    isTokenSet = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  async (response) => {
    try {
      if (response?.status === 201 || response?.status === 200) {
        return response.data;
      } else if (response?.status === 204) {
        return Promise.resolve(null);
      } else {
        return Promise.reject(response?.data ?? "Something Went Wrong");
      }
    } catch (error) {
      return Promise.reject(
        error?.response?.data?.message ??
          error?.toString() ??
          "Something Went Wrong"
      );
    }
  },
  async (error) => {
    try {
      if (error?.response?.status > 400) {
        localStorage.removeItem("access_token");
        console.error(error);
        window.location.reload();
        return Promise.reject("Authorization Error");
      }
      return Promise.reject(
        error?.response?.data?.message ??
          error?.toString() ??
          "Something Went Wrong"
      );
    } catch (error) {
      return Promise.reject("Something Went Wrong");
    }
  }
);

export default api;
