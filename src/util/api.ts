import * as axios from 'axios';
// import * as account from 'store/reducer/account';

const API_KEY = '0314630b1d64516bc522a83c6c5b6c0';
const ALL = 'everything';
const TOP = 'top-headlines';
const newsApi = axios.default.create({
  baseURL: 'https://newsapi.org/v2',
  responseType: 'json',
});

export const news = async (payload: {
  input?: string;
  page?: number;
}): Promise<axios.AxiosResponse> => {
  const { input, page } = payload;
  if (input) {
    return page
      ? await newsApi.get(
          `/${ALL}?apiKey=f${API_KEY}&q=${input}&pageSize=10&page=${page}`
        )
      : await newsApi.get(`/${ALL}?apiKey=f${API_KEY}&q=${input}&pageSize=10`);
  } else {
    return page
      ? await newsApi.get(
          `/${TOP}?country=kr&apiKey=f${API_KEY}&pageSize=10&page=${page}`
        )
      : await newsApi.get(`/${TOP}?country=kr&apiKey=f${API_KEY}&pageSize=10`);
  }
};
