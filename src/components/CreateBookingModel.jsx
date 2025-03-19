import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { toast } from "react-hot-toast";
import api from "../config/axiosInstance";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const CreateBookingModal = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient();
  const [routeId, setRouteId] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [serviceId, setServiceId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function reset() {
    setRouteId("");
    setPassengers(1);
    setServiceId("");
  }

  // Fetch Routes
  const { data: routes } = useQuery({
    queryKey: ["routes"],
    queryFn: async () => {
      const res = await api.get("/routes");
      return res.data;
    },
    onError: (error) => {
      toast.error("Failed to fetch routes.");
      console.error("Error fetching routes:", error);
    },
  });

  // Fetch Services
  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await api.get("/services");
      return res.data.services;
    },
    onError: (error) => {
      toast.error("Failed to fetch services.");
      console.error("Error fetching services:", error);
    },
  });

  useEffect(() => {
    if (routes?.length > 0 && !routeId) setRouteId(routes[0]._id);
    if (services?.length > 0 && !serviceId) setServiceId(services[0]._id);
  }, [routes, services]);

  // Handle Booking Creation
  const handleCreate = async () => {
    setIsLoading(true);
    try {
      toast.loading("Creating booking...");
      const response = await api.post("/bookings", {
        routeId,
        passengerCount: passengers,
        serviceId,
      });

      const bookingId = response.data.newBooking._id;
      toast.dismiss();
      toast.success("Booking Created ✅");
      await checkouthandler(bookingId);
      await queryClient.invalidateQueries(["bookings"]);
      reset();
      onClose();
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to create booking, try again.");
      console.error("Booking error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Razorpay Payment
  const checkouthandler = async (bookingId) => {
    try {
      const selectedRoute = routes?.find((route) => route._id === routeId);
      const amount = selectedRoute ? selectedRoute.fare * passengers * 100 : 0;
      if (amount <= 0) return toast.error("Invalid booking amount.");

      const { data } = await api.post("/bookings/razorpay-order", {
        amount,
        bookingId,
      });

      const options = {
        key: "rzp_test_4UiNYyLimT35W9",
        amount: data.order.amount,
        currency: "INR",
        name: "Water Metro Kochi",
        description: "Booking Payment",
        order_id: data.order.id,
        handler: async function (response) {
          const res = await api.patch("/bookings/" + bookingId, {
            ispaid: true,
          });
          console.log("🚀 ~ res:", res);
          toast.success("Payment Successful!");
        },
        callback_url: "http://localhost:5000/bookings/paymentverification",
        theme: { color: "#3399cc" },
      };

      if (!window.Razorpay) {
        toast.error("Razorpay SDK not loaded");
        return;
      }

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Error in Razorpay payment:", error);
      toast.error("Payment failed, try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Create Booking</DialogTitle>
      <DialogContent>
        <Select
          value={routeId}
          onChange={(e) => setRouteId(e.target.value)}
          fullWidth
        >
          {routes?.map((route) => (
            <MenuItem key={route._id} value={route._id}>
              {route.fromLocation} - {route.toLocation}
            </MenuItem>
          ))}
        </Select>

        <Select
          value={serviceId}
          onChange={(e) => setServiceId(e.target.value)}
          fullWidth
        >
          {services?.map((service) => (
            <MenuItem key={service._id} value={service._id}>
              {service.time}
            </MenuItem>
          ))}
        </Select>

        <TextField
          fullWidth
          label="Number of Passengers"
          type="number"
          value={passengers}
          onChange={(e) =>
            setPassengers(
              Math.max(1, Math.min(10, parseInt(e.target.value) || 1))
            )
          }
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleCreate} variant="contained" disabled={isLoading}>
          {isLoading ? "Booking..." : "Book"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateBookingModal;
