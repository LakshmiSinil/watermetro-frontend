import React, { useState } from "react";
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
  const [passengers, setPassengers] = useState("");
  const [serviceId, setServiceId] = useState("");

  function reset() {
    setRouteId("");
    setPassengers("");
    setServiceId("");
  }

  const { data: routes } = useQuery({
    queryKey: ["routes"],
    queryFn: async () => {
      const res = await api.get("/routes");
      if (!routeId) setRouteId(res?.data?.[0]?._id);
      return res.data;
    },
  });

  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await api.get("/services");
      if (!serviceId) setServiceId(res?.data?.services?.[0]?._id);
      return res.data.services;
    },
  });

  const handleCreate = async () => {
    const respPromise = api.post("/bookings", { routeId, passengerCount:passengers, serviceId });
    toast.promise(respPromise, {
      loading: "Creating...",
      success: "Booking Created ✅",
      error: "Failed to create booking, try again",
    });
    const resp = await respPromise;
    await queryClient.invalidateQueries({ queryKey: ["bookings"] });
    onClose();
    reset();
  };

  if (!isOpen) return <></>;

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Create Booking</DialogTitle>
      <DialogContent>
        <Select
          labelId="select-route-label"
          value={routeId}
          onChange={({ target }) => setRouteId(target.value)}
          fullWidth
        >
          {routes?.map((route) => (
            <MenuItem key={route._id} value={route._id}>
              {route.fromLocation} - {route.toLocation}
            </MenuItem>
          ))}
        </Select>

      <Select
        label="Time"
          labelId="select-service-label"
          value={serviceId}
          onChange={({ target }) => setServiceId(target.value)}
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
          variant="outlined"
          margin="dense"
          value={passengers}
          onChange={(e) => setPassengers(e.target.value)}
        />

       
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleCreate} variant="contained">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateBookingModal;
