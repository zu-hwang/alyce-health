import { SagaIterator } from '@redux-saga/core';
import { all /* fork */ } from 'redux-saga/effects';

export default function* accountSaga(): SagaIterator {
  yield all([
    // fork(watchRequestLogin)
  ]);
}
