import React from 'react';
import {BackHandler, ToastAndroid} from 'react-native';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {HomeMenuList} from '../components/home/HomeMenuList';
import {SlideType, MenuType} from '../common/constain';
import HomeSlider from '../components/home/HomeSlider';

export class HomeScreen extends React.Component {

  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {

    return (
      <Grid>
        <Row size={42}>
          <HomeSlider navigation={this.props.navigation} sliderType={SlideType.HomeScreen} title="Nổi Bật"/>
        </Row>
        <Row size={58}>
          <HomeMenuList navigation={this.props.navigation}/>
        </Row>
      </Grid>

    )
  }
}