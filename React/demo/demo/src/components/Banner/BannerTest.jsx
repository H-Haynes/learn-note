import React, { Component } from 'react'
import Banner from "./index"
export default class BannerTest extends Component {

    static defaultProps = {
        picList:[
            {
                text:"装修钜惠",
                href:"http://www.baidu.com",
                src:"http://www.cnjcqm.org/thumb/201812/YemrJrHyYalYyZjZNNEE5PTI9N19iYjI2NDkyN18xXzFfamNxbXho_NeWrMrxyYajNhMjU1OTdiMA==.jpg"
            },
            {
                text:"春节联欢晚会",
                href:"http://imdeveloper.cn",
                src:"http://img4.imgtn.bdimg.com/it/u=842858925,2456191357&fm=26&gp=0.jpg"
            },
            {
                text:"情人节约恵",
                href:"http://www.alibaba.com",
                src:"http://pic.xcarimg.com/dealer/upload/attach/20140730/7af7ccb7059f1b005b288376c6a6cceb.jpg"
            },
            {
                text:"清明节踏青",
                href:"http://www.tencent.com",
                src:"http://img.redocn.com/shejigao/20140325/20140325_a239dcb2e95bf88efe2amQMK0WJ5Qb8E.jpg"
            },
            {
                text:"国庆盛典",
                href:"http://www.jd.com",
                src:"http://img4.imgtn.bdimg.com/it/u=425716194,524577532&fm=26&gp=0.jpg"
            }
        ],
        width:750,
        height:375,
        duration:300,
        autoDuration:2000,

    }

    render() {
        return (
            <div>
                <Banner {...this.props} />
            </div>
        )
    }
}
