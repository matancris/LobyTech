import { useEffect, useState } from 'react'
import { weatherService } from '../services/weather.service';

interface WeatherProps {
  city?: string;
}

export const AppWeather = ({ city = 'Tel Aviv' }: WeatherProps) => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [weatherIcon, setWeatherIcon] = useState<any>(null);

  useEffect(() => {
    const getWeather = async () => {
      try {
        const data = await weatherService.fetchWeather(city);
        setWeatherData(data);
        const weatherIconURL = weatherService.getWeatherIcon(data)
        setWeatherIcon(weatherIconURL)
      } catch (err: any) {
        console.error(err.message);
      }
    };

    getWeather();
  }, [city]);

  return (
    <section className="app-weather">
      {weatherData &&
        <>
          <h2 className="app-weather__title">{weatherData.name}</h2>
          <img src={weatherIcon} alt={weatherData.weather[0]?.description} className="app-weather__icon" />
          <p className="app-weather__temp">{Math.round(+weatherData.main.temp)}°C</p>
        </>}
    </section>
  );

}
