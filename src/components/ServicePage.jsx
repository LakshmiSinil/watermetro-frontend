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

function ServicePage() {
  const [open, setOpen] = useState(false);

  // Form fields for the service
  const [routeId, setRouteId] = useState("");
  const [boatId, setBoatId] = useState("");
  const [time, setTime] = useState("");

  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);

  const handleUpdate = () => {
    console.log("Route ID:", routeId);
    console.log("Boat ID:", boatId);
    console.log("Time:", time);
    // Add logic to save the service data here if needed
    handleCloseDialog();
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
              <TableCell align="right">Sl No</TableCell>
              <TableCell align="right">Route ID</TableCell>
              <TableCell align="right">Boat ID</TableCell>
              <TableCell align="right">Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Placeholder - No data */}
            <TableRow>
              <TableCell colSpan={4} align="center">
                No data available
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog (Popup) for Creating Service */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Create Service</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Route ID"
            variant="outlined"
            margin="dense"
            value={routeId}
            onChange={(e) => setRouteId(e.target.value)}
          />
          <TextField
            fullWidth
            label="Boat ID"
            variant="outlined"
            margin="dense"
            value={boatId}
            onChange={(e) => setBoatId(e.target.value)}
          />
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
    </Box>
  );
}

export default ServicePage;
