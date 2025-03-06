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

function BoatPage() {
  const [open, setOpen] = useState(false);

  // State for form fields
  const [name, setName] = useState("");
  const [routeId, setRouteId] = useState("");
  const [userId, setUserId] = useState("");

  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);

  const handleUpdate = () => {
    console.log("Name:", name);
    console.log("Route ID:", routeId);
    console.log("User ID:", userId);
    // Add logic to save the boat details here
    handleCloseDialog();
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
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Sl No</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Route ID</TableCell>
              <TableCell align="right">User ID</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* No data rows */}
            <TableRow>
              <TableCell colSpan={5} align="center">
                No data available
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog / Popup for Creating Boat */}
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
            label="User ID"
            variant="outlined"
            margin="dense"
            type="number"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
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

export default BoatPage;
