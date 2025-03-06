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
} from "@mui/material";
import { toast } from "react-hot-toast";
import api from "../config/axiosInstance";
import { useQuery, useQueryClient } from "@tanstack/react-query";

function RoutePage() {
  const [open, setOpen] = useState(false);
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
    const resp = await respPromise;
    console.log("🚀 ~ handleUpdate ~ resp:", resp);
    await queryClient.invalidateQueries({ queryKey: ["routes"] });
    handleCloseDialog();
    reset();
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
              <TableCell align="center">from location</TableCell>
              <TableCell align="center">to location</TableCell>
              <TableCell align="center">fare&nbsp;(Rs)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {routes?.map((route) => {
              return (
                <TableRow>
                  <TableCell align="center">{route.fromLocation}</TableCell>
                  <TableCell align="center">{route.toLocation}</TableCell>
                  <TableCell align="center">{route.fare}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Create Template</DialogTitle>
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
    </Box>
  );
}

export default RoutePage;
