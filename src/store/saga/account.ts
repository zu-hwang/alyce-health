// import * as API from 'util/api';
import * as bmk from 'store/reducer/bmk';
import * as home from 'store/reducer/home';
import * as account from 'store/reducer/account';
import { SagaIterator } from '@redux-saga/core';
import { all, fork, put, /* call, */ takeLatest } from 'redux-saga/effects';

function* logout() {
  // 리셋 스토어
  yield put(bmk.reset());
  yield put(account.reset());
  yield put(home.reset());
}
/**
 * watcher
 */
function* watchRequestLogout() {
  yield takeLatest(account.LOGOUT, logout);
}

export default function* accountSaga(): SagaIterator {
  yield all([fork(watchRequestLogout)]);
}
