import React from 'react';
import {PanResponder} from 'react-native';
import {Tabs, Tab, Left, Thumbnail, Body, Button, Icon, TabHeading, Text, ScrollableTab} from 'native-base';
import {viewportWidth, MenuListData, MenuType} from '../common/constain';
import {ListDetail} from '../components/list/ListDetail';
import {Menu} from '../components/menu/Menu';
import {StyleBase} from '../styles/style';
import { NavigationActions } from 'react-navigation';
import {navigationStore, navigateAction} from '../stores/NavigationStore';
import {GDNServiceInstance} from '../services/GDNService';
import {appStore} from '../stores/AppStore';

export class ListScreen extends React.Component {
  state = {
    currentTab: 0,
    listData: [],
    scroll: false,
  };

  _panResponderSlider;
  _panResponder;
  unSubscribe;
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
    this.unSubscribe = appStore.subscribe(() => {
      this.loadData();
    });
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const { params } = this.props.navigation.state;
    let listId = (params && params.listId) || 0;
    let data = await GDNServiceInstance.getCategoryById(listId);
    Menu.instance.setTitle(data.categoryName);
    this.setState({
      listData: data,
    });
  }

  render() {
    // let numberOfTab = this.state.listData.length < 3 ? this.state.listData.length : 3;
    //
    // let tabWidth = viewportWidth / (numberOfTab == 0 ? 1 : numberOfTab);
    // let curTab = this.state.currentTab;

    const { params } = this.props.navigation.state;
    let listId = (params && params.listId) || 0;
    let curTab = params && params.initIndex;
    if(!this.state.listData || !this.state.listData.services) return null;
    return (
      <Tabs initialPage={curTab || 0}
            locked
            onChangeTab={(page) => this.tabChanged(page)}
            renderTabBar={()=> <ScrollableTab />}
            style={{backgroundColor: '#29b6f6'}}
      >
        {this.state.listData.services.map((data, index) =>
          <Tab key={index}
               tabStyle={{backgroundColor:'#29b6f6',borderBottomWidth: 3, borderBottomColor:'#eeeeee'}}
               textStyle={{color:'#556c7a', fontWeight: 'normal'}}
               activeTabStyle={{backgroundColor: '#29b6f6',borderBottomWidth: 3, borderBottomColor:StyleBase.header_color}}
               activeTextStyle={{color:'#fff', fontWeight: 'normal'}}
               heading={data.title}>
            <ListDetail serviceId={data.id}
            />
          </Tab>
        )}
      </Tabs>

    )
  }

  tabChanged(page) {
    this.setState({
      currentTab: page.i
    });
  }
}