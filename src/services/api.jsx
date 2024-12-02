import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 添加錯誤攔截器
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    if (error.response) {
      // 服務器回應錯誤
      console.error("Response Error:", error.response.data);
    } else if (error.request) {
      // 請求發送失敗
      console.error("Request Error:", error.request);
    }
    return Promise.reject(error);
  }
);

export const handleResponse = async (promise) => {
  try {
    const response = await promise;
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || "發生錯誤");
  }
};

export default api;
