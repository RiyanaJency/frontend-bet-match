import React from "react";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import image from "./faculty.jpg"; // Correct image import
import FacultyNav from "./Faculty-navbar"; // Ensure Sidebar import path is correct

const FacultyProfile = () => {
  const facultyData = {
    name: "Dr. John Doe",
    department: "Computer Science",
    qualifications: "Ph.D. in Computer Science from MIT",
    contact: {
      phone: "+1 234 567 890",
      email: "john.doe@example.com",
      address: "123 University Lane, City, Country"
    },
    photo: image, // Use the imported image
  };

  return (
    <>
      <FacultyNav />

      {/* Main Content Area */}
      <div
        className="flex-grow-1 p-4"
        style={{
          marginLeft: "20px", // To avoid overlap with sidebar
          height: "100vh", // Ensure it takes full height
          overflowY: "auto", // Allow scrolling if needed
          backgroundColor: "#f4f6f9", // Background color for the main content
        }}
      >
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
          <Row className="justify-content-center w-100">
            <Col xs={12} sm={10} md={8} lg={6}>
              <Card className="shadow-lg">
                <Card.Header className="text-center" style={{ backgroundColor: "#5c6bc0", color: "white" }}>
                  <h3>Faculty Profile</h3>
                </Card.Header>
                <Card.Body>
                  <Row className="align-items-center">
                    <Col xs={12} md={4} className="d-flex justify-content-center mb-3 mb-md-0">
                      <img
                        src={facultyData.photo} // Displaying the imported image
                        alt="Faculty"
                        className="img-fluid rounded-circle"
                        style={{ width: "150px", height: "150px", objectFit: "cover" }}
                      />
                    </Col>
                    <Col xs={12} md={8}>
                      <h4>{facultyData.name}</h4>
                      <p className="text-muted">{facultyData.department}</p>
                      <p>{facultyData.qualifications}</p>
                    </Col>
                  </Row>

                  <ListGroup variant="flush" className="mt-4">
                    <ListGroup.Item>
                      <FaPhoneAlt /> <strong>Phone:</strong> {facultyData.contact.phone}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <FaEnvelope /> <strong>Email:</strong> {facultyData.contact.email}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <FaMapMarkerAlt /> <strong>Address:</strong> {facultyData.contact.address}
                    </ListGroup.Item>
                  </ListGroup>

                  <Button variant="primary" className="w-100 mt-3">
                    Contact Faculty
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default FacultyProfile;