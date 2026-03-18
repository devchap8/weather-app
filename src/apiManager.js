const fetchWeatherInfo = async (cityName) => {
    const apiRequest = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?key=2QPZ4KXRVYF59XGZ4PBHFX4XA` // Free key - no security needed
    const response = await fetch(apiRequest);
    if(!response.ok) {
        throw new Error("City not found. Try inputting a valid city.");
    }
    const weatherData = await response.json();
    return weatherData;
}


const ApiManager = {fetchWeatherInfo};
export {ApiManager};

