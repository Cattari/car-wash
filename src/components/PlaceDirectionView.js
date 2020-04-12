import React, {useCallback} from 'react';
import getDirections from 'react-native-google-maps-directions';
import {View, Text, TouchableOpacity} from 'react-native';

const PlaceDirectionView = ({
  sourcePosition,
  destinationPosition,
  name,
  address,
}) => {
  const onPressPath = useCallback(() => {
    const directionParams = {
      source: sourcePosition,
      destination: destinationPosition,
    };
    getDirections(directionParams);
  }, [sourcePosition, destinationPosition]);

  return (
    <View>
      <Text>{name}</Text>
      <Text>{address}</Text>
      <TouchableOpacity onPress={onPressPath}>
        <Text>Get Path</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PlaceDirectionView;
