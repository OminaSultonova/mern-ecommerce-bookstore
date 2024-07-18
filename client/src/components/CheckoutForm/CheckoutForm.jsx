import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { createCheckoutSession } from '../../actions/checkoutActions';
import './Checkout.css';

const CheckoutForm = ({ user }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [shippingAddress, setShippingAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  const handleCheckout = async () => {
    console.log('Cart:', cart);  // Debugging line to check the cart state

    if (!cart.cartItems || cart.cartItems.length === 0) {
      console.error('Cart is empty');
      return;
    }

    // Map the cart items to the expected format
    const books = cart.cartItems.map(item => ({
      bookId: item.id,
      title: item.title,
      price: item.price * 100,  // Convert price to the smallest currency unit (e.g., cents)
      quantity: item.quantity,
    }));

    console.log('Books:', books);  // Debugging line to check the formatted books

    const totalAmount = cart.totalPrice * 100;  // Convert total price to the smallest currency unit (e.g., cents)

    dispatch(createCheckoutSession(user.uid, books, shippingAddress, totalAmount));
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">Checkout</h2>
      <Form>
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <Form.Group controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                placeholder="Enter address"
                value={shippingAddress.address}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <Form.Group controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                placeholder="Enter city"
                value={shippingAddress.city}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <Form.Group controlId="formPostalCode">
              <Form.Label>Postal Code</Form.Label>
              <Form.Control
                type="text"
                name="postalCode"
                placeholder="Enter postal code"
                value={shippingAddress.postalCode}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col xs={12} md={6}>
            <Form.Group controlId="formCountry">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                name="country"
                placeholder="Enter country"
                value={shippingAddress.country}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center mt-2">
        <div className="d-grid gap-2 mt-4">
          <Button className='payment' variant="danger" size="md" onClick={handleCheckout}>
            Proceed to Payment
          </Button>
          </div>
        </Row>
      </Form>
    </Container>
  );
};

CheckoutForm.propTypes = {
  user: PropTypes.object.isRequired,
};

export default CheckoutForm;
