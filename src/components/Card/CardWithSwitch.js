import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './CardWithSwitch.css'
import {useEffect, useState} from "react";
import {Box} from "@mui/material";

export default function CardWithSwitch({Switch, text}) {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseOver = () => {
        setIsHovered(true);
    };

    const handleMouseOut = () => {
        setIsHovered(false);
    };

    useEffect(() => {
        const switchState=
        console.log('CardWithSwitch rendered')
    }, [])
    return (
        <Card onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
              sx={{
                  height: '40px',
                  backgroundColor: isHovered ? 'primary.light' : 'background.paper',
                  transition: 'background-color 0.3s ease',

              }}>
            <label style={{cursor: 'pointer'}}>
                <CardContent sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center',padding:'0px 10px'}}>
                    <Typography variant="subtitle1" component="span">
                        {text}
                    </Typography>
                        {Switch}

                </CardContent>
            </label>
        </Card>)
}