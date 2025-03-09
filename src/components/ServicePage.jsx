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
import CreateServiceModal from "./CreateServiceModal";
import { EditServiceModal } from "./EditServiceModal";

function ServicePage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeletedId] = useState(null);
  const [editData, setEditData] = useState(null);

  const queryClient = useQueryClient();

  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await api.get("/services");
      return res.data.services;
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

  const handleDelete = async (id) => {
    const respPromise = api.delete(`/services/${deleteId}`);
    toast.promise(respPromise, {
      loading: "Deleting...",
      success: "Deleted ✅",
      error: "Failed to delete, try again",
    });
    const resp = await respPromise;
    await queryClient.invalidateQueries({ queryKey: ["services"] });
    handleCloseDeleteDialog();
  };

  return (
    <Box sx={{ paddingInline: "160px", }}>
      <Box sx={{width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
        <Typography variant="h5" sx={{ marginBottom: 2 }}>
          Water Metro - Service Management
        </Typography>

        <Button
          variant="contained"
          size="small"
          // sx={{ position: "absolute", top: 16, right: 16 }}
          onClick={handleOpenDialog}
        >
          + Create Service
        </Button>
      </Box>

      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Route </TableCell>
              <TableCell align="center">Boat </TableCell>
              <TableCell align="center">Time</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {services?.map((service) => {
              return (
                <TableRow key={service._id}>
                  <TableCell align="center">
                    {service.routeId.fromLocation}-{service.routeId.toLocation}
                  </TableCell>
                  <TableCell align="center">{service.boatId.name}</TableCell>
                  <TableCell align="center">{service.time}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      aria-label="delete"
                      size="large"
                      onClick={() => handleOpenDeleteDialog(service._id)}
                    >
                      <DeleteIcon />
                    </IconButton>

                    <IconButton
                      aria-label="update"
                      size="large"
                      onClick={() => setEditData(service)}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <CreateServiceModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseDialog}
      />
      {editData && (
        <EditServiceModal
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
