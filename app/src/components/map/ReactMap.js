import * as React from 'react';
import {Alert, StyleSheet} from 'react-native';
const MapView = require('react-native-maps');
const {PROVIDER_GOOGLE} = MapView;

interface thisProps {
}

interface thisState {
}

export class ReactMap extends React.Component<thisProps, thisState> {

  componentWillMount() {
  }

  render() {
    return (
      <MapView
        style={MapStyle.map}
        provider={PROVIDER_GOOGLE}
        loadingEnabled
        loadingIndicatorColor='#666666'
        loadingBackgroundColor='#eeeeee'
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    );
  }
}

const MapStyle = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  }
});