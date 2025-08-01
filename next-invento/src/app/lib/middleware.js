// This file can contain helper functions for route handlers
// that act like middleware, e.g., checking for specific user roles.

export const isAdmin = (user) => {
  return user && user.role === "admin";
};
