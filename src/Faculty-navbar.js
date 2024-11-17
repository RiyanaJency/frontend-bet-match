import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function FacultyNav() {
  return (
    <Navbar bg="dark" variant="dark" expand="md" className="py-3">
      <Container>
        {/* Brand Logo */}
        <Navbar.Brand href="/" className="d-flex align-items-center">
          <i className="bi bi-mortarboard-fill me-2 fs-3" />
          <span className="fs-4 fw-bold">Faculty</span>
        </Navbar.Brand>

        {/* Toggle for smaller screens */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Collapsible Navigation Menu */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <LinkContainer to="/Dashboard">
              <Nav.Link className="d-flex align-items-center">
                <i className="bi bi-speedometer2 fs-5 me-2" />
                <span className="fs-5">Dashboard</span>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/student">
              <Nav.Link className="d-flex align-items-center">
                <i className="bi bi-person-circle fs-5 me-2" />
                <span className="fs-5">StudentDetails</span>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/Faculty">
              <Nav.Link className="d-flex align-items-center">
                <i className="bi bi-pencil-square fs-5 me-2" />
                <span className="fs-5">Enrollsubject</span>
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/Profile">
              <Nav.Link className="d-flex align-items-center">
                <i className="bi bi-clipboard-check fs-5 me-2" />
                <span className="fs-5">Profile</span>
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

export default FacultyNav;