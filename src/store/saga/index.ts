import { all, fork } from 'redux-saga/effects';
import accountSaga from './account';
import homeSaga from './home';

export default function* rootSaga() {
  yield all([fork(accountSaga), fork(homeSaga)]);
}
