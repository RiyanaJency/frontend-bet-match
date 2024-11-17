import React, { useState, useEffect } from "react";
import { Table, Button, Container, Row, Col, Card, Form, Modal, Alert } from "react-bootstrap";
import { FaUser, FaBirthdayCake, FaVenusMars, FaPhoneAlt, FaAddressCard } from "react-icons/fa";
import Navbar from "./Faculty-navbar"; // Import Sidebar component

// Helper function to generate random student data
const generateRandomStudent = (id) => {
  const names = ["Alice", "Bob", "Charlie", "David", "Emma"];
  const genders = ["Male", "Female", "Other"];
  const randomName = names[Math.floor(Math.random() * names.length)];
  const randomGender = genders[Math.floor(Math.random() * genders.length)];
  const randomDate =` 19${Math.floor(Math.random() * 10 + 80)}-${Math.floor(Math.random() * 12 + 1).toString().padStart(2, "0")}-${Math.floor(Math.random() * 28 + 1).toString().padStart(2, "0")}`;
  const randomContact =` 98765${Math.floor(Math.random() * 100000)}`;
  const randomAddress = `Address ${id}`;
  
  return { id, name: randomName, dob: randomDate, gender: randomGender, contactNumber: randomContact, address: randomAddress };
};

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [formData, setFormData] = useState({ name: "", dob: "", gender: "Male", contactNumber: "", address: "" });

  // Generate initial random students
  useEffect(() => {
    const initialStudents = Array.from({ length: 3 }, (_, index) => generateRandomStudent(index + 1));
    setStudents(initialStudents);
  }, []);

  const openAddModal = () => {
    setIsEditing(false);
    setFormData({ name: "", dob: "", gender: "Male", contactNumber: "", address: "" });
    setShowModal(true);
  };

  const openEditModal = (student) => {
    setIsEditing(true);
    setCurrentStudent(student.id);
    setFormData({ name: student.name, dob: student.dob, gender: student.gender, contactNumber: student.contactNumber, address: student.address });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setStudents((prevStudents) => prevStudents.map((student) => student.id === currentStudent ? { ...student, ...formData } : student));
      setAlertMessage("Student details updated successfully!");
    } else {
      const newStudent = { ...formData, id: students.length + 1 };
      setStudents((prevStudents) => [...prevStudents, newStudent]);
      setAlertMessage("New student added successfully!");
    }
    setShowModal(false);
  };

  const handleDelete = (studentId) => {
    setStudents(students.filter((student) => student.id !== studentId));
    setAlertMessage("Student deleted successfully!");
  };

  return (
    <>
      <Navbar />
      {/* Content Area */}
      <div className="flex-grow-1 p-4" style={{ backgroundColor: "#f7f7f7" }}>
        <Container fluid>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12} className="mx-auto">
              <Card className="shadow-lg p-4" style={{ backgroundColor: '#ffffff', borderRadius: '10px' }}>
                <Card.Body>
                  <h2 className="text-center mb-4" style={{ color: 'green' }}>Student List</h2>
                  {alertMessage && (
                    <Alert variant="success" className="mb-3" style={{ backgroundColor: '#d4edda', borderColor: '#c3e6cb', color: '#155724', borderRadius: '5px' }}>
                      {alertMessage}
                    </Alert>
                  )}
                  <Button variant="primary" onClick={openAddModal} className="mb-3" style={{ backgroundColor: '#5c6bc0', borderColor: '#5c6bc0' }}>
                    Add New Student
                  </Button>
                  <Table striped bordered hover responsive="xl" style={{ backgroundColor: '#ffffff' }}>
                    <thead className="table-primary">
                      <tr>
                        <th>S.NO</th>
                        <th>Name</th>
                        <th>DOB</th>
                        <th>Gender</th>
                        <th>Contact </th>
                        <th>Address</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student, index) => (
                        <tr key={student.id}>
                          <td>{index + 1}</td>
                          <td>{student.name}</td>
                          <td>{student.dob}</td>
                          <td>{student.gender}</td>
                          <td>{student.contactNumber}</td>
                          <td>{student.address}</td>
                          <td>
                            <Button variant="info" onClick={() => openEditModal(student)}>Edit</Button>
                            <Button variant="danger" onClick={() => handleDelete(student.id)}>Delete</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>

        {/* Modal for Adding/Editing Student */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>{isEditing ? "Edit Student" : "Add New Student"}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: '#f9f9f9' }}>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="name" className="mb-3">
                <Form.Label><FaUser className="me-2" /> Name</Form.Label>
                <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Enter name" />
              </Form.Group>

              {/* Additional form fields for DOB, Gender, Contact Number and Address */}
              <Form.Group controlId="dob" className="mb-3">
                <Form.Label><FaBirthdayCake className="me-2" /> DOB</Form.Label>
                <Form.Control type="date" name="dob" value={formData.dob} onChange={handleChange} required />
              </Form.Group>
              <Form.Group controlId="gender" className="mb-3">
                <Form.Label><FaVenusMars className="me-2" /> Gender</Form.Label>
                <Form.Control as="select" name="gender" value={formData.gender} onChange={handleChange}>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="contactNumber" className="mb-3">
                <Form.Label><FaPhoneAlt className="me-2" /> Contact Number</Form.Label>
                <Form.Control type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required placeholder="Enter contact number" />
              </Form.Group>
              <Form.Group controlId="address" className="mb-3">
                <Form.Label><FaAddressCard className="me-2" /> Address</Form.Label>
                <Form.Control type="text" name="address" value={formData.address} onChange={handleChange} required placeholder="Enter address" />
              </Form.Group>

              <Button variant="success" type="submit" style={{ width: "100%" }}>
                {isEditing ? "Update Student" : "Add Student"}
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default StudentList;
