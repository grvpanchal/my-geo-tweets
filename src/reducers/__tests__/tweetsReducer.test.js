import tweetsReducer, { initialState } from '../tweetsReducer';
import {
  GET_TWEETS_SUCCESS,
  GET_TWEETS_ERROR,
} from '../../actions/types';

import MOCK_POST_LIST from '../../../mock.json';

describe('Tweets Reducer', () => {
  it('Should handle an initial state', () => {
    expect(tweetsReducer()).toEqual(initialState);
  });

  it('Should handle GET_TWEETS_SUCCESS', () => {
    expect(tweetsReducer(initialState, {
      type: GET_TWEETS_SUCCESS,
      payload: MOCK_POST_LIST.tweets,
    })).toEqual({
      statuses: MOCK_POST_LIST.tweets.statuses,
      isLoading: false,
      error: '',
    });
  });

  it('Should handle GET_TWEETS_ERROR', () => {
    expect(tweetsReducer(initialState, {
      type: GET_TWEETS_ERROR,
      payload: 'Not Found',
    })).toEqual({
      statuses: [],
      isLoading: false,
      error: 'Not Found',
    });
  });
});
