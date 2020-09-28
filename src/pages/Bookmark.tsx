import * as React from 'react';
import * as home from 'store/reducer/home';
import styled from 'styled-components';
import Layout from 'layout/Layout';
import NewsCard from 'components/ui/NewsCard';
import { /* useDispatch ,*/ useSelector } from 'hooks/customRedux';

const BookMark = () => {
  const username = useSelector((s) => s.account.username);
  const bookmark = useSelector((s) => s.bmk.bookmark);
  const isBookmark = React.useMemo(() => {
    return bookmark.length > 0;
  }, [bookmark]);
  return (
    <Layout>
      <CenterBox>
        {isBookmark &&
          (bookmark as home.IActicle[]).map((news) => (
            <NewsWrapper key={news.id}>
              <NewsCard mode={'edit'} news={news} />
            </NewsWrapper>
          ))}
        {!username && isBookmark && <Text>로그인 후 이용할 수 있습니다.</Text>}
        {username && !isBookmark && <Text>검색한 뉴스를 북마크 하세요!</Text>}
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
  width: 100%;
  margin-bottom: 20px;
`;

const Text = styled.span`
  font-weight: bold;
  text-align: center;
  padding-bottom: 20px;
  margin-top: 100px;
  font-size: 16px;
`;
export default BookMark;
