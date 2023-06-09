import React, { useState } from 'react'

export default function HomePage(props) {

    const [cityName, setCityName] = useState('');

    //takes the user input and making autocomplete according the input
    const onChangeClick = (value) => {
        if (/^[A-Za-z\s]+$/.test(value) === false && value !== '') {
            alert('the name of the location must be in english!');
        } else {
            setCityName(value);
            console.log(cityName);
            props.autoComplete(value);
        }
    }

    //saves the user choice and closing the list of seggustions
    const selectUserChoice = (value) => {
        props.setChoosenLocation(value);
        setCityName(value);
        props.setAutoCompleteResults([]);
    }

    //takes the date from the data and convert it to name of day that can be display
    const convetrDateToDay = (dateString) => {
        const date = new Date(dateString);
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        return days[date.getDay()];
    };



    return (

        <div className='container'>

            <div className='search'>
                <input className='search-bar' onChange={(e) => { onChangeClick(e.target.value) }} type="text" placeholder='search' /> <br />
                {props.autoCompleteResults && props.autoCompleteResults.length > 0 && (
                    <div className='results-main'>
                        {props.autoCompleteResults.map((val, index) => {
                            return (
                                <div className='results' onClick={() => { selectUserChoice(val.LocalizedName) }} key={index} >
                                    {val.LocalizedName}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            <div className='current-weather' >
                <div className='btn-add-to-fav'>
                    <button className='add' onClick={props.addToFavorites}>+</button>
                </div>
                <div className='details-box'>
                    <div className='city'> <label>{props.choosenLocation}</label></div>
                    <div className='temperature'> <label>{props.currentWeather.temperature}°C</label></div>
                    <div className='weather-text'> <label>{props.currentWeather.weatherText}</label> </div>
                </div>
            </div>

            <div className='forecasts' >
                    {props.dailyForecasts.map((val, index) => {
                        return <div className='days' key={index}>
                            <label >{convetrDateToDay(val.Date)}</label> <br />
                            <label>{((val.Temperature.Minimum.Value - 32) / 1.8).toFixed(1)}°C</label>
                        </div>
                    })}

            </div>



        </div>
    )
}




























































// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'

// export default function HomePage(props) {

//     const [cityName, setCityName] = useState('');
//     const [choosenLocation, setChoosenLocation] = useState('');

//     //takes the user input and making autocomplete according the input
//     const onChangeClick = (value) => {
//         // if (/^[A-Za-z]+$/.test(cityName) === false) {
//         //     alert('the name of the location must be in english!');
//         // } else {
//         setCityName(value);
//         console.log(cityName);
//         props.autoComplete(value);
//         // }
//     }

//     //saves the user choice and closing the list of seggustions
//     const selectUserChoice = (value) => {
//         setChoosenLocation(value);
//         console.log(choosenLocation);
//         setCityName(value);
//         props.setAutoCompleteResults([]);
//     }




//     return (
//         <div>
//             <Link to={'/'}>  <button>main</button></Link>
//             <Link to={'/favorites'}> <button>favorites</button> <br /></Link>
//             <input onChange={(e) => { onChangeClick(e.target.value) }} type="text" placeholder='search' /> <br />

//             {props.autoCompleteResults.map((val, index) => {
//                 return <div onClick={() => { selectUserChoice(val.LocalizedName) }} style={{ border: '1px solid green', width: '200px', margin: 'auto' }} key={index}>
//                     {val.LocalizedName}
//                 </div>
//             })}


//             <button>add to favorites</button> <br />
//             <button>remove from favorites</button>
//         </div>
//     )
// }
