import { useState } from "react";
import {
  Button,
  IconButton,
  Box,
  Typography,
  Avatar,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import { AccountCircle, Logout } from "@mui/icons-material";
import DirectionsBoatFilledIcon from "@mui/icons-material/DirectionsBoatFilled";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/useUser.hook.jsx";
import CreateBookingModal from "./CreateBookingModel";
import UserNotificationModal from "./UserNotificationModal.jsx";
import ProfileModel from "./ProfileModel.jsx";
import { useQueryClient } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";

function Navbar() {
  const { user } = useUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const location = useLocation();

  const [isCreateBookingModalOpen, setIsCreateBookingModalOpen] =
    useState(false);
  const [isUserNotificationModalOpen, setIsUserNotificationModalOpen] =
    useState(false);
  const [isProfileModelOpen, setIsProfileModelOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  // Modal Handlers
  const handleOpenBookingModal = () => setIsCreateBookingModalOpen(true);
  const handleCloseBookingModal = () => setIsCreateBookingModalOpen(false);
  const handleOpenUserviewModal = () => setIsUserNotificationModalOpen(true);
  const handleCloseUserviewModal = () => setIsUserNotificationModalOpen(false);
  const handleOpenProfileModal = () => setIsProfileModelOpen(true);
  const handleCloseProfileModal = () => setIsProfileModelOpen(false);

  // Logout Handler
  const handleLogout = async () => {
    localStorage.clear();
    await queryClient.refetchQueries({ queryKey: ["user"] });
    navigate("/login");
  };

  // Avatar Menu Handlers
  const handleAvatarClick = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  // Navigation Links
  const isAdminOrEmployee = user?.role === "admin" || user?.role === "employee";
  const isAdmin = user?.role === "admin";
  const isEmployee = user?.role === "employee";

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/aboutus", label: "About Us" },
    { path: "/knowyourjourney", label: "Know Your Journey" },
  ];

  const adminLinks = [
    { path: isAdmin ? "/admin" : "/employee", label: "Home" },
    { path: "/route", label: "Routes" },
    { path: "/service", label: "Services" },
    { path: "/boat", label: "Boats" },
    ...(!isEmployee
      ? [
          { path: isAdmin ? "/leave" : "/", label: "Leaves" },
          {
            path: isAdmin ? "/notification" : "/",
            label: <NotificationsIcon />
          },
        ]
      : []),
  ];

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        width: "98%",
        zIndex: 50,
        transition: "all 0.3s ease",
        background: "rgba(255, 255, 255, 0.9)",
        backdropFilter: "blur(5px)",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Logo */}
      <Box onClick={() => navigate("/")} sx={{ cursor: "pointer" }}>
        <img
          src="https://cdn-dev.watermetro.co.in/logo_c478d0c525.png"
          alt="Water Metro Logo"
          style={{ height: "2rem" }}
        />
      </Box>

      <Box sx={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        {(isAdminOrEmployee ? adminLinks : navLinks).map((link) => (
          <Button
            key={link.path}
            onClick={() => navigate(link.path)}
            sx={{
              color: location.pathname === link.path ? "primary.main" : "#333",
              fontWeight: location.pathname === link.path ? "bold" : "normal",
            }}
          >
            {link.label}
          </Button>
        ))}

        {user ? (
          <>
            {!isAdmin && (
              <>
                <Button variant="text" onClick={() => navigate("/bookings")}>
                  My Bookings
                </Button>
                <IconButton
                  aria-label="booking"
                  size="large"
                  onClick={handleOpenBookingModal}
                >
                  <DirectionsBoatFilledIcon />
                </IconButton>
                <IconButton
                  aria-label="booking"
                  size="large"
                  onClick={handleOpenUserviewModal}
                >
                  <NotificationsIcon />
                </IconButton>
              </>
            )}
            <Typography>Hi {user?.name}</Typography>
            {/* Avatar Dropdown */}
            <IconButton
              onClick={handleAvatarClick}
              aria-controls="user-menu"
              aria-haspopup="true"
            >
              <Avatar src={user?.avatar || "/broken-image.jpg"} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              id="user-menu"
            >
              <MenuItem onClick={handleOpenProfileModal}>
                <AccountCircle sx={{ mr: 1 }} /> Profile
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <Logout sx={{ mr: 1 }} /> Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button variant="outlined" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button variant="outlined" onClick={() => navigate("/register")}>
              Register
            </Button>
          </>
        )}
      </Box>

      {/* Modals */}
      <CreateBookingModal
        isOpen={isCreateBookingModalOpen}
        onClose={handleCloseBookingModal}
      />
      <UserNotificationModal
        isOpen={isUserNotificationModalOpen}
        onClose={handleCloseUserviewModal}
      />
      <ProfileModel
        isOpen={isProfileModelOpen}
        onClose={handleCloseProfileModal}
      />
    </Box>
  );
}

export default Navbar;
