import {ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {InfoOutlined, PersonSearch, PlayArrow} from "@mui/icons-material";
import React from "react";

export default function ButtonMain() {
    return (<ListItem key={text} disablePadding sx={{display: 'block'}}>
        <ListItemButton>
            <ListItemIcon
                sx={{
                    minWidth: 0, mr: open ? 3 : -15, ml: 'auto', justifyContent: 'center',
                }}
            >

                <PlayArrow sx={{display: 'flex'}}/>
            </ListItemIcon>
            <ListItemText primary={'主要功能'} sx={{opacity: open ? 1 : 0}}/>
        </ListItemButton>
    </ListItem>)
}