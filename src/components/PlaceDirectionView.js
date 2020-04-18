import React, {useCallback} from 'react';
import getDirections from 'react-native-google-maps-directions';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0, 0.6)',
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
  },
  navigateLabel: {
    fontSize: 12,
    color: 'white',
  },
  addressText: {
    fontSize: 16,
    color: 'white',
  },
  pathLabel: {
    color: 'orange',
  },
});

const PlaceDirectionView = ({sourcePosition, destinationPosition, address}) => {
  const onPressPath = useCallback(() => {
    const directionParams = {
      source: sourcePosition,
      destination: destinationPosition,
    };
    getDirections(directionParams);
  }, [sourcePosition, destinationPosition]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.navigateLabel}>Navigate to:</Text>
        <Text style={styles.addressText}>{address}</Text>
      </View>
      <TouchableOpacity onPress={onPressPath}>
        <Text style={styles.pathLabel}>Get Path</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PlaceDirectionView;
