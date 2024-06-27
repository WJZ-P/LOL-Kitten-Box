const {contextBridge,ipcRenderer} = require("electron")

//定义一些通信方法
contextBridge.exposeInMainWorld('appWindowAPI',{
  windowMinimize:()=>{ipcRenderer.send('minimize')},
  windowMaximize:()=>{ipcRenderer.send('maximize')}
})


window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
})