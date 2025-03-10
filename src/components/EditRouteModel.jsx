import React, { useEffect, useState } from "react";
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

export const EditRouteModal = ({ onClose, editData }) => {
  const queryClient = useQueryClient();
  const [fromLocation, setFromLocation] = useState(editData?.fromLocation || "");
  const [toLocation, setToLocation] = useState(editData?.toLocation || "");
  const [fare, setFare] = useState(editData?.fare || "");

  function reset() {
    setFromLocation("");
    setToLocation("");
    setFare("");
  }

  const handleUpdate = async () => {
    const respPromise = api.patch(`/routes/${editData._id}`, {
      fromLocation,
      toLocation,
      fare:Number(fare),
    });
    toast.promise(respPromise, {
      loading: "Updating...",
      success: "Updated ✅",
      error: "Failed to update, try again",
    });
    await respPromise;
    await queryClient.invalidateQueries({ queryKey: ["routes"] });
    onClose();
    reset();
  };

  if (!editData) return null;

  return (
    <Dialog open={!!editData} onClose={onClose}>
      <DialogTitle>Update Route</DialogTitle>
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
        <Button onClick={handleUpdate} variant="contained">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditRouteModal;
