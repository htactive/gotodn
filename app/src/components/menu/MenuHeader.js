import React from 'react';
import {View, ScrollView, TouchableHighlight, Text, Button, TouchableOpacity} from 'react-native';
import {Title, Icon, Picker, Drawer, Input, Item} from 'native-base';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {LocationPicker} from '../common/LocationPicker';

export class MenuHeader extends React.Component {
  state = {showSearchBar: false, searchBarValue:''};

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
                      <Input autoFocus value={this.state.searchBarValue} style={{color: '#fff', height: 30, paddingHorizontal: 10}}
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
                  <Col size={70}>
                    <Row>
                      <Col size={15} style={{justifyContent:'center',alignItems:'center'}}>
                        <Icon name='ios-hand-outline' style={{color:'#ffffff', fontSize:30, paddingHorizontal: 15}}/>
                      </Col>
                      <Col size={45}>
                        <LocationPicker onCityChanged={(value) => this.cityChanged(value)}/>
                      </Col>
                      <Col size={10}/>
                    </Row>
                  </Col>
                  <Col size={30}>
                    <Row style={{alignItems:'center'}}>
                      <Col style={{alignItems:'flex-end'}}>
                        <TouchableOpacity onPress={() => this.toggleSearchBar(true)}>
                          <Icon name='ios-search-outline' style={{color:'#ffffff', fontSize:30}}/>
                        </TouchableOpacity>
                      </Col>
                      <Col style={{alignItems:'flex-end'}}>
                        <TouchableOpacity onPress={() => this.openDraw()}>
                          <Icon name='ios-menu' style={{color:'#ffffff', fontSize:30,paddingHorizontal: 15}}/>
                        </TouchableOpacity>
                      </Col>
                    </Row>
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