import React from 'react'
import PropTypes from "prop-types"

export default function SongList({songs}) {

    const list = songs.map(ele=>(

        <li>
            ele.name
        </li>
    ))
    return (
        <ul>
            {list}
        </ul>
    )
}
SongList.propTypes = {
    songs:PropTypes.array.isRequired
}
SongList.defaultProps = {
    songs :[]
}
