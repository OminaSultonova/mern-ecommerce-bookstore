import { USER_LOGIN, USER_LOGOUT } from '../constants/authConstants';

export const loginUser = (user) => ({
  type: USER_LOGIN,
  payload: user,
});

export const logoutUser = () => ({
  type: USER_LOGOUT,
});
