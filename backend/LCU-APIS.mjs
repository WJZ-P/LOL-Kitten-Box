import {Hexgate as HttpsClient, LcuClient as WsClient} from "hexgate";
import {auth, poll} from "hexgate";

async function initial() {
    console.log("初始化中...正在尝试获取鉴权")
    let result = await poll(auth)//获取鉴权，必须以管理员模式启动，不然会卡死
    console.log('鉴权获取成功')
    return result
//console.log(credentials)//打印获取到的内容
}

const credentials = await initial()

const https = new HttpsClient(credentials)//构建http链接
const ws = new WsClient(credentials)//构建ws链接

export const summonerInfo = await getSummonerInfo()//召唤师信息
const {
    summonerId,//召唤师ID,int
    accountId,//召唤师账户ID,int
    displayName,//召唤师名字,string,一般和gameName和internalName是一样的
    puuid,//召唤师PUUID,string
} = summonerInfo

export const championsInfo = (await getData(`/lol-champions/v1/inventories/${summonerId}/champions-minimal`)).map(
    (singaleChampionInfo) => ({
        title: singaleChampionInfo.name,
        id: singaleChampionInfo.id,
        name: singaleChampionInfo.title
    })
)

/*
根据名字或者称号查找英雄ID
 */
export function findChampionID(name) {
    return championsInfo.find(champion => (champion.name === name || champion.title === name))?.id
}

const friendsInfo = await getFriendsInfo()

const the5v5LobbyConfig = {
    'customGameLobby': {
        'configuration': {
            'gameMode': 'PRACTICETOOL',
            'gameMutator': '',
            'gameServerRegion': '',
            "gameTypeConfig": {//没用的好像
                "duplicatePick": true,
                "mainPickTimerDuration": 10,
            },
            'mapId': 11,
            'mutators': {'id': 1},
            'spectatorPolicy': 'AllAllowed',
            'teamSize': 5,

        },
        'lobbyName': '5V5训练模式',
        'lobbyPassword': '',
    },
    'isCustom': true
}

//'/lol-simple-dialog-messages/v1/messages' 这个接口可以有客户端弹窗，但是似乎无法显示文本
///lol-summoner/v1/check-name-availability/${name} 这个接口有问题，什么名字都返回false
// /lol-champ-select/v1/pin-drop-notification   这个接口显示选人的时候的红蓝方，每个队友的选路等信息
// /lol-champ-select/v1/session/bench/swap/777  可能是大乱斗选上面的英雄？还是和队友换？未测试,777是英雄ID
// /lol-gameflow/v1/watch/launch                观战的接口
// /lol-game-queues/v1/queues                   获取LOL所有游戏模式的信息
//睡眠函数
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//把json格式化成string
function stringifyJson(json) {
    return JSON.stringify(json, ' ', 4)
}

/**
 * 一个简单的获取data的函数
 * @param path api地址
 * @param args 一般post用，传入参数
 * @param method 默认为get方法
 * @returns data 为API返回的数据json
 */
export async function getData(path, args = [], method = 'get') {
    return (await https.build(path).method(method).create()(args))?.data
}

export async function postData(path, args = [], method = 'post') {
    try {
        return (await https.build(path).method(method).create()(args))?.data
    } catch (e) {
        console.log(e)
    }


}

/**下面是召唤师summoner方面的信息
 *
 *
 *
 *
 *
 */


/**
 *查询召唤师的基本信息
 * @param method 这是get或者post
 * @returns {Promise<*>} 返回的是类，为API返回的data
 */
export async function getSummonerInfo(method = 'get') {
    let func_to_run = https.build('/lol-summoner/v1/current-summoner').method(method).create()
    return (await func_to_run()).data
}

/**
 * 查询召唤师经验倍率信息
 * @param method
 * @returns {Promise<*>}
 */
export async function getActiveBoosts(method = 'get') {
    let func_to_run = https.build('/lol-active-boosts/v1/active-boosts').method(method).create()
    return (await func_to_run()).data
}

//自定义身份标识信息，有头像ID、旗帜信息、边框信息等
export async function getSummonerRegalia(args = []) {
    return getData('/lol-regalia/v2/current-summoner/regalia')
}

/**
 * 根据summonerId查询召唤师基本信息
 * @param id 为int数组，内容为summonerId
 * @returns infos 召唤师基本信息数组
 */
export async function getSummonerInfos(id) {
    let encodedIds = encodeURIComponent(`[${id}]`)
    return await getData(`/lol-summoner/v2/summoners?ids=${id}`)
}


/**
 * 下面是客户端本身相关的接口
 *
 *
 *
 *
 */

/**
 * 根据地图id获取地图信息
 * @param id    地图ID
 */
export async function getMapInfo(id) {
    return await getData(`/lol-maps/v1/map/${id}`)
}

/**
 * 获取所有地图信息
 */
export async function getAllMapInfo() {
    return await getData(`/lol-maps/v1/maps`)
}


/**
 * 发送客户端右上角的弹窗提示
 * @param title 标题
 * @param details 内容
 * @param backgroundUrl 背景图片
 * @param iconUrl icon图片，似乎没有作用
 * @returns data 为API返回的数据json
 */
export async function sendToast(title, details, backgroundUrl = '', iconUrl = '') {
    return postData('/player-notifications/v1/notifications', {
        detailKey: "pre_translated_details",
        titleKey: "pre_translated_title",
        data: {
            title: title,//标题
            details: details//内容
        },
        backgroundUrl: backgroundUrl,
        iconUrl: iconUrl,
        dismissible: false,
        state: "toast"//只能写这个，写别的似乎不会显示
    })
}

/**
 * 获取好友列表所有好友的信息,含puuid,summonerId,name,icon:int,等
 * @returns {Promise<*>}
 */
