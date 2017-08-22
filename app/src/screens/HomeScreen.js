import React from 'react';
import {ToastAndroid, ScrollView, RefreshControl} from 'react-native';
import {Text} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {HomeMenuList} from '../components/home/HomeMenuList';
import {viewportHeight} from '../common/constain';
import HomeSlider from '../components/home/HomeSlider';
import {NavigationActions} from 'react-navigation';
import {navigationStore, navigateAction} from '../stores/NavigationStore';
import {appStore} from '../stores/AppStore';
import {GDNServiceInstance} from '../services/GDNService';
import {Menu} from '../components/menu/Menu';
import {LStrings} from '../common/LocalizedStrings';

export class HomeScreen extends React.Component {

  state = {
    sliderData: null,
    menuListData: null,
    sliderLoaded: false,
    menuListLoad: false,
    refreshing: false,
    loadingMore: false,
    currentIndex: 0,
  };
  unSubscribe;

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
    this.unSubscribe = appStore.subscribe(() => {
      this.onFresh();
    });
    this.setState({showSlider: true});
    Menu.instance.setNavigation(this.props.navigation);
  }

  componentDidMount() {
    const {params} = this.props.navigation.state;
    if (params) {
      let menuListData = params.homeList;
      let sliderData = params.homeSlider;
      this.setState({showSlider: (sliderData != null && sliderData.length > 0)});
      this.setState({menuListData, menuListLoad: true, sliderData, sliderLoaded: true});
    } else {
      this.loadHomeData();
    }
  }

  componentWillUnmount() {
    if (typeof this.unSubscribe === "function")
      this.unSubscribe();
  }

  loadHomeData() {
    this.setState({
      currentIndex: 0,
    });
    (async() => {
      let menuListData = await GDNServiceInstance.getHomeMenuList();
      this.setState({menuListData, menuListLoad: true});
      if (this.state.sliderLoaded) {
        this.setState({
          refreshing: false
        });
      }
    })();
    (async() => {
      let sliderData = await GDNServiceInstance.getHomeSlider(0);
      this.setState({showSlider: (sliderData != null && sliderData.length > 0)});
      this.setState({sliderData, sliderLoaded: true});
      if (this.state.menuListLoad) {
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
              <HomeSlider dataSource={this.state.sliderData || []} title={LStrings.MustSee}
                          onLoadMore={(index) => this.loadMoreHomeSlider(index)}
                          loadingMore={this.state.loadingMore}
                          currentIndex={this.state.currentIndex}
              />
            </Row> : <Row><Text></Text></Row> }
          <Row style={!this.state.showSlider ? {minHeight: viewportHeight} : {}}>
            <HomeMenuList dataSource={this.state.menuListData}/>
          </Row>
        </Grid>
      </ScrollView>
    )
  }

  onFresh() {
    this.setState({sliderLoaded: false, menuListLoad: false, refreshing: true});
    this.loadHomeData();
  }

  async loadMoreHomeSlider(index) {
    this.setState({
      loadingMore: true,
    });
    let result = await GDNServiceInstance.getHomeSlider(index);
    setTimeout(() => {
      this.setState({
        loadingMore: false,
      });
    }, 500);

    let oldData = this.state.sliderData ? this.state.sliderData.slice() : [];
    if (result) {
      let newData = oldData.concat(result);
      this.setState({
        sliderData: newData,
        currentIndex: index,
      });
    }
  }
}