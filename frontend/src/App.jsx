import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MapsPage from "./pages/MapsPage";
import OurMission from "./pages/OurMission";
import Registro from "./pages/Registro"; 
import LightRaysBackground from "./components/LightRaysBackground";
import Login from "./pages/Login";
import FAQ from "./pages/FAQPage";
import Soporte from "./pages/SoportePage"
import ChatWidget from "./components/ChatWidget";


function App() {
  return (
    <Router>
      <LightRaysBackground/>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/mapas" element={<MapsPage />} />
        <Route path="/mision" element={<OurMission />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/FAQ" element={<FAQ/>}/>
        <Route path="/Soporte" element={<Soporte/>}/>
      </Routes>
    </Router>
  );
}
  export default App;

  