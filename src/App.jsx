import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar"; 
import Home from "./components/Homepage";
import AboutPage from "./components/aboutus";
import Login from "./components/Login";
import Registrationp from "./components/Register";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registrationp />} />

      </Routes>
    </Router>
  );
}

export default App;
