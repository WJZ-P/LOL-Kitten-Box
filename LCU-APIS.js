import {Hexgate as HttpsClient, LcuClient as WsClient} from "hexgate";
import {auth, poll} from "hexgate";

const credentials = await poll(auth)//获取鉴权，必须以管理员模式启动，不然会卡死
//console.log(credentials)//打印获取到的内容

const https = new HttpsClient(credentials)//构建http链接
const websocketClient = new WsClient(credentials)//构建ws链接


//下面是召唤师summoner方面的信息

/**
 *
 * @param path api地址
 * @param args 一般post用，传入参数
 * @param method 默认为get方法
 * @returns data 为API返回的数据json
 */
async  function getData(path,args=[],method='get'){
    return (await https.build(path).method(method).create()(args))?.data
}

/**
 *查询召唤师的基本信息
 * @param method 这是get或者post
 * @returns {Promise<*>} 返回的是类，为API返回的data
 */
async function getSummonerInfo(method='get')
{
    let func_to_run=https.build('/lol-summoner/v1/current-summoner').method(method).create()
    return (await func_to_run()).data
}

/**
 * 查询召唤师经验倍率信息
 * @param method
 * @returns {Promise<*>}
 */
async function getActiveBoosts(method='get')
{
    let func_to_run=https.build('/lol-active-boosts/v1/active-boosts').method(method).create()
    return (await func_to_run()).data
}



console.log(await getData('/lol-summoner/v1/current-summoner'))