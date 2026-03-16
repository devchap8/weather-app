import "./style.css";
import { ApiManager } from "./apiManager.js";
import { IconImports } from "./iconImports.js";

const mainWeatherIcon = document.querySelector(".hmcWeatherIcon");
mainWeatherIcon.src = IconImports.sunIcon;

const citySearchForm = document.querySelector(".citySearchForm");

const setupEventListeners = () => {
    citySearchForm.addEventListener("submit", changeCities);
}

const changeCities = async (event) => {
    event.preventDefault();
    const citySearchFormData = new FormData(citySearchForm);
    const newCityName = citySearchFormData.get("citySearch");
    let weatherData;
    try {
        weatherData = await ApiManager.fetchWeatherInfo(newCityName);
    } catch (err) {
        console.log(err.message);
    }
    if(weatherData) console.log(weatherData);
}   



setupEventListeners();


