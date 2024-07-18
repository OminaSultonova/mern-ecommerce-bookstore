import PropTypes from 'prop-types';
import { Card, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart } from '../../actions/cartActions';
import './Productcart.css';

const defaultBookImage = '/images/default-book.jpg';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const item = {
      id: product._id,
      title: product.title,
      price: product.price,
      image: product.image || defaultBookImage,
      quantity: 1,
    };
    dispatch(addToCart(item));
  };

  const formattedPrice = new Intl.NumberFormat('en-SG', {
    style: 'currency',
    currency: 'SGD',
  }).format(product.price);

  return (
    <Card className="border-0">
      <Link to={`/product/${product._id}`}>
        <Card.Img
          variant="top"
          src={product.image || defaultBookImage}
          style={{ objectFit: 'cover', height: '300px', cursor: 'pointer' }}
        />
      </Link>
      <Card.Body className="d-flex flex-column justify-content-center">
        <Card.Title style={{ fontSize: '1rem', fontWeight: 'regular', marginBottom: '10px' }}>
          {product.title}
        </Card.Title>
        <Card.Text style={{ marginBottom: '5px', fontSize: '15px' }}>
          {formattedPrice}
        </Card.Text>
        <Button
          variant="outline-dark"
          size="sm"
          className="mt-auto custom-button"
          onClick={handleAddToCart}
          style={{ transition: 'background-color 0.3s ease, color 0.3s ease' }}
        >
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    image: PropTypes.string,
  }).isRequired,
};

export default ProductCard;
