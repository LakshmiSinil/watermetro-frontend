import React from "react";
import { useQuery } from "@tanstack/react-query"; 
import api from "../config/axiosInstance"; 
import Footer from "./Footer";
import { Card, CardContent, Button, Select, MenuItem, Typography } from "@mui/material";

export default function KnowYourJourney() {
  // Fetch routes using React Query
  const { data: routes = [], isLoading, error } = useQuery({
    queryKey: ["routes"],
    queryFn: async () => {
      const res = await api.get("/routes");
      return res.data;
    },
  });

  if (isLoading) return <p>Loading routes...</p>;
  if (error) return <p>Error loading routes</p>;

  return (
    <>
      <main style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        {/* Hero Section */}
        <div style={{
          position: "relative",
          height: "300px",
          background: "linear-gradient(to right, #2563eb, #14b8a6)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "white",
          padding: "1rem"
        }}>
          <div style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0, 0, 0, 0.2)"
          }} />
          <div style={{ position: "relative", zIndex: 2, maxWidth: "90%" }}>
            <h1 style={{
              fontSize: "2.5rem",
              fontWeight: "bold",
              marginBottom: "0.5rem",
              textAlign: "center"
            }}>
              Know Your Journey
            </h1>
            <p style={{ fontSize: "1.25rem", textAlign: "center" }}>
              Plan your water metro journey across Kochi
            
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
        </div>

        {/* Content Section */}
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "3rem 1rem" }}>
          <Card style={{
            maxWidth: "600px",
            margin: "0 auto",
            padding: "1.5rem",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px"
          }}>
            <CardContent>
              <div style={{ marginBottom: "1rem" }}>
                <label htmlFor="from" style={{
                  display: "block",
                  fontWeight: "bold",
                  marginBottom: "0.5rem"
                }}>
                  From
                </label>
                <Select id="from" defaultValue="" displayEmpty fullWidth>
                  <MenuItem value="" disabled>Select starting point</MenuItem>
                  <MenuItem value="Vyttila">Vyttila</MenuItem>
                  <MenuItem value="High Court">High Court</MenuItem>
                  <MenuItem value="Vypin">Vypin</MenuItem>
                  <MenuItem value="Kakkanad">Kakkanad</MenuItem>
                </Select>
              </div>

              <div style={{ marginBottom: "1rem" }}>
                <label htmlFor="to" style={{
                  display: "block",
                  fontWeight: "bold",
                  marginBottom: "0.5rem"
                }}>
                  To
                </label>
                <Select id="to" defaultValue="" displayEmpty fullWidth>
                  <MenuItem value="" disabled>Select destination</MenuItem>
                  <MenuItem value="Vyttila">Vyttila</MenuItem>
                  <MenuItem value="High Court">High Court</MenuItem>
                  <MenuItem value="Vypin">Vypin</MenuItem>
                  <MenuItem value="Kakkanad">Kakkanad</MenuItem>
                </Select>
              </div>

              <Button
                variant="contained"
                color="primary"
                fullWidth
                style={{
                  padding: "0.75rem",
                  fontSize: "1rem",
                  fontWeight: "bold"
                }}>
                Plan Journey
              </Button>
            </CardContent>
          </Card>

          {/* Available Routes Section */}
          <div style={{ marginTop: "2rem" }}>
            <h2 style={{
              fontSize: "1.75rem",
              fontWeight: "bold",
              marginBottom: "1rem"
            }}>
              Available Routes
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {routes.map((route) => (
                <Card key={route._id} style={{ margin: "10px 0", padding: "10px" }}>
                  <CardContent>
                    <Typography variant="body1">
                      Route: {route.fromLocation} - {route.toLocation}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Fare: ₹{route.fare}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
