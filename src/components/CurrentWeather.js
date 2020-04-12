import React, {memo, useMemo} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import moment from 'moment';
import {checkForecastForRain} from '../helpers';
import {DAYS_TO_CHECK_WASH_FORECAST} from '../constants';
import {getArrayMiddleElement} from '../utils';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
  },
  title: {
    textAlign: 'center',
    fontSize: 32,
  },
  description: {
    textAlign: 'center',
    fontSize: 18,
  },
  orangeText: {
    color: 'orange',
  },
  successText: {
    color: 'green',
  },
  degreeText: {
    color: 'white',
    height: 40,
    lineHeight: 40,
    fontSize: 26,
  },
  icon: {
    width: 60,
    height: 60,
  },
});

const CurrentWeather = ({data}) => {
  const {main, weather, dt: datetime} = data;
  const {icon} = getArrayMiddleElement(weather);
  const date = moment.unix(datetime);

  return (
    <View style={styles.container}>
      <Image
        source={{uri: `https://openweathermap.org/img/wn/${icon}.png`}}
        style={styles.icon}
      />
      <Text style={styles.degreeText}>{Math.round(main.temp)} &deg;C</Text>
      <Text>{date.format('dddd, D MMMM YYYY')}</Text>
    </View>
  );
};

export default memo(CurrentWeather);
