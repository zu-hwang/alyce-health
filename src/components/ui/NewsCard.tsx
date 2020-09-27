import * as React from 'react';
import * as home from 'store/reducer/home';
import * as account from 'store/reducer/account';
import * as css from 'styles/theme';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'hooks/customRedux';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faBookmark as BookmarkActive } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as Bookmark } from '@fortawesome/free-regular-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import defaultImg from 'images/default.png';

interface INewsCard {
  news: home.IActicle;
  mode?: 'edit' | undefined;
}
const NewsCard: React.FC<INewsCard> = ({ news, mode }) => {
  const dispatch = useDispatch();
  const [isBookmark, setIsBookmark] = React.useState(false);
  const username = useSelector((s) => s.account.username);
  const bookmark = useSelector((s) => s.account.bookmark);
  const openNewTab = () => {
    window.open(news.url, '_blank');
  };
  const onClicBookmark = () => {
    if (username && !isBookmark) {
      // console.log('클릭', news);
      dispatch(account.addBookmark(news));
    } else {
      dispatch(account.delBookmark(news.id));
      setIsBookmark(false);
    }
  };
  const onClickEdit = (e: React.MouseEvent) => {
    const id = (e.currentTarget as HTMLElement).dataset.ids;
    console.log(id);
  };
  React.useEffect(() => {
    bookmark.forEach((bk) => {
      if (bk.id === news.id) setIsBookmark(true);
    });
  }, [bookmark, news]);
  return (
    <Container>
      <div>
        <ImageBox url={news.urlToImage} />
      </div>
      <div>
        <FirstLine>
          <Title onClick={openNewTab}>{news.title}</Title>
          <SubItem>
            <PublishedAt>{news.publishedAt.slice(0, 10)}</PublishedAt>
            {mode === 'edit' && (
              <IconWrapper size={16} data-ids={news.id} onClick={onClickEdit}>
                <Icon data-ids={news.id} icon={faPen}></Icon>
              </IconWrapper>
            )}
            {username && (
              <IconWrapper onClick={onClicBookmark}>
                {isBookmark ? (
                  <Icon icon={BookmarkActive} size={'lg'}></Icon>
                ) : (
                  <Icon icon={Bookmark} size={'lg'}></Icon>
                )}
              </IconWrapper>
            )}
          </SubItem>
        </FirstLine>
        <Acticle>{news.description}</Acticle>
        <Origin>
          {news.author && <Author>{news.author}</Author>}
          <Source>출처 : {news.source.name}</Source>
          <Wrapper>
            <OriginUrl>{news.url}</OriginUrl>
          </Wrapper>
        </Origin>
      </div>
    </Container>
  );
};
const Container = styled.div`
  border: 1px solid ${({ theme }) => theme.primaryText};
  border-radius: 2px;
  width: 100%;
  display: flex;
  & > div:first-child {
  }
  & > div:last-child {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const ImageBox = styled.div<{ url: string }>`
  background: url(${({ url }) => (url ? url : defaultImg)}) no-repeat center;
  border-right: 1px solid ${({ theme }) => theme.primaryText};
  background-size: cover;
  /* background-color: tomato; */
  width: ${({ theme }) => theme.unit.col * 5 + 'px'};
  height: 100%;
`;
const FirstLine = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  margin: 15px 0 10px;
  width: 100%;
  flex-grow: 2;
`;
const SubItem = styled.div`
  min-width: 130px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const Title = styled.p`
  font-size: 16px;
  font-weight: bold;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  /* flex-grow: 1; */
  border-bottom: 1px solid transparent;
  &:hover {
    cursor: pointer;
    /* color: ${({ theme }) => theme.mainBackground}; */
    border-bottom: 1px solid ${({ theme }) => theme.primaryText};
    transition: 0.2s ease-in-out all;
  }
`;
const Acticle = styled.p`
  width: 100%;
  padding: 0 10px;
  flex-grow: 1;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-height: 1.5em;
`;
const Origin = styled.div`
  margin-top: 10px;
  border-top: 1px solid ${({ theme }) => theme.primaryText};
  display: flex;
`;
const Author = styled.span`
  border-right: 1px solid ${({ theme }) => theme.primaryText};
  padding: 7px 10px;
  display: inline-block;
  font-size: 10px;
  font-weight: 500;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const Source = styled.span`
  border-right: 1px solid ${({ theme }) => theme.primaryText};
  padding: 7px 10px;
  display: inline-block;
  font-size: 10px;
  font-weight: 500;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const OriginUrl = styled.p`
  padding: 7px 10px;
  font-size: 10px;
  letter-spacing: 0.5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
const Wrapper = styled.div`
  width: 70%;
`;
const PublishedAt = styled.span`
  font-weight: normal;
  font-size: 12px;
  margin-right: 10px;
`;
const IconWrapper = styled.div<{ size?: number }>`
  ${({ size }) => size && `font-size: ${size}px`};
  width: 20px;
  height: 20px;
  text-align: center;
  ${css.flexCenter}
  color: ${({ theme }) => theme.primaryText};
  transition: 0.2s ease-in-out color;
  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.mainBackground};
    transition: 0.2s ease-in-out color;
  }
  &:last-of-type {
    margin-left: 6px;
  }
`;
export default NewsCard;
