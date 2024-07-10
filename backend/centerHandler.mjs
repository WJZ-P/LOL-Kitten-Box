import {getGameflowPhase} from "./LCU-APIS.mjs";

const runCenterHandler = () => {
    setInterval(async () => {
        let gamePhaseData = await getGameflowPhase()
        console.log(gamePhaseData)
        switch (gamePhaseData) {
            case "None":
                break//表示在主界面

            case "Matchmaking":
                break  //表示正在排队

            case "Lobby": //表示在房间中
                break

            case "ReadyCheck": //表示找到对局，等待接受
                break

            case "ChampSelect": //表示正在选择角色状态
                break

            case "InProgress": //表示正在游戏中
                break

            case "PreEndOfGame":    //游戏即将结束
                break

            case "EndOfGame":    //游戏已经结束
                break

            case "Reconnect":   //重新连接
                break

            default:
                break
        }
    }, 1000)
}

runCenterHandler()