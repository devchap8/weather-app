import { IconImports } from "./iconImports.js";

const docBody = document.querySelector("body");
const homepageBottom = document.querySelector(".homepageBottom");
const cityName = document.querySelector(".hmlCityName");
const weekday = document.querySelector(".hmlWeekday");
const calendarDate = document.querySelector(".hmlDate");
const weatherIcon = document.querySelector(".hmcWeatherIcon");
const temp = document.querySelector(".hmcMainTemp");
const feelsLike = document.querySelector(".hmcFeelsLike");
const highLow = document.querySelector(".hmcHighLow");
const humidity = document.querySelector(".humidityValue");
const windSpeed = document.querySelector(".windSpeedValue");
const precipChance = document.querySelector(".precipitationChanceValue");
const precipAmount = document.querySelector(".precipitationAmountValue");

const showWeatherInfo = (data) => {
    cityName.innerHTML = data.cityName;
    weekday.innerHTML = data.weekday;
    calendarDate.innerHTML = data.calendarDate;
    temp.innerHTML = `${data.temp}°`;
    feelsLike.innerHTML = `${data.feelsLike}°`;
    highLow.innerHTML = `High: ${data.high}  Low: ${data.low}`;
    humidity.innerHTML = `${data.humidity}%`;
    windSpeed.innerHTML = `${data.windSpeed} mph`;
    precipChance.innerHTML = `${data.precipChance}%`;
    precipAmount.innerHTML = `for ${data.precip} in`;
    weatherIcon.src = IconImports.iconMap[data.icon];
    homepageBottom.innerHTML = "";
    data.days.forEach((dayData) => {
        makeDailyDiv(dayData);
    });
}

const makeDailyDiv = (data) => {
    const dailyDiv = document.createElement("div");
    dailyDiv.classList = ("dailyDiv bottomDiv");
    const bottomIcon = document.createElement("img");
    bottomIcon.style.height = "150px";
    bottomIcon.style.width = "150px";
    bottomIcon.classList.add("bottomIcon");
    bottomIcon.src = IconImports.iconMap[data.icon];
    console.log(bottomIcon);
    const bottomTemp = document.createElement("div");
    bottomTemp.classList.add("bottomTemp");
    const bottomWeekday = document.createElement("div");
    bottomWeekday.classList.add("bottomWeekday");
    const bottomDate = document.createElement("div");
    bottomDate.classList.add("bottomDate");
    bottomIcon.src = IconImports.iconMap[data.icon];
    bottomTemp.innerHTML = `${data.temp}°`
    bottomWeekday.innerHTML = data.weekday;
    bottomDate.innerHTML = data.calendarDate;
    dailyDiv.appendChild(bottomIcon);
    dailyDiv.appendChild(bottomTemp);
    dailyDiv.appendChild(bottomWeekday);
    dailyDiv.appendChild(bottomDate);
    homepageBottom.appendChild(dailyDiv);
}

const DomManager = {showWeatherInfo};
export {DomManager};