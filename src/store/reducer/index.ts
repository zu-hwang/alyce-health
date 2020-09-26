import { combineReducers } from 'redux';

import * as account from './account';
import * as search from './search';

export interface IRootState {
  account: account.IAccount;
  search: search.ISearch;
}
const rootReducer = combineReducers({
  account: account.default,
  search: search.default,
});

export default rootReducer;
