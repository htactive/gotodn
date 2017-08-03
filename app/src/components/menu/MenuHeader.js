import React from 'react';
import {View, ScrollView, TouchableHighlight, Text, Button, TouchableOpacity, Image} from 'react-native';
import {Title, Icon, Picker, Drawer, Input, Item} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {LocationPicker} from '../common/LocationPicker';
import {MenuType, AppIcon} from '../../common/constain';
import {style, StyleBase} from '../../styles/style';

export class MenuHeader extends React.Component {
  state = {
    showSearchBar: false,
    searchBarValue: '',
    showLogo: false,
    showBack: false,
    showPicker: false,
  };

  componentWillMount() {
    this.changeMenu(this.props.type || MenuType.HomeScreen)
  }

  componentWillUnmount() {
    clearTimeout(this.searchTimeout);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.type != this.props.type)
      this.changeMenu(nextProps.type || MenuType.HomeScreen)
    this.setState({
      showSearchBar: nextProps.showSearchBar
    })
  }

  changeMenu(type) {
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

  renderSearchBar() {
    return (
      <Row style={{paddingHorizontal: 10}}>
        <Col size={8} style={{justifyContent:'center',alignItems:'center'}}>
          <Item regular style={{backgroundColor: '#fff',
                             borderRadius: 3,
                             borderColor: '#fff',}}>
            <Icon active name='ios-search-outline' style={{color:'#8e8e93', fontSize:25}}/>
            <Input value={this.state.searchBarValue}
                   placeholder='Search Places...'
                   placeholderTextColor='#8e8e93'
                   style={{color: '#263238', height: 35,
                             fontFamily: StyleBase.sp_regular,
                             fontSize: 13,
                             }}
                   onChangeText={(text) => this.handleChanged(text)}
            />
            {this.state.searchBarValue != '' && (
              <TouchableOpacity onPress={() => this.handleChanged('')}>
                <Icon name='ios-close-circle'
                      style={{color:'#8e8e93', fontSize:25}}/>
              </TouchableOpacity>
            )}
          </Item>
        </Col>
        <Col size={2} style={{justifyContent:'center',alignItems:'flex-end'}}>
          <TouchableOpacity onPress={() => this.toggleSearchBar(false)}>
            <Text numberOfLines={1} style={{
                              color: '#fff',
                             fontFamily: StyleBase.sp_regular,
                             fontSize: 18,
                      }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </Col>
      </Row>);
  }

  renderHeader() {
    return (
      <Row>
        <Col size={1} style={style.centralizedContent}>
          {this.state.showLogo && (
            <View style={style.menuLeft}>
              <TouchableOpacity onPress={() => {
                        if(this.props.onLogoClicked)
                          this.props.onLogoClicked();
                      }}>
                <Image style={[style.iconImg ,{tintColor:'#ffffff', marginRight: 10}]} source={AppIcon.AppLogo || "https://avatars3.githubusercontent.com/u/20336495?v=4&s=460"}/>
              </TouchableOpacity>
            </View>
          )}
          {this.state.showBack && (
            <View style={style.menuLeft}>
              <TouchableOpacity onPress={() => {
                        if(this.props.onBackClicked)
                          this.props.onBackClicked();
                      }}>
                <Icon name='ios-arrow-back-outline' style={{color:'#ffffff', fontSize:40, paddingHorizontal: 15}}/>
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
              <Image style={[style.iconImg ,{tintColor:'#fff'}]} source={AppIcon.Search || "https://avatars3.githubusercontent.com/u/20336495?v=4&s=460"}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.openDraw()}>
              <Image style={[style.iconImg ,{tintColor:'#fff', marginLeft: 15}]} source={AppIcon.Menu || "https://avatars3.githubusercontent.com/u/20336495?v=4&s=460"}/>
            </TouchableOpacity>
          </View>
          <View style={[style.centralizedContent, ]}>
            <Text numberOfLines={1} style={style.menuTitleText}>
              {this.props.menuTitle ? this.props.menuTitle.toUpperCase() : ''}
            </Text>
          </View>
        </Col>
      </Row>
    )
  }

  render() {
    return (
      <Grid>
        <Row>
          <Col>
            {this.state.showSearchBar ? (
                this.renderSearchBar()
              ) :
              (
                this.renderHeader()
              )}
          </Col>
        </Row>
      </Grid>
    )
  }

  toggleSearchBar(toggle) {
    this.setState({
      searchBarValue: '',
      showSearchBar: toggle
    });
    this.props.onToggleSearchBar && this.props.onToggleSearchBar(toggle);
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

  searchTimeout = null;

  handleChanged(text) {
    this.setState({searchBarValue: text});
    if (this.searchTimeout)
      clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.props.onSearchChanged && this.props.onSearchChanged(text);
    }, 500);
  }
}