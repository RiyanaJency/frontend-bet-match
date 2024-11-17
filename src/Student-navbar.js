import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function StudentNav() {
  return (
    <Navbar bg="dark" variant="dark" expand="md" className="py-3">
      <Container>
        {/* Brand Logo */}
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <i className="bi bi-mortarboard-fill me-2 fs-3" />
          <span className="fs-4 fw-bold">Student Portal</span>
        </Navbar.Brand>

        {/* Toggle for smaller screens */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Collapsible Navigation Menu */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/Student-dashboard">
              <Nav.Link className="d-flex align-items-center">
                <i className="bi bi-speedometer2 fs-5 me-2" />
                <span className="fs-5">Dashboard</span>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/Student-details">
              <Nav.Link className="d-flex align-items-center">
                <i className="bi bi-person-circle fs-5 me-2" />
                <span className="fs-5">Profile</span>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/Assignment">
              <Nav.Link className="d-flex align-items-center">
                <i className="bi bi-pencil-square fs-5 me-2" />
                <span className="fs-5">Assignment</span>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/Result">
              <Nav.Link className="d-flex align-items-center">
                <i className="bi bi-clipboard-check fs-5 me-2" />
                <span className="fs-5">Result </span>
              </Nav.Link>
            </LinkContainer>
          
            <LinkContainer to="/Login">
              <Nav.Link className="d-flex align-items-center">
                <i className="bi bi-power fs-5 me-2" />
                <span className="fs-5">Logout</span>
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default StudentNav;