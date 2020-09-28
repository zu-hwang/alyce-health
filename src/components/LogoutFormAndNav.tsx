import * as React from 'react';
import * as account from 'store/reducer/account';
import * as home from 'store/reducer/home';
import * as bmk from 'store/reducer/bmk';
import styled from 'styled-components';
import Button from 'components/ui/Button';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faBookmark, faHome } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'hooks/customRedux';

const LogoutFormAndNav = () => {
  const dispatch = useDispatch();
  const username = useSelector((s) => s.account.username);
  const onClickLogout = (): void => {
    dispatch(account.reset());
    dispatch(bmk.reset());
    dispatch(home.reset());
  };
  return (
    <Container>
      <Greeting>{username}님 반갑습니다 !</Greeting>
      <Nav>
        <ul>
          <li>
            <IconWrapper>
              <Icon icon={faHome} />
            </IconWrapper>
            <Link to="/">Home</Link>
          </li>
          <li>
            <IconWrapper>
              <Icon icon={faBookmark} />
            </IconWrapper>
            <Link to="/bookmark">bookmark</Link>
          </li>
        </ul>
      </Nav>
      <Button onClick={onClickLogout}>로그아웃</Button>
    </Container>
  );
};

const Container = styled.div`
  padding: 27px 20px;
`;
const Greeting = styled.p`
  margin: 0 0 30px;
  font-size: 16px;
  font-weight: bold;
`;
const Nav = styled.nav`
  ul {
    margin: 10px 0 20px;
    li {
      padding-bottom: 8px;
      margin-bottom: 10px;
      width: 100%;
      font-size: 16px;
      font-weight: bold;
      text-transform: uppercase;
      border-bottom: 2px solid transparent;
      transition: 0.2s ease-in-out all;
      &:hover {
        cursor: pointer;
        border-bottom: 2px solid ${({ theme }) => theme.primaryText};
        transition: 0.2s ease-in-out all;
      }
    }
  }
`;
const IconWrapper = styled.div`
  text-align: center;
  width: 18px;
  height: 18px;
  display: inline-block;
  margin-right: 10px;
  font-size: 16px;
`;
// const Wrapper = styled.div`
//   margin-bottom: 15px;
//   /* &:last-of-type {
//     margin-bottom: 10px;
//   } */
// `;
// const Input = styled.input`
//   padding: 10px;
//   margin-bottom: 6px;
//   width: 100%;
//   border: 1px solid ${({ theme }) => theme.primaryText};
//   border-radius: 4px;
//   background-color: ${({ theme }) => theme.mainBackground};
//   outline: none;
//   transition: 0.3s ease-in-out all;
//   color: ${({ theme }) => theme.primaryText};
// `;
// const Label = styled.label`
//   font-weight: bold;
//   color: ${({ theme }) => theme.primaryText};
//   text-align: left;
//   width: 100%;
//   transition: 0.2s ease-in-out all;
//   position: relative;
//   top: -6px;
// `;

export default LogoutFormAndNav;
