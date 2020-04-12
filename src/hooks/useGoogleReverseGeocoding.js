import {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import {GOOGLE_API_KEY} from '../constants';

const useGoogleReverseGeocoding = ({latitude, longitude}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState([]);
  const loadPlaces = useCallback(async () => {
    if (!latitude || !longitude) {
      return;
    }
    const params = {
      key: GOOGLE_API_KEY,
      latlng: `${latitude},${longitude}`,
    };
    setIsLoading(true);
    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/geocode/json',
      {params},
    );
    setResult(response.data);
    setIsLoading(false);
  }, [latitude, longitude, setIsLoading, setResult]);

  useEffect(() => {
    loadPlaces();
  }, [loadPlaces]);

  return [result, isLoading];
};

export default useGoogleReverseGeocoding;
