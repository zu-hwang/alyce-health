import * as React from 'react';
import * as css from 'styles/theme';
import * as home from 'store/reducer/home';
import * as bmk from 'store/reducer/bmk';
import * as account from 'store/reducer/account';
import styled from 'styled-components';
import useInput from 'hooks/useInput';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'hooks/customRedux';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faBars, faGrimace, faSearch } from '@fortawesome/free-solid-svg-icons';
import { faWindowMinimize } from '@fortawesome/free-regular-svg-icons';
import LoginForm from 'components/LoginForm';
import LogoutFormAndNav from 'components/LogoutFormAndNav';

const Header = () => {
  const menuRef = React.useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const history = useHistory();
  const currentPath = useLocation().pathname;
  const username = useSelector((s) => s.account.username);
  const [menubar, setMenubar] = React.useState(false);
  const [value, onChangeValue] = useInput();
  const submitSearch = (): void => {
    dispatch(home.requestNews({ input: value, page: 1 })); // 사가 액션타입
  };
  const onKeyPressInput = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter' && value.length > 0) submitSearch();
  };
  const onClickIcon = (e: React.MouseEvent) => {
    const mode = (e.currentTarget as HTMLElement).dataset.icon;
    mode === 'grimace' && history.push('/');
    mode === 'search' && submitSearch();
    mode === 'bars' && setMenubar(true);
    mode === 'window-minimize' && setMenubar(false);
  };

  React.useEffect(() => {
    const checkCurrentRef = (e: Event) =>
      !menuRef.current?.contains(e.target as Node) && setMenubar(false);
    if (window && menubar)
      window.addEventListener('mousedown', checkCurrentRef);
    if (window && !menubar)
      window.removeEventListener('mousedown', checkCurrentRef);
    return () => {
      window.removeEventListener('mousedown', checkCurrentRef);
    };
  }, [menubar]);
  React.useEffect(() => {
    dispatch(account.loadLSUser());
    if (username) dispatch(bmk.loadLSBookmark(username));
    // eslint-disable-next-line
  }, [username]);
  return (
    <Container>
      <CenterBox>
        <MainLine>
          <IconWrapper hover={true}>
            {currentPath === '/' && (
              <Icon icon={faSearch} size={'lg'} onClick={onClickIcon} />
            )}
            {currentPath === '/bookmark' && (
              <Icon icon={faGrimace} size={'2x'} onClick={onClickIcon} />
            )}
          </IconWrapper>
          {currentPath === '/' ? (
            <SearchInput
              autoFocus
              placeholder={'검색어를 입력하세요!'}
              value={value}
              onChange={onChangeValue}
              onKeyPress={onKeyPressInput}
            />
          ) : (
            <Title>{currentPath.slice(1)}</Title>
          )}
          <IconWrapper hover={true}>
            {menubar && (
              <Icon icon={faWindowMinimize} size={'lg'} onClick={onClickIcon} />
            )}
            {!menubar && (
              <Icon icon={faBars} size={'lg'} onClick={onClickIcon} />
            )}
          </IconWrapper>
        </MainLine>
        <SubLine>
          <HiddenBox menubar={menubar} ref={menuRef}>
            <MenuWrapper menubar={menubar}>
              {!username && <LoginForm></LoginForm>}
              {username && <LogoutFormAndNav></LogoutFormAndNav>}
            </MenuWrapper>
          </HiddenBox>
        </SubLine>
      </CenterBox>
    </Container>
  );
};
const Container = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 2;
  background-color: ${({ theme }) => theme.pointOpacity};
  border-bottom: 1px solid ${({ theme }) => theme.primaryText};
  ${css.flexCenter}
`;
const CenterBox = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: column;
  width: ${({ theme }) => theme.unit.web + 'px'};
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
  flex-grow: 1;
  font-weight: 700;
  color: ${({ theme }) => theme.primaryText};
  text-transform: capitalize;
`;
const SearchInput = styled.input`
  font-size: 20px;
  flex-grow: 1;
  font-weight: 700;
  color: ${({ theme }) => theme.primaryText};
  position: relative;
  &::placeholder {
    font-weight: 100;
    color: ${({ theme }) => theme.primaryText};
  }
`;
const MainLine = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const SubLine = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;
const IconWrapper = styled.div<{ hover?: boolean }>`
  ${css.flexCenter}
  position:relative;
  top: 0;
  color: ${({ theme }) => theme.primaryText};
  padding: ${({ theme }) => theme.unit.gut + 'px'};
  transition: 0.2s ease-in-out color;
  ${({ hover, theme }) =>
    hover &&
    `&:hover {
    cursor: pointer;
    color: ${theme.mainBackground};
    transition: 0.2s ease-in-out color;
  }`}
`;
const HiddenBox = styled.div<{ menubar: boolean }>`
  height: ${({ menubar }) => (menubar ? '245px' : '0px')};
  transition: 0.5s ease-in-out height;
  overflow: hidden;
  position: absolute;
  top: 60px;
  right: 20px;
  z-index: 2;
  width: 300px;
`;
const MenuWrapper = styled.div<{ menubar?: boolean }>`
  border-right: 1px solid ${({ theme }) => theme.primaryText};
  border-left: 1px solid ${({ theme }) => theme.primaryText};
  border-bottom: 1px solid ${({ theme }) => theme.primaryText};
  border-radius: 0 0 2px 2px;
  position: relative;
  bottom: ${({ menubar }) => (menubar ? '0px' : '247px')};
  transition: 0.5s ease-in-out bottom;
  background-color: ${({ theme }) => theme.pointOpacity};
`;
export default Header;
