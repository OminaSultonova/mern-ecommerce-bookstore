import { Container, Row, Col } from 'react-bootstrap';

const AboutPage = () => {
  return (
    <Container className="my-4">
      <Row>
        <Col className="text-center">
          <img 
            src="img/img1.png" 
            alt="About Us" 
            className="img-fluid mb-4"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <h1 className="text-center">About Us</h1>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <p>
          Welcome to InsideOut, your premier destination for books.We are committed to providing you with the finest literature, focusing on reliability, exceptional customer service, and distinctive offerings.</p>
          <p>
          Founded in 2024 by Jane Doe, InsideOut has evolved significantly from its humble beginnings in a home office.        </p>
          <p>
          Today, we proudly serve a global clientele, grateful for the opportunity to translate our passion into an enriching online experience. We invite you to explore our curated selection and trust that you will find joy in our offerings. Should you have any inquiries or feedback, please do not hesitate to reach out to us.
</p>
          <p>
            Sincerely,
            <br />
            Jane Doe, Founder
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutPage;
