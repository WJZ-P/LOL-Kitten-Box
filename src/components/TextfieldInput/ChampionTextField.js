import {TextField} from "@mui/material";
import * as React from "react";
import usePersistedState from "../../Hooks/usePersistedState";
import {useEffect, useState} from "react";

export function ChampionTextField() {
    const [text, setText] = usePersistedState('TextField-selectChampion', '');
    const [error, setError] = useState(false)//设置是否错误

    useEffect( () => {
        window.LCUAPI.setSelectChampion(text)
        window.LCUAPI.hasFindChampion(text)
    }, [text]);
    const handleChange = (event) => {
        setText(event.target.value);//修改保存的文本
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.target.blur();
        }
    };

    return (
        <TextField
            label="称号/名字"
            sx={{width: "180px"}}
            value={text}
            onChange={handleChange}
            error={error}
            onKeyDown={handleKeyDown}
        />
    )
}