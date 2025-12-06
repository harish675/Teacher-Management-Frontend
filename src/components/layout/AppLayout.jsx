import { useState } from 'react';
import { Box, AppBar as MuiAppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, useTheme, useMediaQuery } from '@mui/material';
import { Menu as MenuIcon, School, Person, Group, Assignment, PersonAdd, Assessment } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useThemeMode } from '../../theme/ThemeContextProvider.jsx';

const drawerWidth = 260;

const menuItems = [
    { text: 'Students', icon: <Person />, path: '/students' },
    { text: 'Teachers', icon: <Group />, path: '/teachers' },
    { text: 'Courses', icon: <School />, path: '/courses' },
    { text: 'Assign Teacher', icon: <Assignment />, path: '/assign-teacher' },
    { text: 'Enroll Student', icon: <PersonAdd />, path: '/enroll-student' },
    { text: 'Enrollment Report', icon: <Assessment />, path: '/enrollment-report' },
];

export default function AppLayout({ children }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const navigate = useNavigate();
    const location = useLocation();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleNavigation = (path) => {
        navigate(path);
        if (isMobile) {
            setMobileOpen(false);
        }
    };

    const drawer = (
        <Box>
            <Toolbar>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <School color="primary" sx={{ fontSize: 32 }} />
                    <Typography variant="h6" noWrap component="div" fontWeight={700}>
                        EduManage
                    </Typography>
                </Box>
            </Toolbar>
            <Divider />
            <List sx={{ px: 1, py: 2 }}>
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                            <ListItemButton
                                onClick={() => handleNavigation(item.path)}
                                sx={{
                                    borderRadius: 2,
                                    backgroundColor: isActive ? 'primary.main' : 'transparent',
                                    color: isActive ? 'primary.contrastText' : 'text.primary',
                                    '&:hover': {
                                        backgroundColor: isActive ? 'primary.dark' : 'action.hover',
                                    },
                                    transition: 'all 0.2s ease',
                                }}
                            >
                                <ListItemIcon sx={{ color: isActive ? 'inherit' : 'text.secondary', minWidth: 40 }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText
                                    primary={item.text}
                                    primaryTypographyProps={{
                                        fontWeight: isActive ? 600 : 500,
                                        fontSize: '0.9375rem'
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh' }}>
            {/* AppBar */}
            <MuiAppBar
                position="fixed"
                sx={{
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    ml: { md: `${drawerWidth}px` },
                    backgroundColor: 'background.paper',
                    color: 'text.primary',
                    boxShadow: 1,
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 600 }}>
                        Student-Teacher-Course Management
                    </Typography>
                </Toolbar>
            </MuiAppBar>

            {/* Drawer */}
            <Box
                component="nav"
                sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
            >
                {/* Mobile drawer */}
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
                {/* Desktop drawer */}
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>

            {/* Main content */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    mt: 8,
                    backgroundColor: 'background.default',
                    minHeight: '100vh',
                }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {children}
                </motion.div>
            </Box>
        </Box>
    );
}
