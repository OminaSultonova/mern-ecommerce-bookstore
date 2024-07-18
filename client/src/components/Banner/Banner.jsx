import { Container, Row, Col } from 'react-bootstrap';

const Banner = () => {
  return (
    <Container>
    <div className="promotion-banner" style={{ background: 'linear-gradient(to right, #dc3545, #fd7e14)', color: '#fff', padding: '10px 0' , marginTop: '20px', marginBottom: '20px' }}>
      <Container>
        <Row className="justify-content-center">
          <Col xs="auto" className="text-center">
            <h5 style={{ fontSize: '1.8rem' }}>Enjoy Back to School Special 25% Discounts!</h5>
          </Col>
        </Row>
      </Container>
    </div>
    </Container>
  );
};

export default Banner;
