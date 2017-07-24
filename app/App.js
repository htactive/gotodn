import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {DNNavigator} from './src/NavigationHelper';
import {Menu} from './src/components/menu/Menu';

export default class App extends React.Component {


  render() {
    return (

        <Menu>
          <DNNavigator>
          </DNNavigator>
        </Menu>

    );
  }
}
