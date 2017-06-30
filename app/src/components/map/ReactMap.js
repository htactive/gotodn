import * as React from 'react';
import {Alert, StyleSheet} from 'react-native';
const MapView = require('react-native-maps');
const {PROVIDER_GOOGLE} = MapView;

interface thisProps {
}

interface thisState {
}

export class ReactMap extends React.Component<thisProps, thisState> {
  state = {
    currentPos: {
      latitude: 16.0476619,
      longitude:108.2379323,
      latitudeDelta: 0.0322,
      longitudeDelta: 0.0121,
    },

  };

  componentWillMount() {
  }

  componentDidMount() {
  
    this.getCurrentPos();
  }

  getCurrentPos() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log('Detail ' + position);
        let currentPos = this.state.currentPos;
        currentPos.latitude = 1;
        currentPos.longitude = 1;
        this.setState({currentPos: currentPos});
      }, (error) => this.setState({initError: error.message}),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
  }

  animateRegion(region: {latitude?: number, longitude?: number, latitudeDelta?: number, longitudeDelta?: number}) {
    this.refs.mapRef.animateToRegion(region);
  }

  render() {

    return (
      <MapView
        {...this.props}
        style={MapStyle.map}
        ref={(ref: any) => {
          this.mapRef = ref;
        }}
        provider={PROVIDER_GOOGLE}
        loadingEnabled
        loadingIndicatorColor='#666666'
        loadingBackgroundColor='#eeeeee'
        region={this.state.currentPos}
        showsUserLocation
      >
        <MapView.Marker
          coordinate={this.props.region}
        />
      </MapView>
    );
  }
}

const MapStyle = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  }
});