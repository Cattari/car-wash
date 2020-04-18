import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';
import CarWashesMap from './CarWashesMap';
import WeatherDashboardScreen from './WeatherDashboard';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
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
    <Tab.Navigator
      initialRouteName="Wash or not"
      tabBarOptions={{
        style: {
          borderTopWidth: 0,
          borderTopColor: 'transparent',
          backgroundColor: '#878787',
          justifyContent: 'center',
          alignItems: 'center',
        },
        activeBackgroundColor: 'transparent',
        inactiveTintColor: 'white',
        activeTintColor: 'orange',
        inactiveBackgroundColor: 'transparent',
        tabStyle: {
          flex: 0.35,
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}>
      <Tab.Screen
        name="Wash or not"
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="cloud" color={color} size={size} />
          ),
        }}>
        {(props) => (
          <WeatherDashboardScreen
            {...props}
            geocodedAddress={geocodedAddress}
            currentWeather={currentWeather}
            forecast={forecast}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Closest Car Washes"
        options={{
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons
              name="map-marker"
              color={color}
              size={size}
            />
          ),
        }}>
        {(props) => (
          <CarWashesMap {...props} position={position} carWashes={carWashes} />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default MainScreen;
