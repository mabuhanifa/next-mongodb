import api from "./api.js";

export const loginUser = (credentials) => api.post("/auth/login", credentials);

export const registerUser = (userData) => api.post("/auth/register", userData);

export const getUserProfile = () => api.get("/auth/profile");

// Note: A backend logout route that clears the cookie is recommended.
// For now, this can be a placeholder or handled client-side by clearing state.
export const logoutUser = () => {
  // Example: return api.post('/auth/logout');
  console.log(
    "Logout should be handled by clearing client state and/or calling a backend endpoint."
  );
};
