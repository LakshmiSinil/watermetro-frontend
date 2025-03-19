import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import api from "../config/axiosInstance";
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
  Card,
  CardContent,
  CircularProgress,
  Divider,
} from "@mui/material";
import CreateLeaveModal from "./CreateLeaveModal";

const fetchServices = async () => {
  // const { data } = await api.get("/services/mine");
  // return data.services;
  return []
};

function EmployeePage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { data: leaves } = useQuery({
    queryKey: ["leaves"],
    queryFn: async () => {
      const res = await api.get("/leaves");
      return res.data.leaves;
    },
  });

  const {
    data: services = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["services", "mine"],
    queryFn: fetchServices,
  });

  const { data: boats } = useQuery({
    queryKey: ["boat"],
    queryFn: async () => {
      const res = await api.get("boats/mine");
      return res.data.boat;
    },
  });
  console.log("🚀 ~ EmployeePage ~ boats:", boats)

  const handleOpenDialog = () => setIsCreateModalOpen(true);
  const handleCloseDialog = () => setIsCreateModalOpen(false);

  if (isLoading) return <CircularProgress />;
  if (error)
    return <Typography color="error">Error loading services</Typography>;

  return (
    <Box sx={{ padding: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Available Services
      </Typography>

      {services.length > 0 ? (
        services.map((service) => (
          <Box key={service._id} sx={{ marginBottom: "20px" }}>
            <Card sx={{ padding: "10px", width: "400px" }}>
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {service.boatId?.name}
                </Typography>
                <Typography variant="body2" sx={{ marginTop: "5px" }}>
                  Route: {service.routeId?.fromLocation} -{" "}
                  {service.routeId?.toLocation}
                </Typography>
                <Typography variant="body2">Time: {service.time}</Typography>
              </CardContent>
            </Card>
          </Box>
        ))
      ) : (
        <Typography variant="body2" color="textSecondary" align="center">
          No services available
        </Typography>
      )}

      <Box sx={{ padding: "60px", paddingInline: "160px" }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5" sx={{ marginBottom: 2 }}>
            My Leaves:
          </Typography>

          <Button variant="contained" size="small" onClick={handleOpenDialog}>
            + Create Leave
          </Button>
        </Box>

        <Divider sx={{ marginTop: "10px" }} />
      </Box>

      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table sx={{ minWidth: 650 }} aria-label="leave table">
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              <TableCell
                align="center"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                Employee Name
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                Start Date
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                End Date
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                Reason
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaves?.map((leave) => (
              <TableRow key={leave._id}>
                <TableCell align="center">
                  {leave.userId?.name || "N/A"}
                </TableCell>
                <TableCell align="center">
                  {new Date(leave.startDate).toLocaleDateString()}
                </TableCell>
                <TableCell align="center">
                  {new Date(leave.endDate).toLocaleDateString()}
                </TableCell>
                <TableCell align="center">{leave.reason}</TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontWeight: "bold",
                    color:
                      leave.status === "approved"
                        ? "green"
                        : leave.status === "rejected"
                        ? "red"
                        : "orange",
                  }}
                >
                  {leave.status}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Create Leave Modal */}
      <CreateLeaveModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseDialog}
      />
    </Box>
  );
}

export default EmployeePage;
