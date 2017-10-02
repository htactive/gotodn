import * as React from 'react';
import {Alert, StyleSheet, TouchableOpacity, View, Text, Image} from 'react-native';
import {Icon} from 'native-base';
import {viewportWidth, viewportHeight, Helper, AppIcon, MapHelper, platform, Guid} from '../../common/constain';
import {GoogleAPIServiceInstance} from '../../services/GoogleAPIService';
import {CustomCallout} from '../common/CustomCallout';
import {StyleBase, style} from '../../styles/style';
const MapView = require('react-native-maps');
const {PROVIDER_GOOGLE} = MapView;
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';
import {LStrings} from '../../common/LocalizedStrings';
import {appStore} from '../../stores/AppStore';

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
    selectedRouteId: '',
    address: '',
  };

  marker;

  watchId;

  timeoutGPS;

  unSubscribe;

  componentWillMount() {
    const {params} = this.props.navigation.state;
    let destination = params.coordinate;
    this.setState({destination: destination, address: params.address});

    this.unSubscribe = appStore.subscribe(() => {
      this.forceUpdate();
    });
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
    if (typeof this.unSubscribe === "function")
      this.unSubscribe();
  }

  componentDidUpdate() {
    this.showCallout();
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
          gpsError: {message: LStrings.Denied}
        });
      }
    }, 20000);
  }

  async checkIsLocation() {
    let check = await LocationServicesDialogBox.checkLocationServicesIsEnabled({
      message: LStrings.GPS,
      ok: LStrings.Yes,
      cancel: LStrings.No
    }).catch(error => error);

    return check === "enabled";
  }

  async animateRegion(position) {
    let currentPos = Helper.CloneObject(this.state.current);
    currentPos.latitude = position.coords.latitude;
    currentPos.longitude = position.coords.longitude;
    this.setState({
      current: currentPos
    });
    await this.getDirection(currentPos);
    let points = this.state.routes ? this.state.routes[0].steps : [];
    let region = MapHelper.getRegionForCoordinates(points);
    // this.renderCallout();
    this.mapRef.animateToRegion(region, 500);
  }

  renderAlternativeRoute(id, coords) {
    let currentRouteId = this.state.selectedRouteId;
    return (
      <MapView.Polyline
        tappable
        key={id}
        coordinates={coords}
        strokeWidth={6}
        strokeColor={id == currentRouteId ? '#00b3fd' : '#b0b0b0'}
        zIndex={id == currentRouteId ? 99 : 0}
        lineCap='round'
        onPress={() => this.changeRoute(id,true)}
      />
    )
  }

  renderAlternativeMarker(id, coord, text, des) {
    let routes = this.state.routes ? this.state.routes.slice() : [];
    let index = routes.map((x) => {return x.id}).indexOf(id);
    return (
      coord ?
        <MapView.Marker
          tappable
          ref={(m) => this[`marker_${id}`] = m}
          key={id}
          coordinate={coord}
          title={text}
          description={des}
          image={require('../../../assets/icons/marker.png')}
          anchor={{x:0.0, y:0.0}}
          onPress={() => this.changeRoute(id)}
        /> : null
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
    let routes = this.state.routes.length ? this.state.routes : [];
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
          onRegionChangeComplete={() => this.showCallout()}
        >
          {routes && routes.map((a, id) => {
            return a.steps && this.renderAlternativeRoute(a.id, a.steps)
          })}
          {routes && routes.map((a, id) => {
            return a.steps && this.renderAlternativeMarker(a.id, a.markerCoord, a.distance.text, a.duration.text)
          })}
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
            <Text style={{fontFamily: StyleBase.sp_regular, fontSize: 18, color: '#fff'}}>{LStrings.Direction}</Text>
            <Image style={[{resizeMode: 'cover', width: 30, height: 30,}, {tintColor: '#fff'}]}
                   source={AppIcon.Direction}/>
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
                {this.state.waitingForLocation && LStrings.Waiting}
                {this.state.gpsError && LStrings.NotFound}
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
            id: Guid(),
            distance: leg.distance,
            duration: leg.duration,
            start_address: leg.start_address,
            end_address: leg.end_address,
            steps: [],
            markerCoord: {},
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
      let fRouteId = routesT.length > 0 ? routesT[0].id : '';
      for (let i = 0; i < routesT.length; i++) {
        routesT[i].markerCoord = this.getMarkerCoord(routesT[i], routesT.slice());
      }
      this.setState({
        routes: routesT,
        selectedRouteId: fRouteId
      });
    }
  }

  getMarkerCoord(route, routes) {
    let id = route.id;
    let coords = route.steps;
    let index = routes.map((x) => {
      return x.id
    }).indexOf(id);
    routes.splice(index, 1);
    let filterC = [];
    for (let i = 0; i < routes.length; i++) {
      filterC = coords.filter(c => routes[i].steps.filter(s => s.latitude == c.latitude && s.longitude == c.longitude).length == 0);
    }
    return filterC.length > 0 ? filterC[Math.floor(filterC.length / 2)] : coords[Math.floor(coords.length / 2)];
  }

  changeRoute(id, animate) {
    let routes = this.state.routes ? this.state.routes.slice() : [];
    let currentRoute = routes.filter(r => r.id == id)[0];
    this.setState({
      selectedRouteId: id,
    });
    if(animate && this.mapRef)
      this.mapRef.animateToCoordinate(currentRoute.markerCoord, 500);
  }

  showCallout() {
    let currentId = this.state.selectedRouteId;
    if (this[`marker_${currentId}`]) {
      this[`marker_${currentId}`].showCallout();
    }
  }
}

const MapStyle = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  }
});