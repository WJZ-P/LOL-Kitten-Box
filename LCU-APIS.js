import {Hexgate as HttpsClient, LcuClient as WsClient} from "hexgate";
import {auth, poll} from "hexgate";

const credentials = await poll(auth)//获取鉴权，必须以管理员模式启动，不然会卡死
//console.log(credentials)//打印获取到的内容

const https = new HttpsClient(credentials)//构建http链接
const websocketClient = new WsClient(credentials)//构建ws链接

const summonerInfo = await getSummonerInfo()//召唤师信息
const {
    summonerId,//召唤师ID,int
    accountId,//召唤师账户ID,int
    displayName,//召唤师名字,string,一般和gameName和internalName是一样的
    puuid,//召唤师PUUID,string
} = summonerInfo

//'/lol-simple-dialog-messages/v1/messages' 这个接口可以有客户端弹窗，但是似乎无法显示文本
///lol-summoner/v1/check-name-availability/${name} 这个接口有问题，什么名字都返回false
// /lol-champ-select/v1/pin-drop-notification   这个接口显示选人的时候的红蓝方，每个队友的选路等信息
// /lol-champ-select/v1/session/bench/swap/777  可能是大乱斗选上面的英雄？还是和队友换？未测试,777是英雄ID

//睡眠函数
function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * 一个简单的获取data的函数
 * @param path api地址
 * @param args 一般post用，传入参数
 * @param method 默认为get方法
 * @returns data 为API返回的数据json
 */
async function getData(path, args = [], method = 'get') {
    return (await https.build(path).method(method).create()(args))?.data
}

async function postData(path, args = [], method = 'post') {
    return (await https.build(path).method(method).create()(args))?.data
}

async function putData(path, args = [], method = 'put') {
    return (await https.build(path).method(method).create()(args))?.data
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
async function getSummonerInfo(method = 'get') {
    let func_to_run = https.build('/lol-summoner/v1/current-summoner').method(method).create()
    return (await func_to_run()).data
}

/**
 * 查询召唤师经验倍率信息
 * @param method
 * @returns {Promise<*>}
 */
async function getActiveBoosts(method = 'get') {
    let func_to_run = https.build('/lol-active-boosts/v1/active-boosts').method(method).create()
    return (await func_to_run()).data
}

//自定义身份标识信息，有头像ID、旗帜信息、边框信息等
async function getSummonerRegalia(args = []) {
    return getData('/lol-regalia/v2/current-summoner/regalia')
}

/**
 * 根据summonerId查询召唤师基本信息
 * @param id 为int数组，内容为summonerId
 * @returns infos 召唤师基本信息数组
 */
async function getSummonerInfos(id){
    let encodedIds=encodeURIComponent(`[${id}]`)
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
 * 发送客户端右上角的弹窗提示
 * @param title 标题
 * @param details 内容
 * @param backgroundUrl 背景图片
 * @param iconUrl icon图片，似乎没有作用
 * @returns data 为API返回的数据json
 */
async function sendToast(title,details,backgroundUrl='',iconUrl=''){
    return postData('/player-notifications/v1/notifications',{
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
async function getFriendsInfo(){
    return await getData('/lol-chat/v1/friends')
}

/**
 * 获取所有好友名字
 * @returns {name}
 */
async function getFriendsNames(){
    return await getData('/lol-chat/v1/friends/summoner-names')
}

/**
 * 向好友发送信息
 * @param summonerName 召唤师名
 * @param message       发送的信息内容
 */
async function sendMessageToFriend(summonerName,message){
    let params=new URLSearchParams()
    params.append('summonerName',summonerName)
    params.append('message',message)
    return await postData(`/lol-game-client-chat/v1/instant-messages?${params.toString()}`)
}


/**
 * 下面是进入英雄选择阶段时可能用到的接口
 *
 *
 *
 *
 */


/**
 * 获取当前选中的英雄
 * @returns championId 角色的ID，int
 */
async function getSelectedChampion(){
    return getData('/lol-champ-select/v1/current-champion')
}

/**
 * 获取选人表格中所有英雄的信息
 * @returns {data} 所有英雄的信息
 */
async function getAllGridChampions() {
    return getData('/lol-champ-select/v1/all-grid-champions')
}

/**
 * 获取当前可以ban的所有英雄ID
 * @returns [ids] 可以ban的英雄id
 */
async function getAllBannableChampionIds(){
    return getData(`/lol-champ-select/v1/bannable-champion-ids`)
}

/**
 * 获取当前可以选择的所有英雄ID
 * @returns [ids] 可以pick的英雄id
 */
async function getAllpickableChampionIds(){
    return getData(`/lol-champ-select/v1/pickable-champion-ids`)
}

/**
 * 选人阶段可用，获取当前房间的session，信息很丰富，敌我ban了什么英雄。gameID,是否自定义房间等
 * @returns {roomdata}
 */
async function getchampSelectSession(){
    return getData(`/lol-champ-select/v1/session`,)
}

/**
 * 锁定英雄后调用，返回该英雄的皮肤以及炫彩的详细信息
 * @returns {data}
 */
async function getChampionSkinCarousel(){
    return await getData(`/lol-champ-select/v1/skin-carousel-skins`,)

}

/**
 * 选人阶段可用，data包含puuid,选择英雄的name,summonerId等信息
 * @param slotid
 * @returns {Promise<*>}
 */
async function champSelectGetSummonerInfo(slotid){
    return await getData(`/lol-champ-select/v1/summoners/${slotid}`,)
}


for(let i=0;i<100;i++){
    await sendMessageToFriend('看破虚妄',`测试，这是第${i}条消息`)
    await sleep(200)
}



