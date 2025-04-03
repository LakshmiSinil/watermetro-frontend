import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogActions,
  DialogTitle,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-hot-toast";
import api from "../config/axiosInstance";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import AdminNotificationModal from "./AdminNotificationModal";
import EditNotificationModal from "./EditNotificationModal"; // ✅ Correct import

function AdminNotificationPage() {
  const [isAdminNotificationModalOpen, setIsAdminNotificationModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editData, setEditData] = useState(null); // ✅ Store edit notification

  const queryClient = useQueryClient();

  const { data: notifications = [] } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await api.get("/notifications");
      return res.data.notifications;
    },
  });

  const handleOpenDialog = () => setIsAdminNotificationModalOpen(true);
  const handleCloseDialog = () => setIsAdminNotificationModalOpen(false);

  const handleOpenDeleteDialog = (id) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteId(null);
    setDeleteDialogOpen(false);
  };

  const handleDelete = async () => {
    const respPromise = api.delete(`/notifications/${deleteId}`);
    toast.promise(respPromise, {
      loading: "Deleting...",
      success: "Deleted ✅",
      error: "Failed to delete, try again",
    });
    await respPromise;
    await queryClient.invalidateQueries({ queryKey: ["notifications"] });
    handleCloseDeleteDialog();
  };

  return (
    <Box sx={{ paddingInline: "160px" }}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Water Metro - Notifications
        </Typography>

        <Button variant="contained" size="small" onClick={handleOpenDialog}>
          + Create Notification
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>
                Message
              </TableCell>
              <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {notifications?.map((notification) => (
              <TableRow key={notification._id}>
                <TableCell align="center">{notification.message}</TableCell>
                <TableCell align="center">
                  <IconButton
                    aria-label="update"
                    size="large"
                    onClick={() => setEditData(notification)} // ✅ Open edit modal
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    size="large"
                    onClick={() => handleOpenDeleteDialog(notification._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ✅ Create Notification Modal */}
      <AdminNotificationModal isOpen={isAdminNotificationModalOpen} onClose={handleCloseDialog} />

      {/* ✅ Edit Notification Modal */}
      {editData && (
        <EditNotificationModal editData={editData} onClose={() => setEditData(null)} />
      )}

      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this notification?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AdminNotificationPage;
