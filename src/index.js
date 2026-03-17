import "./style.css";
import { ApiManager } from "./apiManager.js";
import { IconImports } from "./iconImports.js";
import { DataHandling } from "./dataHandling.js";
import { DomManager } from "./domManager.js";

const mainWeatherIcon = document.querySelector(".hmcWeatherIcon");
mainWeatherIcon.src = IconImports.iconMap["clear-day"];

const citySearchForm = document.querySelector(".citySearchForm");

const setupEventListeners = () => {
    citySearchForm.addEventListener("submit", displayCityInfoFromSearch);
}

const displayDefaultInfo = () => {
    displayCityInfo("New York City");
}

const displayCityInfoFromSearch = async (event) => {
    event.preventDefault();
    const citySearchFormData = new FormData(citySearchForm);
    const newCityName = citySearchFormData.get("citySearch");
    displayCityInfo(newCityName);
}

const displayCityInfo = async (newCityName) => {
    let weatherData;
    try {
        weatherData = await ApiManager.fetchWeatherInfo(newCityName);
    } catch (err) {
        console.log(err.message);
        return;
    }
    if(weatherData) console.log(weatherData);
    DataHandling.currentData.setCurrentData(weatherData);
    const extractedData = DataHandling.extractWeatherData(weatherData);
    DomManager.showWeatherInfo(extractedData);
}   

const init = () => {
    setupEventListeners()
    displayDefaultInfo();
}

init();


