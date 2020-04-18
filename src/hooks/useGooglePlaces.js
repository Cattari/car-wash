import {useState, useEffect, useCallback} from 'react';
import axios from 'axios';
import {GOOGLE_API_KEY} from '../constants';

const useGooglePlaces = ({keyword, radius = 5000, position}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState([]);
  const loadPlaces = useCallback(async () => {
    if (!position) {
      return;
    }
    const {latitude, longitude} = position;
    const params = {
      key: GOOGLE_API_KEY,
      location: `${latitude},${longitude}`,
      radius,
      keyword,
    };
    setIsLoading(true);
    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
      {params},
    );
    setResult(response.data.results);
    setIsLoading(false);
  }, [position, keyword, radius, setIsLoading, setResult]);

  useEffect(() => {
    loadPlaces();
  }, [loadPlaces]);

  return [result, isLoading];
};

export default useGooglePlaces;
