import React from "react";
import { Box, Typography } from "@mui/material";
import { keyframes } from "@emotion/react";

// Define keyframes for bounce animation
const bounce = keyframes`
  0%, 100% { transform: translateY(0); opacity: 1; }
  50% { transform: translateY(10px); opacity: 0.7; }
`;

const HeroSection = () => {
  const heroContainerStyle = {
    position: "relative",
    overflow: "hidden",
    width: "100%",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const videoStyle = {
    position: "absolute",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: -1,
  };

  const overlayStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,
  };

  const contentStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "white",
    textAlign: "center",
    zIndex: 2,
  };

  const titleStyle = {
    fontSize: window.innerWidth >= 768 ? "3rem" : "2rem",
    marginBottom: "1rem",
  };

  const textStyle = {
    fontSize: window.innerWidth >= 768 ? "1.25rem" : "1rem",
    marginBottom: "2rem",
  };

  const scrollIndicatorStyle = {
    position: "absolute",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: "#fff",
    zIndex: 2,
  };

  return (
    <div style={heroContainerStyle}>
      <video autoPlay loop muted style={videoStyle}>
        <source
          src="https://cdn-dev.watermetro.co.in/video_1bf1d108c8.webm"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      <div style={overlayStyle}></div>

      <div style={contentStyle}>
        <h1 style={titleStyle}>Welcome to Water Metro</h1>
        <p style={textStyle}>
          Experience modern water transport system connecting islands to the mainland
        </p>
        <h2
        style={{
          color: "white",
          fontSize: "24px",
          fontWeight: "bold",
          position: "relative",
          animation: "moveText 3s infinite alternate",
        }}
      >
        Please sign up to reserve your tickets.
      </h2>
      <style>
        {`
          @keyframes moveText {
            0% { left: 0px; }
            100% { left: 50px; }
          }
        `}
      </style>
      </div>

      {/* Scroll Down Indicator */}
      <Box sx={scrollIndicatorStyle}>
        <Typography sx={{ fontSize: "16px", mb: 1 }}>Scroll Down</Typography>
        <Box
          sx={{
            width: "35px",
            height: "55px",
            border: "2px solid white",
            borderRadius: "30px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Box
            sx={{
              width: "8px",
              height: "8px",
              backgroundColor: "white",
              borderRadius: "50%",
              animation: `${bounce} 1.5s infinite`,
            }}
          />
        </Box>
      </Box>
    </div>
  );
};

export default HeroSection;
