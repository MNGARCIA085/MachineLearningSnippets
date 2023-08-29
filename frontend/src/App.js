
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import React  from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Documents from "./pages/Documents";
import DocumentAddForm from "./components/forms/DocumentAdd";

function App() {
 
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/documents/add" element={<DocumentAddForm />} />
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