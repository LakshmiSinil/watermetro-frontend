import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import { toast } from "react-hot-toast";
import api from "../config/axiosInstance";
import { useQuery, useQueryClient } from "@tanstack/react-query";

function LeavePage() {
  const queryClient = useQueryClient();

  const { data: leaves = [] } = useQuery({
    queryKey: ["leaves"],
    queryFn: async () => {
      const res = await api.get("/leaves");
      return res.data.leaves;
    },
  });

  const updateLeaveStatus = async (id, status) => {
    try {
      await api.patch(`/leaves/${id}`, { status });
      toast.success("Leave status updated");
      queryClient.invalidateQueries({ queryKey: ["leaves"] });
    } catch (error) {
      toast.error("Failed to update leave status");
    }
  };

  return (
    <Box sx={{ paddingInline: "160px" }}>
      <Typography variant="h5">Employee Leave Requests</Typography>
      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              <TableCell align="center">Employee Name</TableCell>
              <TableCell align="center">Start Date</TableCell>
              <TableCell align="center">End Date</TableCell>
              <TableCell align="center">Reason</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Actions</TableCell>
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
                <TableCell align="center">{leave.status}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleApprove(leave._id)}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleReject(leave._id)}
                    sx={{ marginLeft: 1 }}
                  >
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
export default LeavePage;
