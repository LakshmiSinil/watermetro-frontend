import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { toast } from "react-hot-toast";
import api from "../config/axiosInstance";
import { useQueryClient } from "@tanstack/react-query";

export const CreateRouteModal = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient();
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [fare, setFare] = useState("");

  function reset() {
    setFromLocation("");
    setToLocation("");
    setFare("");
  }

  const handleCreate = async () => {
    const respPromise = api.post("/routes", { fromLocation, toLocation, fare });
    toast.promise(respPromise, {
      loading: "Creating...",
      success: "Created ✅",
      error: "Failed to create, try again",
    });
    await respPromise;
    await queryClient.invalidateQueries({ queryKey: ["routes"] });
    onClose();
    reset();
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Create Route</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="From Location"
          variant="outlined"
          margin="dense"
          value={fromLocation}
          onChange={(e) => setFromLocation(e.target.value)}
        />
        <TextField
          fullWidth
          label="To Location"
          variant="outlined"
          margin="dense"
          value={toLocation}
          onChange={(e) => setToLocation(e.target.value)}
        />
        <TextField
          fullWidth
          label="Fare"
          variant="outlined"
          margin="dense"
          type="number"
          value={fare}
          onChange={(e) => setFare(e.target.value)}
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

export default CreateRouteModal;
