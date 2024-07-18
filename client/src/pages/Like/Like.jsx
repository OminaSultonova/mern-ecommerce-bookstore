import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebaseConfig';

const LikePage = () => {
  const [user, loading, error] = useAuthState(auth);
  const [likedItems, setLikedItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/signin');
    } else if (user) {
      const fetchLikedItems = async () => {
        try {
          const googleId = user.uid; // Use the correct Google ID
          console.log('Fetching liked items for googleId:', googleId);
          const response = await fetch(`http://localhost:4000/api/likes/${googleId}`);
          console.log('Response status:', response.status);
          console.log('Response content-type:', response.headers.get('content-type'));

          if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
          }

          const responseData = await response.json();
          console.log('Liked items response data:', responseData);

          setLikedItems(responseData);
        } catch (error) {
          console.error('Error fetching liked items:', error);
        }
      };

      fetchLikedItems();
    }
  }, [user, loading, navigate]);

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
        <h1 className="text-center">Liked Items</h1>
      </Col>
    </Row>
    <Row className="mt-4">
      <Col>
        <Card>
          <Card.Header>Liked Items</Card.Header>
          <ListGroup variant="flush">
            {likedItems.length > 0 ? (
              likedItems.map((book) => (
                <ListGroup.Item key={book._id}>
                  <Row className="align-items-center">
                    <Col xs={4} md={2}>
                      <img
                        src={book.image}
                        alt={book.title}
                        className="img-fluid"
                        style={{ maxHeight: '100px' }}
                      />
                    </Col>
                    <Col xs={8} md={10}>
                      <Link className='text-danger' to={`/product/${book._id}`}>{book.title}</Link>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))
            ) : (
              <ListGroup.Item>No liked items found.</ListGroup.Item>
            )}
          </ListGroup>
        </Card>
      </Col>
    </Row>
  </Container>
);
};
  


export default LikePage;
