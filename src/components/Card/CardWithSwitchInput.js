import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './Card.css'
import {useState} from "react";

export default function CardWithSwitchInput({Switch, SwitchText, Input, InputText}) {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseOver = () => {
        setIsHovered(true);
    };

    const handleMouseOut = () => {
        setIsHovered(false);
    };

    return (
        <Card
            className={"CustomCard"}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            sx={{
                height: '100px',
                backgroundColor: isHovered ? 'primary.light' : 'background.paper',
                transition: 'background-color 0.3s ease',

            }}>
            <label style={{cursor: 'pointer'}}>
                <CardContent
                    sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0px 10px'}}>
                    <Typography variant="subtitle1" component="span">
                        {SwitchText}
                    </Typography>
                    {Switch}
                </CardContent>
                <CardContent
                    sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2px 10px'}}>
                    <Typography variant="caption" component="span" sx={{fontSize:"15px",color:"gray"}}>
                        {InputText}
                    </Typography>
                    {Input}
                    {/*自己自定义的input组件，基于MUI的TextField组件*/}
                </CardContent>
            </label>

        </Card>)
}