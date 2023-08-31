import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Dropdown } from 'react-bootstrap';
import { Navbar, Nav } from 'react-bootstrap';
import './styles.css';




const NavbarStd = () => {


  return (
    <Navbar bg="light" expand="lg">
      <Link to="/" className="navbar-brand fs-5 ubuntu">
            SNIPPETS
      </Link>
      
      
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end my-custom-margin">
        
        
        <Nav className="ml-auto">

                    <Dropdown>
                            <Dropdown.Toggle variant="light" id="dropdown-basic" 
                                className="nav-link fs-6">
                                        Snippets
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <NavLink to="/documents/" className="nav-link">
                                    Snippets
                                </NavLink>
                                <NavLink to="/users/changepassword" className="nav-link">
                                    Tags
                                </NavLink>                               
                            </Dropdown.Menu>
                    </Dropdown>

                    <NavLink to="/documents" className="nav-link fs-6">
                            Cheatsheets
                    </NavLink>

            
        </Nav>
      </Navbar.Collapse>
    </Navbar>



  );
};

export default NavbarStd;