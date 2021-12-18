import React, { Component } from 'react'
import propTypes from "prop-types"
import BannerItem from "./BannerItem"
import "./index.css"
export default class index extends Component {
    static propTypes = {
        width:propTypes.string.isRequired, // 容器宽度
        height:propTypes.string.isRequired, // 容器高度
        imgs:propTypes.array, // 图片地址列表
        interval:propTypes.number, // 自动切换间隔时间
        duration:propTypes.number, // 切换过程时间
    }

    state = {
        index:0
    }

    handlePrev = () =>{
        clearInterval(this.timer)
        this.setState({
            index:this.state.index == 0 ? this.props.imgs.length - 1 : this.state.index - 1 
        },()=>{
            this.autoPlay()
        })
    }
    handleNext = () =>{
        clearInterval(this.timer)

        this.setState({
            index:this.state.index == this.props.imgs.length - 1 ? 0 : this.state.index + 1 
        },()=>{
            this.autoPlay();
        })
    }
    wrapRef = React.createRef();

    timer=null;
    autoPlay = () =>{
        this.timer = setInterval(this.handleNext,this.props.interval);
    }

    componentDidMount(){
        this.autoPlay();
    }


    render() {
        const bannerList = this.props.imgs.map(ele=><BannerItem src={ele} key={ele} width={this.props.width} height={this.props.height}></BannerItem>);
        return (
            <div className="banner-wrap" ref={this.wrapRef} style={{width:this.props.width,height:this.props.height}}>
                <ul style={{
                    // left:this.state.index * - (100 / this.props.imgs.length-1)  + '%' ,
                    left:this.state.index * -this.wrapRef.current?.offsetWidth||0 ,
                    transitionDuration:this.props.duration 
                    }}>
                    {bannerList}
                </ul>
                <span className="banner-prev-btn" onClick={this.handlePrev}>&lt;</span>
                <span className="banner-next-btn" onClick={this.handleNext}>&gt;</span>

            </div>
        )
    }
}
