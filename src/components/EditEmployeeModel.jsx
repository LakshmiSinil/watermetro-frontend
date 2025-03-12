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
import { useQueryClient } from "@tanstack/react-query";

export const EditEmployeeModel = ({ onClose, editData }) => {
  const queryClient = useQueryClient();
  const [name, setName] = useState(editData?.name || "");
  const [email, setEmail] = useState(editData?.email || "");
  const [role, setRole] = useState(editData?.role || "employee");

  useEffect(() => {
    setName(editData?.name || "");
    setEmail(editData?.email || "");
    setRole(editData?.role || "employee");
  }, [editData]);

  const handleUpdate = async () => {
    const respPromise = api.patch(`/users/${editData._id}`, {
      name,
      email,
      role,
    });

    toast.promise(respPromise, {
      loading: "Updating...",
      success: "Employee updated successfully ✅",
      error: "Failed to update, try again",
    });

    await respPromise;
    await queryClient.invalidateQueries({ queryKey: ["users"] });
    onClose();
  };

  if (!editData) return null;

  return (
    <Dialog open={!!editData} onClose={onClose}>
      <DialogTitle>Update Employee</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          margin="dense"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="dense"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          fullWidth
        >
          <MenuItem value="employee">Employee</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </Select>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="primary">Cancel</Button>
        <Button onClick={handleUpdate} variant="contained" color="success">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};
