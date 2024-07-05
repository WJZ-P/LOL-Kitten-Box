import logo from '../assets/logo.png';
import {useEffect, useState} from "react";
import Stack from '@mui/material/Stack';
import '../App.css'
import {
    Avatar, Backdrop, Box, Button, CircularProgress, FormControlLabel, Portal, Switch, ThemeProvider, Typography
} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import {AccessibleForward} from "@mui/icons-material";

export default function Home() {
    return (<div className="Page Home">
            <header className="App-header">
                {/*这是我的抽屉组件*/}
                {/*<MyDrawer/>这里注释掉是因为已经通过route渲染了*/}
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    英雄联盟Kitten小助手
                </a>
                <MyButton/>
                <Stack direction="row" spacing={2}>
                    {/*很奇怪，stack里面改按钮大小，全部按钮大小是根据最大的来}*/}
                    <Box sx={{'& button': {m: 1}}}>
                        {/*所以引入了box*/}
                        <Button variant='text' color="primary" size='small' startIcon={<AccessibleForward/>}>
                            按钮1
                        </Button>
                        <Button variant="contained" color="primary" size='midium' endIcon={<SendIcon/>}>
                            按钮2
                        </Button>
                        <Button variant="outlined" color="primary" size={'large'} endIcon={<FavoriteBorderIcon/>}>
                            按钮3
                        </Button>
                        <SimpleBackDropButton/>
                    </Box>
                </Stack>
                <FormControlLabel
                    value="嘻嘻哈哈"
                    control={<Switch color="primary"/>}
                    label="打开是最大化应用，关闭是最小化应用"
                    labelPlacement="start"
                    onChange={handleSwitch}
                />
                <Box display="flex" alignItems="center"
                     sx={{p: 2, border: 5, borderColor: 'primary.light', bgcolor: 'primary'}}>
                    <Avatar alt="WJZ_P" src={process.env.PUBLIC_URL + '/wjz_p.jpg'}
                            sx={{mr: 2, height: 60, width: 60}}/>
                    <Typography variant="h5" component="h1">By WJZ_P</Typography>
                </Box>
            </header>
            <Tic_tac_toe/>

            {/*下面是一个按钮*/}
        </div>)
}

function handleSwitch(event) {
    if (!event.target.checked) {
        window.appWindowAPI.windowMinimize()
        return
    }//只有选中才执行
    //window.open('https://www.baidu.com')//打开百度网页
    window.appWindowAPI.windowMaximize()
}

function SimpleBackDropButton() {//一个简单的背景遮罩层
    const [open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(false)
    }
    const handleOpen = () => {
        setOpen(true)
    }
    return (<>
        {/*这里portal选择整个html元素为挂载节点，这样遮罩层保证盖住其他元素*/}
        <Button variant='contained' onClick={handleOpen} color={'primary'}>
            打开遮罩层</Button>
        <Portal container={() => document.documentElement}>
            <Backdrop open={open} onClick={handleClose}>
                <Box display="flex" alignItems="center" color={"white"}>
                    <CircularProgress color="inherit"/> <Typography color="white" ml={2} fontSize={25}>
                    飞速加载中(｡◕ˇ∀ˇ◕）...
                </Typography></Box>
            </Backdrop>
        </Portal>
    </>)
}


export function MyButton() {
    const [count, setCount] = useCacheState('test', 0)
    return (<button
        style={{
            backgroundColor: '#78d7d0', /* Green */
            padding: '15px 32px',
            textAlign: 'center',
            display: 'inline-block',
            fontSize: '20px',
            margin: '4px 2px',
            cursor: 'pointer',
            borderRadius: '12px'
        }}
        onClick={() => {
            setCount(count + 1)
            setTimeout(() => {
                console.log('嘻嘻哈哈' + count)
            }, 1000)
        }}
    >你现在点击了我{count}次哦！</button>)
}

//下面是井字棋相关的组件
function Tic_tac_toe() {
    const [squares, setSquares] = useState(Array(9).fill(null))
    const [xIsNext, setXIsNext] = useState(true)

    function handleClick(i) {
        if (squares[i] || calculateWinner(squares)) return

        const newSquares = squares.slice()
        xIsNext ? setXIsNext(false) : setXIsNext(true)

        if (xIsNext) {
            newSquares[i] = "X"
        } else newSquares[i] = "O"

        setSquares(newSquares)
    }

    const winner = calculateWinner(squares)
    let status;
    if (winner) {
        status = "胜利！胜者是: " + winner
    } else status = "下一个玩家: " + (xIsNext ? "X" : "O")


    function calculateWinner(squares) {
        const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a]//返回的是字符串值，X或者O
        }
        return null//没人赢就返回空
    }

    return (<div style={{backgroundColor: '#d5f6f5', margin: 'auto', width: '100%'}}>
        <div className="status" style={{fontSize: '45px', marginBottom: '5px'}}>
            {status}
        </div>

        <div className="board-row">
            <Square value={squares[0]} onSquareClick={() => {
                handleClick(0)
            }}/>
            <Square value={squares[1]} onSquareClick={() => {
                handleClick(1)
            }}/>
            <Square value={squares[2]} onSquareClick={() => {
                handleClick(2)
            }}/>
        </div>
        <div className="board-row">
            <Square value={squares[3]} onSquareClick={() => {
                handleClick(3)
            }}/>
            <Square value={squares[4]} onSquareClick={() => {
                handleClick(4)
            }}/>
            <Square value={squares[5]} onSquareClick={() => {
                handleClick(5)
            }}/>
        </div>
        <div className="board-row">
            <Square value={squares[6]} onSquareClick={() => {
                handleClick(6)
            }}/>
            <Square value={squares[7]} onSquareClick={() => {
                handleClick(7)
            }}/>
            <Square value={squares[8]} onSquareClick={() => {
                handleClick(8)
            }}/>
        </div>

    </div>)
}

function Square({value, onSquareClick}) {
    return (<Button className="square" onClick={onSquareClick}>{value}</Button>)
}

export function useCacheState(key, defaultValue) {
    const storage = window.localStorage

    function getCachedValue() {
        let cachedValue = storage.getItem(key);
        return cachedValue && JSON.parse(cachedValue).value
    }

    const [value, setValue] = useState(getCachedValue() ?? defaultValue)


    useEffect(() => {
        storage.setItem(key, JSON.stringify({
            value
        }))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return [value, setValue]
}