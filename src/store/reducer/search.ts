import produce from 'immer';
// import * as account from './account';
/**
 * 검색 -> 사가 페치
 * 셋팅_검색결과 -> 검색 사가패치후 결과 저장
 */
export const REQUEST_SEARCH = 'search/REQUEST_SEARCH';
export const SET_SEARCH_RESULT = 'search/SET_SEARCH_RESULT';

/**
 * 리퀘스트 -> 검색
 * @param input : 검색창 인풋 값
 */
export const requestSearch = (
  input: string
): {
  type: typeof REQUEST_SEARCH;
  payload: string;
} => ({ type: REQUEST_SEARCH, payload: input });
/**
 * 리퀘스트
 * @param resultList : 서버 응답 데이터 리스트
 */
export const setSearchResult = (
  resultList: IActicle[] | null
): {
  type: typeof SET_SEARCH_RESULT;
  payload: IActicle[] | null;
} => ({ type: SET_SEARCH_RESULT, payload: resultList });

/**
 * 액션 타입 정의 : 액션크리에이터 리턴 타입 담기
 */
export type Action = ReturnType<typeof setSearchResult>;

/**
 * 스토어 초기값 설정 + 타입 정의
 */
export interface IActicle {
  title: string;
  article: string;
  author: string;
  origin: string;
  createdAt: string;
}
export interface ISearch {
  searchResult: IActicle[] | null;
}
const initState: ISearch = {
  searchResult: null,
};

/** 리듀서 작성 */
const search = (state = initState, action: Action) => {
  return produce(state, (draft) => {
    switch (action.type) {
      case SET_SEARCH_RESULT:
        break;
    }
  });
};
export default search;
