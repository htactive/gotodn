import React from 'react';
import {StyleSheet, Text, View, Image, ScrollView, TouchableOpacity} from 'react-native';
import {style} from "../styles/style";
import {Col, Row, Grid} from 'react-native-easy-grid';
import TopSlider from '../components/slider/TopSlider';
import {Card, CardItem, Left, Thumbnail, Body, Button, Icon} from 'native-base';
import {HomeMenuList} from '../components/home/HomeMenuList';

export class HomeScreen extends React.Component {
  render() {
    return (
      <Grid>
        <Row size={45}>
          <TopSlider title="SỰ KIỆN NỔI BẬT"/>
        </Row>
        <Row size={55}>
          <HomeMenuList />
        </Row>
      </Grid>

    )
  }
}