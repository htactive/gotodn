import React from 'react';
import {Col, Row, Grid} from 'react-native-easy-grid';
import TopSlider from '../components/slider/TopSlider';
import {Tabs, Tab, Left, Thumbnail, Body, Button, Icon, TabHeading, Text, ScrollableTab} from 'native-base';
import {viewportWidth, MenuListData} from '../common/constain';
import {ListDetail} from '../components/list/ListDetail';

export class ListScreen extends React.Component {
  state = {
    currentTab: 0,
    listData: [],
  };

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
    debugger;
    return (
      <Tabs initialPage={curTab || 0}
            locked
            onChangeTab={(page) => this.tabChanged(page)}
            renderTabBar={()=> <ScrollableTab />}
            style={{backgroundColor: '#29b6f6'}}
      >
        {this.state.listData.length > 0 && this.state.listData.filter(t => t.id == listId)[0].services.map((data, index) =>
          <Tab key={index}
               tabStyle={{backgroundColor:'#29b6f6',borderBottomWidth: 3, borderBottomColor:'#576d7a'}}
               textStyle={{color:'#556c7a', fontWeight: 'normal'}}
               activeTabStyle={{backgroundColor: '#29b6f6',borderBottomWidth: 3, borderBottomColor:'#576d7a'}}
               activeTextStyle={{color:'#fff', fontWeight: 'normal'}}
               heading={data.title}>
            <ListDetail />
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