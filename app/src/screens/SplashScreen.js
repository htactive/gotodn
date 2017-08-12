import React from 'react';
import {StyleSheet, Image, View, TouchableOpacity, NetInfo, Text, AsyncStorage} from 'react-native';
import {DNPageRoute, resetAction} from '../NavigationHelper';
import {HomeScreen} from './HomeScreen';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {Menu} from '../components/menu/Menu'
import {AppIcon, viewportWidth, LanguageEnums, Helper} from '../common/constain';
import {NavigationActions} from 'react-navigation';
import {StyleBase} from '../styles/style';
import {GDNServiceInstance} from '../services/GDNService';
import {appStore, appSaveLanguage, appSaveCity} from '../stores/AppStore';
import {changeAppLanguage} from '../common/LocalizedStrings';

export class SplashScreen extends React.Component {

  goNextDelay;
  //handleNetInterval;

  async componentWillMount() {

    this.setState({
      hasConnection: false,
    });

    this.initData();
  }

  async componentDidMount() {
    this.handleNetInfo();
  }

  async initData() {

    let langValue = await AsyncStorage.getItem(Helper.LanguageKey);

    let cityValue = await AsyncStorage.getItem(Helper.CityKey);

    let currentLang =langValue ? parseInt(langValue) : LanguageEnums.English;

    appStore.dispatch(appSaveLanguage(currentLang));

    changeAppLanguage(currentLang);

    let selectedCityId = 0;
    let result = await GDNServiceInstance.getAllCity();
    if(result) {
      let selectedCity = result.filter(t => Helper.stripDiacritics(t.Name).toLowerCase() == 'da nang' || Helper.stripDiacritics(t.Name).toLowerCase() == 'danang')[0];
      selectedCityId = selectedCity ? selectedCity.Id : (result[0] ? result[0].Id : 0);
    }
    if(cityValue)
      selectedCityId = cityValue;

    appStore.dispatch(appSaveCity(selectedCityId));
  }

  handleNetInfo() {
    NetInfo.addEventListener(
      'change',
      (value) => {
        if (value == 'WIFI' || value == 'wifi' || value == 'MOBILE' || value == 'cell' || value == 'VPN') {
          NetInfo.removeEventListener(
            'change'
          );
          this.setState({hasConnection: true})
          this.goNextDelay = setTimeout(() => {
            this.goNext();
          }, 1000);
        } else {
          this.setState({hasConnection: false})
        }
      }
    );

  }

  componentWillUnmount() {
    // clearInterval(this.handleNetInterval);
  }

  _navigateTo = (routeName) => {
    const actionToDispatch = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName})]
    });

    this.props.navigation.dispatch(actionToDispatch)
  };

  render() {
    return (
      <Grid>
        <Col style={{justifyContent:'center', alignItems: 'center', backgroundColor: '#039be5'}}>
          <View style={style.splashContainer}>
            <Image style={style.imageContainer}
                   source={AppIcon.AppLogo}
            />
          </View>
          <View style={{position: 'absolute', top: 10, left: viewportWidth/2 -45,
        backgroundColor: 'rgba(255,255,255,.8)',
        flexDirection: 'row', alignItems:'center', justifyContent: 'center',
        width:90, height: 30, borderRadius: 5, padding: 5 }}>
            <TouchableOpacity onPress={() => {}} style={
            {flexDirection: 'row', alignItems:'center', justifyContent: 'center'}
          }>
              <Text style={{fontFamily: StyleBase.sp_regular, fontSize: 13, color:'#039be5'}}>
                {this.state.hasConnection ? 'Connected' : 'Connecting...'}
              </Text>
            </TouchableOpacity>
          </View>
        </Col>
      </Grid>
    )
  }

  goNext() {
    this._navigateTo('HomeScreen');
  }

}

const style = StyleSheet.create({
  splashContainer: {
    width: viewportWidth / 3,
    height: viewportWidth / 3,
    borderRadius: viewportWidth / 6,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    width: viewportWidth / 4.5,
    height: viewportWidth / 4.5,
    justifyContent: 'center',
    alignItems: 'center',
    tintColor: '#039be5',
  }
});