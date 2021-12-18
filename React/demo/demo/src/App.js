import React from 'react';
import logo from './logo.svg';
import './App.css';
import Testmodal from "./Testmodal";
import Grail from "./components/Grail"
import FormTest from "./components/FormTest"
import CheckBoxGroupTest from "./components/CheckBoxGroup/CheckBoxGroupTest"
import RadioGroupTest from "./components/RadioGroup/RadioGroupTest"
import SelectGroup from "./components/SelectGroup/SelectGroupTest"
import HocTest from "./HOC/HocTest"
import BannerTest from "./components/Banner/BannerTest"
import ContextFormTest from "./components/ContextForm/Test"
import StateHook from "./components/StateHook"
import SongListTest from "./components/SongList/SongListTest"
import {BrowserRouter as Router,Link,Route,Switch} from "react-router-dom"
import Home from "./pages/home"
import Login from "./pages/login.js"
import person from "./pages/person"
import ProtectedRoute from "./components/ProtectedRoute"
// import RouterGuard from "./components/RouterGuard"
import Banner from "./components/Banner1"
//高阶组件的测试
var TestmodalLog = HocTest(Testmodal);
var RadioLog = HocTest(RadioGroupTest)
var SelectLog = HocTest(SelectGroup)
var CheckBoxLog = HocTest(CheckBoxGroupTest)

function App() {
  const imgs = [
    "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fgss0.baidu.com%2F-4o3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2F0823dd54564e9258ed95d6f59f82d158ccbf4e03.jpg&refer=http%3A%2F%2Fgss0.baidu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642312229&t=69441f636e96b72ae2ed829a9357dcff",
    "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Ff%2F548128fe6d6c9.jpg%3Fdown&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642312270&t=a105b7ddbcae177b3d2c3af7a7b4adb5",
    "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2018-05-17%2F5afd6b88bd342.jpg%3Fdown&refer=http%3A%2F%2Fpic1.win4000.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642312282&t=9925b5f7d5d6aa24fba3c432eb8f2cc7",
    "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg9.51tietu.net%2Fpic%2F2019-090913%2Fleym1ra3ksfleym1ra3ksf.jpg&refer=http%3A%2F%2Fimg9.51tietu.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1642312296&t=c5dd8962c05cd20d1837aaa8b162dbbd",
    "https://img2.baidu.com/it/u=3270515757,473123100&fm=26&fmt=auto"
  ]
  return (
    // <RouterGuard onBeforeChange={(prev,cur,action,commit)=>{
    //   console.log(  `页面想要跳转`)
    //   commit(true)
    // }}>
    //   <div className="App">
    //   <BannerTest /> 
    //   {/* <StateHook /> */}
    //   <SongListTest />
    //   <header className="App-header">
    //   <TestmodalLog />
        
    //   </header>
    //       <Grail height={300} children={<FormTest></FormTest>} 
    //       left={<ul>
              
    //         <li><Link to="/">首页</Link></li>
    //         <li><Link to="/person">个人中心</Link></li>
    //         <li><Link to="/buy">购买</Link></li>
    //         <li>开发文档</li>
    //         <li>技术支持</li>
    //         <li>联系我们</li>
    //         </ul>} 
    //       right={
    //         <div>
    //           {/* <div>
    //               <h5>公告</h5>
    //               <p>2020年春节放假通知    2020-01-19 22:11:00</p>
    //               <p>系统升级公告 2020-01-11 22:11:11</p>
    //           </div>
    //           <ContextFormTest /> */}
    //           <Switch>
    //             <Route path="/login" component={Login}></Route>
    //             <Route path="/home" component={Home}></Route>
    //             <ProtectedRoute path="/person" component={person}></ProtectedRoute>
    //             {/* <Route path="/person" component={person}></Route> */}

    //           </Switch>
    //         </div>
    //       }/>
    //       <CheckBoxLog />
    //       <RadioLog />
    //       <SelectLog />


    // </div>
    // </RouterGuard>
    <Banner width={"500px"} height={"400px"} imgs={imgs} duration={1000} interval={2000}></Banner>
  );
}

export default App;
