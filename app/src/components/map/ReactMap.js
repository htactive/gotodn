import * as React from 'react';
import {Alert, StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {Icon} from 'native-base';
import {viewportWidth, viewportHeight, platform} from '../../common/constain';
import {StyleBase} from '../../styles/style';
const MapView = require('react-native-maps');
const {PROVIDER_GOOGLE} = MapView;
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";

interface thisProps {
}

interface thisState {
}

const GPS_ZOOM = .01;

export class ReactMap extends React.Component<thisProps, thisState> {
    state = {
        currentPos: {
            latitude: 16.047515,
            longitude: 108.17122,
            latitudeDelta: 0.3,
            longitudeDelta: 0.3 * (viewportWidth / viewportHeight),
        },
        waitingForLocation: false,
        gpsError: null,
    };

    watchId;

    timeoutGPS;

    componentWillMount() {
    }

    componentDidMount() {

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
                this.setState({waitingForLocation: false, gpsError: null});

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
        let region = {
            latitude: position.coords.latitude - .003,
            longitude: position.coords.longitude,
            latitudeDelta: GPS_ZOOM,
            longitudeDelta: GPS_ZOOM * (viewportWidth / viewportHeight)
        };
        this.mapRef.animateToRegion(region, 500);
    }

    render() {

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
                    {/*<MapView.Marker*/}
                    {/*coordinate={this.props.region}*/}
                    {/*/>*/}
                </MapView>
                <View style={{
                    position: 'absolute', left: 5, top: 5,
                    backgroundColor: 'rgba(255,255,255,.8)',
                    alignItems: 'center', justifyContent: 'center',
                    width: 34, height: 34, borderRadius: 17
                }}>
                    <TouchableOpacity onPress={() => this.getCurrentPos()}>
                        <Icon name={'ios-locate-outline'} style={{color: '#039be5', fontSize: 30}}/>
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
                            <Text numberOfLines={1}
                                  style={{fontFamily: StyleBase.sp_regular, fontSize: 12, color: '#039be5'}}>
                                {this.state.waitingForLocation && ("WAITING GPS...")}
                                {this.state.gpsError && ("NOT FOUND...")}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    }
}

const MapStyle = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    }
});