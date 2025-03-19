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
import {  useQueryClient } from "@tanstack/react-query";

export const CreateLeaveModal = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState("pending");

  function reset() {

    setStartDate("");
    setEndDate("");
    setReason("");
    setStatus("pending");
  }

 
  const handleCreate = async () => {
    const respPromise = api.post("/leaves", { startDate, endDate, reason });
    toast.promise(respPromise, {
      loading: "Submitting leave request...",
      success: "Leave request submitted ✅",
      error: "Failed to submit, try again",
    });
    await respPromise;
    await queryClient.invalidateQueries({ queryKey: ["leaves"] });
    onClose();
    reset();
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Request Leave</DialogTitle>
      <DialogContent>
        

        <TextField
          fullWidth
          label="Start Date"
          type="date"
          variant="outlined"
          margin="dense"
         
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />

        <TextField
          fullWidth
          label="End Date"
          type="date"
          variant="outlined"
          margin="dense"
        
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />

        <TextField
          fullWidth
          label="Reason"
          variant="outlined"
          margin="dense"
          multiline
          rows={3}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />

        
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleCreate} variant="contained">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateLeaveModal;
