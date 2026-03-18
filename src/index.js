import "./style.css";
import { ApiManager } from "./apiManager.js";
import { IconImports } from "./iconImports.js";
import { DataHandling } from "./dataHandling.js";
import { DomManager } from "./domManager.js";

const citySearchForm = document.querySelector(".citySearchForm");
const dailyHourlyButton = document.querySelector(".dailyHourlyButton");

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
    const extractedData = DataHandling.extractWeatherData(weatherData);
    DataHandling.currentData.setCurrentData(extractedData);
    DomManager.showWeatherInfo(extractedData);
    DataHandling.currentData.getDailyBool() 
        ? DomManager.displayDailyDivs(extractedData) 
        : DomManager.displayHourlyDivs(extractedData);
}  

const toggleDailyHourly = () => {
    const data = DataHandling.currentData.getCurrentData();
    if(DataHandling.currentData.getDailyBool()) {
        DataHandling.currentData.setDailyBool(false);
        DomManager.displayHourlyDivs(data);
    } else {
        DataHandling.currentData.setDailyBool(true);
        DomManager.displayDailyDivs(data);
    }
}

const displayDefaultInfo = () => {
    displayCityInfo("New York City");
}

const setupEventListeners = () => {
    citySearchForm.addEventListener("submit", displayCityInfoFromSearch);
    dailyHourlyButton.addEventListener("click", toggleDailyHourly);
}

const init = () => {
    setupEventListeners()
    displayDefaultInfo();
}

init();


