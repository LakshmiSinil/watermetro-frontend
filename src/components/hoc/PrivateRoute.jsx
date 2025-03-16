import { Navigate } from "react-router-dom";
import { useUser } from "../../context/useUser.hook";
import { CircularProgress, Box } from "@mui/material";

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user, isLoading } = useUser(); // Assume useUser returns isLoading
  console.log(isLoading, user);
  if (isLoading) {
    // Show loading indicator while fetching user data
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    // Redirect to login if user is not authenticated (after loading)
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    // Redirect to home if user doesn't have permission
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
