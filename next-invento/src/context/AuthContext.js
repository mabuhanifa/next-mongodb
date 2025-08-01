"use client";

import {
  logoutUser as apiLogout,
  getUserProfile,
  loginUser,
  registerUser,
} from "@/services/authApi.js";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const { data } = await getUserProfile();
        if (data.success) {
          setUser(data.data);
          setIsAuthenticated(true);
        }
      } catch (error) {
        // User is not logged in
      } finally {
        setLoading(false);
      }
    };
    checkLoggedIn();
  }, []);

  const login = async (credentials) => {
    const { data } = await loginUser(credentials);
    if (data.success) {
      const profileRes = await getUserProfile();
      setUser(profileRes.data.data);
      setIsAuthenticated(true);
      router.push("/profile");
    }
  };

  const register = async (userData) => {
    await registerUser(userData);
    router.push("/login");
  };

  const logout = async () => {
    try {
      await apiLogout();
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      router.push("/login");
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout,
    isAdmin: user?.role === "admin",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
