import React, {useMemo, useState, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {zoomToPositionDelta} from '../utils';
import {CarWashMarker, PlaceDirectionView} from '../components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  placeView: {
    marginBottom: 40,
  },
});

const DEFAULT_ZOOM = 12.5;
const DEFAULT_DELTA = zoomToPositionDelta(DEFAULT_ZOOM);

const CarWashesMapScreen = ({position, carWashes}) => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const onResetMarker = useCallback((event) => setSelectedMarker(null), [
    setSelectedMarker,
  ]);
  const region = useMemo(() => {
    if (!position) {
      return null;
    }
    const {latitude, longitude} = position;

    return {
      latitude,
      longitude,
      latitudeDelta: DEFAULT_DELTA,
      longitudeDelta: DEFAULT_DELTA,
    };
  }, [position]);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        onPress={onResetMarker}
        initialRegion={region}>
        {carWashes.map((item) => {
          const {
            vicinity,
            name,
            geometry: {
              location: {lat, lng},
            },
          } = item;

          return (
            <CarWashMarker
              key={item.place_id}
              onPress={setSelectedMarker}
              latitude={lat}
              longitude={lng}
              name={name}
              address={vicinity}
            />
          );
        })}
      </MapView>
      {selectedMarker && (
        <PlaceDirectionView
          {...selectedMarker}
          address={selectedMarker.address}
          sourcePosition={region}
          destinationPosition={selectedMarker}
        />
      )}
    </View>
  );
};

export default CarWashesMapScreen;
