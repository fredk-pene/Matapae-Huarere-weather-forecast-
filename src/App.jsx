import React, { useState } from 'react'
import moment from 'moment'
import axios from 'axios'
import './index.css'

function App() {
  const [weatherData, setWeatherData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=1a1f26f078da2ed9b2882b6005d93d32`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios
        .get(url)
        .then((response) => {
          setWeatherData(response.data)
          console.log(response.data)
        })
        .catch((error) => console.error(error.message))
      setLocation('')
    }
  }
  // TODO add celsius to fahrenheit button
  return (
    <>
      <div className="card">
        <div className="search">
          <input
            type="text"
            placeholder="Enter city.."
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyPress={searchLocation}
            className="search-bar"
          ></input>
        </div>
        {weatherData.name != undefined && (
          <div className="weather">
            <div className="top">
              <div className="city">
                <h2>
                  {weatherData.name}
                  <span className="dateTime">
                    {' '}
                    {moment().format(`dddd MMM D , `)}
                    {moment().format(` YYYY`)}
                  </span>
                </h2>
              </div>
              <div className="temp">
                {weatherData.main ? (
                  <h1>
                    {' '}
                    <div className="description">
                      {weatherData.weather ? (
                        <p>{weatherData.weather[0].description}</p>
                      ) : null}
                    </div>
                    {weatherData.main.temp.toFixed()}°c{' '}
                    <div className="high-low">
                      <div className="tempHigh">
                        {weatherData.main ? (
                          <p>
                            ↑{weatherData.main.temp_max.toFixed()}°c
                            <span id="divider">|</span>
                          </p>
                        ) : null}
                      </div>
                      <div className="tempLow">
                        {weatherData.main ? (
                          <p>↓{weatherData.main.temp_min.toFixed()}°c</p>
                        ) : null}
                      </div>
                    </div>
                  </h1>
                ) : null}
              </div>
            </div>
            <div className="bottom">
              <div className="feels">
                {weatherData.main ? (
                  <p className="bold">
                    {weatherData.main.feels_like}°c{' '}
                    <span className="bottomDescription">Feels like</span>
                  </p>
                ) : null}
              </div>
              <div className="humidity">
                {weatherData.main ? (
                  <p className="bold">
                    {weatherData.main.humidity}%
                    <span className="bottomDescription">Humidity</span>
                  </p>
                ) : null}
              </div>
              <div className="wind">
                {weatherData.main ? (
                  <p className="bold">
                    {weatherData.wind.speed}km/h
                    <span className="bottomDescription">Wind speed</span>
                  </p>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default App
