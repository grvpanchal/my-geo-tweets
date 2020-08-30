import {
  SET_LOADING,
  GET_TWEETS,
  GET_TWEETS_SUCCESS,
  GET_TWEETS_ERROR,
} from './types';

export const setLoading = () => ({ type: SET_LOADING });
export const getTweets = () => ({ type: GET_TWEETS });
export const getTweetsSuccess = (payload) => ({ type: GET_TWEETS_SUCCESS, payload });
export const getTweetsError = (payload) => ({ type: GET_TWEETS_ERROR, payload });
