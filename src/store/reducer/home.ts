import produce from 'immer';
import { v4 as uuidv4 } from 'uuid';

export const REQUEST_NEWS = 'home/REQUEST_NEWS';
export const REQUEST_TOP_HEADLINE = 'home/REQUEST_TOP_HEADLINE';
export const RESET = 'home/RESET';
export const SET_SEARCH_INPUT = 'home/SET_SEARCH_INPUT';
export const SET_LOADING = 'home/SET_LOADING';
export const SET_NEWS = 'home/SET_NEWS';
export const SET_PAGE = 'home/SET_PAGE';
export const SET_TOTAL_COUNT = 'home/SET_TOTAL_COUNT';

type TRequestNews = {
  input?: string;
  page: number;
};
export const requestNews = (data: TRequestNews) => {
  return {
    type: REQUEST_NEWS,
    payload: { input: data?.input, page: data.page },
  };
};
/**
 * 리퀘스트 결과저장
 * @param resultList : 서버 응답 데이터 리스트
 */
export const setNews = (
  resultList: IActicle[] | []
): {
  type: typeof SET_NEWS;
  payload: IActicle[] | [];
} => ({ type: SET_NEWS, payload: resultList });

/**
 * 리퀘스트 결과 총 갯수 저장
 * @param num : 총갯수
 */
export const setTotalCount = (
  num: number
): {
  type: typeof SET_TOTAL_COUNT;
  payload: number;
} => ({ type: SET_TOTAL_COUNT, payload: num });

export const setSearchInput = (
  input: string
): {
  type: typeof SET_SEARCH_INPUT;
  payload: string;
} => ({ type: SET_SEARCH_INPUT, payload: input });

/**
/**
 * 리퀘스트 로딩중
 * @param bool
 */
export const setLoading = (
  bool: boolean
): {
  type: typeof SET_LOADING;
  payload: boolean;
} => ({ type: SET_LOADING, payload: bool });

export const setPage = (
  page: number
): { type: typeof SET_PAGE; payload: number } => ({
  type: SET_PAGE,
  payload: page,
});
export const reset = (): { type: typeof RESET; payload: null } => ({
  type: RESET,
  payload: null,
});

/**
 * 액션 타입 정의 : 액션크리에이터 리턴 타입 담기
 */
export type HeaderAction =
  | ReturnType<typeof requestNews>
  | ReturnType<typeof setLoading>
  | ReturnType<typeof setTotalCount>
  | ReturnType<typeof setSearchInput>
  | ReturnType<typeof setPage>
  | ReturnType<typeof setNews>
  | ReturnType<typeof reset>;

/**
 * 스토어 초기값 설정 + 타입 정의
 */
export interface IActicle {
  id: string;
  source: {
    id: string | null;
    name: string;
  };
  title: string;
  urlToImage: string;
  content: string | null;
  description: string;
  author: string | null;
  url: string;
  publishedAt: string;
  bookmark?: boolean;
}
export interface IHome {
  newsList: IActicle[] | [];
  loading: boolean;
  totalCount: number;
  page: number;
  searchInput: string;
}
const initState: IHome = {
  newsList: [],
  loading: false,
  totalCount: 0,
  page: 1,
  searchInput: '',
};

/** 리듀서 작성 */
const home = (state = initState, action: HeaderAction): IHome => {
  return produce(state, (draft) => {
    switch (action.type) {
      case SET_NEWS:
        const resultList = (action.payload as IActicle[]).map((news) => {
          return { ...news, id: uuidv4() };
        });
        if (draft.page === 1) {
          draft.newsList = resultList as IActicle[];
        } else {
          draft.newsList = (draft.newsList as any).concat(resultList);
        }
        draft.page += 1;
        break;
      case SET_SEARCH_INPUT:
        draft.searchInput = action.payload as string;
        draft.page = initState.page;
        break;
      case SET_PAGE:
        draft.page = action.payload as number;
        break;
      case SET_LOADING:
        draft.loading = action.payload as boolean;
        break;
      case SET_TOTAL_COUNT:
        draft.totalCount = action.payload as number;
        break;
      case RESET:
        draft.newsList = initState.newsList;
        draft.loading = initState.loading;
        draft.totalCount = initState.totalCount;
        draft.page = initState.page;
        draft.searchInput = initState.searchInput;
        break;
    }
  });
};
export default home;
