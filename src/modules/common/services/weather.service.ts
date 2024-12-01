import axios from "axios";
import { config } from "../../../config"

const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const fetchWeather = async (city: string) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: {
                q: city,
                units: "metric", // Use "imperial" for Fahrenheit
                appid: config.weatherApiKey,
            },
        });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "Failed to fetch weather data");
    }
};

function getWeatherIcon(weatherData:any): string {
    const iconCode = weatherData.weather[0].icon;
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

export const weatherService = {
    fetchWeather,
    getWeatherIcon
};
