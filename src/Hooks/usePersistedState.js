import {useState, useEffect} from 'react';

export default function usePersistedState(key, initialState) {
    const storage = window.localStorage;

    const [state, setState] = useState(initialState)//设置组件的初始值
    const [loaded, setLoaded] = useState(false)//设置是否加载完成的状态

    function getCachedState() {
        let cachedState = storage.getItem(key);//获取缓存的状态
        setLoaded(true)
        return cachedState && JSON.parse(cachedState).value//返回缓存的状态
    }

    useEffect(() => {
        setState(getCachedState() ?? initialState);//设置组件的初始值
    }, []);//只在组件第一次渲染时执行

    useEffect(() => {
        if (!loaded) {
            return;
        }
        storage.setItem(key, JSON.stringify({state}));
    }, [state, loaded])

    return [state, setState];
};//只在组件第一次渲染时执行
