import { useState } from "react";
import "./navbar.css";
import { useUser } from "../context/useUser.hook.jsx";
import { Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DirectionsBoatFilledIcon from "@mui/icons-material/DirectionsBoatFilled";
import CreateBookingModal from "./CreateBookingModel";
import { useQueryClient } from "@tanstack/react-query";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/aboutus", label: "About Us" },
  // { path: "/consultancy-services", label: "Consultancy Services" },
  // { path: "/terminals", label: "Terminals" },
  { path: "/know-your-journey", label: "Know Your Journey" },
];

function Navbar() {
  const { user } = useUser();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isCreateBookingModalOpen, setIsCreateBookingModalOpen] =
    useState(false);

  const handleOpenDialog = () => setIsCreateBookingModalOpen(true);
  const handleCloseDialog = () => setIsCreateBookingModalOpen(false);

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-content">
          <div className="navbar-logo" onClick={() => navigate("/")}>
            <img
              src="https://cdn-dev.watermetro.co.in/logo_c478d0c525.png"
              alt="Water Metro Logo"
              className="logo-image"
            />
          </div>

          <div className="navbar-links">
            {navLinks.map((link) => (
              <Button
                key={link.path}
                onClick={() => navigate(link.path)}
                className="nav-link"
              >
                {link.label}
              </Button>
            ))}

            {user ? (
              <>
                Hi {user?.name}
                <IconButton
                  aria-label="booking"
                  size="large"
                  onClick={handleOpenDialog}
                >
                  <DirectionsBoatFilledIcon />
                </IconButton>
                <Button
                  variant="contained"
                  onClick={async () => {
                    localStorage.clear();
                    await queryClient.invalidateQueries({ queryKey: ["user"] });
                    navigate("/login");
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button variant="outlined" onClick={() => navigate("/login")}>
                  Login
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/register")}
                >
                  Register
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
      <CreateBookingModal
        isOpen={isCreateBookingModalOpen}
        onClose={handleCloseDialog}
      />
    </nav>
  );
}

export default Navbar;
