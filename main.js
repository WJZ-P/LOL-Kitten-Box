const {app, BrowserWindow} = require('electron')

//把创建窗口独立成一个函数
function createWindow() {
    let mainWin = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true//允许在渲染进程中使用node
        }
    })
    mainWin.loadFile('index.html')
    mainWin.on("close", () => {
        console.log("主窗口已关闭")
        mainWin=null//赋值为空
    })
}

app.on("ready", createWindow)//监听app打开事件，直接调用创建窗口函数
app.on("window-all-closed", ()=>{
    console.log('所有窗口都关闭啦，下面退出程序')
    app.quit()
})