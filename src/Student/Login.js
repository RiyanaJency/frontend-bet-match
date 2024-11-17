import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert, Card } from "react-bootstrap";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (credentials.username === "" || credentials.password === "") {
      setErrorMessage("Username and password are required.");
    } else {
      setIsLoggedIn(true);
      setErrorMessage(""); // Clear any previous error
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow-lg p-4" style={{ borderColor: "#007bff" }}>
            <Card.Body>
              <h2 className="text-center mb-4" style={{ color: "#007bff" }}>
                Login
              </h2>
              {!isLoggedIn ? (
                <Form>
                  <Form.Group controlId="username" className="mb-3">
                    <Form.Label style={{ color: "#007bff" }}>
                      <FaUser className="me-2" />
                      Username
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter username"
                      value={credentials.username}
                      onChange={(e) =>
                        setCredentials({ ...credentials, username: e.target.value })
                      }
                    />
                  </Form.Group>
                  <Form.Group controlId="password" className="mb-3">
                    <Form.Label style={{ color: "#007bff" }}>
                      <FaLock className="me-2" />
                      Password
                    </Form.Label>
                    <div className="d-flex align-items-center">
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={credentials.password}
                        onChange={(e) =>
                          setCredentials({ ...credentials, password: e.target.value })
                        }
                      />
                      <Button
                        variant="outline-secondary"
                        className="ms-2"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </Button>
                    </div>
                  </Form.Group>
                  {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                  <Button
                    variant="primary"
                    className="w-100 mt-3"
               
                    style={{ backgroundColor: "#007bff", border: "none" }}
                  >
                    <Link to="/Student-dashboard" style={{ color: "white", textDecoration: "none" }}>
                      Login
                    </Link>
                  </Button>
                </Form>
              ) : (
                // This part is removed to not show any welcome message
                <></>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;