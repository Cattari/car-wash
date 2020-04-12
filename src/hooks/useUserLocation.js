import {useState, useEffect} from 'react';
import Geolocation from 'react-native-geolocation-service';
import get from 'lodash/get';

const useUserLocation = () => {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    Geolocation.getCurrentPosition(setPosition);
  }, [setPosition]);

  return get(position, 'coords', {});
};

export default useUserLocation;
