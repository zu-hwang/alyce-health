import * as React from 'react';
import * as account from 'store/reducer/account';
// import * as css from 'styles/theme';
import styled from 'styled-components';
import Button from 'components/ui/Button';
import useInput from 'hooks/useInput';
import { useDispatch } from 'hooks/customRedux';
import userDB from 'util/userDB';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [id, onChangeId /* setId */] = useInput();
  const [password, onChangePassword /* setPassword */] = useInput();
  const onClickLogin = (e: React.MouseEvent): void => {
    e.preventDefault();
    if (id.length > 0 && password.length > 6) {
      const loginedUser = userDB.filter(
        (user) => user.id === id && user.password === password
      );
      if (loginedUser.length > 0 && loginedUser[0].id) {
        console.log('유저정보는?', loginedUser[0].id);
        dispatch(account.setUser(loginedUser[0].id));
      } else {
        alert('사용자 정보가 없습니다 😢');
      }
    } else {
      alert('입력정보를 다시 확인해주세요!😟');
    }
  };
  return (
    <Form>
      <Wrapper>
        <Label htmlFor={'id'}>id</Label>
        <Input type="text" value={id} id="id" onChange={onChangeId} />
      </Wrapper>
      <Wrapper>
        <Label htmlFor={'password'}>password</Label>
        <Input
          type="password"
          value={password}
          id="password"
          onChange={onChangePassword}
        />
      </Wrapper>
      <Button onClick={onClickLogin}>로그인</Button>
    </Form>
  );
};

const Form = styled.form`
  padding: 26px 20px;
`;
const Wrapper = styled.div`
  margin-bottom: 15px;
  /* &:last-of-type {
    margin-bottom: 10px;
  } */
`;
const Input = styled.input`
  padding: 10px;
  margin-bottom: 6px;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.primaryText};
  border-radius: 4px;
  background-color: ${({ theme }) => theme.mainBackground};
  outline: none;
  transition: 0.3s ease-in-out all;
  color: ${({ theme }) => theme.primaryText};
`;
const Label = styled.label`
  font-weight: bold;
  color: ${({ theme }) => theme.primaryText};
  text-align: left;
  width: 100%;
  transition: 0.2s ease-in-out all;
  position: relative;
  top: -6px;
  text-transform: uppercase;
`;

export default LoginForm;
