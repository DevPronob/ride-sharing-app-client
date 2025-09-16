import React, { type ComponentType } from "react";
import { useGetMeQuery } from "@/redux/features/auth/auth.api";
import type { TRole } from "@/types";
import { Navigate } from "react-router-dom";

function withAuth(WrappedComponent: ComponentType, requiredRole?: TRole) {
  return function AuthWrapper() {
    const { data: userData, isLoading } = useGetMeQuery(undefined);

    if (isLoading) {
      return <div>Loading...</div>; // Show a loader while fetching user
    }

    // Not logged in
    if (!userData?.data) {
      return <Navigate to="/login" replace />;
    }

    // Role mismatch
    if (requiredRole && userData.data.role !== requiredRole) {
      return <Navigate to="/" replace />;
    }

    return <WrappedComponent />;
  };
}

export default withAuth;
