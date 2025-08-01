"use client";

import { useAuth } from "@/context/AuthContext.js";
import Link from "next/link";

export default function Navbar() {
  const { isAuthenticated, user, logout, loading } = useAuth();

  return (
    <nav className="bg-gray-800 p-4 fixed top-0 left-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-lg font-bold">
          Next Invento
        </Link>
        <div className="space-x-4">
          {loading ? (
            <span className="text-white"></span>
          ) : isAuthenticated ? (
            <>
              <Link href="/profile" className="text-gray-300 hover:text-white">
                {user?.name}
              </Link>
              {user?.role === "admin" && (
                <Link
                  href="/admin/dashboard"
                  className="text-gray-300 hover:text-white"
                >
                  Admin
                </Link>
              )}
              <button
                onClick={logout}
                className="text-gray-300 hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-gray-300 hover:text-white">
                Login
              </Link>
              <Link href="/register" className="text-gray-300 hover:text-white">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
