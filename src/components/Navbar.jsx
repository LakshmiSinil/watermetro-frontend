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
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/useUser.hook.jsx";
import CreateBookingModal from "./CreateBookingModel";
import ProfileModel from "./ProfileModel.jsx";
import { useQueryClient } from "@tanstack/react-query";

function Navbar() {
  const { user } = useUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isCreateBookingModalOpen, setIsCreateBookingModalOpen] =
    useState(false);
  const [isProfileModelOpen, setIsProfileModelOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  // Modal Handlers
  const handleOpenBookingModal = () => setIsCreateBookingModalOpen(true);
  const handleCloseBookingModal = () => setIsCreateBookingModalOpen(false);
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
  const isAdminOrEmployee = user?.role === "admin"||user?.role === "employee";
  const isAdmin =user?.role === "admin";
  const isEmployee =user?.role === "employee";

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/aboutus", label: "About Us" },
    { path: "/knowyourjourney", label: "Know Your Journey" },
  ];
  const adminLinks = [
    { path:isAdmin? "/admin":"/employee", label: "Home" },
    { path: "/route", label: "Routes" },
    { path: "/service", label: "Services" },
    { path: "/boat", label: "Boats" },
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

      {/* Desktop Navigation */}
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          gap: "2rem",
          alignItems: "center",
        }}
      >
        {(isAdminOrEmployee ? adminLinks : navLinks).map((link) => (
          <Button
            key={link.path}
            onClick={() => navigate(link.path)}
            sx={{ color: "#333" }}
          >
            {link.label}
          </Button>
        ))}
       
        {user ? (
          <>
            <Typography>Hi {user?.name}</Typography>
            {!isAdmin && (
              <IconButton
                aria-label="booking"
                size="large"
                onClick={handleOpenBookingModal}
              >
                <DirectionsBoatFilledIcon />
              </IconButton>
            )}

            {/* Avatar Dropdown */}
            <IconButton onClick={handleAvatarClick}>
              <Avatar src="/broken-image.jpg" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
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
      <ProfileModel
        isOpen={isProfileModelOpen}
        onClose={handleCloseProfileModal}
      />
    </Box>
  );
}

export default Navbar;
