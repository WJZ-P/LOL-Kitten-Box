import {auth, Hexgate as HttpsClient, LcuClient as WsClient, poll} from "hexgate";
import { matchAccept, matchStart } from './LCU-APIS.mjs';

const credentials = await poll(auth)//获取鉴权，必须以管理员模式启动，不然会卡死
//console.log(credentials)//打印获取到的内容

const https = new HttpsClient(credentials)//构建http链接
const ws = new WsClient(credentials)//构建ws链接


/**
 * 自动接受对局
 * @returns {Promise<void>}
 */
export async function autoAcceptMatch() {
    ws.subscribe('OnJsonApiEvent_lol-matchmaking_v1_ready-check', async (data) => {
        await matchAccept();
    })
}

export async function unAutoAcceptMatch() {
    ws.unsubscribe('OnJsonApiEvent_lol-matchmaking_v1_ready-check')
}


export async function autoStartMatch() {
    ws.subscribe('OnJsonApiEvent_lol-lobby_v2_party-active', async (data) => {
        await matchStart()
    })
}

export async function unAutoStartMatch() {
    ws.unsubscribe('OnJsonApiEvent_lol-lobby_v2_party-active')
}