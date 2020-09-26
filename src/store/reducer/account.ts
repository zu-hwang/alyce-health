import produce from 'immer';
import * as search from './search';
/**
 * 로그인
 * 로그아웃
 * 셋팅_유저정보
 * 셋팅_북마크
 */
export const LOGIN = 'account/LOGIN';
export const LOGOUT = 'account/LOGOUT';
export const SET_USER = 'account/SET_USER';
export const SET_MY_BOOKMARKS = 'account/SET_MY_BOOKMARKS';

/**
 * 로그인
 */
export interface IUserData {
  id: string;
  password: string;
}
export const login = (
  userData: IUserData
): {
  type: typeof LOGIN;
  payload: IUserData;
} => ({ type: LOGIN, payload: userData });

/**
 * 로그아웃
 */
export const logout = (): { type: typeof LOGOUT } => ({ type: LOGOUT });

/**
 * 셋팅 유저정보
 */
export interface ILoginData {
  username: string;
}
export const setUser = (loginData: ILoginData) => ({
  type: SET_USER,
  payload: loginData,
});
/**
 * 유저의 북마크 리스트 전체
 */
export type IBookmarkList = search.IActicle[];
export const setBookmarkList = (bookmarkList: IBookmarkList) => ({
  type: SET_MY_BOOKMARKS,
  payload: bookmarkList,
});

/**
 * 액션 타입 정의
 */
export type Action =
  | ReturnType<typeof login>
  | ReturnType<typeof logout>
  | ReturnType<typeof setUser>
  | ReturnType<typeof setBookmarkList>;
/**
 * 스토어 초기값 설정 + 타입 정의
 */

export interface IAccount {
  username: string | null;
  bookmark: search.IActicle[] | null;
}
const initState: IAccount = {
  username: null,
  bookmark: null,
};
/** 리듀서 작성 */

const account = (state: IAccount = initState, action: Action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOGIN:
        break;
      case LOGOUT:
        break;
      case SET_USER:
        break;
      case SET_MY_BOOKMARKS:
        break;
    }
  });
};
export default account;
