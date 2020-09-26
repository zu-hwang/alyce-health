import 'styled-components';
import { Theme } from 'styles/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends theme {
    // theme.ts 파일 값 참조
  }
}
