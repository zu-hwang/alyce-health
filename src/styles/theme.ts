import baseStyled from 'styled-components';
import { css, ThemedStyledInterface } from 'styled-components';

const pointColor = {
  blue: `#0095f6`,
  lightBlue: `#5bb4f0`,
  darkBlue: `#00376b`,
  red: `tomato`,
};
export const theme = {
  dark: {
    mainBackground: `#333`,
    // neutral color
    title: `rgba(255,255,255,0.9)`,
    primaryText: `rgba(255,255,255,0.8)`,
    secondaryText: `rgba(255,255,255,0.45)`,
    midtoneText: `gray`,
    disable: `rgba(255,255,255,0.25)`,
    border: `rgba(255,255,255,0.15)`,
    divider: `rgba(255,255,255,0.06)`,
    background: `rgba(255,255,255,0.04)`,
    tableHeader: `rgba(255,255,255,0.02)`,
    blue: pointColor.blue,
    lightBlue: pointColor.lightBlue,
    darkBlue: pointColor.darkBlue,
    red: pointColor.red,
  },
  light: {
    mainBackground: `#fff`,
    // neutral color
    title: `rgba(0, 0, 0, 0.9)`,
    primaryText: `rgba(0, 0, 0, 0.8)`,
    secondaryText: `rgba(0, 0, 0, 0.45)`,
    midtoneText: `gray`,
    disable: `rgba(0, 0, 0, 0.25)`,
    border: `rgba(0, 0, 0, 0.15)`,
    divider: `rgba(0, 0, 0, 0.06)`,
    background: `rgba(0, 0, 0, 0.04)`,
    tableHeader: `rgba(0, 0, 0, 0.02)`,
    blue: pointColor.blue,
    lightBlue: pointColor.lightBlue,
    darkBlue: pointColor.darkBlue,
    red: pointColor.red,
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
