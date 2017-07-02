import React from 'react';
import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';
import {DNPageRoute, resetAction} from '../NavigationHelper';
import {HomeScreen} from './HomeScreen';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {Menu} from '../components/menu/Menu'
import {AppIcon, viewportWidth} from '../common/constain';
import { NavigationActions } from 'react-navigation';

export class SplashScreen extends React.Component {

  componentWillMount() {

    setTimeout(() => {
      this.goNext();
    }, 1000);
    Menu.instance.setNavigation(this.props.navigation);
    Menu.instance.disableMenu();

  }

  componentWillUnmount() {
  }

  _navigateTo = (routeName) => {
    const actionToDispatch = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName })]
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
    width: viewportWidth/3,
    height: viewportWidth/3,
    borderRadius: viewportWidth/6,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageContainer: {
    width: viewportWidth/4.5,
    height: viewportWidth/4.5,
    justifyContent: 'center',
    alignItems: 'center',
    tintColor: '#039be5',
  }
});