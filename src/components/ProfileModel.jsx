import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  TextField,
} from "@mui/material";
import { useUser } from "../context/useUser.hook.jsx";
import { toast } from "react-hot-toast";
import api from "../config/axiosInstance";

const ProfileModel = ({ isOpen, onClose }) => {
  const { user } = useUser();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function reset() {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowChangePassword(false);
  }

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      return toast.error("New password and confirm password do not match");
    }

    setLoading(true);
    try {
      await toast.promise(
        api.patch("/users/changepassword",{ currentPassword, newPassword }), // Fixed API route
        {
          loading: "Updating password...",
          success: "Password updated successfully ✅",
          error: "Failed to change password. Please try again.",
        }
      );
      reset();
      onClose(); // Close modal after success
    } catch (error) {
      toast.error(error.response?.data?.message || "🚨 Change Password Error:", error);
    
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
        Profile
      </DialogTitle>
      <DialogContent>
        {user ? (
          <Box sx={{ textAlign: "center", p: 2 }}>
            <Typography variant="body1">
              <strong>Name:</strong> {user.name}
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              <strong>Email:</strong> {user.email}
            </Typography>

            {!showChangePassword ? (
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                fullWidth
                onClick={() => setShowChangePassword(true)}
              >
                Change Password
              </Button>
            ) : (
              <Box sx={{ mt: 3 }}>
                <Typography variant="h6">Change Password</Typography>
                <TextField
                  label="Current Password"
                  type="password"
                  fullWidth
                  margin="dense"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <TextField
                  label="New Password"
                  type="password"
                  fullWidth
                  margin="dense"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <TextField
                  label="Confirm New Password"
                  type="password"
                  fullWidth
                  margin="dense"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  fullWidth
                  onClick={handleChangePassword}
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Submit"}
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{ mt: 1 }}
                  fullWidth
                  onClick={() => setShowChangePassword(false)}
                >
                  Cancel
                </Button>
              </Box>
            )}
          </Box>
        ) : (
          <Typography variant="body1" color="error" textAlign="center">
            No user information available.
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfileModel;

