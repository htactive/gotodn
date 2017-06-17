import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {DNPageRoute} from "../NavigationHelper";
import {HomeScreen} from "./HomeScreen";
import {style} from "../styles/style";

export class SplashScreen extends React.Component {
  componentWillMount() {
    setTimeout(() => {
      this.goNext();
    }, 1000);
  }

  render() {
    return (
      <View style={style.container}>
        <Text>Splash Screen Here</Text>
      </View>
    )
  }

  goNext() {
    this.props.navigation.navigate(DNPageRoute(HomeScreen))
  }
}
