import React from 'react';
import {View, ScrollView, TouchableHighlight, Text, Button, TouchableOpacity} from 'react-native';
import {Title, Icon, Picker, Drawer, Input, Item} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {LocationPicker} from '../common/LocationPicker';
import {MenuType} from '../../common/constain';
import {style} from '../../styles/style';

export class MenuHeader extends React.Component {
  state = {
    showSearchBar: false,
    searchBarValue: '',
    showLogo: false,
    showBack: false,
    showPicker: false,
  };

  componentWillMount(){
    this.changeMenu(this.props.type || MenuType.HomeScreen)
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.type != this.props.type)
      this.changeMenu(nextProps.type || MenuType.HomeScreen)
  }

  changeMenu(type){
    switch (type) {
      case MenuType.HomeScreen:
        this.setState({
          showLogo: true,
          showBack: false,
          showPicker: true,
        });
        break;
      case MenuType.ListScreen:
        this.setState({
          showLogo: true,
          showBack: false,
          showPicker: false,
        });
        break;
      case MenuType.DetailScreen:
        this.setState({
          showLogo: false,
          showBack: true,
          showPicker: false,
        });
        break;
      default:
        this.setState({
          showLogo: true,
          showBack: false,
          showPicker: true,
        });
        break;
    }
  }

  render() {
    return (
      <Grid>
        <Row style={{height: 10}}/>
        <Row>
          <Col>
            {this.state.showSearchBar ? (
                <Row>
                  <Col size={15} style={{justifyContent:'center',alignItems:'center'}}>
                    <TouchableOpacity onPress={() => this.toggleSearchBar(false)}>
                      <Icon name='ios-arrow-round-back'
                            style={{color:'#ffffff', fontSize:35, paddingHorizontal: 10}}/>
                    </TouchableOpacity>
                  </Col>
                  <Col size={70} style={{justifyContent:'center',alignItems:'center'}}>
                    <Item>
                      <Icon active name='ios-search-outline' style={{color:'#ffffff', fontSize:25}}/>
                      <Input autoFocus value={this.state.searchBarValue}
                             style={{color: '#fff', height: 30, paddingHorizontal: 10}}
                             onChangeText={(text) => this.setState({searchBarValue: text})}
                      />
                    </Item>
                  </Col>
                  <Col size={15} style={{justifyContent:'center',alignItems:'center'}}>
                    {this.state.searchBarValue != '' && (
                      <TouchableOpacity onPress={() => this.setState({searchBarValue: ''})}>
                        <Icon name='ios-close'
                              style={{color:'#ffffff', fontSize:35, paddingHorizontal: 10}}/>
                      </TouchableOpacity>
                    )}
                  </Col>
                </Row>
              ) :
              (
                <Row>
                  <Col size={1} style={style.centralizedContent}>
                    {this.state.showLogo && (
                      <View style={style.menuLeft}>
                        <TouchableOpacity onPress={() => {
                        if(this.props.onLogoClicked)
                          this.props.onLogoClicked();
                      }}>
                          <Icon name='ios-hand-outline' style={{color:'#ffffff', fontSize:30, paddingHorizontal: 15}}/>
                        </TouchableOpacity>
                      </View>
                    )}
                    {this.state.showBack && (
                      <View style={style.menuLeft}>
                        <TouchableOpacity onPress={() => {
                        if(this.props.onBackClicked)
                          this.props.onBackClicked();
                      }}>
                          <Icon name='ios-arrow-back' style={{color:'#ffffff', fontSize:30, paddingHorizontal: 15}}/>
                        </TouchableOpacity>
                      </View>
                    )}
                    {this.state.showPicker && (
                      <View style={style.pickerLeft}>
                        <Col style={style.centralizedContent}>
                          <LocationPicker onCityChanged={(value) => this.cityChanged(value)}/>
                        </Col>
                      </View>
                    )}

                    <View style={style.menuRight}>
                      <TouchableOpacity onPress={() => this.toggleSearchBar(true)}>
                        <Icon name='ios-search-outline' style={{color:'#ffffff', fontSize:30}}/>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => this.openDraw()}>
                        <Icon name='ios-menu' style={{color:'#ffffff', fontSize:30,paddingHorizontal: 15}}/>
                      </TouchableOpacity>
                    </View>
                    <View style={[style.centralizedContent, {paddingTop:3}]}>
                      <Text numberOfLines={1} style={style.menuTitleText} >
                        {this.props.menuTitle ? this.props.menuTitle.toUpperCase() : ''}
                      </Text>
                    </View>
                  </Col>
                </Row>
              )}
          </Col>
        </Row>
      </Grid>
    )
  }

  toggleSearchBar(toggle) {
    this.setState({
      showSearchBar: toggle
    });
  }

  cityChanged(city) {
    this.setState({
      selectedCity: city
    });
    if (this.props.onCityChanged) {
      this.props.onCityChanged(city);
    }
  }

  openDraw() {
    if (this.props.onOpenDraw) {
      this.props.onOpenDraw();
    }
  }
}