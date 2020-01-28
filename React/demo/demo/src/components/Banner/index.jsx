import React, { Component } from 'react'
import PropTypes from "prop-types"
import PicContainer from "./PicContainer"
import "./index.css"
import ControlButton from "./ControlButton"
import ControlDot from "./ControlDot"

export default class Banner extends Component {
    
    static propTypes = {
        width:PropTypes.number.isRequired,
        height:PropTypes.number.isRequired,
        picList:PropTypes.array.isRequired,//图片地址
        autoDuration:PropTypes.number,
        duration:PropTypes.number,//完后切换动画的时间
    }

    static defaultProps = {
        width:640,
        height:320,
        picList:[],
        autoDuration:3000,
        duration:500,
    }
    state={
        switchIndex:0,
    }

    componentDidMount(){
        this.autoPlay()
    }
    autoPlay= _ =>{
        this.timer = setInterval(_=>{
            this.handleBtnControl('right')
        },this.props.autoDuration)
    }

    switchTo = e => {
        this.picContainer.switchTo(this.state.switchIndex)
    }

    picContainerRef = el =>{
        this.picContainer = el;
    }

    handleBtnControl = dir =>{
        let index = this.state.switchIndex;
        if(dir === 'prev'){
            index -= 1;
            if(index<0){
                index = this.props.picList.length-1
            }
        }else{
            index += 1;
            if(index>this.props.picList.length-1){
                index = 0
            }
        }
        this.setState({
            switchIndex:index
        },()=>{
            console.log(index)
            this.switchTo(index)
        })
    }

    switchPic = e =>{
        this.setState({
            switchIndex:e.target.value
        })
    }

    handleDotChange = index => {
        this.setState({
            switchIndex : index
        },()=>{
            clearInterval(this.timer)
            this.switchTo(index)
        })
    }
    render() {
        return (
            <div className="banner-container" style={{
                width:this.props.width,
                height:this.props.height
            }}>
                <ControlButton onChange = {this.handleBtnControl}/>
                <ControlDot 
                    onChange = {this.handleDotChange}
                    currentIndex = {this.state.switchIndex} 
                    total={this.props.picList.length}
                    onMouseOut = {this.autoPlay}
                />
                <PicContainer 
                    ref={this.picContainerRef} 
                    picSrcs={this.props.picList} 
                    picHeight={this.props.height} 
                    picWidth={this.props.width}
                    duration={this.props.duration}
                /> 
                <div style={{
                    position:"absolute",
                    left:10,
                    top:10
                }}>
                    <input type="number" value={this.state.switchIndex} onChange={this.switchPic}/>
                    <button onClick={this.switchTo}>切换</button>
                </div>
            </div>
        )
    }
}
