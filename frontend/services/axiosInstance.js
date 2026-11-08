import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:6500",
  headers: {
    "Content-Type": "application/json",
  },
});

const notifyAuthExpired = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("auth-expired"));
  }
};

// قرار است مشخص کند آیا در حال تمدید توکن هستیم یا خیر
let isRefreshing = false;

// درخواست‌هایی که هنگام تمدید توکن با خطای 401 مواجه می‌شوند
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });

  failedQueue = [];
};

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,

  async (error) => {
    if (typeof window === "undefined") {
      return Promise.reject(error);
    }

    const originalRequest = error.config;

    if (
      ![401, 403].includes(error.response?.status) ||
      originalRequest._retry ||
      originalRequest.url?.includes("/auth/refresh-token")
    ) {
      return Promise.reject(error);
    }

    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      notifyAuthExpired();
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const response = await axios.post(
        "http://localhost:6500/auth/refresh-token",
        { refreshToken },
      );

      const newAccessToken = response.data.accessToken;

      localStorage.setItem("accessToken", newAccessToken);

      processQueue(null, newAccessToken);

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      return api(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      notifyAuthExpired();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default api;
