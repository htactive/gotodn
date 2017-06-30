import React from 'react';
import {Text, View, Image, ScrollView, TouchableOpacity, Dimensions, RefreshControl} from 'react-native';
import {Icon, Spinner, Item, Input} from 'native-base';
import {style, StyleBase} from "../styles/style";
import {IndustryData, viewportWidth, viewportHeight, MenuListData, Helper} from '../common/constain';
import {DNPageRoute} from '../NavigationHelper';
import {DetailScreen} from '../screens/DetailScreen';
import {IndustryDetailScreen} from './IndustryDetailScreen';

const imgHeight = Math.round((viewportWidth - 30) / 2);
const textHeight = Math.round(viewportHeight / 3.5);
const itemHeight = imgHeight + textHeight;

export class IndustryListScreen extends React.Component {
  state = {
    isLoaded: false,
    dataLeft: [],
    dataRight: [],
    refreshing: false,
    searchValue: '',
  };

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    let dataLeft = [], dataRight = [];
    for (let i = 0; i < IndustryData.length; i++) {
      let data = IndustryData[i];
      if (i % 2 === 0) dataLeft.push(data);
      else dataRight.push(data);
    }

    setTimeout(() => {
      this.setState({
        dataLeft: dataLeft,
        dataRight: dataRight,
        isLoaded: true,
        refreshing: false,
      });
    }, 1000)
  }

  searchData(searchValue) {
    let data = searchValue != '' ? IndustryData
      .filter(t => Helper.stripDiacritics(t.title.toLowerCase()).indexOf(Helper.stripDiacritics(searchValue.toLowerCase())) != -1)
      : IndustryData;
    let dataLeft = [], dataRight = [];
    for (let i = 0; i < data.length; i++) {
      let d = data[i];
      if (i % 2 === 0) dataLeft.push(d);
      else dataRight.push(d);
    }

    this.setState({
      dataLeft: dataLeft,
      dataRight: dataRight,
      isLoaded: true,
      refreshing: false,
    });
  }

  render() {
    return (
      !this.state.isLoaded ? (
          <View style={{flex:1, alignItems: 'center', justifyContent: 'center',
                backgroundColor: '#ffffff',minHeight: Math.round(viewportHeight*.9)}}>
            <View style={{alignSelf:'center'}}>
              <Spinner color={StyleBase.header_color}/>
            </View>
          </View>
        ) : (
          <View style={{flex:1, backgroundColor: '#ffffff',minHeight: Math.round(viewportHeight*.9)}}>
            <View style={[{flex:1, backgroundColor: '#29b6f6',paddingHorizontal: 10}, style.centralizedContent]}>
              <Item regular style={{backgroundColor: '#fff',
                             borderRadius: 3,
                             borderColor: '#fff',}}>
                <Icon active name='ios-search-outline' style={{color:'#8e8e93', fontSize:25}}/>
                <Input value={this.state.searchValue}
                       placeholder={'Tìm kiếm ' }
                       placeholderTextColor='#8e8e93'
                       style={{color: '#263238', height: 35,
                             fontFamily: StyleBase.sp_regular,
                             fontSize: 16,
                             }}
                       onChangeText={(text) => this.handleChanged(text)}
                />
                {this.state.searchValue != '' && (
                  <TouchableOpacity onPress={() => this.handleChanged('')}>
                    <Icon name='ios-close-circle'
                          style={{color:'#8e8e93', fontSize:25}}/>
                  </TouchableOpacity>
                )}
              </Item>
            </View>
            <View style={{flex:9}}>
              <ScrollView
                refreshControl={
              <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => this.onFresh()} />
            }
              >
                <View style={[style.container, {paddingTop: 10}]}>
                  <View style={[style.containerHalf, {marginLeft:10, marginRight:5}]}>
                    {this.state.dataLeft.map((data, index) =>
                      <View key={index} style={{alignSelf: 'stretch'}}>
                        <TouchableOpacity
                          activeOpacity={0.7}
                          style={[style.menuItemDetail, {height: itemHeight}]}
                          onPress={() => {this.goToDetailIndustry(data.id)}}
                          key={index}
                        >
                          <View style={style.imageContainer}>
                            <View
                              style={{flex: imgHeight/itemHeight}}>
                              <Image
                                source={{uri: data.heroImage}}
                                style={[style.menuItemImage, {height: imgHeight}]}
                              />
                            </View>
                            <View
                              style={{flex: textHeight/itemHeight}}>
                              <View style={style.menuItemTextContain}>
                                <Text style={style.industryItemTitle} numberOfLines={2}>{ data.title }</Text>
                                <Text style={style.industryItemSubTitle} numberOfLines={6}>{ data.description }</Text>
                              </View>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                  <View style={[style.containerHalf, {marginLeft:5, marginRight:10}]}>
                    {this.state.dataRight.length > 0 ? this.state.dataRight.map((data, index) =>
                        <View key={index} style={{alignSelf: 'stretch'}}>
                          <TouchableOpacity
                            activeOpacity={0.7}
                            style={[style.menuItemDetail, {height: itemHeight}]}
                            onPress={() => {this.goToDetailIndustry(data.id)}}
                            key={index}
                          >
                            <View style={style.imageContainer}>
                              <View
                                style={{flex: imgHeight/itemHeight}}>
                                <Image
                                  source={{uri: data.heroImage}}
                                  style={[style.menuItemImage, {height: imgHeight}]}
                                />
                              </View>
                              <View
                                style={{flex: textHeight/itemHeight}}>
                                <View style={style.menuItemTextContain}>
                                  <Text style={style.industryItemTitle} numberOfLines={2}>{ data.title }</Text>
                                  <Text style={style.industryItemSubTitle} numberOfLines={6}>{ data.description }</Text>
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </View>
                      ) : (<View style={{alignSelf: 'stretch'}}/>)}
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
        )
    )
  }

  onFresh() {
    this.setState({refreshing: true});
    this.loadData();
  }

  goToDetailIndustry(id) {
    console.log('abc');
    this.props.navigation.navigate(DNPageRoute(IndustryDetailScreen), {itemId: 1});
  }

  handleChanged(text) {
    this.setState({
      searchValue: text,
    });
    this.searchData(text);
  }
}