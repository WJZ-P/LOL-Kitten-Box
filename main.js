import {Hexgate as HttpsClient, LcuClient as WsClient} from "hexgate";
import {auth,poll} from "hexgate";

const credentials=await poll(auth)
console.log(credentials)