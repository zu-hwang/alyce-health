import baseStyled from 'styled-components';
import { css, ThemedStyledInterface } from 'styled-components';

const pointColor = {
  lime: `rgba(173, 255,	47, 1)`,
  limeOpacity: `rgba(173, 255,	47, 0.8)`,
  blue: `#0095f6`,
  lightBlue: `#5bb4f0`,
  darkBlue: `#00376b`,
  red: `tomato`,
};

export const theme = {
  mainBackground: `#fff`,
  title: `rgba(0, 0, 0, 0.9)`,
  primaryText: `rgba(0, 0, 0, 0.8)`,
  secondaryText: `rgba(0, 0, 0, 0.45)`,
  midtoneText: `gray`,
  disable: `rgba(0, 0, 0, 0.25)`,
  border: `rgba(0, 0, 0, 0.15)`,
  divider: `rgba(0, 0, 0, 0.06)`,
  background: `rgba(0, 0, 0, 0.04)`,
  tableHeader: `rgba(0, 0, 0, 0.02)`,
  point: pointColor.lime,
  pointOpacity: pointColor.limeOpacity,
  danger: pointColor.red,
  unit: {
    web: 960,
    gut: 20,
    col: 40, //4단:5,3단:7,2단:11배
  },
};

export const flexCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const font = css`
  font-family: 'Roboto', 'Noto Sans KR', sans-serif;
`;

export const fontBold = css`
  ${font}
  font-size: 16px;
  font-weight: 500;
`;

export type Theme = typeof theme;
export const styled = baseStyled as ThemedStyledInterface<Theme>;
export default theme;
