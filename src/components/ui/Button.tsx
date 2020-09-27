import * as React from 'react';
// import * as css from 'styles/theme';
import styled from 'styled-components';

interface IButton {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent) => void;
}
const Button: React.FC<IButton> = ({ children, onClick }) => {
  return <Box onClick={onClick}>{children}</Box>;
};

const Box = styled.button`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.primaryText};
  padding: 12px 10px;
  text-align: center;
  font-weight: bold;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.primaryText};
  color: ${({ theme }) => theme.mainBackground};
  transition: 0.2s ease-in-out all;
  &:hover {
    cursor: pointer;
    background-color: black;
    transition: 0.2s ease-in-out all;
  }
`;

export default Button;
