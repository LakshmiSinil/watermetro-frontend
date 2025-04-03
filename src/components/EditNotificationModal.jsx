import { useState, useEffect } from "react";
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

export const EditNotificationModal = ({ onClose, editData }) => {
  const queryClient = useQueryClient();
  const loggedInUserId = localStorage.getItem("userId") || "admin"; // Replace with actual auth logic

  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState(loggedInUserId);

  useEffect(() => {
    if (editData) {
      setMessage(editData.message || "");
      setUserId(editData.userId || loggedInUserId);
    } else {
      reset();
    }
  }, [editData, loggedInUserId]);

  function reset() {
    setMessage("");
    setUserId(loggedInUserId);
  }

  const handleUpdate = async () => {
    if (!editData?._id) return;

    try {
      await api.patch(`/notifications/${editData._id}`, {
        message,
        userId,
      });

      toast.success("Notification updated successfully ✅");
      await queryClient.invalidateQueries({ queryKey: ["notifications"] });
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
      <DialogTitle>Update Notification</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Message"
          variant="outlined"
          margin="dense"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <TextField
          fullWidth
          label="UserId"
          variant="outlined"
          margin="dense"
          value={userId}
          disabled // Prevents manual editing
        />
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

export default EditNotificationModal;
