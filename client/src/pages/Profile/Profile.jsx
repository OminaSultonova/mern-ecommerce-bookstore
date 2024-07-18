import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, ListGroup, Button } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebaseConfig'; // Import your Firebase configuration
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const [orders, setOrders] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  // Redirect to sign-in page if user is not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate('/signin?message=profile');
    }
  }, [loading, user, navigate]);

  // Fetch orders when the user is authenticated
  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          const googleId = user.uid; // Use the correct Google ID
          console.log('Fetching orders for googleId:', googleId);
          const response = await fetch(`http://localhost:4000/api/orders/user/${googleId}`);
          console.log('Response status:', response.status);
          console.log('Response content-type:', response.headers.get('content-type'));

          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
          }

          const responseData = await response.json();
          console.log('Response data:', responseData);

          setOrders(responseData);
        } catch (error) {
          console.error('Error fetching orders:', error);
          setFetchError(error.message);
        }
      }
    };

    fetchOrders();
  }, [user]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/signin'); // Redirect to sign-in page after logging out
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Container className="my-4">
      <Row>
        <Col>
          <h1 className="text-center">Profile</h1>
        </Col>
      </Row>
      {user && (
        <>
          <Row className="mt-4">
            <Col>
              <Card>
                <Card.Header>User Information</Card.Header>
                <Card.Body>
                  <Card.Title>{user.displayName}</Card.Title>
                  <Card.Text>{user.email}</Card.Text>
                  <Button variant="outline-danger" size="sm" onClick={handleLogout}>
                    Log Out
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col>
              <Card>
                <Card.Header>Orders</Card.Header>
                {fetchError ? (
                  <div>Error fetching orders: {fetchError}</div>
                ) : (
                  <ListGroup variant="flush">
                    {orders.length > 0 ? (
                      orders.map((order) => (
                        <ListGroup.Item key={order._id}>
                          <Row>
                            <Col md={4}>Order ID: {order._id}</Col>
                            <Col md={4}>Date: {new Date(order.createdAt).toLocaleDateString()}</Col>
                            <Col md={2}>Total: ${(order.totalAmount / 100).toFixed(2)}</Col>
                            <Col md={2}>Status: {order.status}</Col>
                          </Row>
                        </ListGroup.Item>
                      ))
                    ) : (
                      <ListGroup.Item>No orders found.</ListGroup.Item>
                    )}
                  </ListGroup>
                )}
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default ProfilePage;
