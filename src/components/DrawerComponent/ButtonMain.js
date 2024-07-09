import {ListItem, ListItemButton, ListItemIcon, ListItemText, styled} from "@mui/material";
import {InfoOutlined, PersonSearch, PlayArrow} from "@mui/icons-material";
import React, {useState} from "react";
import {Link as RouterLink} from "react-router-dom"

const text = '主要功能'
const Link = styled(RouterLink)`
  text-decoration: none;
  color: inherit;
`;
//这个是按钮的主体，主要功能，点击后跳转到主要功能页面
export default function ButtonMain(open) {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseOver = () => {
        setIsHovered(true);
    };

    const handleMouseOut = () => {
        setIsHovered(false);
    };
    return (<div className={'Button'}>
        <Link to="/MainFunctionPage">
            <ListItem key={text} disablePadding sx={{
                backgroundColor: isHovered ? 'primary.light' : 'background.paper',
                transition: 'background-color 0.3s ease',
                display: 'block'
            }} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
                <ListItemButton>
                    <ListItemIcon
                        sx={{
                            minWidth: 0, mr: open ? 3 : -15, ml: 'auto', justifyContent: 'center',
                        }}
                    >

                        <PlayArrow sx={{display: 'flex'}}/>
                    </ListItemIcon>
                    <ListItemText primary={text} sx={{opacity: open ? 1 : 0}}/>
                </ListItemButton>
            </ListItem>
        </Link></div>)
}