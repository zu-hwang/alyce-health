import produce from 'immer';
import * as home from './home';

// LOAD_LS_BOOKMARK : 로컬스토리지 로그인 유저 북마크데이터 로드
// SET_EDIT_NEWS_ID : 수정모드 중 북마크 ID 등록
// ADD_BOOKMARK : 홈/검색결과 북마크 추가
// DEL_BOOKMARK : 홈/검색결과/마이북마크 북마크 제거
// RESET : bmk 스토어 초기화
export const LOAD_LS_BOOKMARK = 'bookmark/LOAD_LS_BOOKMARK';
export const SET_EDIT_NEWS_ID = 'bookmark/SET_EDIT_NEWS_ID';
export const ADD_BOOKMARK = 'bookmark/ADD_BOOKMARK';
export const DEL_BOOKMARK = 'bookmark/DEL_BOOKMARK';
export const UPDATE_BOOKMARK = 'bookmark/UPDATE_BOOKMARK';
export const RESET = 'bookmark/RESET';

/**
 * 로컬스토리지 로그인 유저 북마크데이터 로드
 * @param username 유저정보
 */
export const loadLSBookmark = (
  username: string
): { type: typeof LOAD_LS_BOOKMARK; payload: string } => ({
  type: LOAD_LS_BOOKMARK,
  payload: username,
});

/**
 * 수정모드 중 북마크 ID 등록
 * @param id : 북마크 ID
 */
export const setEditNewsId = (
  id: string
): {
  type: typeof SET_EDIT_NEWS_ID;
  payload: string;
} => ({
  type: SET_EDIT_NEWS_ID,
  payload: id,
});
interface AddBookmarkProp {
  news: home.IActicle;
  username: string;
}
/**
 * 북마크 추가
 * @param news : 뉴스 객체
 * @param username : 로그인 유저 ID
 */
export const addBookmark = (
  payload: AddBookmarkProp
): {
  type: typeof ADD_BOOKMARK;
  payload: AddBookmarkProp;
} => ({
  type: ADD_BOOKMARK,
  payload: payload,
});

interface DelBookmarkProp {
  id: string;
  username: string;
}
/**
 * 북마크 제거
 * @param id : 선택된 북마크 ID
 * @param username : 로그인 유저 ID
 */
export const delBookmark = (
  payload: DelBookmarkProp
): { type: typeof DEL_BOOKMARK; payload: DelBookmarkProp } => ({
  type: DEL_BOOKMARK,
  payload: payload,
});
interface UpdateBookmarkProp {
  username: string;
  id: string;
  title: string;
  description: string;
}
/**
 * 북마크 내용 수정
 * @param payload: title,description,usernames
 */
export const updateBookmark = (
  payload: UpdateBookmarkProp
): {
  type: typeof UPDATE_BOOKMARK;
  payload: UpdateBookmarkProp;
} => ({ type: UPDATE_BOOKMARK, payload });

/**
 * bmk 스토어 리셋
 */
export const reset = (): { type: typeof RESET } => ({
  type: RESET,
});
export type EditAction =
  | ReturnType<typeof reset>
  | ReturnType<typeof addBookmark>
  | ReturnType<typeof delBookmark>
  | ReturnType<typeof setEditNewsId>
  | ReturnType<typeof updateBookmark>
  | ReturnType<typeof loadLSBookmark>;

/**
 * bmk 스토어 타입
 * @param editNewsId: string;
 * @param bookmark: home.IActicle[] | [];
 */
export interface IBMK {
  editNewsId: string;
  bookmark: home.IActicle[] | [];
}
const initState: IBMK = {
  editNewsId: '',
  bookmark: [],
};
const bmk = (state: IBMK = initState, action: EditAction) => {
  return produce(state, (draft) => {
    const saveBookmarkLS = (user: string): void => {
      if (window) {
        const key = `bookmarkAUD${user}`;
        const value = JSON.stringify(draft.bookmark);
        localStorage.setItem(key, value);
      }
    };
    switch (action.type) {
      case LOAD_LS_BOOKMARK:
        const user = action.payload;
        const bookmarkJson = localStorage.getItem(`bookmarkAUD${user}`);
        const bookmark = bookmarkJson && JSON.parse(bookmarkJson);
        if (bookmark) draft.bookmark = bookmark;
        break;
      case SET_EDIT_NEWS_ID:
        draft.editNewsId = action.payload;
        break;
      case ADD_BOOKMARK:
        (draft.bookmark as home.IActicle[]).unshift(action.payload.news);
        saveBookmarkLS(action.payload.username);
        break;
      case DEL_BOOKMARK:
        const id = action.payload.id;
        draft.bookmark = draft.bookmark.filter((news, index) => news.id !== id);
        saveBookmarkLS(action.payload.username);
        break;
      case UPDATE_BOOKMARK:
        draft.bookmark = (draft.bookmark as home.IActicle[]).map(
          (news: home.IActicle) =>
            news.id === action.payload.id
              ? {
                  ...news,
                  description: action.payload.description,
                  title: action.payload.title,
                }
              : news
        );
        saveBookmarkLS(action.payload.username);
        break;
      case RESET:
        draft.editNewsId = initState.editNewsId;
        draft.bookmark = initState.bookmark;
        break;
    }
  });
};
export default bmk;
