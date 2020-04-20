import React, {memo} from 'react';
import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
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
    color: '#00cf37',
  },
});

const WashIndicator = ({isRainPresent}) => {
  if (isRainPresent) {
    return (
      <View style={styles.container}>
        <Text style={[styles.orangeText, styles.title]}>NO</Text>
        <Text style={[styles.orangeText, styles.description]}>
          We DO NOT RECOMMEND to wash your car today, because during coming days
          soem prcipitation expected
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={[styles.successText, styles.title]}>Okay</Text>
      <Text style={[styles.successText, styles.description]}>
        The weather is supposed to be good for washing your car
      </Text>
    </View>
  );
};

export default memo(WashIndicator);
