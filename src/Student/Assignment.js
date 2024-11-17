import React, { useState } from "react";
import { Container, Row, Col, Card, Table, Button, Modal, Form, Alert } from "react-bootstrap";
import { FaUpload, FaFileAlt } from "react-icons/fa";
import Sidebar from "./Student-sidebar";

const Assignment = () => {
  const [assignments, setAssignments] = useState([
    { id: 1, title: "Math Assignment", dueDate: "2024-11-20", status: "Submitted" },
    { id: 2, title: "Science Project", dueDate: "2024-11-25", status: "Pending" },
  ]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");

  const handleUploadClick = (assignment) => {
    setSelectedAssignment(assignment);
    setShowUploadModal(true);
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    setAlertMessage(`Assignment "${selectedAssignment.title}" uploaded successfully!`);
    setAssignments((prevAssignments) =>
      prevAssignments.map((assignment) =>
        assignment.id === selectedAssignment.id ? { ...assignment, status: "Submitted" } : assignment
      )
    );
    setShowUploadModal(false);
  };

  const handleModalClose = () => {
    setShowUploadModal(false);
    setSelectedAssignment(null);
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <div className="d-none d-md-block fs-6">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 p-3" style={{ backgroundColor: '#f4f6f9' }}>
        <Container className="mt-5">
          <Row className="justify-content-center">
            <Col md={10}>
              <Card className="shadow-lg p-4" style={{ backgroundColor: '#ffffff', borderRadius: '10px' }}>
                <Card.Body>
                  <h2 className="text-center mb-4" style={{ color: 'green' }}>
                    Assignments
                  </h2>

                  {alertMessage && (
                    <Alert
                      variant="success"
                      className="mb-3"
                      style={{
                        backgroundColor: '#d4edda',
                        borderColor: '#c3e6cb',
                        color: '#155724',
                        borderRadius: '5px',
                      }}
                    >
                      {alertMessage}
                    </Alert>
                  )}

                  <Table responsive bordered hover style={{ backgroundColor: '#ffffff' }}>
                    <thead className="table-primary">
                      <tr>
                        <th>S.NO</th>
                        <th>Assignment Title</th>
                        <th>Due Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assignments.map((assignment, index) => (
                        <tr key={assignment.id}>
                          <td>{index + 1}</td>
                          <td>{assignment.title}</td>
                          <td>{assignment.dueDate}</td>
                          <td>
                            <span
                              className={`badge ${
                                assignment.status === "Submitted" ? "bg-success" : "bg-warning"
                              }`}
                              style={{ fontSize: '14px' }}
                            >
                              {assignment.status}
                            </span>
                          </td>
                          <td>
                            {assignment.status === "Pending" && (
                              <Button
                                variant="primary"
                                size="sm"
                                onClick={() => handleUploadClick(assignment)}
                                style={{
                                  backgroundColor: '#5c6bc0',
                                  borderColor: '#5c6bc0',
                                  transition: 'all 0.3s ease',
                                }}
                                onMouseEnter={(e) => (e.target.style.backgroundColor = '#3f51b5')}
                                onMouseLeave={(e) => (e.target.style.backgroundColor = '#5c6bc0')}
                              >
                                <FaUpload className="me-2" />
                                Upload
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Upload Modal */}
          <Modal show={showUploadModal} onHide={handleModalClose} centered>
            <Modal.Header closeButton>
              <Modal.Title style={{ color: '#5c6bc0' }}>Upload Assignment</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: '#f9f9f9' }}>
              <Form onSubmit={handleUploadSubmit}>
                <Form.Group controlId="uploadFile" className="mb-3">
                  <Form.Label>
                    <FaFileAlt className="me-2" />
                    Assignment File
                  </Form.Label>
                  <Form.Control type="file" required style={{ borderColor: '#5c6bc0' }} />
                </Form.Group>
                <Button
                  type="submit"
                  variant="primary"
                  className="w-100"
                  style={{
                    backgroundColor: '#5c6bc0',
                    borderColor: '#5c6bc0',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => (e.target.style.backgroundColor = '#3f51b5')}
                  onMouseLeave={(e) => (e.target.style.backgroundColor = '#5c6bc0')}
                >
                  Submit Assignment
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </Container>
      </div>
    </div>
  );
};

export default Assignment;
