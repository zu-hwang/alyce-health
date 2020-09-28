import produce from 'immer';

// LOGIN: 패치안함으로 XX
// LOGOUT : 사가 액션 => 전체 스토어 리셋
// RESET : 리셋 : account 스토어 리셋
// LOAD_LS_USER : 로컬스토리지 데이터 로드
// SET_USER : 로그인 후 유저정보 업데이트

export const LOGOUT = 'account/LOGOUT';
export const RESET = 'account/RESET';
export const SET_USER = 'account/SET_USER';
export const LOAD_LS_USER = 'account/LOAD_LS_USER';

/**
 * 로그아웃 사가액션 : 전체 스토어 리셋 및 로컬스토리지 유저정보 제거
 */
export const logout = (): { type: typeof LOGOUT } => ({ type: LOGOUT });
/**
 * account스토어 리셋
 */
export const reset = (): { type: typeof RESET } => ({ type: RESET });
/**
 * 로컬스토리지 유저정보 로드
 */
export const loadLSUser = (): { type: typeof LOAD_LS_USER } => {
  return {
    type: LOAD_LS_USER,
  };
};
/**
 * 로그인 후 유저정보 업데이트
 * @param username : 로그인 유저ID
 */
export const setUser = (
  username: string
): { type: typeof SET_USER; payload: string } => {
  return {
    type: SET_USER,
    payload: username,
  };
};

export type AccountAction =
  | ReturnType<typeof reset>
  | ReturnType<typeof loadLSUser>
  | ReturnType<typeof setUser>;
/**
 * account 스토어 타입
 * @param username: string;
 */
export interface IAccount {
  username: string;
}
const initState: IAccount = {
  username: '',
};
const account = (state: IAccount = initState, action: AccountAction) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_LS_USER:
        const username = localStorage.getItem('AUD');
        draft.username = username || '';
        break;
      case RESET:
        draft.username = initState.username;
        if (window) localStorage.removeItem('AUD');
        break;
      case SET_USER:
        draft.username = action.payload;
        if (window && action.payload)
          localStorage.setItem('AUD', action.payload);
        break;
    }
  });
};
export default account;
