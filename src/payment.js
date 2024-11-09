import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Container, Modal } from 'react-bootstrap';
import axios from 'axios';
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
    const [message, setMessage] = useState('');
    const [qrCodeUrl, setQrCodeUrl] = useState('');

    
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'mobile') {
            if (value.length > 10) {
                setMobileError('Mobile number cannot exceed 10 digits.');
                return;
            }
            if (value && !/^\d+$/.test(value)) {
                setMobileError('Mobile number can only contain digits.');
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
            setStates([]);
            setCities([]);
        } else if (name === 'state') {
            setFormData((prevData) => ({
                ...prevData,
                city: '',
            }));
            setCities([]);
        }
    };

    
    useEffect(() => {
        if (formData.country) {
            const selectedCountry = countryData.find(
                (country) => country.name === formData.country
            );
            setStates(selectedCountry ? selectedCountry.states : []);
        }
    }, [formData.country]);

    
    useEffect(() => {
        if (formData.state) {
            const selectedState = states.find(
                (state) => state.name === formData.state
            );
            setCities(selectedState ? selectedState.cities : []);
        }
    }, [formData.state, states]);

    
    const handlePayment = async (e) => {
        e.preventDefault();
        const isFormValid = Object.values(formData).every((field) => field !== '') && !mobileError;
        if (!isFormValid) {
            alert('Please fill in all required fields correctly.');
            return;
        }

        try {
            
            const { name, email, mobile, country, state, city, amount } = formData;

            
            const response = await axios.post('http://127.0.0.1:8000/payments', 
                { name, email, mobile, country, state, city, amount }, 
                { headers: { 'Content-Type': 'application/json' } }
            );

            if (response.data.success) {
                
                const qrResponse = await axios.get(
                    `http://127.0.0.1:8000/payments/qr_code?amount=${formData.amount}`,
                    { responseType: 'blob' }
                );

                setQrCodeUrl(URL.createObjectURL(qrResponse.data));
                setMessage(`Payment of ${formData.amount} created successfully.`);
                setIsQRCodeGenerated(true);
                setShowModal(true);
            } else {
                setMessage('Payment creation failed.');
            }
        } catch (error) {
            console.error('Error creating payment:', error);
            setMessage('Error creating payment. Please try again.');
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setIsQRCodeGenerated(false);
        setQrCodeUrl('');
        setMessage('');
    };

    return (
        <Container className="payment-container mt-5" style={{ maxWidth: '600px', margin: 'auto', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <h2 className="text-center mb-4" style={{ fontFamily: 'Arial, sans-serif', fontSize: '24px', color: '#343a40' }}>Payment Form</h2>

            <Form onSubmit={handlePayment}>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                placeholder="Enter your name"
                            />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                placeholder="Enter your email"
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formMobile">
                            <Form.Label>Mobile</Form.Label>
                            <Form.Control
                                type="tel"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleChange}
                                required
                                placeholder="Enter your mobile number"
                            />
                            {mobileError && <Form.Text className="text-danger">{mobileError}</Form.Text>}
                        </Form.Group>
                    </Col>

                    <Col xs={12} md={6}>
                        <Form.Group controlId="formCountry">
                            <Form.Label>Country</Form.Label>
                            <Form.Control
                                as="select"
                                name="country"
                                value={formData.country}
                                onChange={handleChange}
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
                                <Form.Label>State</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="state"
                                    value={formData.state}
                                    onChange={handleChange}
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
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
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
                            <Form.Label>Amount</Form.Label>
                            <Form.Control
                                type="number"
                                name="amount"
                                value={formData.amount}
                                onChange={handleChange}
                                required
                                placeholder="Enter amount"
                                min="0"
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <div className="text-center mt-4">
                    <Button variant="primary" type="submit" onClick={handlePayment}> 
                        Pay
                    </Button>
                </div>
            </Form>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Payment QR Code</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                    <h5>{message}</h5>
                    {isQRCodeGenerated && qrCodeUrl && (
                        <img src={qrCodeUrl} alt="QR Code" style={{ maxWidth: '100%', marginTop: '20px' }} />
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