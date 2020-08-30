import {
  GET_USER_SESSION,
  GET_USER_SESSION_SUCCESS,
  GET_USER_SESSION_ERROR,
  SET_USER,
  REMOVE_USER,
} from '../actions/types';

export const initialState = {
  isLoading: false,
  isAuthenticated: false,
  userData: {},
  token: null,
  error: '',
};

export default function userReducer(state = initialState, action = {}) {
  switch (action.type) {
    case GET_USER_SESSION:
      return { ...state, isLoading: true };
    case SET_USER:
    case GET_USER_SESSION_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        userData: action.payload,
        token: action.response.token,
        isLoading: false,
        error: '',
      };
    case GET_USER_SESSION_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        userData: {},
        error: action.payload,
        isLoading: false,
      };
    case REMOVE_USER:
      return {
        ...state,
        isAuthenticated: false,
        userData: {},
        isLoading: false,
      };
    default:
      return state;
  }
}
