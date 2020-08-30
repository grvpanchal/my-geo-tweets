import { all } from 'redux-saga/effects';
import { watchGetTweets, watchSearchForm } from './getTweets';
import { watchGetUserSession } from './getUserSession';

export default function* rootSaga() {
  yield all([
    watchGetTweets(),
    watchSearchForm(),
    watchGetUserSession(),
  ]);
}
