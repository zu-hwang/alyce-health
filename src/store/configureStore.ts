import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, compose, applyMiddleware } from 'redux';
import rootReducer from './reducer';
import rootSaga from './saga';

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware(); // 사가미들웨어 생성
  const middlewares = [sagaMiddleware]; // 미들웨어 배열에 담기
  const enhancers =
    process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...middlewares)) // 실서비스 데브툴 제거
      : composeWithDevTools(applyMiddleware(...middlewares)); // 개발모드 데브툴 적용
  const store = createStore(rootReducer, enhancers); // 스토어 생성
  sagaMiddleware.run(rootSaga); // 사가 시작
  return store;
};

export default configureStore;
