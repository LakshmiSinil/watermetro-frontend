import React, { useEffect, useState } from "react";
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

export const EditBoatModal = ({ onClose, editData }) => {
  const queryClient = useQueryClient();
  const [name, setName] = useState(editData?.name || "");
  const [routeId, setRouteId] = useState(editData?.routeId?._id || "");
  const [userId, setUserId] = useState(editData?.userId?._id || "");
  const [status, setStatus] = useState(editData?.status || "available");

  function reset() {
    setName("");
    setRouteId("");
    setUserId("");
    setStatus("available");
  }

  const { data: routes } = useQuery({
    queryKey: ["routes"],
    queryFn: async () => {
      const res = await api.get("/routes");
      return res.data;
    },
  });

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await api.get("/users");
      return res.data.users;
    },
  });

  const handleUpdate = async () => {
    const respPromise = api.patch(`/boats/${editData._id}`, {
      name,
      routeId,
      userId,
      status,
    });
    toast.promise(respPromise, {
      loading: "Updating...",
      success: "Updated ✅",
      error: "Failed to update, try again",
    });
    await respPromise;
    await queryClient.invalidateQueries({ queryKey: ["boats"] });
    onClose();
    reset();
  };

  if (!editData) return <></>;

  return (
    <Dialog open={!!editData} onClose={onClose}>
      <DialogTitle>Update Boat</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          margin="dense"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Select
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
          value={userId}
          onChange={({ target }) => setUserId(target.value)}
          fullWidth
        >
          {users?.map((user) => (
            <MenuItem key={user._id} value={user._id}>
              {user.name}
            </MenuItem>
          ))}
        </Select>

        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          fullWidth
        >
          <MenuItem value="available">Available</MenuItem>
          <MenuItem value="unavailable">Unavailable</MenuItem>
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleUpdate} variant="contained">Update</Button>
      </DialogActions>
    </Dialog>
  );
};

