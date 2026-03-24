import { createTheme } from '@mui/material/styles';

export const appMuiTheme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#0B0B0C',
      paper: '#111113',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#A1A1AA',
    },
    primary: {
      main: '#27272A',
    },
    divider: 'rgba(255,255,255,0.06)',
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily:
      "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif",
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#111113',
          borderRadius: 12,
          boxShadow: 'none',
          border: '1px solid rgba(255,255,255,0.06)',
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255,255,255,0.06)',
          borderRadius: 12,
        },
      },
    },
    MuiDialog: {
      defaultProps: {
        fullWidth: true,
        maxWidth: 'sm',
      },
      styleOverrides: {
        paper: {
          backgroundColor: '#111113',
          borderRadius: 12,
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 18px 45px rgba(0,0,0,0.65)',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: '#111113',
          borderRadius: 12,
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 18px 45px rgba(0,0,0,0.65)',
        },
      },
    },
  },
});

