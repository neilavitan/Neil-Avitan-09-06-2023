import React from 'react'
import { useNavigate } from 'react-router-dom'


export default function Favorites(props) {

  const nav = useNavigate();

  
  return (

    <div className='favorites-main'>
      {props.favorites.map((val, index) => {
        return (
          <div className='favorites' onClick={()=>{props.setChoosenLocation(val.name);nav('/')}} key={index}>
          <label>{val.name}</label> <br />
          <label>{val.currentWeather}</label> <br />
          <button className='remove' onClick={()=>{props.deleteFromFav(index)}}>-</button>
        </div>
        )
        
      })}
    </div>
  )
}
