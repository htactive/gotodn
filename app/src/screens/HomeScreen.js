import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import {DNPageRoute} from "../NavigationHelper";
import {SplashScreen} from "./SplashScreen";
import {style} from "../styles/style";

export class HomeScreen extends React.Component {
  render() {
    return (
      <View style={style.container}>
        <Text>Home screen here</Text>
        <Button
          onPress={() => this.props.navigation.navigate(DNPageRoute(SplashScreen))}
          title="Go to Splash Screen"
        />
      </View>
    )
  }
}