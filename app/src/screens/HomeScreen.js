import React from 'react';
import {ToastAndroid, ScrollView, RefreshControl} from 'react-native';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {HomeMenuList} from '../components/home/HomeMenuList';
import {viewportHeight} from '../common/constain';
import HomeSlider from '../components/home/HomeSlider';
import {NavigationActions} from 'react-navigation';
import {navigationStore, navigateAction} from '../stores/NavigationStore';
import {GDNServiceInstance} from '../services/GDNService';

export class HomeScreen extends React.Component {

  state = {
    sliderData: null,
    menuListData: null,
    sliderLoaded: false,
    menuListLoad: false,
    refreshing: false,
  };

  componentWillMount() {
    navigationStore.subscribe(() => {
      let navigationState = navigationStore.getState();
      if (navigationState.routeName) {
        const navigateAction = NavigationActions.navigate({
          routeName: navigationState.routeName,
          params: navigationState.params
        });
        this.props.navigation.dispatch(navigateAction);
      }
    });
    this.setState({showSlider: true});
  }

  componentDidMount() {
    this.loadHomeData();
  }

  loadHomeData() {
    (async () => {
      let menuListData = await GDNServiceInstance.getHomeMenuList();
      this.setState({menuListData, menuListLoad: true});
      if(this.state.sliderLoaded) {
        this.setState({
          refreshing: false
        });
      }
    })();
    (async () => {
      let sliderData = await GDNServiceInstance.getHomeSlider();
      if(!sliderData || sliderData.length == 0) {
        this.setState({showSlider: false});
      }
      this.setState({sliderData, sliderLoaded: true});
      if(this.state.menuListLoad) {
        this.setState({
          refreshing: false
        });
      }
    })();
  }

  render() {

    return (
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => this.onFresh()} />
        }
      >
        <Grid>
          {this.state.showSlider ? <Row style={{ height: viewportHeight*.38 }}>
            <HomeSlider dataSource={this.state.sliderData} title="Must See"/>
          </Row> : null}
          <Row >
            <HomeMenuList dataSource={this.state.menuListData}  />
          </Row>
        </Grid>
      </ScrollView>
    )
  }

  onFresh() {
    this.setState({sliderLoaded: false, menuListLoad: false, refreshing: true});
    this.loadHomeData();
  }
}