export async function getFriendsInfo() {
    return await getData('/lol-chat/v1/friends')
}

/**
 * 获取所有好友名字
 * @returns {name}
 */
export async function getFriendsNames() {
    return await getData('/lol-chat/v1/friends/summoner-names')
}

/**
 * 向好友发送信息
 * @param summonerName 召唤师名
 * @param message       发送的信息内容
 */
export async function sendMessageToFriend(summonerName, message) {
    let params = new URLSearchParams()
    params.append('summonerName', summonerName)
    params.append('message', message)
    return await postData(`/lol-game-client-chat/v1/instant-messages?${params.toString()}`)
}


/**
 * 下面是进入英雄选择阶段时可能用到的接口
 *
 *
 *
 *
 */

export async function selectChampion(championId) {
    return postData(`/lol-champ-select/v1/session/actions/${1}`, {
        "actorCellId": 0,
        "championId": championId,
        "completed": true,
        "id": 1,
        "isAllyAction": true,
        "type": "pick"
    }, 'patch')
}

/**
 * 获取当前选中的英雄信息
 * @returns championId 角色的ID，int
 */
export async function getSelectedChampion() {
    return getData('/lol-champ-select/v1/current-champion')
}

/**
 * 获取选人表格中所有英雄的信息
 * @returns {data} 所有英雄的信息
 */
export async function getAllGridChampions() {
    return getData('/lol-champ-select/v1/all-grid-champions')
}

/**
 * 获取当前可以ban的所有英雄ID
 * @returns [ids] 可以ban的英雄id
 */
export async function getAllBannableChampionIds() {
    return getData(`/lol-champ-select/v1/bannable-champion-ids`)
}

/**
 * 获取当前可以选择的所有英雄ID
 * @returns [ids] 可以pick的英雄id
 */
export async function getAllpickableChampionIds() {
    return getData(`/lol-champ-select/v1/pickable-champion-ids`)
}

/**
 * 选人阶段可用，获取当前房间的session，信息很丰富，敌我ban了什么英雄。gameID,是否自定义房间等
 * @returns {roomdata}
 */
export async function getchampSelectSession() {
    return getData(`/lol-champ-select/v1/session`,)
}

/**
 * 锁定英雄后调用，返回该英雄的皮肤以及炫彩的详细信息
 * @returns {data}
 */
export async function getChampionSkinCarousel() {
    return await getData(`/lol-champ-select/v1/skin-carousel-skins`,)

}

/**
 * 选人阶段可用，data包含puuid,选择英雄的name,summonerId等信息
 * @param slotid
 * @returns {Promise<*>}
 */
export async function champSelectGetSummonerInfo(slotid) {
    return await getData(`/lol-champ-select/v1/summoners/${slotid}`,)
}

/**
 * 锁定英雄接口，需要先选择英雄
 */
export async function lockChampion() {
    try {
        return await postData(`/lol-champ-select/v1/session/actions/${1}/select`,)
    } catch (error) {
        console.log('锁定英雄失败')
    }
}

/**
 * 创建房间
 */
export async function create5V5Lobby() {
    return await postData(`/lol-lobby/v2/lobby`, the5v5LobbyConfig)
}

/**
 * 获取自己的历史对局信息
 * @returns {Promise<LcuComponents["schemas"]["LolMatchHistoryMatchHistoryGame"][]>}
 */
export async function getMatchHistoryMyself() {
    return (await getData(`/lol-match-history/v1/products/lol/current-summoner/matches`,)).games.games
}

/**
 * 获取其他玩家的历史对局记录，根据puuid，返回的是数组,每一个的.participantIdentities属性有他的对局详细信息
 * @param puuid 玩家的puuid
 * @returns {Promise<LcuComponents["schemas"]["LolMatchHistoryMatchHistoryGame"][]>}
 */
export async function getMatchHistoryOthers(puuid) {
    return (await getData(`/lol-match-history/v1/products/lol/${puuid}/matches`)).games.games
}

/**
 * 查询所有符文的详细信息
 */
export async function getPerksInfo() {
    return await getData(`/lol-perks/v1/perks`,)
}

/**
 * 对局相关接口
 *
 *
 */

/**
 * 开始寻找对局
 * @returns undefined
 */
export async function matchStart() {
    try {
        console.log('自动寻找对局中！')
        return await postData(`/lol-lobby/v2/lobby/matchmaking/search`)
    } catch (error) {
        console.log(`因退出房间，自动开始寻找对局失败`)
    }
}

/**
 * 寻找对局中使用，自动接受对局
 * @returns undefined
 */
export async function matchAccept() {
    try {
        let temp_data = await postData(`/lol-matchmaking/v1/ready-check/accept`)
        console.log(`正在尝试自动接受对局`)
        return temp_data
    } catch (error) {
        console.log('自动接受对局失败')
    }
}

export async function getGameflowPhase() {
    try {
        return await getData('/lol-gameflow/v1/gameflow-phase')
    } catch (error) {
        console.log('getGameflowPhase函数出错，获取游戏进程流失败')
    }
}


/**
 * 选择炫彩,需要选择对应英雄后才能用（不需要锁定，目前仅训练营可用，国服修复了该接口）
 * @param skinid
 * @returns {Promise<*>}
 */
export async function setChampionChroma(skinid) {
    return await postData(`/lol-champ-select/v1/session/my-selection`, {selectedSkinId: skinid}, 'patch')
}

/**
 * 自动再开一局
 * @returns {Promise<*>}
 */
export async function playAgain() {
    return await postData(`/lol-lobby/v2/play-again`)
}

//console.log(await getMatchHistoryOthers(puuid))
//console.log(await getMapInfo(30))