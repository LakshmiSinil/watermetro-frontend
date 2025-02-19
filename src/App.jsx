import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./navbar"; // Adjust path as needed
import Home from "./Homepage";
import AboutPage from "./aboutus";
import Login from "./login";
import Registrationp from "./RegistartionPublic";
import Registrationem from "./Registerem";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register/public" element={<Registrationp />} />
        <Route path="/register/employee" element={<Registrationem />} />
      </Routes>
    </Router>
  );
}

export default App;
