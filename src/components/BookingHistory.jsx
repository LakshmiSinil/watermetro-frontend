import React, { useState } from "react";
import { Card, CardContent, Typography, Divider, Box } from "@mui/material";
import api from "../config/axiosInstance";
import { useQuery,  } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import CreateBookingModal from "./CreateBookingModel";

function BoatBookingHistory() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { data: bookings = [] } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const res = await api.get("/bookings");
      return res.data.bookings;
    },
  });

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Your Boat Bookings
      </Typography>

      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <Box
            key={booking._id}
            sx={{ marginBottom: "20px" }}
            onClick={() => {
              console.log('clicked')
              navigate("/bookings/" + booking._id);
            }}
          >
            <Typography variant="subtitle2" color="textSecondary">
              Booked on: <strong>{booking.createdAt}</strong>
            </Typography>
            <Card sx={{ marginTop: "10px", padding: "10px", width: "400px" }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {booking.serviceId?.boatId?.name}
                </Typography>
                <Typography variant="body2" sx={{ marginTop: "5px" }}>
                  Route: {booking.routeId?.fromLocation} -{" "}
                  {booking.routeId?.toLocation}
                </Typography>
                <Typography variant="body2">
                  Passengers: {booking.passengerCount}
                </Typography>
                <Typography variant="body2">
                  Status: {booking.status}
                </Typography>
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  sx={{
                    color: booking.isPaid ? "green" : "red",
                    marginTop: "5px",
                  }}
                >
                  {booking.isPaid ? "Paid" : "Not Paid"}
                </Typography>
              </CardContent>
            </Card>
            <Typography variant="body2" sx={{ marginTop: "5px" }}>
              Thank you for booking with us!
            </Typography>
          </Box>
        ))
      ) : (
        <Typography variant="body2" color="textSecondary" align="center">
          No bookings found
        </Typography>
      )}

      <Divider sx={{ marginTop: "10px" }} />
      <CreateBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Box>
  );
}

export default BoatBookingHistory;
