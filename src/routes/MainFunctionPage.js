import React from 'react'
import '../App.css'
import {Switch} from "@mui/material";
import Stack from "@mui/material/Stack";
import CardWithSwitch from "../components/Card/CardWithSwitch";
import MatchAcceptSwitch from "../components/Switch/MatchAcceptSwitch";
import MatchStartSwitch from "../components/Switch/MatchStartSwitch";
import SelectChampionSwitch from "../components/Switch/SelectChampionSwitch";
import CardWithSwitchInput from "../components/Card/CardWithSwitchInput";
import {ChampionTextField} from "../components/TextfieldInput/ChampionTextField";
export default function MainFunctionPage() {
    return (<div className="App MainFunction Page">
        <Stack spacing={1} sx={{padding:'5px 10px',userSelect: 'none'}}>
            <CardWithSwitch Switch={<MatchAcceptSwitch/>} text="自动接受对局"/>
            <CardWithSwitch Switch={<MatchStartSwitch/>} text="自动开启对局(在队伍中)"/>
            <CardWithSwitchInput Switch={<SelectChampionSwitch/>} SwitchText="自动选择和锁定英雄" Input={<ChampionTextField/>} InputText={'请在右侧输入英雄称号或名字'}/>
        </Stack>
    </div>)
}

