import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  ${reset}
  * {
    box-sizing:border-box;
  }
  body, h1, h2, h3, h4, h5, h6, p, span, div, article, nav ,input, label, button {
  font-family: 'Roboto', 'Noto Sans KR', sans-serif;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  input, button {
    background-color: transparent;
    border: none;
    outline: none;
  }
`;

export default GlobalStyle;
