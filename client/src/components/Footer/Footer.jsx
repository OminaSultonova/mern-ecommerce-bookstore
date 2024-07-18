import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

// Replace with your logo file path

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-4 mt-auto">
      <Container className="d-flex flex-column h-100">
        <Row className="align-items-center">
          {/* Logo and Social Icons */}
          <Col md={3} className="mb-3 mb-md-0 text-center text-md-start">
            <h2 className="footer-logo">InsideOut</h2>
            <div className="mt-3">
              <a href="https://www.facebook.com/" className="text-light me-3"><FaFacebook /></a>
              <a href="https://x.com" className="text-light me-3"><FaTwitter /></a>
              <a href="https://www.instagram.com" className="text-light me-3"><FaInstagram /></a>
            </div>
          </Col>

          {/* Shop and About Links */}
          <Col md={6} className="mb-3 mb-md-0 text-left">
            <Row>
            <Col sm={6} className="mb-3 mb-sm-0">
                <h6 className="text-uppercase">Shop</h6>
                <ul className="list-unstyled footer-links">
                  <li>
                <Link to="/products/english" className="text-white text-decoration-none">English Books</Link>
                </li>
                <li>    
                <Link to="/products/malay" className="text-white text-decoration-none">Malay Books</Link>
                </li>
                  <li>
                  <Link to="/products/chinese" className="text-white text-decoration-none">Chinese Books</Link>
                    </li>
                </ul>
              </Col>
              <Col sm={6}>
                <h6 className="text-uppercase">About</h6>
                <ul className="list-unstyled footer-links">
                  <li>
                  <Link to="/about" className="text-white text-decoration-none">About Us</Link>
                    </li>
                  <li>
                  <Link to="/about" className="text-white text-decoration-none">Our Team</Link>
                    </li>
                  <li>
                  <Link to="/contact" className="text-white text-decoration-none">Contact</Link>
                    </li>
                </ul>
              </Col>
            </Row>
          </Col>

          {/* Subscribe Form */}
          <Col md={3} className="text-center text-md-end">
            <h6 className="text-uppercase mb-3">Subscribe</h6>
            <Form className="d-flex flex-column flex-md-row align-items-center justify-content-center justify-content-md-end">
              <Form.Control type="email" placeholder="Enter email" className="me-md-1 mb-2 mb-md-0" />
              <Button variant="light" type="submit">Submit</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
