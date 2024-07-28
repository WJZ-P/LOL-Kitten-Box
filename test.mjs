import cluster from "cluster";

if (cluster.isPrimary){
    console.log('主进程，启动！')
    //下面启动子进程
    cluster.fork()
    setInterval(() => {
        console.log('主进程没卡死')
    },1000)
}
else{
    console.log('子进程，启动！')
    while(true) {
    }
}