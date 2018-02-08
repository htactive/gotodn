import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {Helper} from './src/common/constain';
import { AdMobInterstitial} from 'react-native-admob';

export default class app extends Component {

  componentWillMount(){
    AdMobInterstitial.setAdUnitID(Helper.AdUnitId_FullScreen);
  }

  render() {
    return (
      <App/>
    );
  }
}

AppRegistry.registerComponent('gotoDN', () => app);
