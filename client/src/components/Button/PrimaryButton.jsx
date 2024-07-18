import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

const PrimaryButton = ({ onClick }) => {
  const addToCart = () => {
    // Implement your add to cart logic here
    onClick(); // Call the onClick function passed as prop
  };

  return (
    <Button
      variant="outline-danger"
      size="sm"
      className="danger"
      onMouseOver={(e) => (e.target.style.backgroundColor = '#dc3545')}
      onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
      onClick={addToCart}
    >
      Add to Cart
    </Button>
  );
};

PrimaryButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default PrimaryButton;
