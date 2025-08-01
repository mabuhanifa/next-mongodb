"use client";

import ProtectedRoute from "@/components/ProtectedRoute.js";
import { useAuth } from "@/context/AuthContext.js";

function ProfilePageContent() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      {user && (
        <div className="mt-4 p-6 bg-white rounded-lg shadow-md text-black">
          <div className="mb-2">
            <strong>Name:</strong> {user.name}
          </div>
          <div className="mb-2">
            <strong>Email:</strong> {user.email}
          </div>
          <div>
            <strong>Role:</strong> {user.role}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfilePageContent />
    </ProtectedRoute>
  );
}
