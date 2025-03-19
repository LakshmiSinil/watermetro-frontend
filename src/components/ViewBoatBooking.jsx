import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import api from "../config/axiosInstance";
import { Box, Card, CardContent, Icon, IconButton, Typography } from "@mui/material";
import QRCode from "react-qr-code";
import ShareIcon from "@mui/icons-material/Share";
import toast from "react-hot-toast";

const ViewBoatBooking = () => {
  const params = useParams();
  
  const { data: booking } = useQuery({
    queryKey: ["bookings", params?.id],
    queryFn: async () => {
      const res = await api.get("/bookings/" + params?.id);
      console.log("🚀 ~ useQuery ~ res:", res.data.booking);
      return res.data.booking;
    },
  });
  if (!booking) return <>Loading...</>;
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Card
        sx={{
          marginTop: "10px",
          marginLeft:"10px",
          padding: "10px",
          width: "400px",
          outline: "1px solid black",
        }}
      >
      <QRCode
        size={256}
        style={{ height: "auto", maxWidth: "100%", width: "250px"  }}
        value={document.location.href}
        viewBox={`30 0 256 256`}
      />
      <br />
      
        <CardContent>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="subtitle2" color="textSecondary">
              Booked on: <strong>{new Date(booking?.createdAt).toLocaleDateString()}</strong>
            </Typography>
            <IconButton onClick={()=>{
              navigator.clipboard.writeText(document.location.href);
              toast("Copied to clipboard ✅")
            }} >
              <ShareIcon/>
            </IconButton>
          </Box>
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
          <Typography variant="body2">Status: {booking.status}</Typography>
          <Typography
            variant="body2"
            fontWeight="bold"
            sx={{
              color: booking.ispaid ? "green" : "red",
              marginTop: "5px",
            }}
          >
            {booking.ispaid ? "Paid" : "Not Paid"}
          </Typography>
        </CardContent>
      </Card>
      <Typography
        variant="body2"
        sx={{
          marginTop: "5px",
          textAlign: "center",
          marginBlockStart: "10px",
        }}
      >
        Thank you for booking with us ❤️
      </Typography>
    </Box>
  );
};

export default ViewBoatBooking;
