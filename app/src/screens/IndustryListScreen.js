import React from 'react';
import {Text, View, Image, ScrollView, TouchableOpacity, Dimensions, RefreshControl} from 'react-native';
import {Icon, Spinner, Item, Input} from 'native-base';
import {style, StyleBase} from "../styles/style";
import {IndustryData, viewportWidth, viewportHeight, MenuListData, Helper} from '../common/constain';
import {DNPageRoute} from '../NavigationHelper';
import {DetailScreen} from '../screens/DetailScreen';
import {IndustryDetailScreen} from './IndustryDetailScreen';
import { NavigationActions } from 'react-navigation';
import {navigationStore, navigateToRouteAction} from '../stores/NavigationStore';
import {GDNServiceInstance} from '../services/GDNService';
import {appStore} from '../stores/AppStore';
import {Menu} from '../components/menu/Menu';
import {LStrings} from '../common/LocalizedStrings';

const imgHeight = Math.round((viewportWidth - 30) / 2);
const textHeight = Math.round(viewportHeight / 3.3);
const itemHeight = imgHeight + textHeight;

export class IndustryListScreen extends React.Component {
  state = {
    isLoaded: false,
    dataLeft: [],
    dataRight: [],
    refreshing: false,
    searchValue: '',
    loadingMore: false,
    currentIndex: 0,
  };

  savedData;
  unSubscribe;
  unSubscribeCommon;
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
      this.onFresh();
    });
  }

  componentWillUnmount(){
    if (typeof this.unSubscribe === "function")
      this.unSubscribe();
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    this.setState({
      currentIndex: 0,
    });
    const { params } = this.props.navigation.state;
    let listId = (params && params.listId) || 0;
    let objectResult = await GDNServiceInstance.getCagegoryNoServiceById(listId, this.state.currentIndex);
    if(objectResult && objectResult.data) {
      let result = objectResult.data;
      this.savedData = result;
      let dataLeft = [], dataRight = [];
      for (let i = 0; i < result.length; i++) {
        let data = result[i];
        if (i % 2 === 0) dataLeft.push(data);
        else dataRight.push(data);
      }

      this.setState({
        dataLeft: dataLeft,
        dataRight: dataRight,
        isLoaded: true,
        refreshing: false,
      });
    } else {
      setTimeout(() => {
        this.setState({
          isLoaded: true,
          refreshing: false,
        });
      }, 1000)
    }

  }

  searchData(searchValue) {
    let data = searchValue != '' ? this.savedData
      .filter(t => Helper.stripDiacritics(t.title.toLowerCase()).indexOf(Helper.stripDiacritics(searchValue.toLowerCase())) != -1)
      : this.savedData;
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
      loadingMore: false,
      currentIndex: 0,
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
                             borderColor: '#fff',justifyContent: 'center',
    alignItems: 'center',}}>
                <Icon active name='ios-search-outline' style={{color:'#8e8e93', fontSize:25}}/>
                <Input value={this.state.searchValue}
                       placeholder={LStrings.Search}
                       placeholderTextColor='#8e8e93'
                       style={{color: '#263238', height: 40,
                             fontFamily: StyleBase.sp_regular,
                             fontSize: 14,
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
                onScroll={(e) => {this.handleScrollBottom(e)}}
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
                                source={{uri: data.heroImage || Helper.ImageUrl}}
                                style={[style.menuItemImage, {height: imgHeight}]}
                              />
                            </View>
                            <View
                              style={{flex: textHeight/itemHeight, backgroundColor: 'rgba(0,0,0,0)'}}>
                              <View style={style.menuItemTextContain}>
                                <Text style={style.industryItemTitle} numberOfLines={1}>{ data.title }</Text>
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
                                  source={{uri: data.heroImage || Helper.ImageUrl}}
                                  style={[style.menuItemImage, {height: imgHeight}]}
                                />
                              </View>
                              <View
                                style={{flex: textHeight/itemHeight, backgroundColor: 'rgba(0,0,0,0)'}}>
                                <View style={style.menuItemTextContain}>
                                  <Text style={style.industryItemTitle} numberOfLines={1}>{ data.title }</Text>
                                  <Text style={style.industryItemSubTitle} numberOfLines={6}>{ data.description }</Text>
                                </View>
                              </View>
                            </View>
                          </TouchableOpacity>
                        </View>
                      ) : (<View style={{alignSelf: 'stretch'}}/>)}
                  </View>
                </View>
                {this.savedData && this.state.loadingMore ?
                  <View style={[style.loadingMore]}>
                    <Spinner color={StyleBase.header_color}/>
                  </View> : null}
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
    navigationStore.dispatch(navigateToRouteAction('DetailScreen',{itemId: id}));
  }

  handleChanged(text) {
    this.setState({
      searchValue: text,
    });
    this.searchData(text);
  }

  loadMoreTimeout;

  handleScrollBottom(e) {
    if (!this.state.loadingMore) {
      if (this.loadMoreTimeout)
        clearTimeout(this.loadMoreTimeout);
      let windowHeight = Dimensions.get('window').height * .9,
        height = itemHeight ? (itemHeight * 15 * (this.state.currentIndex + 1)) : 0;
      offset = e.nativeEvent.contentOffset.y;
      if (height > 0 && windowHeight + offset >= height * .7) {
        this.loadMoreTimeout = setTimeout(() => {
          this.setState({
            loadingMore: true,
          });
          (async() => {
            let nextId = this.state.currentIndex + 1;
            const { params } = this.props.navigation.state;
            let listId = (params && params.listId) || 0;
            let result = await GDNServiceInstance.getCagegoryNoServiceById(listId, nextId);
            this.setState({
              loadingMore: false,
            });
            debugger;
            let oldData = this.savedData ? this.savedData.slice() : [];
            if (result && result.data) {
              let newData = oldData.concat(result.data);
              this.savedData = newData;
              let dataLeft = [], dataRight = [];
              for (let i = 0; i < newData.length; i++) {
                let data = newData[i];
                if (i % 2 === 0) dataLeft.push(data);
                else dataRight.push(data);
              }
              this.setState({
                dataLeft: dataLeft,
                dataRight: dataRight,
              });
              this.setState({
                currentIndex: nextId,
              });
            }
          })();
        }, 100);
      }
    }
  }
}