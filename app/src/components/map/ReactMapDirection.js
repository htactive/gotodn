import * as React from 'react';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import {Icon} from 'native-base';
import {viewportWidth, viewportHeight, Helper, AppIcon, getRegionForCoordinates} from '../../common/constain';
const MapView = require('react-native-maps');
const {PROVIDER_GOOGLE} = MapView;

interface thisProps {
}

interface thisState {
}

const GPS_ZOOM = .03;
export class ReactMapDirection extends React.Component<thisProps, thisState> {
  state = {
    current: {
      latitude: 16.047515,
      longitude: 108.17122,
    },
    destination: {latitude: 16.047515, longitude: 108.17122},
    directions: [],
    coordinates: []
  };

  componentWillMount() {
    const {params} = this.props.navigation.state;
    let destination = params.coordinate;
    this.setState({destination: destination});
  }

  componentDidMount() {

    this.getCurrentPos();
  }

  getCurrentPos() {
    navigator.geolocation.getCurrentPosition((position) => {

        this.animateRegion(position);

      }, (error) => this.setState({initError: error.message}),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
  }

  animateRegion(position) {
    let currentPos = Helper.CloneObject(this.state.current);
    currentPos.latitude = position.coords.latitude;
    currentPos.longitude = position.coords.longitude;
    this.setState({
      current: currentPos
    });
    let points = [];
    points.push(Helper.CloneObject( this.state.destination))
    points.push(currentPos)
    let region = getRegionForCoordinates( points);
    this.mapRef.animateToRegion(region, 500);
  }

  buildCoords () {
    let coords = [];
    let current = Helper.CloneObject(this.state.current);
    let destination = Helper.CloneObject(this.state.destination);
    let directions = this.state.directions.slice();

    coords.push(current);
    coords.push(destination);
    if(directions && directions.length > 0)
      coords.concat(directions);

    return coords;
  }

  render() {
    let coords = this.buildCoords();
    return (
      <View style={{flex:1}}>
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
          showsUserLocation
        >
          <MapView.Polyline
            coordinates={coords}
            strokeWidth={4}
            strokeColor='#00b3fd'
          />
          <MapView.Marker
            coordinate={this.state.destination}
          />
        </MapView>
        <View style={{position: 'absolute', right: 10, top: 10,
        backgroundColor: 'rgba(255,255,255,.8)',
        alignItems: 'center', justifyContent: 'center',
        width:34, height: 34, borderRadius: 17 }}>
          <TouchableOpacity onPress={() => this.getCurrentPos()}>
            <Icon name={'ios-locate-outline'} style={{color:'#039be5', fontSize:30}}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const MapStyle = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  }
});