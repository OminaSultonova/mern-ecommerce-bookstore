import { Container, Row, Col } from 'react-bootstrap';


const Cancel = () => {
    return (
<Container className="my-5 text-center">
  <Row className="justify-content-center">
    <Col xs={12} md={8}>
    <h2>Payment Failed</h2>
    <p>Your payment was not successful. Please try again.</p>    
    </Col>
  </Row>
</Container>
    )
  }
  
  export default Cancel;
  
  