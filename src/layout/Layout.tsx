import * as React from 'react';
import styled from 'styled-components';
import * as css from 'styles/theme';
import Header from 'components/Header';
interface ILayout {
  children: React.ReactNode;
}
const Layout = ({ children }: ILayout) => {
  return (
    <Container>
      <Header />
      <Main>
        <CenterBox>{children}</CenterBox>
      </Main>
      <Footer>
        <CenterBox>
          <p>앨리스핼스 코딩 테스트</p>
          <p>
            2020.09.26~27 GitHub <span>@zu-hwang</span>
          </p>
        </CenterBox>
      </Footer>
    </Container>
  );
};

const Container = styled.header`
  position: relative;
  ${css.font}
  color : ${({ theme }) => theme.primaryText};
  min-width: 100vw;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.point};
`;
const Main = styled.main`
  display: flex;
  justify-content: center;
  padding: 100px 0 80px;
`;
const CenterBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: ${({ theme }) => theme.unit.web + 'px'};
  padding: 0 ${({ theme }) => theme.unit.gut + 'px'};
`;

const Footer = styled.div`
  position: absolute;
  width: 100%;
  padding-bottom: ${({ theme }) => theme.unit.gut + 'px'};
  bottom: 0;
  display: flex;
  justify-content: center;
  p {
    text-align: center;
    font-size: 10px;
    line-height: 1.3em;
    &:first-child {
      font-weight: bold;
    }
  }
  span {
    transition: 0.2s ease-in-out color;
    font-size: 10px;
    font-weight: bold;
    &:hover {
      cursor: pointer;
      color: ${({ theme }) => theme.mainBackground};
      transition: 0.2s ease-in-out color;
    }
  }
`;
export default Layout;
