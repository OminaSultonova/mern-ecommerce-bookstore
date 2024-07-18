import { ADD_LIKE, REMOVE_LIKE, FETCH_LIKES } from '../constants/likeConstants';
import { createSelector } from 'reselect';

const initialState = {
  likedItems: [],
};

const likeReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LIKES:
      return {
        ...state,
        likedItems: action.payload,
      };
    case ADD_LIKE:
      return {
        ...state,
        likedItems: [...state.likedItems, action.payload],
      };
    case REMOVE_LIKE:
      return {
        ...state,
        likedItems: state.likedItems.filter(item => item._id !== action.payload),
      };
    default:
      return state;
  }
};

export default likeReducer;

// Selectors
const selectLikeState = state => state.like || initialState; // Ensure we always have a valid state

export const selectLikedItems = createSelector(
  [selectLikeState],
  likeState => likeState.likedItems
);
