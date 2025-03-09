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
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
} from "@mui/material";
import { toast } from "react-hot-toast";
import api from "../config/axiosInstance";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import Edit from "@mui/icons-material/Edit";

function RoutePage() {
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [fare, setFare] = useState("");
  const queryClient = useQueryClient();

  const { data: routes } = useQuery({
    queryKey: ["routes"],
    queryFn: async () => {
      const res = await api.get("/routes");
      return res.data;
    },
  });

  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);

  const handleUpdate = async () => {
    const respPromise = api.post("/routes", { fromLocation, toLocation, fare });
    toast.promise(respPromise, {
      loading: "Creating...",
      success: "Created ✅",
      error: "Failed to create, try again",
    });
    await respPromise;
    await queryClient.invalidateQueries({ queryKey: ["routes"] });
    handleCloseDialog();
    reset();
  };

  const handleOpenDeleteDialog = (id) => {
    setSelectedId(id);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setSelectedId(null);
    setDeleteDialogOpen(false);
  };

  const handleDelete = async () => {
    const respPromise = api.delete(`/routes/${selectedId}`);
    toast.promise(respPromise, {
      loading: "Deleting...",
      success: "Deleted ✅",
      error: "Failed to delete, try again",
    });
    await respPromise;
    await queryClient.invalidateQueries({ queryKey: ["routes"] });
    handleCloseDeleteDialog();
  };

  function reset() {
    setFare(0);
    setFromLocation("");
    setToLocation("");
  }

  return (
    <Box sx={{ padding: "16px", position: "relative" }}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Water Metro-Routes
      </Typography>

      <Button
        variant="contained"
        size="small"
        sx={{ position: "absolute", top: 16, right: 16 }}
        onClick={handleOpenDialog}
      >
        + Create Routes
      </Button>

      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">From Location</TableCell>
              <TableCell align="center">To Location</TableCell>
              <TableCell align="center">Fare&nbsp;(Rs)</TableCell>
              <TableCell align="center" colspan="2">Actions</TableCell>
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
                    // onClick={() => handleOpenUpdateDialog(route._id)}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Create Route</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="From Location"
            variant="outlined"
            margin="dense"
            value={fromLocation}
            onChange={(e) => setFromLocation(e.target.value)}
          />
          <TextField
            fullWidth
            label="To Location"
            variant="outlined"
            margin="dense"
            value={toLocation}
            onChange={(e) => setToLocation(e.target.value)}
          />
          <TextField
            fullWidth
            label="Fare"
            variant="outlined"
            margin="dense"
            type="number"
            value={fare}
            onChange={(e) => setFare(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>

     
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
