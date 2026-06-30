import React from 'react';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import AppRoutes from './routes/AppRoutes';
import ScrollToTop from './components/common/ScrollToTop';

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ScrollToTop />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              fontFamily: 'Inter, sans-serif',
            },
            success: {
              style: {
                background: '#10B981',
                color: '#fff',
              },
            },
            error: {
              style: {
                background: '#EF4444',
                color: '#fff',
              },
            },
          }}
        />
        <AppRoutes />
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
