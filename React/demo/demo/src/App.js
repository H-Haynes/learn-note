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


//高阶组件的测试
var TestmodalLog = HocTest(Testmodal);
var RadioLog = HocTest(RadioGroupTest)
var SelectLog = HocTest(SelectGroup)
var CheckBoxLog = HocTest(CheckBoxGroupTest)

function App() {

  return (
    <div className="App">
      <BannerTest /> 
      {/* <StateHook /> */}
      <SongListTest />
      <header className="App-header">
      <TestmodalLog />
          
      </header>
          <Grail height={300} children={<FormTest></FormTest>} 
          left={<ul>
            <li>首页</li>
            <li>菜单</li>
            <li>购买</li>
            <li>开发文档</li>
            <li>技术支持</li>
            <li>联系我们</li>
            </ul>} 
          right={
            <div>
              <div>
                  <h5>公告</h5>
                  <p>2020年春节放假通知    2020-01-19 22:11:00</p>
                  <p>系统升级公告 2020-01-11 22:11:11</p>
              </div>
              <ContextFormTest />
            </div>
          }/>
          <CheckBoxLog />
          <RadioLog />
          <SelectLog />
    </div>
  );
}

export default App;
