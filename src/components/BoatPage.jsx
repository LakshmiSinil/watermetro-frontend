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
import CreateBoatModal from "./CreateBoatModel";
import { EditBoatModal } from "./EditBoatModel";

function BoatPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeletedId] = useState(null);
  const [editData, setEditData] = useState(null);

  const queryClient = useQueryClient();

  const { data: boats } = useQuery({
    queryKey: ["boats"],
    queryFn: async () => {
      const res = await api.get("/boats");
      return res.data.boats;
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
    const respPromise = api.delete(`/boats/${deleteId}`);
    toast.promise(respPromise, {
      loading: "Deleting...",
      success: "Deleted ✅",
      error: "Failed to delete, try again",
    });
    await respPromise;
    await queryClient.invalidateQueries({ queryKey: ["boats"] });
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
          Water Metro - Boats
        </Typography>

        <Button variant="contained" size="small" onClick={handleOpenDialog}>
          + Create Boat
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              <TableCell align="center"sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
              <TableCell align="center"sx={{ color: "white", fontWeight: "bold" }}>Route</TableCell>
              <TableCell align="center"sx={{ color: "white", fontWeight: "bold" }}>Employee</TableCell>
              <TableCell align="center"sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
              <TableCell align="center"sx={{ color: "white", fontWeight: "bold" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {boats?.map((boat) => (
              <TableRow key={boat._id}>
                <TableCell align="center">{boat.name}</TableCell>
                <TableCell align="center">{boat.routeId.fromLocation} - {boat.routeId.toLocation}</TableCell>
                <TableCell align="center">{boat.userId.name}</TableCell>
                <TableCell align="center">{boat.status}</TableCell>
                <TableCell align="center">
                  <IconButton
                    aria-label="delete"
                    size="large"
                    onClick={() => handleOpenDeleteDialog(boat._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    aria-label="update"
                    size="large"
                    onClick={() => setEditData(boat)}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <CreateBoatModal isOpen={isCreateModalOpen} onClose={handleCloseDialog} />

      {editData && (
        <EditBoatModal editData={editData} onClose={() => setEditData(null)} />
      )}

      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this boat?"}
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

export default BoatPage;
