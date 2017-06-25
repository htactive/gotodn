import React from 'react';
import {View, ScrollView, TouchableHighlight, Text, Button, TouchableOpacity} from 'react-native';
import {Title, Icon, Picker, Drawer, Input, Item} from 'native-base';
import {StyleBase} from '../../styles/style';
import {MenuContent} from './MenuContent';

import {MenuHeader} from './MenuHeader';
import {MenuType, viewportHeight, MenuListItemData} from '../../common/constain';
import {MenuSearch} from './MenuSearch';
import {DNPageRoute} from '../../NavigationHelper';
import {DetailScreen} from '../../screens/DetailScreen';

const drawerStyles = {
  drawer: {
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 0,
    backgroundColor: '#ffffff'
  }
};

export class Menu extends React.Component {

  drawer;

  navigation;

  static instance: Menu;

  setNavigation(navigation: any) {
    this.navigation = navigation;
  }

  enableMenu() {
    if (!this.state.enableMenu) {
      this.setState({enableMenu: true});
    }
  }

  disableMenu() {
    if (this.state.enableMenu) {
      this.setState({enableMenu: false});
    }
  }

  setTitle(title) {
    this.setState({
      title: title
    });
  }

  setType(type) {
    if (this.state.menuType != type)
      this.setState({
        menuType: type
      });
  }

  state = {
    drawerType: 'overlay',
    openDrawerOffset: 130,
    closedDrawerOffset: 0,
    panOpenMask: 0.1,
    panCloseMask: 0,
    panThreshold: .2,
    tweenDuration: 100,
    tweenEasing: 'linear',
    disabled: false,
    acceptTap: true,
    acceptPan: true,
    tapToClose: true,
    side: 'right',
    enableMenu: true,
    showSearchBar: false,
    searchValue: '',
    menuType: MenuType.HomeScreen,
    title: '',
  };

  componentWillMount() {
    Menu.instance = this;
    this.drawer = {};
  }

  componentDidMount() {
    this.setState({
      selectedCity: 1
    });
  }

  render() {

    let menuContent = <MenuContent navigation={this.navigation} onCloseMenu={() => this.closeMenu()}/>;

    return (
      <Drawer
        ref={(c) => this.drawer = c}
        type={this.state.drawerType}
        openDrawerOffset={this.state.openDrawerOffset}
        closedDrawerOffset={this.state.closedDrawerOffset}
        panOpenMask={this.state.panOpenMask}
        panCloseMask={this.state.panCloseMask}
        panThreshold={this.state.panThreshold}
        content={menuContent}
        styles={drawerStyles}
        disabled={!this.state.enableMenu}
        tweenHandler={(ratio) => this.tweenHandler(ratio)}
        tweenDuration={this.state.tweenDuration}
        tweenEasing={this.state.tweenEasing}
        acceptDoubleTap={false}
        acceptTap={this.state.acceptTap}
        acceptPan={this.state.acceptPan}
        tapToClose={this.state.tapToClose}
        side={this.state.side}
      >
        <View style={{flex:1}}>
          {!this.state.enableMenu || (
            <View style={{flex:10,  backgroundColor: StyleBase.header_color}}>
              <MenuHeader
                onCityChanged={(value) => this.cityChanged(value)}
                onOpenDraw={() => this.openDrawer()}
                onLogoClicked={() => this.logoClicked()}
                onBackClicked={() => this.goBack()}
                onToggleSearchBar={(toggle) => this.toggleSearchBar(toggle)}
                onSearchChanged={(text) => this.setState({
                  searchValue: text,
                })}
                showSearchBar={this.state.showSearchBar}
                type={this.state.menuType}
                menuTitle={this.state.title}
              />
            </View>
          ) }
          <View style={{flex:90, flexDirection: 'column', backgroundColor: '#fff', position:'relative'}}>
            {this.props.children}
            {this.state.showSearchBar && (
              <View style={{
                top:0,
                left:0,
                right:0,
                bottom:0,
                flex: 1,
                flexDirection: 'column',
                justifyContent:'flex-start',
                position: 'absolute',
                backgroundColor: 'rgba(245, 245, 245, .9)',
                minHeight: viewportHeight * .9
              }}>
                <MenuSearch search={this.state.searchValue}
                            onSearchSelected={(data) => this.searchSelect(data)}
                />
              </View>
            )}
          </View>
        </View>
      </Drawer>
    )
  }

  cityChanged(city) {
    this.setState({
      selectedCity: city
    });
  }

  closeMenu() {
    this.drawer._root.close();
  }

  openDrawer() {
    this.drawer._root.open();
  }

  tweenHandler(ratio) {
    let drawerShadow = ratio < .2 ? ratio * 5 * 5 : 5
    return {
      drawer: {
        shadowRadius: drawerShadow,
      },
      main: {
        opacity: (2 - ratio) / 2,
      },
    }
  }

  logoClicked() {

  }

  goBack() {
    this.navigation.goBack(null);
  }

  toggleSearchBar(toggle) {
    this.setState({
      showSearchBar: toggle
    });
  }

  searchSelect(data) {
    this.navigation.navigate(DNPageRoute(DetailScreen), {itemId: data && data.id});
    this.toggleSearchBar(false);
  }
}