import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "@/App";
import DashboardLayout from "@/components/layout/Dashboardlayout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import BookARide from "@/pages/Rider/BookARide";
import BecomeADriver from "@/pages/Driver/BecomeADriver";

// Admin Pages
import Rides from "@/pages/Admin/Rides";
import DriverManagement from "@/pages/Admin/DriverManagement";
import UserManagement from "@/pages/Admin/UserManagement";
import Analytics from "@/pages/Admin/Analytics";
import AdminProfileManagement from "@/pages/Admin/AdminProfileManagement";

// Driver Pages
import RideManagement from "@/pages/Driver/RideManagment";
import RideHistory from "@/pages/Driver/RideHistory";
import ActiveRide from "@/pages/Driver/ActiveRide";
import DriverProfileManagement from "@/pages/Driver/DriverProfileManagement";
import { VisualChart } from "@/pages/Driver/VisualChart";

// Rider Pages
import RiderHistory from "@/pages/Rider/RiderHistory";
import RiderProfileManagement from "@/pages/Rider/RiderProfileManagement";

// Auth HOC
import withAuth from "@/utils/withAuth";
import { useGetMeQuery } from "@/redux/features/auth/auth.api";
import type { TRole } from "@/types";
import Faq from "@/pages/Faq";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Features from "@/pages/Features";
import LiveRideTracking from "@/pages/Rider/LiveRideTracking";
import DriverTracking from "@/pages/Driver/DriverTracking";



// Wrapped Pages
const AdminRides = withAuth(Rides, "ADMIN");
const AdminDriverManagement = withAuth(DriverManagement, "ADMIN");
const AdminUserManagement = withAuth(UserManagement, "ADMIN");
const AdminAnalytics = withAuth(Analytics, "ADMIN");
const AdminProfile = withAuth(AdminProfileManagement, "ADMIN");

const DriverRideManagement = withAuth(RideManagement, "DRIVER");
const DriverRideHistory = withAuth(RideHistory, "DRIVER");
const DriverActiveRide = withAuth(ActiveRide, "DRIVER");
const DriverChart = withAuth(VisualChart, "DRIVER");
const DriverProfile = withAuth(DriverProfileManagement, "DRIVER");

const RiderRideHistoryPage = withAuth(RiderHistory, "RIDER");
const RiderProfile = withAuth(RiderProfileManagement, "RIDER");

// Redirect Component
// eslint-disable-next-line react-refresh/only-export-components
function DashboardRedirect() {

  const { data: meData, isLoading } = useGetMeQuery(undefined);
  console.log(meData)

  if (isLoading) return null;

  const role: TRole | undefined = meData?.data?.role;

  switch (role) {
    case "ADMIN":
      return <Navigate to="/dashboard/rides" replace />;
    case "DRIVER":
      return <Navigate to="/dashboard/accept-request" replace />;
    case "RIDER":
      return <Navigate to="/dashboard/rider-ride-history" replace />;
    default:
      return <Navigate to="/" replace />;
  }
}




export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "faq", element: <Faq /> },
      { path: "about", element: <About /> },
      { path: "features", element: <Features /> },
      { path: "contact", element: <Contact /> },
      { path: "book-a-ride", element: <BookARide /> },
      { path: "become-a-driver", element: <BecomeADriver /> },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardRedirect /> },

      // Admin Routes
      { path: "rides", element: <AdminRides /> },
      { path: "driver-management", element: <AdminDriverManagement /> },
      { path: "user-management", element: <AdminUserManagement /> },
      { path: "analytics", element: <AdminAnalytics /> },
      { path: "admin/update-profile", element: <AdminProfile /> },

      // Driver Routes
      { path: "accept-request", element: <DriverRideManagement /> },
      { path: "ride-history", element: <DriverRideHistory /> },
      { path: "active-ride", element: <DriverActiveRide /> },
      { path: "earnings", element: <DriverChart /> },
      { path: "driver/update-profile", element: <DriverProfile /> },
      { path: "driver/analytics", element: <VisualChart /> },

      // Rider Routes
      { path: "rider-ride-history", element: <RiderRideHistoryPage /> },
      { path: "rider/update-profile", element: <RiderProfile /> },
      { path: "rider/ride-tracking", element: <LiveRideTracking  /> },
      { path: "driver/ride-tracking", element: <DriverTracking /> },

      // Catch-all for unknown routes in dashboard
      { path: "*", element: <Navigate to="/dashboard" replace /> },
    ],
  },

  // Fallback for unknown routes
  { path: "*", element: <Navigate to="/" replace /> },
]);
