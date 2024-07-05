import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './CardWithButton.css'
export default function CardWithButton() {
    return (<Box>
        <Card className={'CustomButton'}>
            < CardContent>
                < Typography variant="h5" component="div">
                    嘻嘻哈哈
                </Typography>
            </CardContent>
        </Card>
    </Box>)
}