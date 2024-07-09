import {useState, useEffect} from 'react';
import Store from 'electron-store';
import * as path from "path";

const store = new Store({
    cwd: path.join(process.resourcesPath, 'data')
})
export default function usePersistedState(key, initialState) {
    const [state, setState] = useState(() => {
        const storedState = store.get(key);
        return storedState !== undefined ? storedState : initialState;
        //没有缓存的时候返回默认值
    })

    useEffect(() => {
        store.set(key, state);
    }, [state]);
    return [state, setState];
}
