import * as React from 'react';
import * as home from 'store/reducer/home';
// import * as account from 'store/reducer/account';
import styled from 'styled-components';
import Layout from 'layout/Layout';
import NewsCard from 'components/ui/NewsCard';
import { keyframes } from 'styled-components';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'hooks/customRedux';

const Home = () => {
  const dispatch = useDispatch();
  const loading = useSelector((s) => s.home.loading);
  const totalCount = useSelector((s) => s.home.totalCount);
  const searchInput = useSelector((s) => s.home.searchInput);
  const page = useSelector((s) => s.home.page);
  const newsList = useSelector((s) => s.home.newsList);
  React.useEffect(() => {
    if (newsList.length === 0) dispatch(home.requestNews({ page })); // 첫 로딩일때
    const onScrollDown = () => {
      if (newsList.length > 0 && newsList.length < totalCount) {
        if (
          window.scrollY + document.documentElement.clientHeight >
          document.documentElement.scrollHeight - 100
        ) {
          searchInput
            ? dispatch(home.requestNews({ input: searchInput, page }))
            : dispatch(home.requestNews({ page }));
        }
      }
    };
    window && window.addEventListener('scroll', onScrollDown);
    return () => {
      window && window.removeEventListener('scroll', onScrollDown);
    };
    // eslint-disable-next-line
  }, [newsList]);
  return (
    <Layout>
      <CenterBox>
        {newsList.length > 0 &&
          (newsList as home.IActicle[]).map((news: home.IActicle) => (
            <NewsWrapper key={news.id}>
              <NewsCard news={news} />
            </NewsWrapper>
          ))}
        {loading && (
          <IconWrapper>
            <RotateBox>
              <Icon icon={faSpinner} size={'lg'} />
            </RotateBox>
          </IconWrapper>
        )}
      </CenterBox>
    </Layout>
  );
};

const CenterBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;
const NewsWrapper = styled.div`
  margin-bottom: 20px;
`;
const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const IconWrapper = styled.div`
  margin: 20px 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const RotateBox = styled.div`
  animation: ${rotate} 1s linear infinite;
`;
export default Home;
