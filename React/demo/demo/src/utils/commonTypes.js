//类型限制

import PropTypes from "prop-types"

export default{
    children:PropTypes.node,
    datas:PropTypes.arrayOf(PropTypes.shape({
        text:PropTypes.oneOf([PropTypes.number,PropTypes.string]).isRequired,
        value:PropTypes.oneOf([PropTypes.number,PropTypes.string]).isRequired
    })),  //多选，单选，下拉组的数据来源
    
}