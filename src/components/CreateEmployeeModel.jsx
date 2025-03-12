import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Select,
} from "@mui/material";
import { toast } from "react-hot-toast";
import api from "../config/axiosInstance";
import { useQueryClient } from "@tanstack/react-query";

export const CreateEmployeeModal = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("employee");

  const reset = () => {
    setName("");
    setEmail("");
    setRole("employee");
  };

  const handleCreate = async () => {
    const data = { name, email, role };

    const respPromise = api.post("/users", data);

    toast.promise(respPromise, {
      loading: "Creating...",
      success: "Employee created successfully ✅",
      error: "Failed to create employee, try again",
    });

    await respPromise;
    await queryClient.invalidateQueries({ queryKey: ["users"] });
    onClose();
    reset();
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Create Employee</DialogTitle>
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
        <Button onClick={handleCreate} variant="contained" color="success">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateEmployeeModal;