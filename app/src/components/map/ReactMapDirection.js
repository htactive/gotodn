import * as React from 'react';
import {Alert, StyleSheet, TouchableOpacity, View, Text, Image} from 'react-native';
import {Icon} from 'native-base';
import {viewportWidth, viewportHeight, Helper, AppIcon, MapHelper, platform} from '../../common/constain';
import {GoogleAPIServiceInstance} from '../../services/GoogleAPIService';
import {CustomCallout} from './CustomCallout';
import {StyleBase, style} from '../../styles/style';
const MapView = require('react-native-maps');
const {PROVIDER_GOOGLE} = MapView;
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";

interface thisProps {
}

interface thisState {
}

export class ReactMapDirection extends React.Component<thisProps, thisState> {
  state = {
    current: {
      latitude: 16.047515,
      longitude: 108.17122,
    },
    destination: {latitude: 16.047515, longitude: 108.17122},
    directions: [],
    routes: [],
    waitingForLocation: false,
    gpsError: null,
  };

  marker;

  watchId;

  timeoutGPS;

  componentWillMount() {
    const {params} = this.props.navigation.state;
    let destination = params.coordinate;
    this.setState({destination: destination});
  }

  componentDidMount() {
    if (this.state.destination == null) {
        this.setState({gpsError: true});
      return;
    }
    this.getCurrentPos();
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutGPS);
    navigator.geolocation.clearWatch(this.watchId);
  }

  async getCurrentPos() {
    if (this.state.waitingForLocation) return;
    this.setState({waitingForLocation: true, gpsError: null});
    if (platform === 'android')
      await this.checkIsLocation();
    this.watchId = navigator.geolocation.getCurrentPosition((position) => {
        clearTimeout(this.timeoutGPS);
        this.animateRegion(position);
        this.setState({waitingForLocation: false});
      }, (error) => {
        this.setState({
          waitingForLocation: false,
          gpsError: error
        });
      },
      {timeout: 20000, maximumAge: 1000});
    this.timeoutGPS = setTimeout(() => {
      if (this.state.waitingForLocation && this.state.gpsError != null) {
        navigator.geolocation.clearWatch(this.watchId);
        this.setState({
          waitingForLocation: false,
          gpsError: {message: "GPS Denied"}
        });
      }
    }, 20000);
  }

  async checkIsLocation() {
    let check = await LocationServicesDialogBox.checkLocationServicesIsEnabled({
      message: "GPS IS OFF, TURN ON GPS?",
      ok: "YES",
      cancel: "NO"
    }).catch(error => error);

    return check === "enabled";
  }

  animateRegion(position) {
    let currentPos = Helper.CloneObject(this.state.current);
    currentPos.latitude = position.coords.latitude;
    currentPos.longitude = position.coords.longitude;
    this.setState({
      current: currentPos
    });
    let points = [];
    points.push(Helper.CloneObject(this.state.destination));
    points.push(currentPos);

    this.getDirection(currentPos);

    let region = MapHelper.getRegionForCoordinates(points);
    // this.renderCallout();
    this.mapRef.animateToRegion(region, 500);
  }

  renderAlternativeRoute(id, coords) {
    return (
      <MapView.Polyline
        key={id}
        coordinates={coords}
        strokeWidth={4}
        strokeColor='#b0b0b0'
        lineCap='round'
      />
    )
  }

  renderCallout() {
    // if(this.state.calloutIsRendered === true) return;
    // this.setState({calloutIsRendered: true});
    // this[`marker + ${1}`].showCallout();
  }

  render() {
    let mainRoute = this.state.routes.length && this.state.routes.length > 0 ?
      this.state.routes[0] : {};
    let alternativeRoutes = this.state.routes.length && this.state.routes.length > 0 ?
      this.state.routes.slice(1) : [];
    return (
      <View style={{flex: 1}}>
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
          {alternativeRoutes && alternativeRoutes.map((a, id) => {
            return a.steps && this.renderAlternativeRoute(id, a.steps)
          })}
          {mainRoute.steps && (
            <MapView.Polyline
              coordinates={mainRoute.steps}
              strokeWidth={4}
              strokeColor='#00b3fd'
              lineCap='butt'
            />
          )}
          {this.state.destination ? <MapView.Marker
            coordinate={this.state.destination}
          /> : null}

        </MapView>
        <View style={{
          position: 'absolute', right: 10, top: 10,
          backgroundColor: 'rgba(255,255,255,.8)',
          alignItems: 'center', justifyContent: 'center',
          width: 34, height: 34, borderRadius: 17
        }}>
          <TouchableOpacity onPress={() => this.getCurrentPos()}>
            <Icon name={'ios-locate-outline'} style={{color: '#039be5', fontSize: 30}}/>
          </TouchableOpacity>
        </View>
        <View style={{
          position: 'absolute', bottom: 10, left: viewportWidth / 2 - 75,
          backgroundColor: 'rgba(77,190,241,.8)',
          width: 150, height: 50, borderRadius: 5, padding: 10
        }}>
          <TouchableOpacity onPress={() => {
            this.getCurrentPos();
          }} style={
            {flexDirection: 'row', justifyContent: 'space-between'}
          }>
            <Text style={{fontFamily: StyleBase.sp_regular, fontSize: 18, color: '#fff'}}>DIRECTION</Text>
            <Image style={[{resizeMode: 'cover', width: 30, height: 30,}, {tintColor: '#fff'}]}
                   source={AppIcon.Direction || "https://avatars3.githubusercontent.com/u/20336495?v=4&s=460"}/>
          </TouchableOpacity>
        </View>
        {(this.state.waitingForLocation || this.state.gpsError ) && (
          <View style={{
            position: 'absolute', top: 10, left: viewportWidth / 2 - 60,
            backgroundColor: 'rgba(255,255,255,.8)',
            flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
            width: 120, height: 30, borderRadius: 5, padding: 5
          }}>
            <TouchableOpacity onPress={() => {
            }} style={
              {flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}
            }>
              <Text style={{fontFamily: StyleBase.sp_regular, fontSize: 12, color: '#039be5'}}>
                {this.state.waitingForLocation && ("Waiting GPS...")}
                {this.state.gpsError && ("Not found...")}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }

  async getDirection(currentPos) {
    let destination = Helper.CloneObject(this.state.destination);
    let directionResult = await GoogleAPIServiceInstance.getDirections(currentPos, destination);
    if (directionResult.routes) {
      let routesT = [];
      for (let i = 0; i < directionResult.routes.length; i++) {
        let route = directionResult.routes[i];
        if (route.legs && route.legs.length > 0) {
          let leg = route.legs[0];
          let tempR = {
            distance: leg.distance,
            duration: leg.duration,
            start_address: leg.start_address,
            end_address: leg.end_address,
            steps: [],
          };
          tempR.steps.push(Helper.CloneObject(this.state.current));
          tempR.steps = tempR.steps.concat(leg.steps.map((s) => {
            return MapHelper.decodePolyline(s.polyline.points);
          }).reduce((a, b) => {
            return a.concat(b);
          }));
          tempR.steps.push(Helper.CloneObject(this.state.destination));
          routesT.push(tempR);
        }
      }

      this.setState({
        routes: routesT
      });
    }
  }
}

const MapStyle = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  }
});