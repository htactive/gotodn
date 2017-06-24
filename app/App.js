import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Expo from 'expo';
import {DNNavigator} from './src/NavigationHelper';
import {Menu} from './src/components/menu/Menu';

export default class App extends React.Component {
  state = {
    fontsAreLoaded: false
  };

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Ionicons': require('native-base/Fonts/Ionicons.ttf'),
      'Source Sans Pro': require('./assets/fonts/SourceSansPro-Regular.ttf'),
    });
    this.setState({
      fontsAreLoaded: true,
    });
  }

  render() {
    return (
      this.state.fontsAreLoaded &&
      (
        <Menu>
          <DNNavigator>
          </DNNavigator>
        </Menu>
      )
    );
  }
}
