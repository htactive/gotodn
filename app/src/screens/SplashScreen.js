import React from 'react';
import {StyleSheet, Image, View, TouchableOpacity, NetInfo, Text} from 'react-native';
import {DNPageRoute, resetAction} from '../NavigationHelper';
import {HomeScreen} from './HomeScreen';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {Menu} from '../components/menu/Menu'
import {AppIcon, viewportWidth} from '../common/constain';
import {NavigationActions} from 'react-navigation';
import {StyleBase} from '../styles/style';

export class SplashScreen extends React.Component {

  goNextDelay;
  handleNetInterval;

  componentWillMount() {

    this.setState({
      hasConnection: false,
    });

    Menu.instance.setNavigation(this.props.navigation);
    Menu.instance.disableMenu();
  }

  componentDidMount() {
    this.handleNetInfo();
    this.handleNetInterval = setInterval(() => {
      this.handleNetInfo()
    }, 1000)
  }

  handleNetInfo() {
    NetInfo.isConnected.fetch().then(
      isConnected => {
        if(isConnected) {
          clearInterval(this.handleNetInterval);
          this.goNextDelay = setTimeout(() => {
            this.goNext();
          }, 1000);
        }
        this.setState({hasConnection: isConnected});
      }
    );
  }

  componentWillUnmount() {
    clearInterval(this.handleNetInterval);
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
                {this.state.hasConnection ? 'Đã Kết Nối' : 'Chờ Mạng...'}
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