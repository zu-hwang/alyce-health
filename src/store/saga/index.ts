import { all, fork } from 'redux-saga/effects';
import accountSaga from './account';
import searchSaga from './search';

export default function* rootSaga() {
  yield all([fork(accountSaga), fork(searchSaga)]);
}
