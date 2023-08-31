
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import React  from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Documents from "./pages/Documents";
import DocumentAddForm from "./components/forms/DocumentAdd";
import DocumentEditForm from "./components/forms/DocumentEdit";
import DocumentDetail from "./pages/DocumentDetail";
import NavbarStd from "./components/navbars/Navbar";

function App() {
 
  return (
    <Router>

      <NavbarStd/>
      <br></br>

      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/documents/:id" element={<DocumentDetail />} />
          <Route path="/documents/add" element={<DocumentAddForm />} />
          <Route path="/documents/edit/:id" element={<DocumentEditForm />} />
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