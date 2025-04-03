import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import api from "../config/axiosInstance"; // Axios instance

function UserNotificationModal({ isOpen, onClose }) {
  const [notifications, setNotifications] = useState([]);

  // Fetch notifications when modal opens
  useEffect(() => {
    if (isOpen) {
      api.get("/notifications")
        .then((res) => setNotifications(res.data.notifications))
        .catch((err) => console.error("Error fetching notifications:", err));
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Notifications</DialogTitle>
      <DialogContent>
        {notifications.length > 0 ? (
          <List>
            {notifications.map((notification) => (
              <ListItem key={notification._id}>
                <ListItemText primary={notification.message} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No notifications available.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserNotificationModal;
