/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("employee");

  // Sync state when editData changes
  useEffect(() => {
    if (editData) {
      setName(editData.name || "");
      setEmail(editData.email || "");
      setRole(editData.role || "employee");
    } else {
      reset();
    }
  }, [editData]);

  function reset() {
    setName("");
    setEmail("");
    setRole("employee");
  }

  const handleUpdate = async () => {
    if (!editData?._id) return;

    try {
      await api.patch(`/users/${editData._id}`, {
        name,
        email,
        role,
      });

      toast.success("Employee updated successfully ✅");
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      reset();
      onClose();
    } catch (error) {
      toast.error("Failed to update, try again");
      console.error("Update error:", error);
    }
  };

  if (!editData) return null;

  return (
    <Dialog
      open={!!editData}
      onClose={() => {
        reset();
        onClose();
      }}
    >
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
        <Button
          onClick={() => {
            reset();
            onClose();
          }}
          color="primary"
        >
          Cancel
        </Button>
        <Button onClick={handleUpdate} variant="contained" color="success">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditEmployeeModel;
