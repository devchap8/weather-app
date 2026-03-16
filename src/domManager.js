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
}

const DomManager = {showWeatherInfo};
export {DomManager};