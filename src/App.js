import logo from './logo.png';
import './App.css';
import {useState} from "react";
import {
    Button,
    FormControlLabel,
    FormGroup,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader,
    Switch
} from "@material-ui/core";
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';

export default function App() {
    return (
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
                <FormControlLabel
                    value="嘻嘻哈哈"
                    control={<Switch color="primary"/>}
                    label="我是一个开关哦！点击我看看！"
                    labelPlacement="start"
                    onChange={handleSwitch}
                />
                <h1>By WJZ_P</h1>
                <p>Hello there. How do you do?</p>
            </header>
            <Tic_tac_toe/>

            {/*下面是一个按钮*/}

        </div>

    );
}

function handleSwitch(event) {
    if(!event.target.checked) return null//只有选中才执行
    console.log('开关打开啦！')
    window.open('https://www.baidu.com')//打开百度网页
}

export function MyButton() {
    const [count, setCount] = useState(0)
    return (
        <button
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
        >你现在点击了我{count}次哦！</button>
    )
}

function MainListItems() {
    return (
        <div>
            <ListItem button>
                <ListItemIcon>
                    <DashboardIcon/>
                </ListItemIcon>
                <ListItemText primary="Dashboard"/>
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <ShoppingCartIcon/>
                </ListItemIcon>
                <ListItemText primary="Orders"/>
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <PeopleIcon/>
                </ListItemIcon>
                <ListItemText primary="Customers"/>
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <BarChartIcon/>
                </ListItemIcon>
                <ListItemText primary="Reports"/>
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <LayersIcon/>
                </ListItemIcon>
                <ListItemText primary="Integrations"/>
            </ListItem>
        </div>
    );
}

export const mainListItems =

    function AssignmentIcon() {
        return null;
    }

export const secondaryListItems = (
    <div>
        <ListSubheader inset>Saved reports</ListSubheader>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon/>
            </ListItemIcon>
            <ListItemText primary="Current month"/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon/>
            </ListItemIcon>
            <ListItemText primary="Last quarter"/>
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon/>
            </ListItemIcon>
            <ListItemText primary="Year-end sale"/>
        </ListItem>
    </div>
);

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
        const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
                return squares[a]//返回的是字符串值，X或者O
        }
        return null//没人赢就返回空
    }

    return (
        <div style={{backgroundColor: '#d5f6f5', margin: 'auto', width: '100%'}}>
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

        </div>
    )
}

function Square({value, onSquareClick}) {
    return (<Button className="square" onClick={onSquareClick}>{value}</Button>)
}
