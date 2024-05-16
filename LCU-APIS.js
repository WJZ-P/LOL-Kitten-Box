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
 * 下面是进入英雄选择阶段时可能用到的接口
 *
 *
 *
 *
 */

let ids=encodeURIComponent('['+[summonerId]+']')
console.log(await getData(`/lol-summoner/v2/summoners?ids=${encodeURIComponent(`[${summonerId}]`)}`,))