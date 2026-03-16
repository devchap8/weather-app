import { format, getDay } from "date-fns";

const weekdayList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const extractWeatherData = (data) => {
    const cityName = data.resolvedAddress.charAt(0).toUpperCase() + data.resolvedAddress.slice(1);
    const weekday = weekdayList[getDay(data.days[0].datetime.replace(/-/g, '\/'))];
    const calendarDate = format(data.days[0].datetime.replace(/-/g, '\/'), 'MM/dd/yyyy');
    const temp = data.currentConditions.temp;
    const feelsLike = data.currentConditions.feelslike;
    const high = data.days[0].tempmax;
    const low = data.days[0].tempmin;
    const humidity = data.currentConditions.humidity;
    const windSpeed = data.currentConditions.windspeed;
    const precipType = data.currentConditions.preciptype;
    const precipChance = data.currentConditions.precipprob;
    const precip = data.currentConditions.precip;
    const condition = data.currentConditions.conditions;

    const extractedData = {cityName, weekday, calendarDate, temp, feelsLike, high, low,
        humidity, windSpeed, precipType, precipChance, precip, condition};
    return extractedData;
} 


const DataHandling = {extractWeatherData};
export {DataHandling};