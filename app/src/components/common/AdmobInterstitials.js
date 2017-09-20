import React from 'react';
import {Helper} from '../../common/constain';
import {
  AdMobInterstitial,
} from 'react-native-admob';

export class AdmobInterstitials extends React.Component {
  static instance: AdmobInterstitials;

  componentWillMount() {
    AdmobInterstitials.instance = this;
    AdMobInterstitial.setAdUnitID(Helper.AdUnitId_FullScreen);
    AdMobInterstitial.setTestDeviceID('');
  }

  componentDidMount() {

  }

  render() {
    return null;
  }

  componentWillUnmount(){
    AdMobInterstitial.removeAllListeners();
  }

  showInterstitial() {
    AdMobInterstitial.requestAd((error) => error ? console.log(error) :
      AdMobInterstitial.showAd((error) => error && console.log(error))
    );
  }

}