import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {DNPageRoute} from '../NavigationHelper';
import {HomeScreen} from './HomeScreen';
import {style} from '../styles/style';
import { Col, Row, Grid } from 'react-native-easy-grid';
import {Menu} from '../components/menu/Menu'

export class SplashScreen extends React.Component {
  componentWillMount() {
    setTimeout(() => {
      this.goNext();
    }, 1000);
    Menu.instance.setNavigation(this.props.navigation);
    Menu.instance.disableMenu();
  }

  render() {
    return (
      <Grid style={style.container}>
        <Col>
          <Text>Goto DN</Text>
        </Col>
      </Grid>
    )
  }

  goNext() {
    this.props.navigation.navigate(DNPageRoute(HomeScreen))
  }
}
