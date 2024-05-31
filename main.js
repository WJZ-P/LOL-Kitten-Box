const {app, BrowserWindow} = require('electron')

//把创建窗口独立成一个函数
function createWindow() {
    let mainWin = new BrowserWindow({
        width: 800,
        height: 600,
    })
    mainWin.loadFile('.on(index.html')
    mainWin("close", () => {
        console.log("主窗口已关闭")
        mainWin=null//赋值为空
    })
}

app.on("ready", createWindow)//监听app打开事件，直接调用创建窗口函数