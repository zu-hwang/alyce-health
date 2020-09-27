import * as redux from 'react-redux';
import { IRootState } from 'store/reducer';

export const useDispatch = redux.useDispatch;
export const useSelector: redux.TypedUseSelectorHook<IRootState> =
  redux.useSelector;
