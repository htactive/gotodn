import React from 'react';
import {} from 'react-native';
import {Col, Row, Grid} from 'react-native-easy-grid';
import TopSlider from '../components/slider/TopSlider';
import {HomeMenuList} from '../components/home/HomeMenuList';
import {SlideType} from '../common/constain';
import {Menu} from '../components/menu/Menu'

export class HomeScreen extends React.Component {
  componentWillMount() {
    Menu.instance.enableMenu();
  }

  render() {
    return (
      <Grid>
        <Row size={42}>
          <TopSlider sliderType={SlideType.HomeScreen} title="SỰ KIỆN NỔI BẬT"/>
        </Row>
        <Row size={58}>
          <HomeMenuList navigation={this.props.navigation} />
        </Row>
      </Grid>

    )
  }
}