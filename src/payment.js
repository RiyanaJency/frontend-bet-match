import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container, Modal } from 'react-bootstrap';
import { QRCodeCanvas } from 'qrcode.react';
import countryData from './Json/countries+states+cities.json';


function Payment() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    country: '',
    state: '',
    city: '',
    amount: ''  
  });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [isQRCodeGenerated, setIsQRCodeGenerated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [mobileError, setMobileError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'amount' && value < 0) {
      return;
    }

// Handle mobile validation
if (name === 'mobile') {
  if (value.length > 10) {
    alert('Mobile number cannot exceed 10 digits.');
  }
 
  if (value && !/^\d*$/.test(value)) {
    alert('Mobile number can only contain digits.'); 
    return; 
  }

  setMobileError(''); 
}

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === 'country') {
      setFormData((prevData) => ({
        ...prevData,
        state: '',
        city: '',
      }));
    } else if (name === 'state') {
      setFormData((prevData) => ({
        ...prevData,
        city: '',
      }));
    }
  };

  useEffect(() => {
    if (formData.country) {
      const selectedCountry = countryData.find(
        (country) => country.name === formData.country
      );
      setStates(selectedCountry ? selectedCountry.states : []);
      setCities([]);
    } else {
      setStates([]);
      setCities([]);
    }
  }, [formData.country]);

  useEffect(() => {
    if (formData.state) {
      const selectedState = states.find(
        (state) => state.name === formData.state
      );
      setCities(selectedState ? selectedState.cities : []);
    } else {
      setCities([]);
    }
  }, [formData.state, states]);

  const handleGenerateQRCode = (e) => {
    e.preventDefault();
    const isFormValid = Object.values(formData).every((field) => field !== '') && !mobileError;
    if (!isFormValid) {
      alert('Please fill in all required fields correctly.');
      return;
    }

    setIsQRCodeGenerated(true);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container className="payment-container mt-5" style={{ maxWidth: '600px', margin: 'auto', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
      <h2 className="text-center mb-4" style={{ fontFamily: 'Arial, sans-serif', fontSize: '24px', color: '#343a40' }}>Payment Form</h2>

      <Form onSubmit={handleGenerateQRCode}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="formName">
              <Form.Label style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' }}>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your name"
                style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px', marginBottom: '15px' }}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="formEmail">
              <Form.Label style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' }}>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px', marginBottom: '15px' }}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="formMobile">
              <Form.Label style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' }}>Mobile</Form.Label>
              <Form.Control
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                required
                placeholder="Enter your mobile number"
                style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px', marginBottom: '15px' }}
              />
              {mobileError && <Form.Text className="text-danger">{mobileError}</Form.Text>}
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
            <Form.Group controlId="formCountry">
              <Form.Label style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' }}>Country</Form.Label>
              <Form.Control
                as="select"
                name="country"
                value={formData.country}
                onChange={handleChange}
                style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px', marginBottom: '15px' }}
              >
                <option value="">Select Country</option>
                {countryData.map((countryObj) => (
                  <option key={countryObj.id} value={countryObj.name}>
                    {countryObj.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>

          {formData.country && (
            <Col xs={12} md={6}>
              <Form.Group controlId="formState">
                <Form.Label style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' }}>State</Form.Label>
                <Form.Control
                  as="select"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px', marginBottom: '15px' }}
                >
                  <option value="">Select State</option>
                  {states.map((stateObj) => (
                    <option key={stateObj.id} value={stateObj.name}>
                      {stateObj.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          )}

          {formData.state && (
            <Col xs={12} md={6}>
              <Form.Group controlId="formCity">
                <Form.Label style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' }}>City</Form.Label>
                <Form.Control
                  as="select"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px', marginBottom: '15px' }}
                >
                  <option value="">Select City</option>
                  {cities.map((cityObj) => (
                    <option key={cityObj.id} value={cityObj.name}>
                      {cityObj.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Col>
          )}

          <Col md={6}>
            <Form.Group controlId="formAmount">
              <Form.Label style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' }}>Amount</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                placeholder="Enter amount"
                min="0"
                style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px', marginBottom: '15px' }}
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="text-center mt-4">
          <Button variant="primary" type="submit" style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px', padding: '10px 20px' }}>
            Generate QR Code
          </Button>
        </div>
      </Form>

      {/* Modal for QR Code */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontFamily: 'Arial, sans-serif', fontSize: '20px', color: '#495057' }}>QR Code</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {isQRCodeGenerated && (
            <QRCodeCanvas
              value={formData.amount}
              size={200}
              style={{ marginTop: 20 }}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default Payment;
