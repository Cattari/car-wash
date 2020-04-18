import React, {useMemo} from 'react';
import {View, StyleSheet, Text, ImageBackground} from 'react-native';
import {ForecastList, WashIndicator, CurrentWeather} from '../components';
import {addressWithoutPlusCode} from '../utils';
import {checkForecastForRain} from '../helpers';
import {DAYS_TO_CHECK_WASH_FORECAST} from '../constants';
import rainImage from '../images/car_rain.jpg';
import carWashImage from '../images/car_wash.jpeg';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  imageBackground: {
    flex: 1,
    width: '100%',
  },
  mainInfoBlock: {
    flex: 1,
    margin: 20,
    padding: 10,
    backgroundColor: 'rgba(0,0,0, 0.6)',
  },
  washTitle: {
    fontSize: 20,
    marginVertical: 15,
  },
  textWhite: {
    color: 'white',
  },
  centeredText: {
    width: '100%',
    textAlign: 'center',
  },
});

const WeatherDashboardScreen = ({
  geocodedAddress,
  currentWeather,
  forecast,
}) => {
  const isRainPresent = useMemo(
    () =>
      checkForecastForRain(forecast.slice(0, DAYS_TO_CHECK_WASH_FORECAST + 1)),
    [forecast],
  );
  const imageBackgroundSource = useMemo(() => {
    if (isRainPresent) {
      return rainImage;
    }
    return carWashImage;
  }, [isRainPresent]);

  console.log(geocodedAddress);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={imageBackgroundSource}
        resizeMode="cover"
        style={styles.imageBackground}>
        <ForecastList data={forecast} />
        <View style={styles.mainInfoBlock}>
          {currentWeather && <CurrentWeather data={currentWeather} />}
          {geocodedAddress && (
            <Text style={[styles.textWhite, styles.centeredText]}>
              {addressWithoutPlusCode(
                geocodedAddress?.plus_code?.compound_code || '',
              )}
            </Text>
          )}
          <Text
            style={[styles.washTitle, styles.textWhite, styles.centeredText]}>
            Wash or not Today?
          </Text>
          {Boolean(forecast.length) && (
            <WashIndicator isRainPresent={isRainPresent} />
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

export default WeatherDashboardScreen;
