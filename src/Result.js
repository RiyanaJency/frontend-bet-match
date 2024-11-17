import React, { useState } from "react";
import { Container, Row, Col, Card, Table, Button, Modal, Form, Alert } from "react-bootstrap";
import StudentNav from "./Student-navbar"; // Import Sidebar

const Result = () => {
  const [student] = useState({
    name: "Arun Kumar",
    rollNo: "12345",
    subjects: {
      tamil: 85,
      english: 90,
      maths: 95,
      chemistry: 88,
      physics: 92,
      biology: 89,
    },
    totalMarks: 539,
    maxMarks: 600,
    percentage: 89.83,
  });

  const [results, setResults] = useState(Object.entries(student.subjects).map(([subject, marks]) => ({
    subject,
    grade: marks,
  })));

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setResults((prevResults) =>
      prevResults.map((result) =>
        result.subject === selectedResult.subject
          ? { ...result, grade: selectedResult.grade }
          : result
      )
    );
    setAlertMessage("Result updated successfully!");
    setShowEditModal(false);
    setTimeout(() => setAlertMessage(""), 2000);
  };

  const handleGradeChange = (e) => {
    setSelectedResult({ ...selectedResult, grade: e.target.value });
  };

  const handleModalClose = () => {
    setShowEditModal(false);
    setSelectedResult(null);
  };

  return (
<>
        <StudentNav />
     

      {/* Main Content */}
      <div className="flex-grow-1 p-3" style={{ backgroundColor: '#f7f7f7' }}>
        <Container className="mt-1" style={{ maxWidth: '800px' }}>
          <Row className="justify-content-center">
            <Col md={12} sm={12}>
              <Card className="shadow-lg rounded" style={{ backgroundColor: '#ffffff' }}>
                <Card.Body>
                  <h2 className="text-center mb-4 text-primary">Student Report Card</h2>
                  {alertMessage && <Alert variant="success" className="mb-1">{alertMessage}</Alert>}

                  <Alert variant="info" className="mb-1">
                    <strong>{student.name}</strong> (Roll No: {student.rollNo})
                  </Alert>

                  <Table bordered hover responsive variant="light">
                    <thead className="table-primary">
                      <tr>
                        <th>Subject</th>
                        <th>Marks Obtained</th>
                        <th>Max Marks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map((result, index) => (
                        <tr key={index}>
                          <td>{result.subject.charAt(0).toUpperCase() + result.subject.slice(1)}</td>
                          <td>{result.grade}</td>
                          <td>100</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>

                  <Row className="mt-1">
                    <Col>
                      <h5>Total Marks: {student.totalMarks} / {student.maxMarks}</h5>
                      <h5>Percentage: {student.percentage}%</h5>
                    </Col>
                  </Row>

                  <Row className="mt-1">
                    <Col className="text-center">
                      <Button variant={student.percentage >= 50 ? "success" : "danger"} size="lg">
                        {student.percentage >= 50 ? "Passed" : "Failed"}
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        
        {/* Edit Result Modal */}
        <Modal show={showEditModal} onHide={handleModalClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Edit Result</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleEditSubmit}>
              <Form.Group controlId="subject">
                <Form.Label>Subject</Form.Label>
                <Form.Control type="text" value={selectedResult?.subject.charAt(0).toUpperCase() + selectedResult?.subject.slice(1)} readOnly />
              </Form.Group>
              <Form.Group controlId="grade">
                <Form.Label>Grade</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedResult?.grade}
                  onChange={handleGradeChange}
                  min={0}
                  max={100}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="mt-1">
                Save Changes
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
      </>
  );
};

export default Result;