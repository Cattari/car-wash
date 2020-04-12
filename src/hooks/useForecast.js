import {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import {
  OPENWEATHER_API_KEY,
  FORECAST_DAYS_AMOUNT,
  UNIT_SYSTEM,
} from '../constants';

const useForecast = ({latitude, longitude}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState([]);
  const loadForecast = useCallback(async () => {
    if (!latitude || !longitude) {
      return;
    }
    const params = {
      appid: OPENWEATHER_API_KEY,
      lat: latitude,
      lon: longitude,
      cnt: FORECAST_DAYS_AMOUNT,
      units: UNIT_SYSTEM,
    };
    setIsLoading(true);
    const response = await axios.get(
      'https://api.openweathermap.org/data/2.5/forecast/daily',
      {params},
    );
    setResult(response.data.list);
    setIsLoading(false);
  }, [latitude, longitude]);

  useEffect(() => {
    loadForecast();
  }, [loadForecast]);

  return [result, isLoading];
};

export default useForecast;
