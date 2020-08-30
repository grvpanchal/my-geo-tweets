import { put, takeLatest, call } from 'redux-saga/effects';
import {
  GET_USER_SESSION,
} from '../actions/types';
import { fetchUserSession } from '../api';
import { getUserSessionSuccess, getUserSessionError } from '../actions/userAction';

export function* getUserSession() {
  try {
    const userData = yield call(fetchUserSession);
    yield put(getUserSessionSuccess(userData));
  } catch (error) {
    yield put(getUserSessionError(error.toString()));
  }
}

export function* watchGetUserSession() {
  yield takeLatest(GET_USER_SESSION, getUserSession);
}
