import {
    findChampionID,
    getGameflowPhase,
    lockChampion,
    matchAccept,
    matchStart,
    selectChampion,
    task
} from "./LCU-APIS.mjs";

let championNameToBeSelect=undefined//设置初始时需要秒选的英雄
export function setChampionName(name){//设置需要秒选的英雄
    championNameToBeSelect=name
}

const ACTIONS = {
    None() {
    },
    Matchmaking() {
    },
    Lobby() {
        if (STATES.isAutoStartMatch) {
            matchStart()
        }
    },
    ReadyCheck() {
        if (STATES.isAutoAcceptMatch) {
            matchAccept()
        }
    },
    ChampSelect() {
        if (STATES.isAutoSelectChampion) {
            selectChampion(findChampionID(championNameToBeSelect)).then(r => {})
            lockChampion(findChampionID(championNameToBeSelect)).then(r => {})
        }
    },
    InProgress() {
    },
    PreEndOfGame() {
    },
    EndOfGame() {
    },
    Reconnect() {
        console.log('重新连接')
    }
}

const STATES = {
    isAutoStartMatch: false,
    isAutoAcceptMatch: false,
    isAutoSelectChampion: false,
}


export function stateChanger(name, state) {
    if (name in STATES) {
        STATES[name] = state;
        console.log(`状态${name}更改为${state}`)
    } else console.log('没有这个状态,更改失败')
}

const runCenterHandler = async () => {
    await task//等待LCU-API的task被完成，也就是LOL启动

    setInterval(async () => {
        try {
            let gamePhaseData = await getGameflowPhase()
            //console.log(`当前游戏阶段${gamePhaseData}`)
            ACTIONS[gamePhaseData]?.()//根据游戏阶段执行相应的操作
        } catch (error) {
            console.log('获取游戏进程流失败', error)
        }

    }, 500)
}

runCenterHandler()