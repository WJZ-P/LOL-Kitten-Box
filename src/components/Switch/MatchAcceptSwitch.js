import {Switch} from "@mui/material";
import usePersistedState from "../../Hooks/usePersistedState.js";
import {useEffect} from "react";

export default function MatchAcceptSwitch() {
    const [state, setState] = usePersistedState('Button-LCU-MatchAccept', false)

    useEffect(() => {
        window.centerHandler.changeState('isAutoAcceptMatch', state); // 发送对应的请求
    }, []);//只在组件第一次渲染时执行,初始化时发送请求

    const handleChange = (e) => {
        setState(e.target.checked);
            window.centerHandler.changeState('isAutoAcceptMatch', e.target.checked); // 发送对应的请求
    };
    return (<Switch onChange={handleChange} checked={state}/>)
}
