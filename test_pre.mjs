import {auth, Hexgate as HttpsClient, LcuClient as WsClient, poll} from "hexgate";
import cluster from "cluster";

async function initial() {
    console.log("初始化中...正在尝试获取鉴权")
    let result = await poll(auth)//获取鉴权，必须以管理员模式启动，不然会卡死
    console.log('鉴权获取成功')
    return result
//console.log(credentials)//打印获取到的内容
}

let credentials = undefined
let https = undefined
let ws = undefined

if (cluster.isMaster) {
    cluster.fork()//创建子进程
    cluster.on('message', (worker, message, handle) => {
        console.log(`主进程收到了信息 ${worker.process.pid}: ${message}`);
        //console.log(message)
    });
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
    })
} else {
    credentials = await initial()//子进程获取credentials
    https = new HttpsClient(credentials)//构建http链接
    ws = new WsClient(credentials)//构建ws链接
    process.send({credentials, https, ws})//发送credentials到主进程

    console.log('尝试在子进程中执行函数')
    console.log(await getSummonerInfo())//在子进程中执行函数
}

export async function getSummonerInfo(method = 'get') {
    let func_to_run = https.build('/lol-summoner/v1/current-summoner').method(method).create()
    return (await func_to_run()).data
}