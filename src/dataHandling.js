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
    const humidity = data.days[0].humidity;
    const windSpeed = data.days[0].windspeed;
    const precipType = data.days[0].preciptype;
    const precipChance = data.days[0].precipprob;
    const precip = data.days[0].precip;
    const icon = data.days[0].icon;
    const days = getDaysInfo(data);

    const extractedData = {cityName, weekday, calendarDate, temp, feelsLike, high, low,
        humidity, windSpeed, precipType, precipChance, precip, icon, days};
    return extractedData;
} 

const getDaysInfo = (data) => {
    const daysInfo = [];
    for(let i = 1; i <= 7; i++) {
        const icon = data.days[i].icon;
        const temp = data.days[i].temp;
        const weekday = weekdayList[getDay(data.days[i].datetime.replace(/-/g, '\/'))];
        const calendarDate = format(data.days[i].datetime.replace(/-/g, '\/'), 'MM/dd');
        daysInfo.push({icon, temp, weekday, calendarDate});
    }
    return daysInfo;
}


const DataHandling = {extractWeatherData};
export {DataHandling};