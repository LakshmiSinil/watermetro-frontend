import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Homepage";
import AboutPage from "./components/aboutus";
import Login from "./components/Login";
import Registrationp from "./components/Register";
import { UserProvider } from "./context/useUser.hook.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

function App() {
  const queryClient = new QueryClient();
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        
      <Toaster/>
        <UserProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/aboutus" element={<AboutPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registrationp />} />
          </Routes>
        </UserProvider>
      </QueryClientProvider>
    </Router>
  );
}

export default App;
