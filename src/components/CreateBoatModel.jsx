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

export const CreateBoatModal = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [routeId, setRouteId] = useState("");
  const [userId, setUserId] = useState("");
  const [status, setStatus] = useState("available");

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
      if (!routeId) setRouteId(res?.data?.[0]?._id);
      return res.data;
    },
  });

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await api.get("/users");
      if (!userId) setUserId(res?.data?.[0]?._id);
      return res.data.users;
    },
  });

  const handleCreate = async () => {
    const respPromise = api.post("/boats", { name, routeId, userId, status });
    toast.promise(respPromise, {
      loading: "Creating...",
      success: "Created ✅",
      error: "Failed to create, try again",
    });
    const resp = await respPromise;
    await queryClient.invalidateQueries({ queryKey: ["boats"] });
    onClose();
    reset();
  };

  if (!isOpen) return <></>;

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Create Boat</DialogTitle>
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
          labelId="select-user-label"
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
          labelId="select-status-label"
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
        <Button onClick={handleCreate} variant="contained">Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateBoatModal;
