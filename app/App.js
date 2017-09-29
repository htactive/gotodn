import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {DNNavigator} from './src/NavigationHelper';
import {Menu} from './src/components/menu/Menu';
import {Helper} from './src/common/constain';
import {
  AdMobInterstitial,
} from 'react-native-admob';
export default class App extends React.Component {

  componentWillMount() {
    AdMobInterstitial.setAdUnitID(Helper.AdUnitId_FullScreen);
  }

  render() {
    return (

        <Menu>
          <DNNavigator>
          </DNNavigator>
        </Menu>

    );
  }
}
