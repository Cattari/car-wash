import React, {useMemo, useCallback} from 'react';
import {Marker} from 'react-native-maps';
import omit from 'lodash/omit';

const CarWashMarker = (props) => {
  const {latitude, longitude, name, address, onPress} = props;
  const coordinate = useMemo(() => ({latitude, longitude}), [
    latitude,
    longitude,
  ]);
  const onMarkerPress = useCallback(
    (event) => {
      event.stopPropagation();
      onPress(omit(props, 'onPress'));
    },
    [props, onPress],
  );

  return (
    <Marker
      onPress={onMarkerPress}
      coordinate={coordinate}
      tracksViewChanges={false}
      title={name}
      description={address}
    />
  );
};

export default CarWashMarker;
