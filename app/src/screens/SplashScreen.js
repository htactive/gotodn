import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {DNPageRoute} from '../NavigationHelper';
import {HomeScreen} from './HomeScreen';
import {style} from '../styles/style';
import SnapCarousel from '../components/snap-carousel';
export class SplashScreen extends React.Component {
  componentWillMount() {

  }

  render() {
    return (
      <View style={style.container}>
        <SnapCarousel />
      </View>
    )
  }

  goNext() {
    this.props.navigation.navigate(DNPageRoute(HomeScreen))
  }
}
