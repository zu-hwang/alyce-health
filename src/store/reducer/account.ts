import produce from 'immer';
import * as home from './home';
/**
 * 로그인
 * 로그아웃
 * 셋팅_유저정보
 * 셋팅_북마크
 */
export const LOGOUT = 'account/LOGOUT';
export const SET_USER = 'account/SET_USER';
export const SET_MY_BOOKMARKS = 'account/SET_MY_BOOKMARKS';
export const LOAD_LOCALSTORAGE = 'account/LOAD_LOCALSTORAGE';
export const ADD_BOOKMARK = 'account/ADD_BOOKMARK';
export const DEL_BOOKMARK = 'account/DEL_BOOKMARK';
/**
 * 로그인 : 패치안함으로 XX
 * 로그아웃
 */
export const logout = (): { type: typeof LOGOUT } => ({ type: LOGOUT });

/**
 * 유저정보 저장 & ㅋ
 */
export const setUser = (
  username: string
): { type: typeof SET_USER; payload: string } => ({
  type: SET_USER,
  payload: username,
});

export const loadLS = (): { type: typeof LOAD_LOCALSTORAGE } => ({
  type: LOAD_LOCALSTORAGE,
});
/**
 * 유저의 북마크 리스트 전체
 */
export type IBookmarkList = home.IActicle[];
export const setBookmarkList = (
  bookmarkList: IBookmarkList
): {
  type: typeof SET_MY_BOOKMARKS;
  payload: IBookmarkList;
} => ({
  type: SET_MY_BOOKMARKS,
  payload: bookmarkList,
});

/**
 * 북마크 추가 제거
 */
export const addBookmark = (
  news: home.IActicle
): { type: typeof ADD_BOOKMARK; payload: home.IActicle } => ({
  type: ADD_BOOKMARK,
  payload: news,
});
export const delBookmark = (
  id: string
): { type: typeof DEL_BOOKMARK; payload: string } => ({
  type: DEL_BOOKMARK,
  payload: id,
});

/**
 * 액션 타입 정의
 */
export type AccountAction =
  | ReturnType<typeof logout>
  | ReturnType<typeof loadLS>
  | ReturnType<typeof setUser>
  | ReturnType<typeof addBookmark>
  | ReturnType<typeof delBookmark>
  | ReturnType<typeof setBookmarkList>;
/**
 * 스토어 초기값 설정 + 타입 정의
 */

export interface IAccount {
  username: string | null;
  bookmark: home.IActicle[] | [];
}
const initState: IAccount = {
  username: null,
  bookmark: [],
};
/** 리듀서 작성 */

const account = (state: IAccount = initState, action: AccountAction) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case LOAD_LOCALSTORAGE:
        const username = localStorage.getItem('AUD');
        const bookmarkOrigin = localStorage.getItem(
          `bookmarkAUD${draft.username}`
        );
        const bookmark = bookmarkOrigin && JSON.parse(bookmarkOrigin);
        if (username) draft.username = username;
        if (bookmark && bookmark.length > 0) draft.bookmark = bookmark;
        break;
      case LOGOUT:
        draft.username = initState.username;
        draft.bookmark = initState.bookmark;
        if (window) localStorage.removeItem('AUD');
        break;
      case SET_USER:
        draft.username = action.payload;
        if (window && action.payload) {
          localStorage.setItem('AUD', action.payload);
        }
        break;
      case ADD_BOOKMARK:
        // 최 상위에 목록 추가
        (draft.bookmark as home.IActicle[]).unshift(action.payload);
        // 로컬스토리지 저장
        if (window)
          localStorage.setItem(
            `bookmarkAUD${draft.username}`,
            JSON.stringify(draft.bookmark)
          );
        break;
      case DEL_BOOKMARK:
        const id = action.payload;
        draft.bookmark = draft.bookmark.filter((news, index) => news.id !== id);
        if (window)
          localStorage.setItem(
            `bookmarkAUD${draft.username}`,
            JSON.stringify(draft.bookmark)
          );
        break;
    }
  });
};
export default account;
