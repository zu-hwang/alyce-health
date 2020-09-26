import { SagaIterator } from '@redux-saga/core';
import { all /* fork */ } from 'redux-saga/effects';

export default function* searchSaga(): SagaIterator {
  yield all([
    // fork(watchRequestLogin)
  ]);
}
