import React from 'react';
import {View, ScrollView, TouchableHighlight, Text, Button, TouchableOpacity} from 'react-native';
import {Title, Icon, Picker,Drawer, Input, Item} from 'native-base';
import {StyleBase} from '../../styles/style';
import {MenuContent} from './MenuContent';

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

  static instance: Menu;

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

  state = {
    drawerType: 'overlay',
    openDrawerOffset: 100,
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
    showSearchBar: false
  };

  componentWillMount() {
    Menu.instance = this;
  }

  componentDidMount() {
    this.setState({
      selectedCity: 1
    });
  }

  render() {
    let menuContent = <MenuContent onCloseMenu={() => this.closeMenu()}/>;

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
            <View style={{flex:10, justifyContent:'space-between', backgroundColor: StyleBase.header_color}}>
              <View style={{height:5}}/>
              <View style={{flexDirection: 'row', justifyContent:'flex-start',
                          backgroundColor: StyleBase.header_color, alignItems:'center'}}>
                {this.state.showSearchBar ? (
                    <View style={{flex: 80, flexDirection: 'row', justifyContent:'space-between'}}>
                      <View style={{flex: 8, alignItems:'center'}}>
                        <Item regular>
                          <Input style={{color: '#fff', height: 30, paddingHorizontal: 10}}  />
                        </Item>
                      </View>
                      <View style={{flex: 2, alignItems:'center'}}>
                        <TouchableOpacity onPress={() => this.toggleSearchBar(false)}>
                          <Icon name='ios-close-outline' style={{color:'#ffffff', fontSize:30, paddingHorizontal: 10}}/>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ) : (
                    <View style={{flex: 80, flexDirection: 'row'}}>
                      <View style={{flex: 15, flexDirection: 'row', justifyContent:'flex-start',alignItems:'center'}}>
                        <Icon name='ios-hand-outline' style={{color:'#ffffff', fontSize:30, paddingHorizontal: 15}}/>
                      </View>
                      <View style={{flex: 45, flexDirection: 'row', justifyContent:'flex-start',alignItems:'center'}}>
                        <View style={{flex: 15,  justifyContent:'center',alignItems:'center'}}>
                          <Icon name='ios-locate-outline' style={{color:'#ffffff', fontSize:30}}/>
                        </View>
                        <View style={{flex: 85}}>
                          <Picker
                            style={{color:'#fff'}}
                            supportedOrientations={['portrait','landscape']}
                            iosHeader="Chọn thành phố"
                            mode="dropdown"
                            selectedValue={this.state.selectedCity}
                            onValueChange={(city) => this.onCityChange(city)}>
                            <Picker.Item label="Đà Nẵng" value="1"/>
                            <Picker.Item label="Hội An" value="2"/>
                            <Picker.Item label="Huế" value="3"/>
                            <Picker.Item label="Sài Gòn" value="4"/>
                          </Picker>
                        </View>
                      </View>
                      <View style={{flex: 20}} />

                    </View>
                  )}

                <View style={{flex: 20, flexDirection: 'row', justifyContent:'flex-end',alignItems:'flex-end'}}>
                  <TouchableOpacity onPress={() => this.toggleSearchBar(true)}>
                    <Icon name='ios-search-outline' style={{color:'#ffffff', fontSize:30, paddingHorizontal: 10}}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => this.drawer.open()}>
                    <Icon name='ios-menu' style={{color:'#ffffff', fontSize:30, paddingHorizontal: 10}}/>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) }
          <View style={{flex:90, flexDirection: 'column'}}>
            {this.props.children}
          </View>
        </View>
      </Drawer>
    )
  }

  toggleSearchBar(toggle) {
    this.setState({
      showSearchBar: toggle
    });
  }

  onCityChange(city) {
    this.setState({
      selectedCity: city
    });
  }

  closeMenu() {
    this.drawer.close();
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
}