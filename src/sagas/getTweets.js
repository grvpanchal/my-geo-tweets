import { put, takeLatest, call } from 'redux-saga/effects';
import {
  GET_TWEETS,
  UPDATE_SEARCH_FORM,
} from '../actions/types';
import { fetchTweetsApi } from '../api';
import { getTweetsSuccess, getTweetsError } from '../actions/tweetsAction';

export function* getTweets({ payload }) {
  try {
    const postData = yield call(fetchTweetsApi, payload);
    yield put(getTweetsSuccess(postData));
  } catch (error) {
    yield put(getTweetsError(error.toString()));
  }
}

export function* watchGetTweets() {
  yield takeLatest(GET_TWEETS, getTweets);
}

export function* watchSearchForm() {
  yield takeLatest(UPDATE_SEARCH_FORM, getTweets);
}
