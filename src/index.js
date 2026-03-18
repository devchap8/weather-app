import "./style.css";
import { ApiManager } from "./apiManager.js";
import { IconImports } from "./iconImports.js";
import { DataHandling } from "./dataHandling.js";
import { DomManager } from "./domManager.js";

const citySearchForm = document.querySelector(".citySearchForm");
const dailyHourlyButton = document.querySelector(".dailyHourlyButton");
const tempFormatButton = document.querySelector(".tempFormatButton");

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
        alert(err.message);
        return;
    }
    const extractedData = DataHandling.extractWeatherData(weatherData);
    DataHandling.currentData.currentData = extractedData;
    DomManager.showWeatherInfo(extractedData);
    DataHandling.currentData.dailyBool
        ? DomManager.displayDailyDivs(extractedData) 
        : DomManager.displayHourlyDivs(extractedData);
}  

const toggleDailyHourly = () => {
    const data = DataHandling.currentData.currentData;
    if(DataHandling.currentData.dailyBool) {
        DataHandling.currentData.dailyBool = false;
        DomManager.displayHourlyDivs(data);
    } else {
        DataHandling.currentData.dailyBool = true;
        DomManager.displayDailyDivs(data);
    }
}

const toggleFarCel = () => {
    DataHandling.convertTemps();
    const data = DataHandling.currentData.currentData;
    DataHandling.currentData.tempInF = !DataHandling.currentData.tempInF;
    DomManager.changeTempFormatButtonContents(DataHandling.currentData.tempInF);
    DomManager.showWeatherInfo(DataHandling.currentData.currentData);
    DataHandling.currentData.dailyBool
        ? DomManager.displayDailyDivs(data)
        : DomManager.displayHourlyDivs(data);
}

const displayDefaultInfo = () => {
    displayCityInfo("New York City");
}

const setupEventListeners = () => {
    citySearchForm.addEventListener("submit", displayCityInfoFromSearch);
    dailyHourlyButton.addEventListener("click", toggleDailyHourly);
    tempFormatButton.addEventListener("click", toggleFarCel);
}

const init = () => {
    setupEventListeners()
    displayDefaultInfo();
}

init();


