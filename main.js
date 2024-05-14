import {Hexgate as HttpsClient, LcuClient as WsClient} from "hexgate";
import {auth,poll} from "hexgate";
const credentials=await poll(auth)//获取鉴权，必须以管理员模式启动，不然会卡死
console.log(credentials)//打印获取到的内容

const https=new HttpsClient(credentials)//构建http链接
const websocketClient=new WsClient(credentials)//构建ws链接

const getSummonersFromNames=https.build('/lol-matchmaking/v1/search').method('get').create()

const summoner=await getSummonersFromNames()
console.log(summoner.data)
