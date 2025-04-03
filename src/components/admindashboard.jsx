import  { useState } from "react";
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
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { toast } from "react-hot-toast";
import api from "../config/axiosInstance";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {EditEmployeeModel} from "./EditEmployeeModel"
import CreateEmployeeModal from "./CreateEmployeeModel";

function AdminPage() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data: employees  } = useQuery({
    queryKey: ["users","employees"],
    queryFn: async () => {
      const res = await api.get(`/users?role=employee`);
      return res.data.users;
    },
  });
 

  
  const handleOpenDialog = () => setIsCreateModalOpen(true);
  const handleCloseDialog = () => setIsCreateModalOpen(false);

  const handleOpenDeleteDialog = (id) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteId(null);
    setDeleteDialogOpen(false);
  };

  const handleDelete = async () => {
    const respPromise = api.delete(`/users/${deleteId}`);
    toast.promise(respPromise, {
      loading: "Deleting...",
      success: "Deleted ✅",
      error: "Failed to delete, try again",
    });
    await respPromise;
    await queryClient.invalidateQueries({ queryKey: ["users"] });
    handleCloseDeleteDialog();
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const csvData = e.target.result;
      const rows = csvData.trim().split("\n");

      const headers = rows[0].split(",");
      const emailIndex = headers.indexOf("Email");
      const nameIndex = headers.indexOf("Name");

      if (emailIndex === -1) {
        toast.error("Invalid CSV file. No 'Email' column found.");
        return;
      }

      const bulkData = rows.slice(1).map((row) => {
        const columns = row.split(",");
        return { email: columns[emailIndex].trim(),name:columns[nameIndex].trim() };
      });

      const respPromise = api.post("/users/bulk", { bulkData });
      toast.promise(respPromise, {
        loading: "Uploading...",
        success: "Bulk data uploaded successfully ✅",
        error: "Failed to upload bulk data",
      });
      await respPromise;
      await queryClient.invalidateQueries({ queryKey: ["users"] });
    };
    reader.readAsText(file);
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
          Admin - Employees
        </Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            component="label"
            variant="contained"
            startIcon={<CloudUploadIcon />}
          >
            Bulk Upload
            <input
              type="file"
              hidden
              accept=".csv"
              onChange={handleFileUpload}
            />
          </Button>

          <Button
            variant="contained"
            size="small"
            onClick={() => {handleOpenDialog()}}
          >
            + Create Employee
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table sx={{ minWidth: 650 }} aria-label="employee table">
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              <TableCell align="center"sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
              <TableCell align="center"sx={{ color: "white", fontWeight: "bold" }}>Email</TableCell>
              <TableCell align="center"sx={{ color: "white", fontWeight: "bold" }}>Role</TableCell>
              <TableCell align="center"sx={{ color: "white", fontWeight: "bold" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {employees?.map((user) => (
              <TableRow key={user._id}>
                <TableCell align="center">{user.name}</TableCell>
                <TableCell align="center">{user.email}</TableCell>
                <TableCell align="center">{user.role}</TableCell>
                <TableCell align="center">
                  <IconButton
                    aria-label="delete"
                    size="large"
                    onClick={() => handleOpenDeleteDialog(user._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    aria-label="edit"
                    size="large"
                    onClick={() => setEditData(user)}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
     


      {editData && (
        <EditEmployeeModel
          editData={editData}
          onClose={() => setEditData(null)}
        />
      )}

      <CreateEmployeeModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseDialog}
      />

      <Dialog
        open={deleteDialogOpen}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete this employee?"}
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

export default AdminPage;
