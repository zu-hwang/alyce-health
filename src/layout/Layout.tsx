import * as React from 'react';
import styled from 'styled-components';

interface ILayout {
  children: React.ReactNode;
}
const Layout = ({ children }: ILayout) => {
  return (
    <div>
      <div>해더: 로그인 or 로그아웃/즐겨찾기</div>
      <div>{children} </div>
    </div>
  );
};

export default Layout;
