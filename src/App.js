// source link :youtube.com/watch?v=GuA0_Z1llYU
import React, { useState } from 'react';
import logo from './logo.svg';
import './index.css';
import {Bar,Line,Pie,Doughnut} from 'react-chartjs-2'

//https://api.openweathermap.org/data/2.5/forecast?q=Dhaka&cnt=7&appid=c785ba882f7141ab07ad3b9b731c49ea

const api = {
  key: 'c785ba882f7141ab07ad3b9b731c49ea',
  base: 'https://api.openweathermap.org/data/2.5/',
  image: 'http://openweathermap.org/img/w/'

}

function App() {
  const [query, setQuery] = useState(''); // to set value in query
  const [queryweather, setWeatherQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [Customforcasts, setWeatherforcast] = useState({});


  const dates=[];
  const temps=[];
  const customData=[];
  const search = evt => {
    if (evt.key === 'Enter') {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
           setWeatherQuery(query)
           setQuery('');
          console.log(result);
          //  console.log(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`);

        });

      // to get forcast data
      fetch(`${api.base}forecast?q=${query}&cnt=39&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(r => {
          setWeatherforcast(r.list);
          setQuery('');
          // console.log('gffgfg' + r.list[0].main.temp)

        });

       
        if(Customforcasts.length>0){

          
          
          for(let i=0;i<Customforcasts.length;i++)
          {
            dates.push(Customforcasts[i].dt_txt)
           temps.push(Customforcasts[i].main.temp);
            
          }
          console.log(temps);
 
          
        }
      
      
        

    }
    
  }



  const dateBuilder = (d) => {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()]
    let year = d.getFullYear();
    return `${day} ${date} ${month} ${year}`
  }
  return (

    <div className="app">
     
      <div className={(typeof weather.main != 'undefined')
        ? ((weather.main.temp > 16)
          ? 'app warm' : 'app')
        : 'app'}>
        <main>
          <div className="search-box">
            <input type="text" className="search-bar" placeholder="Search Weather Typing Country or City..."
              onChange={e => setQuery(e.target.value)}
              value={query} onKeyPress={search}
            ></input>
          </div>

          {(typeof weather.main != 'undefined') ? (
            <div>
              <div className="location-alert">
                <marquee behavior="scroll" direction="right">5 Days Weather Forecasting For {queryweather} ...!</marquee>
              </div>
              <div className="location-box">
                <div className="location">{weather.name} ,{weather.sys.country}</div>
                <div className="date">
                  {dateBuilder(new Date())}
                </div>
              </div>
              <div className="weather-box">
                
                <div className="temp"><img className='blink-image' src={api.image + weather.weather[0].icon + '.png'} alt=''></img>{Math.round(weather.main.temp)}°c</div><br></br>
                <div className="temp_children"><p>Feel like</p>{Math.round(weather.main.feels_like)}°c</div>
                <div className="temp_children"><p>Max</p>{Math.round(weather.main.temp_max)}°c</div>
                <div className="temp_children"><p>Min</p>{Math.round(weather.main.temp_min)}°c</div>
                <div className="temp_children"><p>Humidity</p>{Math.round(weather.main.humidity)} %</div>
                <div className="temp_children"><p>Wind</p>{Math.round(weather.wind.speed)} km/h</div>
                <div className="weather blink-image">{weather.weather[0].description}</div>
              </div>
              <div className="weather-box">

                {
                  (Customforcasts.length > 0) ?
                    Customforcasts.map((forcast, index) => (
                      <div className='temp_child'>
                        <p>{forcast.dt_txt.slice(0,forcast.dt_txt.indexOf(" "))}<span style={{ marginRight:10 }}></span>{ forcast.dt_txt.split(" ").pop().split(":",2).join(":")}</p>
                        <p>{forcast.dt_txt.split(" ").pop().split(":",2).join(":")}</p>
                        <img className='blink-image' src={api.image + forcast.weather[0].icon + '.png'} alt=''></img>
                        <span className='blink-image' style={{ color: 'blue' }}>{forcast.weather[0].description}</span>
                        <div className='container'>
                          <p>Feel like : {Math.round(forcast.main.feels_like)}°c </p>
                          <p>Max : {Math.round(forcast.main.temp_max)}°c </p>
                          <p>Min : {Math.round(forcast.main.temp_min)}°c </p>
                          <p>Humidity: {Math.round(forcast.main.humidity)} % </p>
                          <p>Wind: {Math.round(forcast.wind.speed)} km/h </p>
                        </div>
                      </div>
                    )) : ('')}

              </div>
            </div>
          ) : ('')}

        </main>
      </div>
      :('No data found')}
    </div>
  );
}

export default App;
