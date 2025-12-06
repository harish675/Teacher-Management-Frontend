import { createTheme } from '@mui/material/styles';

// Material Design 3 Color Palette
const lightPalette = {
    primary: {
        main: '#6366f1',
        light: '#818cf8',
        dark: '#4f46e5',
        contrastText: '#ffffff',
    },
    secondary: {
        main: '#8b5cf6',
        light: '#a78bfa',
        dark: '#7c3aed',
        contrastText: '#ffffff',
    },
    success: {
        main: '#10b981',
        light: '#34d399',
        dark: '#059669',
    },
    error: {
        main: '#ef4444',
        light: '#f87171',
        dark: '#dc2626',
    },
    warning: {
        main: '#f59e0b',
        light: '#fbbf24',
        dark: '#d97706',
    },
    info: {
        main: '#3b82f6',
        light: '#60a5fa',
        dark: '#2563eb',
    },
    background: {
        default: '#fafafa',
        paper: '#ffffff',
    },
    text: {
        primary: '#111827',
        secondary: '#6b7280',
    },
};

const darkPalette = {
    primary: {
        main: '#818cf8',
        light: '#a5b4fc',
        dark: '#6366f1',
        contrastText: '#000000',
    },
    secondary: {
        main: '#a78bfa',
        light: '#c4b5fd',
        dark: '#8b5cf6',
        contrastText: '#000000',
    },
    success: {
        main: '#34d399',
        light: '#6ee7b7',
        dark: '#10b981',
    },
    error: {
        main: '#f87171',
        light: '#fca5a5',
        dark: '#ef4444',
    },
    warning: {
        main: '#fbbf24',
        light: '#fcd34d',
        dark: '#f59e0b',
    },
    info: {
        main: '#60a5fa',
        light: '#93c5fd',
        dark: '#3b82f6',
    },
    background: {
        default: '#121212',
        paper: '#1e1e1e',
    },
    text: {
        primary: '#f9fafb',
        secondary: '#9ca3af',
    },
};

// Create theme function
export const createAppTheme = (mode = 'light') => {
    const palette = mode === 'light' ? lightPalette : darkPalette;

    return createTheme({
        palette: {
            mode,
            ...palette,
        },
        typography: {
            fontFamily: '"Roboto", "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
            h1: {
                fontSize: '2.5rem',
                fontWeight: 700,
                lineHeight: 1.2,
            },
            h2: {
                fontSize: '2rem',
                fontWeight: 700,
                lineHeight: 1.3,
            },
            h3: {
                fontSize: '1.75rem',
                fontWeight: 600,
                lineHeight: 1.3,
            },
            h4: {
                fontSize: '1.5rem',
                fontWeight: 600,
                lineHeight: 1.4,
            },
            h5: {
                fontSize: '1.25rem',
                fontWeight: 600,
                lineHeight: 1.4,
            },
            h6: {
                fontSize: '1rem',
                fontWeight: 600,
                lineHeight: 1.5,
            },
            body1: {
                fontSize: '1rem',
                lineHeight: 1.6,
            },
            body2: {
                fontSize: '0.875rem',
                lineHeight: 1.6,
            },
            button: {
                textTransform: 'none',
                fontWeight: 600,
            },
        },
        shape: {
            borderRadius: 12,
        },
        shadows: [
            'none',
            '0px 2px 4px rgba(0,0,0,0.05)',
            '0px 4px 8px rgba(0,0,0,0.08)',
            '0px 8px 16px rgba(0,0,0,0.1)',
            '0px 12px 24px rgba(0,0,0,0.12)',
            '0px 16px 32px rgba(0,0,0,0.14)',
            '0px 20px 40px rgba(0,0,0,0.16)',
            '0px 24px 48px rgba(0,0,0,0.18)',
            '0px 28px 56px rgba(0,0,0,0.2)',
            '0px 32px 64px rgba(0,0,0,0.22)',
            '0px 36px 72px rgba(0,0,0,0.24)',
            '0px 40px 80px rgba(0,0,0,0.26)',
            '0px 44px 88px rgba(0,0,0,0.28)',
            '0px 48px 96px rgba(0,0,0,0.3)',
            '0px 52px 104px rgba(0,0,0,0.32)',
            '0px 56px 112px rgba(0,0,0,0.34)',
            '0px 60px 120px rgba(0,0,0,0.36)',
            '0px 64px 128px rgba(0,0,0,0.38)',
            '0px 68px 136px rgba(0,0,0,0.4)',
            '0px 72px 144px rgba(0,0,0,0.42)',
            '0px 76px 152px rgba(0,0,0,0.44)',
            '0px 80px 160px rgba(0,0,0,0.46)',
            '0px 84px 168px rgba(0,0,0,0.48)',
            '0px 88px 176px rgba(0,0,0,0.5)',
            '0px 92px 184px rgba(0,0,0,0.52)',
        ],
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 8,
                        padding: '10px 24px',
                        fontSize: '0.9375rem',
                        boxShadow: 'none',
                        '&:hover': {
                            boxShadow: '0px 4px 12px rgba(0,0,0,0.15)',
                        },
                    },
                    contained: {
                        '&:hover': {
                            boxShadow: '0px 6px 16px rgba(0,0,0,0.2)',
                        },
                    },
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        borderRadius: 16,
                        boxShadow: mode === 'light'
                            ? '0px 2px 8px rgba(0,0,0,0.08)'
                            : '0px 2px 8px rgba(0,0,0,0.3)',
                        transition: 'box-shadow 0.3s ease, transform 0.3s ease',
                        '&:hover': {
                            boxShadow: mode === 'light'
                                ? '0px 8px 24px rgba(0,0,0,0.12)'
                                : '0px 8px 24px rgba(0,0,0,0.4)',
                        },
                    },
                },
            },
            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundImage: 'none',
                    },
                    elevation1: {
                        boxShadow: mode === 'light'
                            ? '0px 2px 4px rgba(0,0,0,0.05)'
                            : '0px 2px 4px rgba(0,0,0,0.3)',
                    },
                },
            },
            MuiTextField: {
                styleOverrides: {
                    root: {
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 8,
                        },
                    },
                },
            },
            MuiChip: {
                styleOverrides: {
                    root: {
                        borderRadius: 8,
                        fontWeight: 500,
                    },
                },
            },
            MuiTableCell: {
                styleOverrides: {
                    head: {
                        fontWeight: 600,
                        backgroundColor: mode === 'light' ? '#f9fafb' : '#1a1a1a',
                    },
                },
            },
        },
    });
};

export default createAppTheme;
