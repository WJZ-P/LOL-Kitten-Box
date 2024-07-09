import {Switch} from "@mui/material";
import usePersistedState from "../../Hooks/usePersistedState.js";

export default function MatchAcceptSwitch() {
    const [state, setState] = usePersistedState('Button-LCU-MatchAccept', false)
    const handleChange = (e) => {
        setState(e.target.checked);
        if (e.target.checked) {
            window.LCUAPI.matchAccept(); // 发送开启自动匹配请求
        } else {
            window.LCUAPI.cancleMatchAccept(); // 发送取消自动匹配请求
        }
    };
    return (<Switch onChange={handleChange} checked={state}/>)
}

