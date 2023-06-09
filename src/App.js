import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Favorites from './components/Favorites';
import HomePage from './components/HomePage';
import Header from './components/Header';

function App() {

  const [choosenLocation, setChoosenLocation] = useState('tel aviv');
  const [locationNameToKey, setLocationNameToKey] = useState(['215854']);
  const [autoCompleteResults, setAutoCompleteResults] = useState([]);
  const [currentWeather, setCurrentWeather] = useState([]);
  const [dailyForecasts, setDailyForecasts] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const apiKey = 'MrwQrEmJ0fGf4HYd87ZplXp0QS9woGoY';

  //takes the location key from the city the user choosed 
  const getCityForLocationKey = () => {
    const base = 'https://dataservice.accuweather.com/locations/v1/cities/search';
    const addition = `?apikey=${apiKey}&q=${choosenLocation}`;
    fetch(base + addition)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        if (data && data.length > 0) {
          const result = data[0];
          setLocationNameToKey(result);
        }
      })
      .catch((err) => {
        if (err) throw err;
      })
  }

  // according the location key gets the current weather of the choosen city

  const getCurrentWeather = (locationNameToKey) => {
    const base = 'https://dataservice.accuweather.com/currentconditions/v1/';
    const addition = `${locationNameToKey}?apikey=${apiKey}`

    fetch(base + addition)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        if (data && data.length > 0) {
          const res = data[0];
          if (res.Temperature && res.Temperature.Metric) {
            const weatherDet = {
              temperature: res.Temperature.Metric.Value,
              weatherText: res.WeatherText
            }
            setCurrentWeather(weatherDet);
          } else {
            // Handle the case when temperature data is not available
            console.error('Temperature data is not available');
          }
        } else {
          // Handle the case when data is empty
          console.error('No data available');
        }
      })
      .catch((err) => {
        if (err) throw err;
      })
  }
  // getCurrentWeather(locationNameToKey.Key);



  //complete the name of the city that the user is typing
  const autoComplete = (locationName) => {
    const base = 'https://dataservice.accuweather.com/locations/v1/cities/autocomplete';
    const addition = `?apikey=${apiKey}&q=${locationName}`;

    fetch(base + addition)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        const result = data; // המידע זה כל מה שמתאים למה שהמשתש מקליד
        setAutoCompleteResults(result);
        console.log(result);
      })
      .catch((err) => {
        if (err) throw err;
      })

  }

  const fiveDaysForecasts = (locationNameToKey) => {
    const base = `https://dataservice.accuweather.com/forecasts/v1/daily/5day/`;
    const addition = `${locationNameToKey}?apikey=${apiKey}`;
    fetch(base + addition)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        if (data && data.DailyForecasts) {
          const res = data.DailyForecasts;
          setDailyForecasts(res)
          console.log(res);
        } else {
          console.log("No forecasts available");
        }
      })
      .catch((err) => {
        if (err) throw err;
      })
  }

  useEffect(() => {
    getCityForLocationKey();
  }, [choosenLocation]);

  useEffect(() => {
    if (locationNameToKey.Key) {
      getCurrentWeather(locationNameToKey.Key);
      fiveDaysForecasts(locationNameToKey.Key)
    }
  }, [locationNameToKey.Key]);

  //add to favorites, first checkes if the location is exsisting in the favorites
  const addToFavorites = () => {
    if (!favorites.some(favorite => favorite.id === locationNameToKey.Key)) {
      let temp = {
        id: locationNameToKey.Key,
        name: choosenLocation,
        currentWeather: currentWeather.temperature
      };
      setFavorites([...favorites, temp]);
    } else {
      alert('The location already exists in favorites!');
    }
  };



  //deleting from favorites
  const deleteFromFav = (index) => {
    let tempArr = [...favorites];
    tempArr.splice(index, 1)
    setFavorites([...tempArr])
  }



  return (
    <div className="bg-img">
      <div className='first-fold'>
        <div className='main'>
          <BrowserRouter>
            <Header />
            <Routes>

              <Route path='/' element={<HomePage addToFavorites={addToFavorites} dailyForecasts={dailyForecasts} choosenLocation={choosenLocation} setChoosenLocation={setChoosenLocation} autoComplete={autoComplete} autoCompleteResults={autoCompleteResults} setAutoCompleteResults={setAutoCompleteResults} currentWeather={currentWeather} />} />
              <Route path='/favorites' element={<Favorites favorites={favorites} setChoosenLocation={setChoosenLocation} deleteFromFav={deleteFromFav} />} />


            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );

}


export default App;
