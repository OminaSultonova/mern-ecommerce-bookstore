import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap';
import './Admin.css';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/orders/order/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch order details');
        }
        const data = await response.json();
        setOrder(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!order) {
    return <div>Order not found</div>;
  }

  return (
    <Container>
      <h2>Order Details</h2>
      <Card>
        <Card.Header>Order ID: {order._id}</Card.Header>
        <Card.Body>
          <Row>
            <Col md={6}>
              <h5>User Details</h5>
              <ListGroup variant="flush">
                <ListGroup.Item>User ID: {order.userDetails?.googleId || 'N/A'}</ListGroup.Item>
                <ListGroup.Item>Name: {order.userDetails?.name || 'N/A'}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={6}>
              <h5>Shipping Address</h5>
              <ListGroup variant="flush">
                <ListGroup.Item>Address: {order.shippingAddress.address}</ListGroup.Item>
                <ListGroup.Item>City: {order.shippingAddress.city}</ListGroup.Item>
                <ListGroup.Item>Postal Code: {order.shippingAddress.postalCode}</ListGroup.Item>
                <ListGroup.Item>Country: {order.shippingAddress.country}</ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <h5>Order Items</h5>
              <ListGroup variant="flush">
                {order.books.map(item => (
                  <ListGroup.Item key={item.book ? item.book._id : 'unknown'}>
                    {item.book ? item.book.title : 'Unknown Title'} - Quantity: {item.quantity}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Link to="/admin/orders">
        <Button variant="secondary" className="mt-4">Back to Orders</Button>
      </Link>
    </Container>
  );
};

export default OrderDetails;
