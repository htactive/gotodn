import React from 'react';
import {View, ScrollView, TouchableHighlight, Text, Button, TouchableOpacity, NetInfo, AsyncStorage, Platform, BackHandler, ToastAndroid} from 'react-native';
import {Title, Icon, Picker, Drawer, Input, Item} from 'native-base';
import {StyleBase} from '../../styles/style';
import {MenuContent} from './MenuContent';

import {MenuHeader} from './MenuHeader';
import {MenuType, viewportHeight, viewportWidth, Helper} from '../../common/constain';
import {MenuSearch} from './MenuSearch';
import {DNPageRoute} from '../../NavigationHelper';
import {DetailScreen} from '../../screens/DetailScreen';
import {navigationStore, navigateToRouteAction} from '../../stores/NavigationStore';
import {appStore, appSaveCity} from '../../stores/AppStore';
import {commonStore, toggleSearchBar, CommonStoreActions} from '../../stores/CommonStore';
import {NavigationActions} from 'react-navigation';
import {LStrings} from '../../common/LocalizedStrings';

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
    enableMenu: false,
    showSearchBar: false,
    searchValue: '',
    menuType: MenuType.HomeScreen,
    title: '',
    hasConnection: true,
    showConnectText: false,
  };

  componentWillMount() {
    Menu.instance = this;
    this.drawer = {};
    this.setState({
      hasConnection: false,
    });
    commonStore.subscribe(() => {
      let commonState = commonStore.getState();
      if(commonState.type == CommonStoreActions.CloseSearchBar) {
        this.setState({
          showSearchBar: false,
          searchValue: ''
        });
      }
    });
  }

  componentDidMount() {
    this.setState({
      selectedCity: 1
    });
  }

  isHandle = false;

  handleNetInfo() {
    if (!this.isHandle) {
      this.isHandle = true;
      NetInfo.addEventListener(
        'change',
        (value) => {
          if (value == 'WIFI' || value == 'wifi' || value == 'MOBILE' || value == 'cell' || value == 'VPN') {
            NetInfo.removeEventListener(
              'change'
            );
            this.setState({hasConnection: true})
            setTimeout(() => {
              this.setState({showConnectText: false})
            }, 1000)
          } else {
            this.setState({hasConnection: false, showConnectText: true})
          }
        }
      );
    }
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
            <View style={{height:viewportHeight*.08,  backgroundColor: StyleBase.header_color}}>
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
              {this.state.showConnectText ?
                <View style={{position: 'absolute', top: 5, left: viewportWidth*.125,
        backgroundColor: 'rgba(255,255,255,1)',
        flexDirection: 'row', alignItems:'center', justifyContent: 'center',
        width: viewportWidth*.75, height: 45, borderRadius: 5, padding: 5 }}>
                  <TouchableOpacity onPress={() => {}} style={
            {flexDirection: 'row', alignItems:'center', justifyContent: 'center'}
          }>
                    <Text style={{fontFamily: StyleBase.sp_regular, fontSize: 13, color:'#039be5'}}>
                      {this.state.hasConnection ? 'Connected' : 'No Connect'}
                    </Text>
                  </TouchableOpacity>
                </View> : null}
            </View>
          ) }
          <View style={{flex:1, flexDirection: 'column', backgroundColor: '#fff', position:'relative'}}>
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

  async cityChanged(city) {
    this.setState({
      selectedCity: city
    });
    await AsyncStorage.setItem(Helper.CityKey, city + '');
    appStore.dispatch(appSaveCity(city));

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
    let routeName = 'HomeScreen';
    const actionToDispatch = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName})]
    });

    this.navigation.dispatch(actionToDispatch);
  }

  goBack() {
    this.navigation.goBack(null);
  }

  toggleSearchBar(toggle) {
    commonStore.dispatch(toggleSearchBar(toggle));
    this.setState({
      showSearchBar: toggle,
      searchValue: ''
    });
  }

  searchSelect(data) {
    navigationStore.dispatch(navigateToRouteAction('DetailScreen', {itemId: data && data.id}));

    this.toggleSearchBar(false);
  }
}