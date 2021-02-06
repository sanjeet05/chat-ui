import axios from "axios";
// import LocalStorageService from "../services/LocalStorageService";

// api calls
export const apiCalls = (method, url, data = {}) => {
  if (method === "get") {
    // only for get
    return axios({ method: method, url: url, params: data });
  } else {
    // post, put, delete
    return axios({ method: method, url: url, data: data });
  }
};

/*
 * Added axios global variable
 */

// Add a request interceptor
// axios.interceptors.request.use(
//   (config) => {
//     const token = LocalStorageService.getAccessToken();
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// axios.defaults.headers.post["Content-Type"] = "application/json";
