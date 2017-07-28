import React from 'react';
import {PanResponder} from 'react-native';
import {Tabs, Tab, Left, Thumbnail, Body, Button, Icon, TabHeading, Text, ScrollableTab} from 'native-base';
import {viewportWidth, MenuListData, MenuType} from '../common/constain';
import {ListDetail} from '../components/list/ListDetail';
import {Menu} from '../components/menu/Menu'
import {StyleBase} from '../styles/style';
import { NavigationActions } from 'react-navigation';
import {navigationStore, navigateAction} from '../stores/NavigationStore';

export class ListScreen extends React.Component {
  state = {
    currentTab: 0,
    listData: [],
    scroll: false,
  };

  _panResponderSlider;
  _panResponder;

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
    this.setState({
      listData: MenuListData
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
    return (
      <Tabs initialPage={curTab || 0}
            locked
            onChangeTab={(page) => this.tabChanged(page)}
            renderTabBar={()=> <ScrollableTab />}
            style={{backgroundColor: '#29b6f6'}}
      >
        {this.state.listData.length > 0 && this.state.listData.filter(t => t.id == listId)[0] != null
        && this.state.listData.filter(t => t.id == listId)[0].services.map((data, index) =>
          <Tab key={index}
               tabStyle={{backgroundColor:'#29b6f6',borderBottomWidth: 3, borderBottomColor:'#eeeeee'}}
               textStyle={{color:'#556c7a', fontWeight: 'normal'}}
               activeTabStyle={{backgroundColor: '#29b6f6',borderBottomWidth: 3, borderBottomColor:StyleBase.header_color}}
               activeTextStyle={{color:'#fff', fontWeight: 'normal'}}
               heading={data.title}>
            <ListDetail panResponderSlider={this._panResponderSlider}
                        panResponder={this._panResponder}
                        navigation={this.props.navigation} />
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