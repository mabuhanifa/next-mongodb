"use client";

import { useAuth } from "@/context/AuthContext.js";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isAuthenticated, loading, isAdmin } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!isAuthenticated) {
      router.push("/login");
    } else if (adminOnly && !isAdmin) {
      router.push("/profile"); // or a dedicated 'unauthorized' page
    }
  }, [isAuthenticated, loading, isAdmin, adminOnly, router]);

  if (loading || !isAuthenticated || (adminOnly && !isAdmin)) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
