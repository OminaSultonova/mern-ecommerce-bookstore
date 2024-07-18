import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';
import { getBookById } from '../../api/book';
import { addToCart } from '../../actions/cartActions';
import { addLike, removeLike } from '../../actions/likeActions';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebaseConfig';
import './Product.css';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [likedItems, setLikedItems] = useState([]);
  const [user] = useAuthState(auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const book = await getBookById(id);
        setProduct(book);
      } catch (error) {
        console.error('Failed to fetch product:', error);
      }
    };

    fetchProduct();

    const fetchLikedItems = async () => {
      if (user) {
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
      }
    };

    fetchLikedItems();
  }, [id, user]);

  const handleAddToCart = () => {
    const item = {
      id: product._id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    };
    dispatch(addToCart(item));
  };

  const handleLike = () => {
    if (!user) {
      navigate('/signin');
      return;
    }
    const googleId = user.uid;
    const isLiked = likedItems.some(like => like._id === product._id);
    if (isLiked) {
      dispatch(removeLike(googleId, product._id));
    } else {
      dispatch(addLike(googleId, product._id));
    }
  };

  if (!product) {
    return <div className="my-4">Loading...</div>;
  }

  const isLiked = likedItems.some(like => like._id === product._id);

  const formattedPrice = new Intl.NumberFormat('en-SG', {
    style: 'currency',
    currency: 'SGD',
  }).format(product.price);

  return (
    <Container className="my-4">
      <Row>
        <Col md={6} className="text-center">
          <img
            src={product.image}
            alt={product.title}
            className="img-fluid"
            style={{ maxHeight: '400px' }}
          />
        </Col>
        <Col md={6} className="px-4 flex-column justify-content-between">
          <div>
            <h2 className="my-3">{product.title}</h2>
            <p>{product.description}</p>
            <div className="d-flex align-items-center">
              <p className="fw-bold mb-0 me-2" style={{ marginBottom: '10px', fontSize: '22px' }}>
              Price: {formattedPrice}
              </p>
              <FaHeart
                size={24}
                color={isLiked ? '#b30000' : 'gray'}
                style={{ cursor: 'pointer', marginLeft: '10px' }}
                onClick={handleLike}
              />
            </div>
          </div>
          <div className="d-grid gap-2 mt-4">
            <Button
              variant="danger"
              size="md"
              className="mt-auto custom-button"
              onClick={handleAddToCart}
            >
              Add to Cart
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Product;
