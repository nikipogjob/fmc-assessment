'use client';

import { Provider } from 'react-redux';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { store } from '@/shared/store/store';

const theme = createTheme({
  palette: { mode: 'light' }
});

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
        <ToastContainer position="top-right" autoClose={2500} />
      </ThemeProvider>
    </Provider>
  );
}

