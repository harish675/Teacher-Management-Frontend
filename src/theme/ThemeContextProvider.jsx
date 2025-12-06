import { useState, useMemo, createContext, useContext } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { createAppTheme } from '../theme/theme';

const ThemeContext = createContext();

export const useThemeMode = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeMode must be used within ThemeContextProvider');
    }
    return context;
};

export function ThemeContextProvider({ children }) {
    const [mode, setMode] = useState(() => {
        const savedMode = localStorage.getItem('themeMode');
        return savedMode || 'light';
    });

    const toggleTheme = () => {
        setMode((prevMode) => {
            const newMode = prevMode === 'light' ? 'dark' : 'light';
            localStorage.setItem('themeMode', newMode);
            return newMode;
        });
    };

    const theme = useMemo(() => createAppTheme(mode), [mode]);

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <SnackbarProvider
                    maxSnack={3}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    autoHideDuration={3000}
                >
                    {children}
                </SnackbarProvider>
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}
