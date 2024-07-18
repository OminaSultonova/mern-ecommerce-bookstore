import { ADD_LIKE, REMOVE_LIKE, FETCH_LIKES } from '../constants/likeConstants';

export const fetchLikes = (googleId) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:4000/api/likes/${googleId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch liked items');
    }
    const likes = await response.json();
    dispatch({ type: FETCH_LIKES, payload: likes });
  } catch (error) {
    console.error('Failed to fetch likes:', error);
  }
};

export const addLike = (googleId, bookId) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:4000/api/likes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: googleId, bookId }),
    });
    if (!response.ok) {
      throw new Error('Failed to add liked item');
    }
    const newLike = await response.json();
    dispatch({ type: ADD_LIKE, payload: newLike });
  } catch (error) {
    console.error('Failed to add like:', error);
  }
};

export const removeLike = (googleId, bookId) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:4000/api/likes/${googleId}/${bookId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to remove liked item');
    }
    dispatch({ type: REMOVE_LIKE, payload: bookId });
  } catch (error) {
    console.error('Failed to remove like:', error);
  }
};
