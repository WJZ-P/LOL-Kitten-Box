import React, {useState} from 'react';
import '../../index.css';
import {
    Box,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon, ListItemText, styled,
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {InfoOutlined, PersonSearch, PlayArrow} from "@mui/icons-material";
import MuiDrawer from '@mui/material/Drawer';
import ButtonMain from "./ButtonMain.js";
import {Outlet} from "react-router-dom";

const drawerWidth = 180;
const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('lg')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const StyledDrawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        width: drawerWidth,
        flexShrink: 5,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function MyDrawer() {
    const [open, setOpen] = useState(false)

    function handleDrawerOpen() {
        setOpen(true)
    }

    function handleDrawerClose() {
        setOpen(false)
    }

    return (<>
        <Box sx={{display: 'flex'}}>
            <StyledDrawer variant={'permanent'} open={open}>
                <Box sx={{display: 'flex', justifyContent: open ? 'flex-end' : 'center'}}>
                    <IconButton onClick={handleDrawerOpen}
                                sx={{display: open ? 'none' : 'flex',}}>
                        <MenuIcon/>
                    </IconButton>
                    <IconButton onClick={handleDrawerClose}
                                sx={{display: !open ? 'none' : 'flex',}}>
                        <ChevronLeftIcon/>
                    </IconButton>
                </Box>
                <Divider/>
                <List>
                    <ButtonMain open={open}/>
                </List>
                <Divider/>

            </StyledDrawer>
        </Box>
        <Outlet/>
    </>)
}



