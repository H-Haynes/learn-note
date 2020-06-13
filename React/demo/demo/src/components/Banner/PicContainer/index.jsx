import React, { Component } from 'react'
import PropTypes from "prop-types"
import "./index.css"
export default class PicContainer extends Component {

    static propTypes = {
        picSrcs : PropTypes.array.isRequired,
        picWidth:PropTypes.number.isRequired,
        picHeight:PropTypes.number.isRequired,
        duration:PropTypes.number
    }
    static defaultProps = {
        picWidth:640,
        picHeight:320,
        duration:500
    }

    getPicList = () =>{
        const self = this;
        return this.props.picSrcs.map(ele =>(
                <a href={ele.href} key={ele.src} style={{
                    display:'inline-block',
                    float:"left",
                    height:self.props.picHeight,
                    width:self.props.picWidth,
                    }}>
                    <img alt={ele.text} src={ele.src} key={ele.src} style={{
                        height:"100%",
                        width:"100%"
                    }}/>
                </a>
        ))
    }


    //切换至指定图片，有动画
    switchTo = index => {
        const self = this;
        if(index<0){
            index = 0
        }else if(index > this.props.picSrcs.length-1){
            index = this.props.picSrcs.length-1
        }
        let targetMarginLeft = -index * this.props.picWidth
        let currentMarginLeft = parseInt(getComputedStyle(this.picContainer).marginLeft);
        //求次数做运动
        let times = Math.ceil(this.props.duration/16);
        let dis = (targetMarginLeft - currentMarginLeft) / times;
        let nowTimes = 0;
        clearInterval(this.timer)
        
        this.timer = setInterval(_=>{
            nowTimes ++;
            currentMarginLeft += dis
            this.picContainer.style.marginLeft =  currentMarginLeft+'px' 

            if(nowTimes === times){
                this.picContainer.style.marginLeft = targetMarginLeft
                clearInterval(this.timer);
            }
    
        },16)

    }

    getRef= el => {
        this.picContainer = el
    }

    render() {
        return (
            <div ref={this.getRef}  style={{
                width:this.props.picWidth * this.props.picSrcs.length,
                height:this.props.picHeight,
                transition:"margin 500ms linear  "
            }}>
                {this.getPicList()}
            </div>
        )
    }
}
