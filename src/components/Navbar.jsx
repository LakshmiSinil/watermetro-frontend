import { useState } from "react";
import { Button, IconButton, Box, Typography } from "@mui/material";
import DirectionsBoatFilledIcon from "@mui/icons-material/DirectionsBoatFilled";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/useUser.hook.jsx";
import CreateBookingModal from "./CreateBookingModel";
import { useQueryClient } from "@tanstack/react-query";

function Navbar() {
  const { user } = useUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isCreateBookingModalOpen, setIsCreateBookingModalOpen] =
    useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleOpenDialog = () => setIsCreateBookingModalOpen(true);
  const handleCloseDialog = () => setIsCreateBookingModalOpen(false);
  const handleLogout = async () => {
    localStorage.clear();
    await queryClient.refetchQueries({ queryKey: ["user"] });
    navigate("/login");
  };

  const isAdminPage = user?.role === "admin";

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/aboutus", label: "About Us" },
    { path: "/knowyourjourney", label: "Know Your Journey" },
  ];

  const adminLinks = [{ path: "/route", label: "Routes" }];

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
      <Box onClick={() => navigate("/")} sx={{ cursor: "pointer" }}>
        <img
          src="https://cdn-dev.watermetro.co.in/logo_c478d0c525.png"
          alt="Water Metro Logo"
          style={{ height: "2rem" }}
        />
      </Box>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          gap: "2rem",
          alignItems: "center",
        }}
      >
        {(isAdminPage ? adminLinks : navLinks)?.map((link) => (
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
            {!isAdminPage && (
              <IconButton
                aria-label="booking"
                size="large"
                onClick={handleOpenDialog}
              >
                <DirectionsBoatFilledIcon />
              </IconButton>
            )}
            <Button variant="contained" color="primary" onClick={handleLogout}>
              Logout
            </Button>
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

      {/* Mobile Navigation */}
      <IconButton
        sx={{ display: { xs: "block", md: "none" } }}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <MenuIcon />
      </IconButton>

      {menuOpen && (
        <Box
          sx={{
            position: "absolute",
            top: "100%",
            right: "1rem",
            background: "white",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            padding: "1rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          {navLinks.map((link) => (
            <Button key={link.path} onClick={() => navigate(link.path)}>
              {link.label}
            </Button>
          ))}

          {user ? (
            <>
              <Typography>Hi {user?.name}</Typography>
              <IconButton
                aria-label="booking"
                size="large"
                onClick={handleOpenDialog}
              >
                <DirectionsBoatFilledIcon />
              </IconButton>
              <Button
                variant="contained"
                color="primary"
                onClick={handleLogout}
              >
                Logout
              </Button>
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
      )}

      <CreateBookingModal
        isOpen={isCreateBookingModalOpen}
        onClose={handleCloseDialog}
      />
    </Box>
  );
}

export default Navbar;
