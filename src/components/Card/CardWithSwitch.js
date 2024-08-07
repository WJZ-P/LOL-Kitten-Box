import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './Card.css'
import {useState} from "react";

export default function CardWithSwitch({Switch, text}) {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseOver = () => {
        setIsHovered(true);
    };

    const handleMouseOut = () => {
        setIsHovered(false);
    };

    return (
        <Card
            className={'CustomCard'}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            sx={{
                height: '40px',
                backgroundColor: isHovered ? 'primary.light' : 'background.paper',
            }}>
            <label style={{cursor: 'pointer'}}>
                <CardContent
                    sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0px 10px'}}>
                    <Typography variant="subtitle1" component="span">
                        {text}
                    </Typography>
                    {Switch}

                </CardContent>
            </label>
        </Card>)
}