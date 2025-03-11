import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Homepage";
import AboutPage from "./components/aboutus";
import Login from "./components/Login";
import { UserProvider } from "./context/useUser.hook.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import Register from "./components/Register";
import RoutePage from "./components/RoutePage.jsx";
import BoatPage from "./components/BoatPage.jsx";
import ServicePage from"./components/ServicePage.jsx";
import { Box } from "@mui/material";
import AdminDashboard from "./components/admindashboard.jsx";

function App() {
  const queryClient = new QueryClient();
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <UserProvider>
          <Navbar />
          <Box sx={{height:"50px",width:"100vw"}}/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aboutus" element={<AboutPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/route" element={<RoutePage/>}/>
            <Route path="/boat" element={<BoatPage/>}/>
            <Route path="/service" element={<ServicePage/>}/>
            <Route path="/admin" element={<AdminDashboard/>}/>
          </Routes>
        </UserProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
