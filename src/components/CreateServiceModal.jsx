import React, { useState } from "react";
import {
  Button,
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

export const CreateServiceModal = ({ isOpen, onClose }) => {
  const queryClient = useQueryClient();
  const [routeId, setRouteId] = useState("");
  const [boatId, setBoatId] = useState("");
  const [time, setTime] = useState("");

  function reset() {
    setTime();
    setRouteId("");
    setBoatId("");
  }

  const { data: routes } = useQuery({
    queryKey: ["routes"],
    queryFn: async () => {
      const res = await api.get("/routes");
      if (!routeId) setRouteId(res?.data?.[0]?._id);

      return res.data;
    },
  });

  const { data: boats } = useQuery({
    queryKey: ["boats"],
    queryFn: async () => {
      const res = await api.get("/boats");
      if (!boatId) setBoatId(res?.data?.boats?.[0]?._id);
      return res.data.boats;
    },
  });

  const handleCreate = async () => {
    const respPromise = api.post("/services", { routeId, boatId, time });
    toast.promise(respPromise, {
      loading: "Creating...",
      success: "Created ✅",
      error: "Failed to create, try again",
    });
    const resp = await respPromise;
    await queryClient.invalidateQueries({ queryKey: ["service"] });
    onClose();
    reset();
  };
  if (!isOpen) return <></>;
  return (
    <div>
      <Dialog open={isOpen} onClose={onClose}>
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
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleCreate} variant="contained">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CreateServiceModal;
