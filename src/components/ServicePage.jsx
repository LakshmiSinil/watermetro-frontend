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
  Select,
  MenuItem,
  IconButton
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-hot-toast";
import api from "../config/axiosInstance";
import { useQuery, useQueryClient } from "@tanstack/react-query";

function ServicePage() {
  const [open, setOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const [routeId, setRouteId] = useState("");
  const [boatId, setBoatId] = useState("");
  const [time, setTime] = useState("");
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["routes"],
    queryFn: async () => {
      const res = await api.get("/routes");
      if (!routeId) setRouteId(res?.data?.[0]?._id);

      return res.data;
    },
  });
  const routes = data;

  const { data: boats } = useQuery({
    queryKey: ["boats"],
    queryFn: async () => {
      const res = await api.get("/boats");
      if (!boatId) setBoatId(res?.data?.[0]?._id);
      return res.data.boats;
    },
  });
  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await api.get("/services");
      console.log("🚀 ~ queryFn: ~ res:", res);
      return res.data.services;
    },
  });

  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);

  const handleUpdate = async () => {
    const respPromise = api.post("/services", { routeId, boatId, time });
    toast.promise(respPromise, {
      loading: "Creating...",
      success: "Created ✅",
      error: "Failed to create, try again",
    });
    const resp = await respPromise;
    await queryClient.invalidateQueries({ queryKey: ["services"] });
    handleCloseDialog();
    reset();
  };

  function reset() {
    setTime();
    setRouteId("");
    setBoatId("");
  }

  const handleOpenDeleteDialog = (id) => {
    setSelectedId(id);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setSelectedId(null);
    setDeleteDialogOpen(false);
  };
  const handleDelete = async (id) => {
    const respPromise = api.delete(`/services/${selectedId}`);
    toast.promise(respPromise, {
      loading: "Deleting...",
      success: "Deleted ✅",
      error: "Failed to delete, try again",
    });
    const resp = await respPromise;
    await queryClient.invalidateQueries({ queryKey: ["services"] });
    handleCloseDeleteDialog();
    reset();
  };


  return (
    <Box sx={{ padding: "16px", position: "relative" }}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Water Metro - Service Management
      </Typography>

      <Button
        variant="contained"
        size="small"
        sx={{ position: "absolute", top: 16, right: 16 }}
        onClick={handleOpenDialog}
      >
        + Create Service
      </Button>

      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Route ID</TableCell>
              <TableCell align="center">Boat ID</TableCell>
              <TableCell align="center">Time</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services?.map((service) => {
              return (
                <TableRow>
                  <TableCell align="center">
                    {service.routeId.fromLocation}-{service.routeId.toLocation}
                  </TableCell>
                  <TableCell align="center">{service.boatId.name}</TableCell>
                  <TableCell align="center">{service.time}</TableCell>
                  <TableCell align="center">
                    <IconButton aria-label="delete" size="large"onClick={() => handleOpenDeleteDialog(service._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Create Service</DialogTitle>
        <DialogContent>
          <Select
            labelId="demo-simple-select-label"
            id="select-route"
            value={routeId}
            label="Route"
            aria-label="Route"
            onChange={({ target }) => {
              setRouteId(target.value);
            }}
            style={{ width: "100%" }}
          >
            {routes?.map((route) => {
              return (
                <MenuItem
                  key={route._id}
                  value={route._id}
                  style={{ width: "100%" }}
                >
                  {route.fromLocation} - {route.toLocation}
                </MenuItem>
              );
            })}
          </Select>
          <Select
            labelId="demo-simple-select-label"
            id="select-route"
            value={boatId}
            label="Boat"
            aria-label="Boat"
            onChange={({ target }) => {
              setBoatId(target.value);
            }}
            style={{ width: "100%" }}
          >
            {boats?.map((boat) => {
              return (
                <MenuItem
                  key={boat._id}
                  value={boat._id}
                  style={{ width: "100%" }}
                >
                  {boat.name}
                </MenuItem>
              );
            })}
          </Select>

          <TextField
            fullWidth
            label="Time"
            variant="outlined"
            margin="dense"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
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
          {"Are you sure you want to delete this service?"}
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

export default ServicePage;
