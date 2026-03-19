import { IconImports } from "./iconImports.js";

const homepageMiddle = document.querySelector(".homepageMiddle");
const homepageTop = document.querySelector(".homepageTop");
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
const humidityIcon = document.querySelector(".humidityIcon");
const windSpeedIcon = document.querySelector(".windSpeedIcon");
const precipIcon = document.querySelector(".precipitationIcon");
const tempFormatButton = document.querySelector(".tempFormatButton");
const searchScreen = document.querySelector(".searchScreen");


const showWeatherInfo = (data) => {
    cityName.innerHTML = data.cityName;
    weekday.innerHTML = data.weekday;
    calendarDate.innerHTML = data.calendarDate;
    temp.innerHTML = `${data.temp}°`;
    feelsLike.innerHTML = `Feels like ${data.feelsLike}°`;
    highLow.innerHTML = `High: ${data.high}°  Low: ${data.low}°`;
    humidity.innerHTML = `${data.humidity}%`;
    windSpeed.innerHTML = `${data.windSpeed} mph`;
    precipChance.innerHTML = `${data.precipChance}%`;
    precipAmount.innerHTML = `for ${data.precip} in`;
    weatherIcon.src = IconImports.iconMap[data.icon];
    changePrecipIcon(data);
}

const changePrecipIcon = (data) => {
    const precipType = data.precipType;
    if(!precipType) precipIcon.src = IconImports.iconMap["no-rain"];
    else if(precipType.includes("ice") || precipType.includes("freezingrain")) {
        precipIcon.src = IconImports.iconMap["rain-snow"];
    } else if(precipType.includes("snow")) {
        precipIcon.src = IconImports.iconMap["snow"];
    } else if(precipType.includes("rain")) {
        precipIcon.src = IconImports.iconMap["rain"];
    } 
}

const displayDailyDivs = (data) => {
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

const displayHourlyDivs = (data) => {
    homepageBottom.innerHTML = "";
    data.hours.forEach((hourData) => {
        makeHourlyDiv(hourData);
    });
}

const makeHourlyDiv = (data) => {
    const hourlyDiv = document.createElement("div");
    hourlyDiv.style.width = "230px";
    hourlyDiv.classList = ("hourlyDiv bottomDiv");
    const bottomIcon = document.createElement("img");
    bottomIcon.classList.add("bottomIcon");
    bottomIcon.style.height = "150px";
    bottomIcon.style.width = "150px";
    bottomIcon.src = IconImports.iconMap[data.icon];
    const bottomTemp = document.createElement("div");
    bottomTemp.classList.add("bottomTemp");
    const bottomTime = document.createElement("div");
    bottomTime.classList.add("bottomTime");
    bottomTemp.innerHTML = `${data.temp}°`;
    const time = formatTime(data.time);
    bottomTime.innerHTML = time;
    hourlyDiv.appendChild(bottomIcon);
    hourlyDiv.appendChild(bottomTemp);
    hourlyDiv.appendChild(bottomTime);
    homepageBottom.appendChild(hourlyDiv);
}

const formatTime = (time) => {
    const timeParams = time.split(":");
    const hour = Number(timeParams[0]);
    if(hour === 0) return "12:00 am";
    else if(hour > 0 && hour <= 11) return `${hour}:00 am`;
    else if(hour === 12) return "12:00 pm";
    else return `${hour - 12}:00 pm`;
}

const toggleHomepageBlur = () => {
    if(homepageTop.classList.contains("blurred")) {
        homepageTop.classList.remove("blurred");
        homepageMiddle.classList.remove("blurred");
        homepageBottom.classList.remove("blurred");
    } else {
        homepageTop.classList.add("blurred");
        homepageMiddle.classList.add("blurred");
        homepageBottom.classList.add("blurred");
    }
}

const toggleSearchScreen = () => {
    searchScreen.classList.contains("hidden")
        ? searchScreen.classList.remove("hidden")
        : searchScreen.classList.add("hidden");
}

const changeTempFormatButtonContents = (tempInF) => {
    tempInF ? tempFormatButton.innerHTML = "Change display to °C"
        : tempFormatButton.innerHTML = "Change display to °F";
}

const setupUnchangingIcons = () => {
    humidityIcon.src = IconImports.iconMap["humidity"];
    windSpeedIcon.src = IconImports.iconMap["windSpeed"];
}

setupUnchangingIcons();
const DomManager = {
    showWeatherInfo, displayDailyDivs, displayHourlyDivs, changeTempFormatButtonContents,
    toggleHomepageBlur, toggleSearchScreen
};
export {DomManager};