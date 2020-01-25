import React, { Component } from 'react'
import "./index.css"
export default class Form extends Component {
    state = {
        account:"",
        password:"",
        sex:"male",
        book:["翔龙十巴掌","酒瘾真经","随缘棍法"],
        library:[
            {
                value:"翔龙十巴掌",
                text:"降龙十八掌"
            },
            {
                value:"九阳豆浆机",
                text:"九阳神功"
            },
            {
                value:"随缘棍法",
                text:"打狗棍法"
            },
            {
                value:"酒瘾真经",
                text:"九阴真经"
            },
            {
                value:"屁股向后平沙落地式",
                text:"雁荡功"
            }
        ],
        city:"北京",
    }


    onChange = e => {
        let val = e.target.value;
        let name = e.target.name;

        if(e.target.type=='checkbox'){//复选框
            if(e.target.checked){//选中
                val = [...this.state[name],val]
            }else{//取消选中
                val = this.state[name].filter(ele=>ele !== val)
            }
        }
        this.setState({
            [name] : val
        })
    }
    /**
     * 获取所有已选书籍
     */
    getBook(){
        const bookEle = this.state.library.map(ele=>(
            <label key={ele.value}>
                <input  name="book" type="checkbox" checked={this.state.book.includes(ele.value)} value={ele.value} onChange={this.onChange}/>
                {ele.text}
            </label>
        ))
        return bookEle
    }

    render() {
        return (
            <div className="form-test">
                <label>
                    <span>账号:</span>
                    <input type="text" value={this.state.account} name="account" onChange={this.onChange}/>
                </label>

                <label>
                    <span>密码:</span>
                    <input type="password" value={this.state.password} name="password" onChange={this.onChange}/>
                </label>
                <label>
                    <span>城市:</span>
                    <select value={this.state.city} name="city" onChange={this.onChange}>
                        <option value="天津">天津</option>
                        <option value="北京">北京</option>
                        <option value="四川">四川</option>
                    </select>
                </label>

                <div>
                    <span>性别:</span>
                    <input type="radio" value="male" name="sex" checked={this.state.sex=='male'} onChange={this.onChange} />男
                    <input type="radio" value="female" name="sex" checked={this.state.sex=='female'} onChange={this.onChange}/>女
                </div>
                
                <div>
                    {this.getBook()}
                </div>
                
            </div>
        )
    }
}
