import logo from './logo.png';
import './App.css';
import {useState} from "react";
import {
    Button, FormControlLabel, FormGroup, ListItem, ListItemIcon, ListItemText, ListSubheader, Switch
} from "@material-ui/core";
import Stack from '@mui/material/Stack';
import {alpha, Avatar, Box, createTheme, getContrastRatio, ThemeProvider} from "@mui/material";
import {AccessibleForward} from "@material-ui/icons";
import SendIcon from '@mui/icons-material/Send';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
const green = '#00ff43'//定义绿色

let theme = createTheme({
    palette: {
        primary: {
            main: green,
            light: alpha(green, 0.5),
            dark: alpha(green, 0.9),
            contrastText: getContrastRatio(green, '#fff') >= 4.5 ? '#000' : '#fff'
            //上面的方法是通过对比度来判断文字颜色的，如果大于4.5就用黑色，否则用白色
        }
    }
})


export default function App() {
    return <ThemeProvider theme={theme}>
        <div className="App">
            <header className="App-header">
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
                        <Button variant='text' color="primary" size='small' startIcon={<AccessibleForward />}>
                            按钮1
                        </Button>
                        <Button variant="contained" color="primary" size='midium' endIcon={<SendIcon />}>
                            按钮2
                        </Button>
                        <Button variant="outlined" color="primary" size={'large'} endIcon={<FavoriteBorderIcon/>}>
                            按钮3
                        </Button>
                    </Box>
                </Stack>
                <FormControlLabel
                    value="嘻嘻哈哈"
                    control={<Switch color="primary"/>}
                    label="打开是最大化应用，关闭是最小化应用"
                    labelPlacement="start"
                    onChange={handleSwitch}
                />
                <Avatar alt={'WJZ_P'} src={'./public/wjz_p.png'}/>
                <h1>By WJZ_P</h1>
            </header>
            <Tic_tac_toe/>

            {/*下面是一个按钮*/}
        </div>
    </ThemeProvider>;
}

function handleSwitch(event) {
    if (!event.target.checked) {
        window.appWindowAPI.windowMinimize()
        return
    }//只有选中才执行
    //window.open('https://www.baidu.com')//打开百度网页
    window.appWindowAPI.windowMaximize()
}

export function MyButton() {
    const [count, setCount] = useState(0)
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
