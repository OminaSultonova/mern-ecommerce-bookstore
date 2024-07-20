import { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import './Contact.css';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [responseMessage, setResponseMessage] = useState(null);
  const [error, setError] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setResponseMessage(data.message);
        setError(null);
        // Clear the form
        setFormData({ name: '', email: '', message: '' });
      } else {
        setError(data.message);
        setResponseMessage(null);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Something went wrong. Please try again.');
      setResponseMessage(null);
    }
  };

  return (
    <Container className="my-4">
      <Row>
        <Col>
          <h1 className="text-center">Have a question or feedback?</h1>
          <p className="text-center">
            Use the form below to send us a message. We will respond within 3 working days.
          </p>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={{ span: 6, offset: 3 }}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
            </Form.Group>
            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
            </Form.Group>
            <Form.Group controlId="formMessage" className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Enter your message"
                required
              />
            </Form.Group>
            <Button
              variant="danger"
              type="submit"
              className="submit-button"
            >
              Submit
            </Button>
          </Form>
          {responseMessage && <Alert variant="success" className="mt-3">{responseMessage}</Alert>}
          {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        </Col>
      </Row>
    </Container>
  );
};

export default ContactPage;
