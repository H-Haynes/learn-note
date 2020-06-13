import React,{useEffect} from 'react'
import useReducer from "../../myHook/useReducer"
import Pagination from "../common/Pagination"

// import song from "./index"
import axios from 'axios'

import "./songlist.css"
export default function SongListTest() {
    const [currentPage,currentDispatch] = useReducer(commonReducer,1)
    const [songs,songsDispatch] = useReducer(commonReducer,[])
    const [size] = useReducer(commonReducer, 10)
    const [total, totalDispatch] = useReducer(commonReducer,0)
    const [keywords, keywordsDispatch] = useReducer(commonReducer,'热门')
    // const [currentPage, setCurrentPage] = useState(1);
    // const [songs, setSongs] = useState([]);
    // const [size, setSize] = useState(10);
    // const [total, setTotal] = useState(0);
    // const [keywords, setKeywords] = useState("热门")
    /*获取歌曲列表 */
    useEffect(() => {
        (async function(){
            await  axios.post("/search",{
                keywords:keywords,
                limit:size,
                offset:(currentPage-1) * size
            }).then(res=>{
                console.log(res)
                // setSongs(res.data.result.songs)
                songsDispatch({preload:res.data.result.songs})
                // setTotal(res.data.result.songCount)
                totalDispatch({preload:res.data.result.songCount})
            })
        })()
    }, [currentPage,keywords,size]);
    const keywordsRef = React.createRef()
    const list = songs.map(ele=><li className='song' key={ele.id}>{ele.name} - {ele.artists[0].name}</li>)
    return (
        <div className="songlist">
            <p className="title">音乐列表</p>
            <div className="searchBar">
                <input ref={keywordsRef} type="text" placeholder="请输入歌曲名" ></input>
                <button onClick={()=>{
                    // setKeywords(keywordsRef.current.value);
                    keywordsDispatch({preload:keywordsRef.current.value})
                    // setCurrentPage(1);
                    currentDispatch({type:"",preload:1})
                }}>搜索</button>
            </div>
            <ul className="list">
                {list}
            </ul>
            <Pagination size={size} total={total} panelNum={5} currentPage={currentPage} onPageChange={(page)=>currentDispatch({type:"",preload:page})}/>
        </div>
    )
}

function commonReducer(name,action){
    return action.preload
}