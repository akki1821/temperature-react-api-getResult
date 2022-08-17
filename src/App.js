import { useEffect, useState } from "react";
import bootstrap from "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import axios from "axios";

function App() {
  const apiKey = "15f3924c615083852ae4bd2e08e025ec";
  const [data, setData] = useState({});
  const [inputCity, setInputCity] = useState("");

  const getWeatherDetails = (cityName) => {
    if (!cityName) return;
    const apiURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=" +
      apiKey;

    axios
      .get(apiURL)
      .then((res) => {
        console.log("response", res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleChangeInput = (e) => {
    setInputCity(e.target.value);
  };

  const handleSearch = () => {
    getWeatherDetails(inputCity);
  };

  useEffect(() => {
    getWeatherDetails("delhi");
  }, []);

  return (
    <div className="col-md-12">
      <div className="weather-bg">
        <h1 className="heading">Weather Forecast</h1>

        <div className="d-grid col-4 gap-3 mt-3 ">
          
          <input
            type="text"
            className="form-control"
            placeholder="Search your city here.. "
            onChange={handleChangeInput}
            value={inputCity}
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      <div className="col-md-12 text-centre mt-4    ">
        <div className="shadow-  rounded  wresult">
          <img
            className="wicon"
            src="https://cdn.dribbble.com/users/915711/screenshots/5827243/weather_icon3.png"
            alt=""
            srcset=""
          />
          <h5 className="cname">{data?.name}</h5>
          <h6 className="wtemp">{(data?.main?.temp - 273.15).toFixed(2)} °C</h6>
        </div>
      </div>
    </div>
  );
}

export default App;
