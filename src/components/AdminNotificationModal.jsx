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

export const AdminNotificationModal = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient();
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");

  function reset() {
    setMessage("");
    setUserId("");
  }

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await api.get("/users");
      return res.data.users || []; // Ensure it returns an array
    },
  });

  useEffect(() => {
    if (users.length > 0) {
      // Find the admin user
      const adminUser = users.find((user) => user.role === "admin");
      if (adminUser) {
        setUserId(adminUser._id); // Set userId to admin's ID
      } else {
        setUserId(users[0]._id); // Default to the first user if no admin found
      }
    }
  }, [users]);

  const handleCreate = async () => {
    const respPromise = api.post("/notifications", { message, userId });
    toast.promise(respPromise, {
      loading: "Creating...",
      success: "Created ✅",
      error: "Failed to create, try again",
    });
    await respPromise;
    await queryClient.invalidateQueries({ queryKey: ["notifications"] });
    onClose();
    reset();
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Create Notification</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Message"
          variant="outlined"
          margin="dense"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Select
          labelId="select-user-label"
          value={userId}
          onChange={({ target }) => setUserId(target.value)}
          fullWidth
          displayEmpty
        >
          {users.map((user) => (
            <MenuItem key={user._id} value={user._id}>
              {user.name} ({user.role})
            </MenuItem>
          ))}
        </Select>
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

export default AdminNotificationModal;
