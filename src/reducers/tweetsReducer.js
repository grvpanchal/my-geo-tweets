import {
  GET_TWEETS,
  GET_TWEETS_SUCCESS,
  GET_TWEETS_ERROR,
  SET_LOADING,
} from '../actions/types';

export const initialState = {
  isLoading: false,
  statuses: [],
  error: '',
};

export default function tweetsReducer(state = initialState, action = {}) {
  switch (action.type) {
    case SET_LOADING:
    case GET_TWEETS:
      return { ...state, isLoading: true };
    case GET_TWEETS_SUCCESS:
      return {
        ...state,
        statuses: action.payload.statuses,
        isLoading: false,
        error: '',
      };
    case GET_TWEETS_ERROR:
      return { ...state, error: action.payload, isLoading: false };
    default:
      return state;
  }
}
