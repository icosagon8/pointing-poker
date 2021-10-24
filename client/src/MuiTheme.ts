import { createTheme } from '@material-ui/core/styles';

declare module '@material-ui/core/styles/createBreakpoints' {
  interface BreakpointOverrides {
    sm: false;
    xl: false;
  }
}

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      md: 960,
      lg: 1440,
    },
  },
});
