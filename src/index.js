import "./style.css";
import { ApiManager } from "./apiManager.js";
import { IconImports } from "./iconImports.js";
import { DataHandling } from "./dataHandling.js";
import { DomManager } from "./domManager.js";

const citySearchForm = document.querySelector(".citySearchForm");
const dailyHourlyButton = document.querySelector(".dailyHourlyButton");
const tempFormatButton = document.querySelector(".tempFormatButton");
const searchScreenButton = document.querySelector(".searchScreenButton");
const homepageTop = document.querySelector(".homepageTop");
const homepageMiddle = document.querySelector(".homepageMiddle");
const homepageBottom = document.querySelector(".homepageBottom");

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

const showSearchScreen = () => {
    DomManager.toggleHomepageBlur();
    removeHomescreenElementEventListeners();
    DomManager.toggleSearchScreen();
    setTimeout(() => {
        addFullHomescreenEventListener();
    }, 300);
}

const hideSearchScreen = () => {
    DomManager.toggleHomepageBlur();
    addHomescreenElementEventListeners();
    DomManager.toggleSearchScreen();
    removeFullHomescreenEventListener();
}

const displayDefaultInfo = () => {
    displayCityInfo("New York City");
}

const addHomescreenElementEventListeners = () => {
    dailyHourlyButton.addEventListener("click", toggleDailyHourly);
    tempFormatButton.addEventListener("click", toggleFarCel);
    searchScreenButton.addEventListener("click", showSearchScreen);
}
const removeHomescreenElementEventListeners = () => {
    dailyHourlyButton.removeEventListener("click", toggleDailyHourly);
    tempFormatButton.removeEventListener("click", toggleFarCel);
    searchScreenButton.removeEventListener("click", showSearchScreen);
}

const addFullHomescreenEventListener = () => {
    homepageTop.addEventListener("click", hideSearchScreen);
    homepageMiddle.addEventListener("click", hideSearchScreen);
    homepageBottom.addEventListener("click", hideSearchScreen);
}
const removeFullHomescreenEventListener = () => {
    homepageTop.removeEventListener("click", hideSearchScreen);
    homepageMiddle.removeEventListener("click", hideSearchScreen);
    homepageBottom.removeEventListener("click", hideSearchScreen);
}

const setupEventListeners = () => {
    citySearchForm.addEventListener("submit", displayCityInfoFromSearch);
    addHomescreenElementEventListeners();
}

const init = () => {
    setupEventListeners()
    displayDefaultInfo();
}

init();


