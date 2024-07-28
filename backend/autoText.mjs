import {clipboard, Key, keyboard} from "@nut-tree/nut-js";

keyboard.config.autoDelayMs = 10;

// 获取剪贴板内容
export async function getClipBoardContent() {
    return await clipboard.getContent()
}

// 设置剪贴板内容
export async function setClipBoardContent(content) {
    return await clipboard.setContent(content)
}

// 从剪贴板粘贴内容(ctrl+v)
export async function pasteFromClipBoard() {
    await keyboard.type(Key.LeftControl, Key.V)

}
export async function typeContent(content) {

}

export async function test123() {
    await keyboard.type(Key.Enter)
    await pasteFromClipBoard()
    await keyboard.type(Key.Enter)
}


// //定期执行 test 函数
// (async () => {
//     while (1) {
//         await test123();
//         await new Promise(resolve => setTimeout(resolve, 100));
//     }
// })();


