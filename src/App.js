import axios from "axios";
import { useState, useEffect } from "react";
import "./App.css";
/*this object will have your keys and the base urs*/
/* please get your key from https://home.openweathermap.org/users/sign_up */
const api = {
  key: "a7ce68a13a2277787180ca5437b282f0",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const cities = ["Select a City", "Bishkek", "Naryn", "Osh", "Batken", "Jalal-Abad", "At-Bashy", "Talas"];
  {
    /*you can add more cities here*/
  }

  // im giving you one useState that is with the start value of the cities index[1]
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [weather, setWeather] = useState({})


  /*create a fuction to call the api*/
  /* here you have a model of the api*/
  /* `${api.base}weather?q=${selectedCity}&units=metric&APPID=${api.key}`*/
  const fetchingAxios = async () => {
    try {
      const fetch = await axios.get(`${api.base}weather?q=${selectedCity}&units=metric&APPID=${api.key}`)
      setWeather(fetch.data)
    } catch (err) {
      console.log(err)
    }
  }

  // remeber every time the city changes you need to call the api with the new data
  //here you will write your useEffect
  useEffect(() => {
    //console.log("i am running useEffect")
    fetchingAxios()
  }, [selectedCity])

  // maybe after calling the API in use effect you will need to save the information in another useState
  // like weather-done make state weather


  // here is needed to pass the data that you alredy got from your API
  return (
    <div className="container warm">
      <div className=" app warm">
        <main>
          <div className="top">
            <div className="location">{selectedCity}</div>
            {/* {console.log("i am render inside return")} */}
            {/* render the city */}
            <div>
              <div className="temp">
                <h2>{weather.main ? Math.round(weather.main.temp) : ""}</h2> {/*render the temperature*/}
              </div>
              <div>
                <div className="situation">
                  <h3>{weather.weather ? weather.weather[0].main : ""}</h3> {/*render Situation*/}
                </div>
              </div>
            </div>
          </div>
          <div className="select-area">
            {" "}

            {/*create a selector to show the cities
            on change you need to update your selectedCity*/}
            <select
              className="custom-select"
              value={selectedCity}
              onChange={(e) => {
                //console.log(e.target.value)
                setSelectedCity(e.target.value)
              }}>
              {/* we need to map our cities in order to show the options */}
              {cities.map((city) => {
                return (<option key={city} value={city}>{city}</option>)
              })}
            </select>
            <br />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
