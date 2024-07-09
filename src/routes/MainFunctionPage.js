import React from 'react'
import '../App.css'
import {Switch} from "@mui/material";
import Stack from "@mui/material/Stack";
import CardWithSwitch from "../components/Card/CardWithSwitch";

export default function MainFunctionPage() {
    return (<div className="App MainFunction Page">
        <Stack spacing={1} sx={{padding:'5px 10px'}}>
            <CardWithSwitch Switch={<Switch/>} text="自动接受匹配对局"/>
            <CardWithSwitch Switch={<Switch/>} text="嘻嘻哈哈,我日你妈"/>
            <CardWithSwitch Switch={<Switch/>} text="打开开关以杀死96"/>
        </Stack>
    </div>)
}

