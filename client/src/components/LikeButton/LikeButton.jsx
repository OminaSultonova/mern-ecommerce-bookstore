import PropTypes from 'prop-types';  // Import PropTypes
import { FaHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { likeItem, unlikeItem } from '../../actions/likeActions';

const LikeButton = ({ productId }) => {
  const dispatch = useDispatch();
  const likedItems = useSelector((state) => state.likes.items);  // Get liked items from Redux state

  const handleLike = () => {
    if (likedItems.some((item) => item._id === productId)) {
      dispatch(unlikeItem(productId));  // Call action to unlike the item
    } else {
      dispatch(likeItem(productId));  // Call action to like the item
    }
  };

  const isLiked = likedItems.some((item) => item._id === productId);  // Check if the item is already liked

  return (
    <FaHeart
      size={24}
      color={isLiked ? '#b30000' : 'gray'}
      className="like-button"
      onClick={handleLike}
    />
  );
};

// Add PropTypes validation
LikeButton.propTypes = {
  productId: PropTypes.string.isRequired,  // Ensure that productId is passed as a props
};

export default LikeButton;
