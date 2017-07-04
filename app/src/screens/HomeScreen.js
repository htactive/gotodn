import React from 'react';
import {BackHandler, ToastAndroid} from 'react-native';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {HomeMenuList} from '../components/home/HomeMenuList';
import {SlideType, MenuType} from '../common/constain';
import HomeSlider from '../components/home/HomeSlider';
import { NavigationActions } from 'react-navigation';
import {navigationStore, navigateAction} from '../stores/NavigationStore';

export class HomeScreen extends React.Component {

  componentWillMount() {
    navigationStore.subscribe(() => {
      let navigationState = navigationStore.getState();
      if(navigationState.routeName) {
        const navigateAction = NavigationActions.navigate({
          routeName: navigationState.routeName,
          params: navigationState.params
        });
        this.props.navigation.dispatch(navigateAction);
      }
    });
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