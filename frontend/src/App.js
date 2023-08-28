
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import React  from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Documents from "./pages/Documents";


function App() {
 
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/documents" element={<Documents />} />
      </Routes>
    </Router>
  );
}




const Home = () => {
  return (
    <div className="App">
        HOME PAGE
    </div>
  );
};

export default App;