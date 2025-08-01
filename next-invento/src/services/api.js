import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // Important for sending cookies with requests
});

// Optional: Add a response interceptor for global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle errors globally
    console.error("API Error:", error.response?.data || error.message);

    // You could add logic here to handle specific status codes,
    // like redirecting to a login page on a 401 Unauthorized error.

    return Promise.reject(error);
  }
);

export default api;
