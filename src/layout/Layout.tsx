import * as React from 'react';
import styled from 'styled-components';

interface ILayout {
  children: React.ReactNode;
}
const Layout = ({ children }: ILayout) => {
  return (
    <Container>
      <Header>해더: 로그인 or 로그아웃/즐겨찾기</Header>
      <Main>{children}</Main>
    </Container>
  );
};

const Container = styled.header`
  min-width: 100vw;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.mainBackground};
`;
const Header = styled.header``;
const Main = styled.main``;

export default Layout;
