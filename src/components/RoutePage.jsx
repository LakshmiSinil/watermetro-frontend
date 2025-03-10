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
import CreateRouteModal from "./CreateRouteModal";
import EditRouteModal from "./EditRouteModel";

function RoutePage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeletedId] = useState(null);
  const [editData, setEditData] = useState(null);

  const queryClient = useQueryClient();

  const { data: routes } = useQuery({
    queryKey: ["routes"],
    queryFn: async () => {
      const res = await api.get("/routes");
      return res.data;
    },
  });

  const handleOpenDialog = () => setIsCreateModalOpen(true);
  const handleCloseDialog = () => setIsCreateModalOpen(false);

  const handleOpenDeleteDialog = (id) => {
    setDeletedId(id);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeletedId(null);
    setDeleteDialogOpen(false);
  };

  const handleDelete = async () => {
    const respPromise = api.delete(`/routes/${deleteId}`);
    toast.promise(respPromise, {
      loading: "Deleting...",
      success: "Deleted ✅",
      error: "Failed to delete, try again",
    });
    await respPromise;
    await queryClient.invalidateQueries({ queryKey: ["routes"] });
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
          Water Metro - Routes
        </Typography>

        <Button variant="contained" size="small" onClick={handleOpenDialog}>
          + Create Route
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">From Location</TableCell>
              <TableCell align="center">To Location</TableCell>
              <TableCell align="center">Fare (Rs)</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {routes?.map((route) => (
              <TableRow key={route._id}>
                <TableCell align="center">{route.fromLocation}</TableCell>
                <TableCell align="center">{route.toLocation}</TableCell>
                <TableCell align="center">{route.fare}</TableCell>
                <TableCell align="center">
                  <IconButton
                    aria-label="delete"
                    size="large"
                    onClick={() => handleOpenDeleteDialog(route._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    aria-label="update"
                    size="large"
                    onClick={() => setEditData(route)}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <CreateRouteModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseDialog}
      />

      {editData && (
        <EditRouteModal
          editData={editData}
          onClose={() => setEditData(null)}
        />
      )}

      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this route?"}
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

export default RoutePage;