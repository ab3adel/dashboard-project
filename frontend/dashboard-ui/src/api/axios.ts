import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

/* =======================
   REQUEST INTERCEPTOR
======================= */
api.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

/* =======================
   REFRESH LOGIC
======================= */
let isRefreshing = false;
let failedQueue: {
  resolve: (token: string) => void;
  reject: (err: any) => void;
}[] = [];

const processQueue = (error: any, token: string | null) => {
  failedQueue.forEach(promise => {
    if (error) {
      promise.reject(error);
    } else if (token) {
      promise.resolve(token);
    }
  });

  failedQueue = [];
};

/* =======================
   RESPONSE INTERCEPTOR
======================= */
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config as any;

    // 🚫 Do NOT intercept refresh endpoint
    if (originalRequest?.url?.includes('/authentication/refresh')) {
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({
            resolve: (token: string) => {
              originalRequest.headers = {
                ...originalRequest.headers,
                Authorization: `Bearer ${token}`,
              };
              resolve(api(originalRequest));
            },
            reject,
          });
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        let refreshToken = localStorage.getItem('refreshToken')
        const res = await api.post('/authentication/refresh',{
          refreshToken
        });

        const newAccessToken = res.data.accessToken;

        localStorage.setItem('accessToken', newAccessToken);

        processQueue(null, newAccessToken);

        originalRequest.headers = {
          ...originalRequest.headers,
          Authorization: `Bearer ${newAccessToken}`,
        };

        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);

        // 🔥 Refresh token expired → force logout
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');

        window.location.href = '/login';

        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
