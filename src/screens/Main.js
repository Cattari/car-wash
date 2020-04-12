import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import CarWashesMap from './CarWashesMap';
import WeatherDashboardScreen from './WeatherDashboard';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  useUserLocation,
  useGoogleReverseGeocoding,
  useCurrentWeather,
  useForecast,
  useGooglePlaces,
} from '../hooks';
import {CAR_WASHES_KEYWORD} from '../constants';

const Tab = createBottomTabNavigator();

const MainScreen = () => {
  const position = useUserLocation();
  const [geocodedAddress, isLoadingAddress] = useGoogleReverseGeocoding(
    position,
  );
  const [carWashes, isLoadingCarWashes] = useGooglePlaces({
    keyword: CAR_WASHES_KEYWORD,
    position,
  });
  const [currentWeather, isLoadingCurrentWeather] = useCurrentWeather(position);
  const [forecast, isLoadingForecast] = useForecast(position);
  const isLoadingData =
    isLoadingAddress ||
    isLoadingCarWashes ||
    isLoadingCurrentWeather ||
    isLoadingForecast;

  console.log(isLoadingData, isLoadingAddress);

  useEffect(() => {
    if (isLoadingData) {
      return;
    }
    SplashScreen.hide();
  }, [isLoadingData]);

  if (isLoadingData || !position) {
    return null;
  }

  return (
    <Tab.Navigator>
      <Tab.Screen name="Wash or not">
        {(props) => (
          <WeatherDashboardScreen
            {...props}
            geocodedAddress={geocodedAddress}
            currentWeather={currentWeather}
            forecast={forecast}
          />
        )}
      </Tab.Screen>
      <Tab.Screen name="Closest Car washes">
        {(props) => (
          <CarWashesMap {...props} position={position} carWashes={carWashes} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default MainScreen;
