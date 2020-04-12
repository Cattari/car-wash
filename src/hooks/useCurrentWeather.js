import {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import {OPENWEATHER_API_KEY, UNIT_SYSTEM} from '../constants';

const useCurrentWeather = ({latitude, longitude}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState(null);
  const load = useCallback(async () => {
    if (!latitude || !longitude) {
      return;
    }
    const params = {
      appid: OPENWEATHER_API_KEY,
      lat: latitude,
      lon: longitude,
      units: UNIT_SYSTEM,
    };
    setIsLoading(true);
    const response = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather',
      {params},
    );
    setResult(response.data);
    setIsLoading(false);
  }, [latitude, longitude, setIsLoading, setResult]);

  useEffect(() => {
    load();
  }, [load]);

  return [result, isLoading];
};

export default useCurrentWeather;
