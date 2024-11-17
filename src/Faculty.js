import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Modal,
  Form,
  Alert,
} from "react-bootstrap";
import { FaBars } from "react-icons/fa";
import FacultyNav from "./Faculty-navbar";

const SubjectEnroll = () => {
  const [students, setStudents] = useState([
    { id: 1, name: "John Doe", subjects: ["Maths", "Science"] },
    { id: 2, name: "Jane Smith", subjects: ["English", "History"] },
  ]);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [allSubjects] = useState(["Maths", "Science", "English", "History", "Geography"]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentSubjects, setNewStudentSubjects] = useState([]);

  const handleEnrollClick = (student) => {
    setSelectedStudent(student);
    setShowEnrollModal(true);
    setSelectedSubjects(student.subjects);
    setIsEditMode(true);
  };

  const handleEnrollSubmit = (e) => {
    e.preventDefault();
    setAlertMessage`(Student "${selectedStudent.name}" enrolled/updated successfully!)`;
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.id === selectedStudent.id ? { ...student, subjects: selectedSubjects } : student
      )
    );
    setShowEnrollModal(false);
    setIsEditMode(false);
  };

  const handleModalClose = () => {
    setShowEnrollModal(false);
    setShowAddStudentModal(false);
    setSelectedStudent(null);
    setIsEditMode(false);
  };

  const handleToggleSubject = (subject) => {
    setSelectedSubjects((prevSubjects) =>
      prevSubjects.includes(subject)
        ? prevSubjects.filter((item) => item !== subject)
        : [...prevSubjects, subject]
    );
  };

  const handleDeleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
    setAlertMessage("Student deleted successfully!");
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    const newStudent = {
      id: students.length + 1,
      name: newStudentName,
      subjects: newStudentSubjects,
    };
    setStudents([...students, newStudent]);
    setNewStudentName("");
    setNewStudentSubjects([]);
    setAlertMessage("Student added successfully!");
    setShowAddStudentModal(false);
  };

  const handleToggleNewStudentSubject = (subject) => {
    setNewStudentSubjects((prevSubjects) =>
      prevSubjects.includes(subject)
        ? prevSubjects.filter((item) => item !== subject)
        : [...prevSubjects, subject]
    );
  };

  return (
    <>
      <FacultyNav />

      {/* Main Content */}
      <Container fluid className="mt-4">
        <Row>
          <Col>
            <Card className="shadow p-4">
              <h2 className="text-center mb-4" style={{ color: "green" }}>
                Enroll Subjects
              </h2>

              {alertMessage && (
                <Alert
                  variant="success"
                  onClose={() => setAlertMessage("")}
                  dismissible
                >
                  {alertMessage}
                </Alert>
              )}

              {/* Add Student Button */}
              <Button
                variant="primary"
                onClick={() => setShowAddStudentModal(true)}
                className="mb-5"
                size="sm" // Makes the button smaller
              >
                Add Student
              </Button>

              {/* Responsive Table */}
              <Table responsive bordered hover>
                <thead className="table-primary">
                  <tr>
                    <th>S.NO</th>
                    <th>Student Name</th>
                    <th>Subjects</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student, index) => (
                    <tr key={student.id}>
                      <td>{index + 1}</td>
                      <td>{student.name}</td>
                      <td>{student.subjects.join(", ")}</td>
                      <td>
                        <Button
                          variant="info"
                          size="sm"
                          onClick={() => handleEnrollClick(student)}
                          className="me-2"
                        >
                          Edit
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDeleteStudent(student.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>

        {/* Enroll Modal */}
        <Modal show={showEnrollModal} onHide={handleModalClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>
              {isEditMode ? "Edit Subjects" : "Enroll Subjects"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleEnrollSubmit}>
              <Form.Group controlId="studentSubjects" className="mb-3">
                <Form.Label>Select Subjects</Form.Label>
                <div className="d-flex flex-wrap">
                  {allSubjects.map((subject) => (
                    <Button
                      key={subject}
                      variant={selectedSubjects.includes(subject) ? "success" : "outline-secondary"}
                      className="me-2 mb-2"
                      onClick={() => handleToggleSubject(subject)}
                    >
                      {subject}
                    </Button>
                  ))}
                </div>
              </Form.Group>
              <Button type="submit" variant="primary" className="w-100">
                Submit
              </Button>
            </Form>
          </Modal.Body>
        </Modal>

        {/* Add Student Modal */}
        <Modal show={showAddStudentModal} onHide={handleModalClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add New Student</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleAddStudent}>
              <Form.Group controlId="newStudentName" className="mb-3">
                <Form.Label>Student Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter student's name"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="newStudentSubjects" className="mb-3">
                <Form.Label>Select Subjects</Form.Label>
                <div className="d-flex flex-wrap">
                  {allSubjects.map((subject) => (
                    <Button
                      key={subject}
                      variant={newStudentSubjects.includes(subject) ? "success" : "outline-secondary"}
                      className="me-2 mb-2"
                      onClick={() => handleToggleNewStudentSubject(subject)}
                    >
                      {subject}
                    </Button>
                  ))}
                </div>
              </Form.Group>
              <Button type="submit" variant="primary" className="w-100">
                Add Student
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
};

export default SubjectEnroll;