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
} from "@mui/material";
import { toast } from "react-hot-toast";
import api from "../config/axiosInstance";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
function BoatPage() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [routeId, setRouteId] = useState("");
 
  const [userId, setUserId] = useState("");
  const [status, setStatus] = useState("");
  const queryClient = useQueryClient();


  const handleChange = (event) => {
    setStatus(event.target.value);
  }

  const { data } = useQuery({
    queryKey: ["routes"],
    queryFn: async () => {
      const res = await api.get("/routes");
      if (!routeId) setRouteId(res?.data?.[0]?._id);

      return res.data;
    },
  });
  const routes = data;
  

  const { data: users } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await api.get("/users");
     
      if (!userId) setUserId(res?.data?.[0]?._id);

      return res.data.users;
    },
  });
 
  const { data: boats } = useQuery({
    queryKey: ["boats"],
    queryFn: async () => {
      const res = await api.get("/boats");

      return res.data.boats;
    },
  });
      

  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);

  const handleUpdate = async () => {
    console.log("🚀 ~ handleUpdate ~ handleUpdate:", handleUpdate)
    
    const respPromise = api.post("/boats", { userId, routeId, name, status });
    toast.promise(respPromise, {
      loading: "Creating...",
      success: "Created ✅",
      error: "Failed to create, try again",
    });
    
    const resp = await respPromise;
    
    await queryClient.invalidateQueries({ queryKey: ["boats"] });
    handleCloseDialog();
    reset();
  };

  function reset() {
    setName("");
    setRouteId("");
    setUserId("");
    setStatus("");
  }
  const handleDelete = async (id) => {
    const respPromise = api.delete(`/boats/${id}`);
    toast.promise(respPromise, {
      loading: "Deleting...",
      success: "Deleted ✅",
      error: "Failed to delete, try again",
    });
    const resp = await respPromise;
    await queryClient.invalidateQueries({ queryKey: ["boats"] });
    handleCloseDialog();
    reset();
  };

  return (
    <Box sx={{ padding: "16px", position: "relative" }}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Water Metro-Boat
      </Typography>

      <Button
        variant="contained"
        size="small"
        sx={{ position: "absolute", top: 16, right: 16 }}
        onClick={handleOpenDialog}
      >
        + Create Boat
      </Button>

      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" align="center">
          <TableHead>
            <TableRow>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Route ID</TableCell>
              <TableCell align="center">User ID</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {boats?.map((boat) => {
              const route=boat.routeId
              return (
                <TableRow>
                  <TableCell align="center">{boat.name}</TableCell>
                  <TableCell align="center">{route.fromLocation} - {route.toLocation}</TableCell>
                  <TableCell align="center">{boat.userId.name}</TableCell>
                  <TableCell align="center">{boat.status}</TableCell>
                  <TableCell align="center">
                    <IconButton aria-label="delete" size="large" onClick={() => handleDelete(boat._id)} >
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
        <DialogTitle>Create Boat</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            margin="dense"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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
            id="select-employee"
            value={userId}
            label="User"
            aria-label="User"
            onChange={({ target }) => {
              setUserId(target.value);
            }}
            style={{ width: "100%" }}
          >
            {users?.map((user) => {
              return (
                <MenuItem
                  key={user._id}
                  value={user._id}
                  style={{ width: "100%" }}
                >
                  {user.name}
                </MenuItem>
              );
            })}
          </Select>

          <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={status}
    label="Status"
    onChange={handleChange}
    style={{ width: "100%" }}
  >
    <MenuItem style={{ width: "100%" }}value={"available"}>Available</MenuItem>
    <MenuItem style={{ width: "100%" }}value={"unavailable"}>Unavailable</MenuItem>
    
  </Select>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default BoatPage;
