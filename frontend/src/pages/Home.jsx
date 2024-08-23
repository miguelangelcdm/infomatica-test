import useAuth from '../hooks/useAuth';
import { Box, Drawer, AppBar, Toolbar, Typography, List, ListItemButton, ListItemIcon, ListItemText, Button } from '@mui/material';
import { List as ListIcon, ShoppingCart as ShoppingCartIcon, LocalMall as LocalMallIcon, Logout as LogoutIcon, Home as HomeIcon } from '@mui/icons-material';
import { Outlet, useNavigate } from 'react-router-dom';

const drawerWidth = 240

const Home = () => {
    useAuth();
    const navigate = useNavigate()
    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('./')
    }
    return (
        <Box sx={{ display: 'flex'}}>
            <AppBar 
                position='fixed'
                sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
            >
                <Toolbar>
                    <Typography>Bienvenido!!!</Typography>
                    <div>
                        <Button color='inherit' onClick={() => navigate('./Home')}>
                            <HomeIcon/>
                            Home
                        </Button>
                        <Button color='inherit' onClick={handleLogout}>
                            <LogoutIcon/>
                            Logout
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                    zIndex: 0
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar/>
                <List>
                    <ListItemButton onClick={() => navigate('./groups')}>
                        <ListItemIcon><ListIcon/></ListItemIcon>
                        <ListItemText primary="Groups"/>
                    </ListItemButton>
                    <ListItemButton onClick={() => navigate('./SubGroups')}>
                        <ListItemIcon><ListIcon/></ListItemIcon>
                        <ListItemText primary="Sub Groups"/>
                    </ListItemButton>
                    <ListItemButton onClick={() => navigate('./Products')}>
                        <ListItemIcon><ShoppingCartIcon/></ListItemIcon>
                        <ListItemText primary="Products"/>
                    </ListItemButton>
                    <ListItemButton onClick={() => navigate('./Orders')}>
                        <ListItemIcon><LocalMallIcon/></ListItemIcon>
                        <ListItemText primary="Orders"/>
                    </ListItemButton>
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, mt: 8 }}
            >
                <Toolbar/>
                <Outlet/>
            </Box>
        </Box>
    );
};

export default Home;