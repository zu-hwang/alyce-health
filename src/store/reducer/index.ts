import { combineReducers } from 'redux';

import * as account from './account';
import * as home from './home';

export interface IRootState {
  account: account.IAccount;
  home: home.IHome;
}
const rootReducer = combineReducers({
  account: account.default,
  home: home.default,
});

export default rootReducer;
