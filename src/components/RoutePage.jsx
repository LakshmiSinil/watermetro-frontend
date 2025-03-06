import React, { useState } from "react";
import {Box, Button,Typography,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Dialog,DialogActions,DialogContent,DialogTitle,TextField,} from "@mui/material";

function RoutePage() {
  const [open, setOpen] = useState(false);
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [fare, setFare] = useState("");

  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);

  const handleUpdate = () => {
    console.log("From:", fromLocation);
    console.log("To:", toLocation);
    console.log("Fare:", fare);
    // You can add logic to save the template here.
    handleCloseDialog();
  };

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
              <TableCell align="right">sl no</TableCell>
              <TableCell align="right">from location</TableCell>
              <TableCell align="right">to location</TableCell>
              <TableCell align="right">fare&nbsp;(Rs)</TableCell>
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

      {/* Dialog / Popup for Creating Template */}
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
