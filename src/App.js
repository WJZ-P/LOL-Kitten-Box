import './App.css';
import {createBrowserRouter, createHashRouter, RouterProvider} from "react-router-dom";
import {alpha, createTheme, getContrastRatio, ThemeProvider} from "@mui/material";
import Home from "./routes/home";
import React from "react";
import MyDrawer from "./components/DrawerComponent/MyDrawer";
import MainFunctionPage from "./routes/MainFunctionPage";
const green = '#00ff43'//定义绿色
const blue = '#66ccff'//定义蓝色
let theme = createTheme({
    palette: {
        primary: {
            main: blue,
            light: alpha(blue, 0.5),
            dark: alpha(blue, 0.9),
            contrastText: getContrastRatio(blue, '#fff') >= 4.5 ? '#000' : '#fff'
            //上面的方法是通过对比度来判断文字颜色的，如果大于4.5就用黑色，否则用白色
        }
    }
})

const router = createHashRouter([{
    path: "/", element: <MyDrawer/>, children: [{
        path: '/', element: <Home/>
    }, {
        path: '/MainFunctionPage', element: <MainFunctionPage/>
    }]
}]);

export default function App() {
    return (<ThemeProvider theme={theme}>
        <RouterProvider router={router}/>
    </ThemeProvider>)
}


