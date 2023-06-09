import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <div className='header'>
            <Link to={'/'}>  <button className='btn-header'>main</button></Link>
            <Link to={'/favorites'}> <button className='btn-header'>favorites</button> <br /></Link>
        </div>
    )
}



