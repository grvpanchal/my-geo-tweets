import {
  GET_USER_SESSION,
  GET_USER_SESSION_SUCCESS,
  GET_USER_SESSION_ERROR,
  SET_USER,
  REMOVE_USER,
} from './types';

export const getUserSession = () => ({ type: GET_USER_SESSION });
export const getUserSessionSuccess = (payload) => {
  const response = { token: window.localStorage.getItem('authToken') };
  return { type: GET_USER_SESSION_SUCCESS, payload, response };
};
export const getUserSessionError = (payload) => {
  window.localStorage.removeItem('authToken');
  return { type: GET_USER_SESSION_ERROR, payload };
};
export const setUser = (payload, res) => {
  const response = { token: res.headers.get('x-auth-token') };
  window.localStorage.setItem('authToken', response.token);
  return { type: SET_USER, payload, response };
};
export const removeUser = () => {
  window.localStorage.removeItem('authToken');
  return { type: REMOVE_USER };
};

export default {};
