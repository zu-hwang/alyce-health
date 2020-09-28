import * as React from 'react';
import * as css from 'styles/theme';
import * as bmk from 'store/reducer/bmk';
import * as home from 'store/reducer/home';
import styled from 'styled-components';
import { useInput } from 'hooks/useInput';
import { useDispatch, useSelector } from 'hooks/customRedux';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faBookmark as BKIcon } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as BKIconA } from '@fortawesome/free-solid-svg-icons';
import { faPen as pen } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane as save } from '@fortawesome/free-solid-svg-icons';
import defaultImg from 'images/default.png';
interface INewsCard {
  news: home.IActicle;
  mode?: 'edit' | 'none';
}
const NewsCard: React.FC<INewsCard> = ({ news, mode = 'none' }) => {
  const dispatch = useDispatch();
  const imageRef = React.useRef<HTMLDivElement>(null);
  const articleRef = React.useRef<HTMLParagraphElement>(null);
  const [imgH, setImgH] = React.useState(0);
  const [articleH, setArticleH] = React.useState(0);
  const [title, onChengeTitle] = useInput(news.title);
  const [description, onChangeDesc] = useInput(news.description);
  const [isBookmark, setIsBookmark] = React.useState(false);
  const username = useSelector((s) => s.account.username);
  const bookmark = useSelector((s) => s.bmk.bookmark);
  const editNewsId = useSelector((s) => s.bmk.editNewsId);
  const openNewTab = () => {
    window.open(news.url, '_blank');
  };
  const onClicBookmark = () => {
    if (username && !isBookmark) {
      dispatch(bmk.addBookmark({ news, username }));
    } else {
      dispatch(bmk.delBookmark({ id: news.id, username }));
      setIsBookmark(false);
    }
  };
  const onClickEdit = (e: React.MouseEvent) => {
    const id = (e.currentTarget as HTMLElement).dataset.ids;
    const childNodes = (e.currentTarget as HTMLElement).childNodes;
    const mode = (childNodes[0] as HTMLElement).dataset.icon;
    if (id && editNewsId !== id) dispatch(bmk.setEditNewsId(id)); // 현재 뉴스 수정모드 적용
    if (id && editNewsId === id && mode === 'paper-plane')
      dispatch(bmk.updateBookmark({ username, id, title, description })),
        dispatch(bmk.setEditNewsId('')); // 내용 저장 다스패치 실행 & 수정모드 종료
  };
  const isEditMode = React.useMemo(() => {
    return mode === 'edit' && editNewsId === news.id;
  }, [mode, editNewsId, news.id]);
  React.useEffect(() => {
    bookmark.forEach((bk) => bk.id === news.id && setIsBookmark(true));
  }, [bookmark, news]);
  React.useEffect(() => {
    articleRef.current?.clientHeight &&
      setArticleH(articleRef.current.clientHeight);
    imageRef.current?.clientHeight && setImgH(imageRef.current.clientHeight);
  }, []);
  return (
    <Container>
      <NewsBox>
        <div ref={imageRef}>
          <ImageBox url={news.urlToImage} height={imgH} />
        </div>
        <div>
          <FirstLine>
            {isEditMode && (
              <TitleInput value={title} onChange={onChengeTitle} autoFocus />
            )}
            {!isEditMode && <Title onClick={openNewTab}>{news.title}</Title>}
            <SubItem>
              <PublishedAt>{news.publishedAt.slice(0, 10)}</PublishedAt>
              {mode === 'edit' && (
                <IconWrapper size={17} data-ids={news.id} onClick={onClickEdit}>
                  {isEditMode && <Icon data-ids={news.id} icon={save}></Icon>}
                  {!isEditMode && <Icon data-ids={news.id} icon={pen}></Icon>}
                </IconWrapper>
              )}
              {username && (
                <IconWrapper onClick={onClicBookmark}>
                  {isBookmark && <Icon icon={BKIconA} size={'lg'}></Icon>}
                  {!isBookmark && <Icon icon={BKIcon} size={'lg'}></Icon>}
                </IconWrapper>
              )}
            </SubItem>
          </FirstLine>
          {isEditMode && (
            <ActicleEditInput
              value={description}
              height={articleH}
              onChange={onChangeDesc}
            >
              {description}
            </ActicleEditInput>
          )}
          {!isEditMode && (
            <Acticle ref={articleRef}>{news.description}</Acticle>
          )}
          <Origin>
            {news.author && <Author>{news.author}</Author>}
            <Source onClick={openNewTab}>출처 : {news.source.name}</Source>
            <Wrapper>
              <OriginUrl onClick={openNewTab}>{news.url}</OriginUrl>
            </Wrapper>
          </Origin>
        </div>
      </NewsBox>
    </Container>
  );
};
const Container = styled.div``;
interface IEditBox {
  display: boolean;
}
const NewsBox = styled.div`
  border: 1px solid ${({ theme }) => theme.primaryText};
  border-radius: 2px;
  width: 100%;
  display: flex;
  & > div:first-child {
    background-color: ${({ theme }) => theme.primaryText};
  }
  & > div:last-child {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    border-left: 1px solid ${({ theme }) => theme.primaryText};
  }
`;
interface ImageBoxProp {
  url: string;
  height: number;
}
const ImageBox = styled.div<ImageBoxProp>`
  background: url(${({ url }) => (url ? url : defaultImg)}) no-repeat center;
  background-size: cover;
  width: ${({ theme }) => theme.unit.col * 5 + 'px'};
  height: ${({ height }) => height + 'px'};
`;
const FirstLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  max-height: 38px;
  overflow: hidden;
  width: 100%;
  flex-grow: 2;
`;
const SubItem = styled.div`
  min-width: 130px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 6px;
`;
const Title = styled.p`
  position: relative;
  top: 1px;
  padding: 15px 0 6px;
  font-size: 16px;
  font-weight: bold;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  border-bottom: 1px solid transparent;
  &:hover {
    cursor: pointer;
    /* color: ${({ theme }) => theme.mainBackground}; */
    border-bottom: 1px solid ${({ theme }) => theme.primaryText};
    transition: 0.2s ease-in-out all;
  }
`;
const TitleInput = styled.input`
  margin: 0;
  padding: 12px 0 6px;
  font-size: 16px;
  font-weight: bold;
  width: 100%;
  border-bottom: 1px solid transparent;
  color: ${({ theme }) => theme.primaryText};
  &:first-child > &:first-child {
    position: relative;
    top: -1px;
  }
  &:focus {
    outline: none;
    border-bottom: 1px solid ${({ theme }) => theme.primaryText};
  }
`;
const Acticle = styled.p`
  width: 100%;
  flex-grow: 1;
  padding: 6px 10px 0;
  margin-bottom: 10px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  line-height: 1.5em;
  letter-spacing: -0.1px;
`;
const ActicleEditInput = styled.textarea<{ height: number }>`
  ${css.font}
  outline: none;
  resize: vertical;
  width: 100%;
  padding: 6px 10px 10px;
  flex-grow: 1;
  overflow: scroll;
  line-height: 1.5em;
  font-size: 14px;
  letter-spacing: -0.1px;
  border: 0;
  background-color: ${({ theme }) => theme.divider};
  min-height: ${({ height }) => height + 'px'};
  height: ${({ height }) => height + 'px'};
`;
const Origin = styled.div`
  /* margin-top: 10px; */
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
  &:hover {
    cursor: pointer;
  }
`;
const OriginUrl = styled.p`
  padding: 7px 10px;
  font-size: 10px;
  letter-spacing: 0.5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  &:hover {
    cursor: pointer;
  }
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
