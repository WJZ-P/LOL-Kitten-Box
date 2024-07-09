import {Switch} from "@mui/material";
import {Warning} from "@mui/icons-material";

export default function MatchAcceptSwitch() {
    return (<Switch onChange={e => {
        if (e.target.checked) {
            console.log("Match Start")
        } else {
            console.log("Match Stop")
        }
    }
    }/>)
}
