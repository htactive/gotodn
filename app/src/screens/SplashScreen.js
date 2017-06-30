import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {DNPageRoute} from '../NavigationHelper';
import {HomeScreen} from './HomeScreen';
import {style} from '../styles/style';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {Menu} from '../components/menu/Menu'

export class SplashScreen extends React.Component {

  componentWillMount() {
    setTimeout(() => {
      this.goNext();
    }, 500);
    Menu.instance.setNavigation(this.props.navigation);
    Menu.instance.disableMenu();
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <Grid>
        <Col style={{justifyContent:'center', alignItems: 'center'}}>
          <TouchableOpacity onPress={() => this.getCurrentPos()}>
            <Text>Goto DN</Text>
          </TouchableOpacity>
          <Text>
            Loading...
          </Text>
        </Col>
      </Grid>
    )
  }

  goNext() {
    this.props.navigation.navigate(DNPageRoute(HomeScreen))
  }
}
