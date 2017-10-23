import React from 'react';
import {View, ToastAndroid} from 'react-native';
import {viewportWidth, Helper} from '../../common/constain';
import {
  AdMobBanner,
} from 'react-native-admob';

export class AdmobBanner extends React.Component {

  state = {
    bannerSize: 'smartBannerPortrait',
    adUnitID: Helper.AdUnitId_Banner,
    adReady: true,
  };

  componentWillMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.bannerSize) {
      this.setState({
        bannerSize: nextProps.bannerSize
      });
    }
  }

  render() {
    return (
      <View style={{position: 'absolute', bottom: 0,
        backgroundColor: 'rgba(255,255,255,0)',
        flexDirection: 'row', alignItems:'center', justifyContent: 'center',
        width:viewportWidth,}}>
        <AdMobBanner
          bannerSize={this.state.bannerSize}
          adUnitID={this.state.adUnitID}
          testDeviceID=""
          adViewDidReceiveAd={() => {this.setState({adReady: true,})}}
          didFailToReceiveAdWithError={(error) => this.bannerError(error)}/>
      </View>
    );
  }

  bannerError(error) {
    //ToastAndroid.showWithGravity(error, ToastAndroid.SHORT, ToastAndroid.CENTER);
    this.setState({
      adReady: false,
    });
  }
}

