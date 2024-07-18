// src/pages/SuccessPage.js

import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';

const Success = () => {
  const location = useLocation();
  const sessionId = new URLSearchParams(location.search).get('session_id');

  useEffect(() => {
    // Fetch order details using the session ID and store it in the database if needed
    // This part depends on how you want to handle order storage on the backend
  }, [sessionId]);

  return (
    <Container className="my-5 text-center">
      <Row className="justify-content-center">
        <Col xs={12} md={8}>
          <h2>Thank You for Your Purchase!</h2>
          <p>Your payment was successful.</p>
          <p>Session ID: {sessionId}</p>
          <Link to="/profile">Go to your profile to view your orders</Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Success;
