import React from 'react';
import {StackNavigator} from 'react-navigation';
import {SplashScreen} from "./screens/SplashScreen";
import {HomeScreen} from "./screens/HomeScreen";

export function DNPageRoute(page) {
  let key = page.displayName || page['name'];
  return Object.keys(DNNavigatorConfig).filter(t => t == key)[0] || '';
}

export const DNNavigatorConfig = {
  SplashScreen: {
    screen: SplashScreen
  },
  HomeScreen: {
    screen: HomeScreen
  },
};

export const DNNavigatorOptions = {
  initialRouteName: DNPageRoute(HomeScreen),
  headerMode: 'none'
};

export const DNNavigator = StackNavigator(DNNavigatorConfig,DNNavigatorOptions);
