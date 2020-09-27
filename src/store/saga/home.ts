import * as API from 'util/api';
import * as home from 'store/reducer/home';
import { SagaIterator } from '@redux-saga/core';
import { all, call, put, fork, takeLatest } from 'redux-saga/effects';

/**
 * taskfunk
 */
function* requestNews(action: ReturnType<typeof home.requestNews>) {
  try {
    yield put(home.setLoading(true));
    if (action.payload.input) {
      yield put(home.setSearchInput(action.payload.input));
      yield put(home.setPage(action.payload.page || 1));
    }
    const result = yield call(API.news, action.payload);
    // console.log({ result });
    // console.log({ 아티클: result.data.articles });
    yield put(home.setTotalCount(result.data.totalResults));
    yield put(home.setNews(result.data.articles));
  } catch (error) {
    console.log(error);
  } finally {
    yield put(home.setLoading(false));
  }
}

/**
 * watcher
 */
function* watchRequestNews() {
  yield takeLatest(home.REQUEST_NEWS, requestNews);
}

export default function* homeSaga(): SagaIterator {
  yield all([fork(watchRequestNews)]);
}
