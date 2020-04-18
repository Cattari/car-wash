import React, {memo} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import moment from 'moment';
import {getArrayMiddleElement} from '../utils';

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: '100%',
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'rgba(0,0,0, 0.6)',
  },
  degreeText: {
    color: 'white',
    height: 40,
    lineHeight: 40,
    fontSize: 22,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
  },
  icon: {
    width: 40,
    height: 40,
  },
  dateText: {
    color: 'white',
    width: '100%',
    textAlign: 'center',
    fontSize: 14,
  },
});

const ForecastListItem = (props) => {
  const {temp, weather, dt: datetime} = props;
  const {icon} = getArrayMiddleElement(weather);
  const date = moment.unix(datetime);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.degreeText}>
          {Math.round(temp.min)}/{Math.round(temp.max)} &deg;C
        </Text>
        <Image
          source={{uri: `https://openweathermap.org/img/wn/${icon}.png`}}
          style={styles.icon}
        />
      </View>
      <Text style={styles.dateText}>{date.format('DD MMMM')}</Text>
      <Text style={styles.dateText}>{date.format('dddd')}</Text>
    </View>
  );
};

export default memo(ForecastListItem);
