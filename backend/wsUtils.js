import * as LcuApi from './LCU-APIS.js'
import {auth, Hexgate as HttpsClient, LcuClient as WsClient, poll} from "hexgate";
import {matchAccept, matchStart} from "./LCU-APIS.js";

const credentials = await poll(auth)//获取鉴权，必须以管理员模式启动，不然会卡死
//console.log(credentials)//打印获取到的内容

const https = new HttpsClient(credentials)//构建http链接
const ws = new WsClient(credentials)//构建ws链接

//下面定义一些bool类型的变量，判断是否需要开启对应功能
let isAutoAcceptMatch = true
let isautoStartMatch = true


/**
 * 自动接受对局
 * @returns {Promise<void>}
 */
async function autoAcceptMatch() {
    ws.subscribe('OnJsonApiEvent_lol-matchmaking_v1_ready-check', async (data) => {
        if (isAutoAcceptMatch) await matchAccept();
    })
}


async function autoStartMatch() {
    ws.subscribe('OnJsonApiEvent_lol-lobby_v2_party-active', async (data) => {
        if (isautoStartMatch) await matchStart()
    })
}



await autoAcceptMatch()
await autoStartMatch()