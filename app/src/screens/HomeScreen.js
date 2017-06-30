import React from 'react';
import {} from 'react-native';
import {Col, Row, Grid} from 'react-native-easy-grid';
import TopSlider from '../components/slider/TopSlider';
import {HomeMenuList} from '../components/home/HomeMenuList';
import {SlideType, MenuType} from '../common/constain';
import {Menu} from '../components/menu/Menu'
import HomeSlider from '../components/home/HomeSlider';

export class HomeScreen extends React.Component {
  componentWillMount() {

  }

  render() {

    return (
      <Grid>
        <Row size={42}>
          <HomeSlider navigation={this.props.navigation} sliderType={SlideType.HomeScreen} title="Nổi Bật"/>
        </Row>
        <Row size={58}>
          <HomeMenuList navigation={this.props.navigation} />
        </Row>
      </Grid>

    )
  }
}