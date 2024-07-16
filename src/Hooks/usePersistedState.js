import {useState, useEffect} from 'react';

export default function usePersistedState(key, initialState) {
    const storage = window.localStorage;

    const [state, setState] = useState(getCachedState() ?? initialState)//设置组件的初始值

    function getCachedState() {
        let cachedState = storage.getItem(key);//获取缓存的状态
        //console.log(cachedState)
        return cachedState && JSON.parse(cachedState).value//返回缓存的状态
    }

    useEffect(() => {
        storage.setItem(key, JSON.stringify({value:state}));
    }, [state])

    return [state, setState];
};//只在组件第一次渲染时执行
