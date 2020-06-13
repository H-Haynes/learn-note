import React from 'react'
import PropTypes from "prop-types"
import "./index.css"
export default function Pagination({total,size,panelNum,currentPage,onPageChange}) {
    const totalPage = Math.ceil(total/size)
    const min =  getMinPanel(currentPage,panelNum)
    const max  = getMaxPanel(min,panelNum,totalPage)
    var pageList = [];
    for(let i = min;i<=max;i++){
        pageList.push(
            <span key={i}
                className={currentPage === i ?'current-page item' : 'item'}
                onClick={()=>trunPage(currentPage,i,onPageChange)}
                >{i}</span>)
    }


    return (
        <>
            <span 
                className={currentPage === 1 ? "item disabled" : "item"}
                onClick={()=>trunPage(currentPage,1,onPageChange)}>首页</span>
            <span 
                className={currentPage === 1 ? "item disabled" : "item"}
                onClick={()=>trunPage(currentPage,currentPage-1<1 ? 1 : currentPage-1,onPageChange)}
                >上一页</span>

                {pageList}
            <span 
                className={currentPage === Math.ceil(total/size) ? "item disabled" :"item"}
                onClick={()=>trunPage(currentPage,currentPage+1>totalPage ? totalPage : currentPage+1,onPageChange)}
                >下一页</span>
            <span 
                className={currentPage === Math.ceil(total/size) ? "item disabled" : "item"}
                onClick={()=>trunPage(currentPage,totalPage,onPageChange)}
                >尾页</span>
            <span>当前{currentPage} / {totalPage}页</span>
        </>
    )
}
Pagination.propTypes = {
    total:PropTypes.number.isRequired,  //数据总量
    size:PropTypes.number,  //每页多少条
    panelNum:PropTypes.number,   //显示多少页
    currentPage:PropTypes.number,
    onPageChange:PropTypes.func.isRequired
}
Pagination.defaultProps = {
    total:0,
    size:5,
    panelNum:5,
    currentPage:1,
}
/**
 * 改变页码函数
 */
function trunPage(currentPage,targetPage,handle){
    if(currentPage === targetPage) return;
    handle && handle(targetPage)
}
/**
 * 计算最小页
 */
function getMinPanel(currentPage,panelNum){
    var min = currentPage - Math.floor(panelNum/2)
    if(min<1) min = 1;
    return min
}
/**
 * 计算最大页
 */
function getMaxPanel(min,panelNum,totalPage){
    var max = min + panelNum -1;
    if(max>totalPage) max = totalPage;
    return max
}