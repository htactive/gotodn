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

  componentWillMount() {

    this.setState({
      hasConnection: false,
    });
  }

  componentDidMount() {
    this.handleNetInfo();
  }

  async initData() {
    let numOfScreens = await GDNServiceInstance.getNumOfScreen();
    await AsyncStorage.setItem(Helper.AdsTimes, numOfScreens + '');

    await AsyncStorage.setItem(Helper.CategoryKey, '');

    let langValue = await AsyncStorage.getItem(Helper.LanguageKey);

    if(!langValue) {
      await AsyncStorage.setItem(Helper.LanguageKey, LanguageEnums.English + '');
    }

    let currentLang = langValue ? parseInt(langValue) : LanguageEnums.English;

    changeAppLanguage(currentLang);

  }

  handleNetInfo() {
    NetInfo.isConnected.fetch().then(isConnected => {
      if (isConnected) {
        this.setState({hasConnection: true});
        this.goNext();
      } else {
        this.setState({hasConnection: false});
        NetInfo.addEventListener(
          'change',
          (value) => {
            if (value == 'WIFI' || value == 'wifi' || value == 'MOBILE' || value == 'cell' || value == 'VPN') {
              this.setState({hasConnection: true});
              this.goNext();
            } else {
              this.setState({hasConnection: false})
            }
          }
        );
      }
    });
  }

  componentWillUnmount() {
    NetInfo.removeEventListener(
      'change'
    );
  }

  _navigateTo = (routeName, params) => {
    const actionToDispatch = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName, params})]
    });

    this.props.navigation.dispatch(actionToDispatch)
  };

  render() {
    return (
      <Grid>
        <Col style={{justifyContent:'center', alignItems: 'center', backgroundColor: '#039be5'}}>
          <View style={style.splashContainer}>
            <Image style={style.imageContainer}
                   source={AppIcon.AppLogoBig}
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
                {this.state.hasConnection ? 'Loading...' : 'Connecting...'}
              </Text>
            </TouchableOpacity>
          </View>
        </Col>
      </Grid>
    )
  }

  async goNext() {
    await this.initData();
    let menuListData = await GDNServiceInstance.getHomeMenuList();
    let sliderData = await GDNServiceInstance.getHomeSlider(0);
    let params = {
      homeList: menuListData,
      homeSlider: sliderData
    };
    this._navigateTo('HomeScreen', params);
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