import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Homepage";
import AboutPage from "./components/aboutus";
import Login from "./components/Login";
import { UserProvider } from "./context/useUser.hook.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import Register from "./components/Register";
import RoutePage from "./components/RoutePage.jsx";
import BoatPage from "./components/BoatPage.jsx";
import ServicePage from "./components/ServicePage.jsx";
import { Box } from "@mui/material";
import AdminDashboard from "./components/admindashboard.jsx";
import BoatBookingHistory from "./components/BookingHistory.jsx";
import ViewBoatBooking from "./components/ViewBoatBooking.jsx";
import KnowYourJourney from "./components/knowyourjourney.jsx";
import PrivateRoute from "./components/hoc/PrivateRoute.jsx";
import EmployeeDashboard from "./components/EmployeeDashboard.jsx";
import AdminNotificationPage from "./components/AdminNotificationPage.jsx";
import LeavePage from "./components/LeavePage.jsx";

function App() {
  const queryClient = new QueryClient();
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <UserProvider>
          <Navbar />
          <Box sx={{ height: "80px", width: "100vw" }} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aboutus" element={<AboutPage />} />
            <Route path="/knowyourjourney" element={<KnowYourJourney />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route
              path="/route"
              element={
                <PrivateRoute allowedRoles={["admin","employee"]}>
                  <RoutePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/notification"
              element={
                <PrivateRoute allowedRoles={["admin"]}>
                  <AdminNotificationPage/>
                </PrivateRoute>
              }
            />
             <Route
              path="/leave"
              element={
                <PrivateRoute allowedRoles={["admin"]}>
                  <LeavePage/>
                </PrivateRoute>
              }
            />
            <Route
              path="/boat"
              element={
                <PrivateRoute allowedRoles={["admin","employee"]}>
                  <BoatPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/service"
              element={
                <PrivateRoute allowedRoles={["admin","employee"]}>
                  <ServicePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <PrivateRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/employee"
              element={
                <PrivateRoute allowedRoles={["employee"]}>
                  <EmployeeDashboard />
                </PrivateRoute>
              }
            />
            <Route path="/bookings" element={<BoatBookingHistory />} />
            <Route path="/bookings/:id" element={<ViewBoatBooking />} />
          </Routes>
        </UserProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
