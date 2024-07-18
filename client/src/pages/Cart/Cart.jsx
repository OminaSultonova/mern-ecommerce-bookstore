// src/components/Cart/CartPage.jsx

import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Card, Button, Image, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { removeFromCart, incrementQuantity, decrementQuantity } from '../../actions/cartActions';
import './Cart.css';

const CartPage = () => {
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.cart.cartItems);
  console.log(cartItems);
  const dispatch = useDispatch();

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  const handleDelete = (id) => {
    dispatch(removeFromCart(id));
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  
  return (
    <Container className="my-4">
      <Row>
        <Col>
          <h1 className="text-center">Shopping Cart</h1>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={8}>
          <Card>
            <Card.Header>
              <Row>
                <Col style={{ color: 'gray' }} md={5}><strong>Product</strong></Col>
                <Col style={{ color: 'gray' }} md={2}><strong>Price</strong></Col>
                <Col style={{ color: 'gray' }} md={2}><strong>Quantity</strong></Col>
                <Col style={{ color: 'gray' }} md={3}><strong>Total Price</strong></Col>
              </Row>
            </Card.Header>
            <Card.Body>
              {cartItems.map((item) => (
                <Row key={item.id} className="align-items-center mb-3">
                  <Col md={5}>
                    <Image 
                    className="img-fluid"
                    style={{ maxHeight: '200px' }} 
                    src={item.image} thumbnail />
                    <span className="ms-3">{item.title}</span>
                  </Col>
                  <Col md={2}>${item.price.toFixed(2)}</Col>
                  <Col md={2}>
                    <div className="quantity-control">
                      <Button
                        variant="btn btn-sm"
                        size="sm"
                        onClick={() => handleDecrement(item.id)}
                        className="quantity-btn"
                      >
                        -
                      </Button>
                      <Form.Control
                        type="text"
                        value={item.quantity}
                        readOnly
                        className="quantity-input"
                      />
                      <Button
                        variant="btn btn-sm"
                        size="sm"
                        onClick={() => handleIncrement(item.id)}
                        className="quantity-btn"
                      >
                        +
                      </Button>
                    </div>
                  </Col>
                  <Col className="total-price" md={3}>
                    ${(item.price * item.quantity).toFixed(2)}
                    <Button variant="link" onClick={() => handleDelete(item.id)}>
                      <FaTrash style={{ color: 'gray' }} />
                    </Button>
                  </Col>
                </Row>
              ))}
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Header style={{ color: 'gray' }}><strong>Summary</strong></Card.Header>
            <Card.Body>
              <h5>Subtotal: ${calculateTotalPrice()}</h5>
              <Button variant="danger" className="w-100 mt-3" onClick={handleCheckout}>
                Checkout
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CartPage;
