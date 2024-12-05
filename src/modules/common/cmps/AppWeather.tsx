import { useEffect, useState } from 'react'
import { weatherService } from '../services/weather.service';
import { useStore } from '@/store/useStore';

interface Props {
  isShowCity?: boolean;
}
export const AppWeather = ({ isShowCity }: Props) => {
  const user = useStore(state => state.user)
  const [weatherData, setWeatherData] = useState<any>(null);
  const [weatherIcon, setWeatherIcon] = useState<any>(null);

  useEffect(() => {
    const getWeather = async () => {
      try {
        const data = await weatherService.fetchWeather(user?.city || 'Tel Aviv');
        setWeatherData(data);
        const weatherIconURL = weatherService.getWeatherIcon(data)
        setWeatherIcon(weatherIconURL)
      } catch (err: any) {
        console.error(err.message);
      }
    };

    getWeather();
  }, [user]);

  return (
    <section className="app-weather">
      {weatherData &&
        <>
          {isShowCity && <h2 className="app-weather__title">{user?.city ? user.city : weatherData.name}</h2>}
          <img src={weatherIcon} alt={weatherData.weather[0]?.description} className="app-weather__icon" />
          <p className="app-weather__temp">{Math.round(+weatherData.main.temp)}°C</p>
        </>}
    </section>
  );

}
