import { combineReducers } from 'redux';

import * as account from './account';
import * as home from './home';
import * as bmk from './bmk';

export interface IRootState {
  account: account.IAccount;
  home: home.IHome;
  bmk: bmk.IBMK;
}
const rootReducer = combineReducers({
  account: account.default,
  home: home.default,
  bmk: bmk.default,
});

export default rootReducer;
