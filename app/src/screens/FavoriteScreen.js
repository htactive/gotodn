import React from 'react';
import {View, Image, TouchableOpacity, ScrollView, Text, AsyncStorage} from 'react-native';
import {Icon, Spinner} from 'native-base';
import {GDNServiceInstance} from '../services/GDNService';
import {Helper, viewportWidth, viewportHeight, AppIcon} from '../common/constain';
import {appStore} from '../stores/AppStore';
import {commonStore} from '../stores/CommonStore';
import {StyleBase, style} from '../styles/style';
import styles from '../styles/slider-css';
import {NavigationActions} from 'react-navigation';
import {LStrings} from '../common/LocalizedStrings';
import {Menu} from '../components/menu/Menu';

export class FavoriteScreen extends React.Component {
  state = {
    data: null,
    showLoading: true,
  };

  unSubscribe;
  unSubscribeCommon;

  componentWillMount() {
    this.unSubscribe = appStore.subscribe(() => {
      this.loadData();
    });
    this.unSubscribeCommon = commonStore.subscribe(() => {
      this.loadData();
    });
  }

  componentDidMount() {
    this.loadData();
  }

  componentWillUnmount() {
    if (typeof this.unSubscribe === "function")
      this.unSubscribe();
    if (typeof this.unSubscribeCommon === "function")
      this.unSubscribeCommon();
  }

  async loadData() {
    this.setState({
      showLoading: true,
      data: null,
    });
    Menu.instance.setTitle(LStrings.FavoritePlace);
    let fPlaceIdValue = await AsyncStorage.getItem(Helper.FavoriteKey);
    if (fPlaceIdValue) {
      let data = await GDNServiceInstance.getFavoritePlaces(fPlaceIdValue);
      if (data) {
        this.setState({
          data: data
        });
      }
    }
    this.setState({
      showLoading: false
    });
  }

  render() {
    return (
      <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent:'flex-start',
                backgroundColor: '#fff',
                minHeight: viewportHeight * .9
              }}>
        <View style={style.size1}>
          <ScrollView style={{alignSelf: 'stretch'}}>
            {this.state.data ? this.state.data.map((d, index) =>
                <TouchableOpacity key={index}
                                  onPress={() => this.gotoDetail(d)}
                                  style={[style.detailInfoItem, { paddingVertical: 15, paddingHorizontal: 10},
                                        this.state.selectedIndex == index ? {
                                          backgroundColor: '#b3e5fc'
                                        } : {},
                                        index == this.state.data.length && {borderBottomWidth: 0}
                                ]}>
                  <View style={{flex: 25, justifyContent: 'center', alignItems: 'flex-start'}}>
                    <Image
                      style={{resizeMode: 'cover', width: (viewportWidth - 30) / 5, height: (viewportWidth - 30) / 5}}
                      source={{uri: d.heroImage || Helper.ImageUrl}}/>
                  </View>
                  <View style={{flex: 75}}>
                    <View style={{flex: 3}}>
                      <Text numberOfLines={1} style={style.detailNearByTitle}>{d.title}</Text>
                    </View>
                    <View style={{flex: 7, justifyContent:'space-between'}}>
                      <View style={{flexDirection:'row'}}>
                        <View style={{flex:1, justifyContent: 'center', alignItems: 'flex-start'}}>
                          <Image style={[style.iconImgXxs, {tintColor: '#263238'}]} source={AppIcon.Location}/>
                        </View>
                        <View style={{flex:9,justifyContent: 'center', alignItems: 'flex-start'}}>
                          <Text numberOfLines={1} style={[style.menuSearchInfo, {paddingLeft: 5}]}>{d.address}</Text>
                        </View>
                      </View>
                      <View style={{flexDirection:'row'}}>
                        <View style={{flex:1, justifyContent: 'center', alignItems: 'flex-start'}}>
                          <Image style={[style.iconImgXxs, {tintColor: '#263238'}]} source={AppIcon.Tel}/>
                        </View>
                        <View style={{flex:9, justifyContent: 'center', alignItems: 'flex-start'}}>
                          <Text numberOfLines={1} style={[style.menuSearchInfo, {paddingLeft: 5}]}>{d.phone}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ) :
              this.state.showLoading ?
                <View style={[styles.container, style.centralizedContent, {backgroundColor: 'rgba(255,255,255,0)'}]}>
                  <Spinner color={StyleBase.header_color}/>
                </View> :
                <View style={[styles.container, style.centralizedContent, {backgroundColor: 'rgba(255,255,255,0)'}]}>
                  <Text style={[style.menuSearchTitle, {paddingLeft: 5}]}>{LStrings.NotExistFavorite}</Text>
                </View>}
          </ScrollView>
        </View>
      </View>
    );
  }

  gotoDetail(d) {
    const navigateAction = NavigationActions.navigate({
      routeName: 'DetailScreen',
      params: {itemId: d.id}
    });
    this.props.navigation.dispatch(navigateAction);
  }
}
