import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import ForecastListItem from './ForecastListItem';

const styles = StyleSheet.create({
  container: {
    height: 100,
    flexGrow: 0,
  },
});

const ForecastList = ({data}) => (
  <ScrollView horizontal style={styles.container}>
    {data.map((item, index) => (
      <ForecastListItem key={index} {...item} />
    ))}
  </ScrollView>
);

export default ForecastList;
