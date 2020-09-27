// import * as API from 'util/api';
// import * as account from 'store/reducer/account';
import { SagaIterator } from '@redux-saga/core';
import { all /* , put, fork, call, takeLatest */ } from 'redux-saga/effects';

export default function* accountSaga(): SagaIterator {
  yield all([
    /* fork(watchRequestLogin) */
  ]);
}
