import React from 'react';
import {View, Image, TouchableOpacity, ScrollView, Text} from 'react-native';
import {Col, Row, Grid} from 'react-native-easy-grid';

import {MenuListItemData, MenuType, AppIcon, MapHelper} from '../common/constain';
import {Icon} from 'native-base';
import {DetailBanner} from '../components/detail/DetailBanner';
import {style} from '../styles/style';
import {DetailText} from '../components/detail/DetailText';
import {DetailInfo} from '../components/detail/DetailInfo';
import {DetailImage} from '../components/detail/DetailImage';
import {DetailNearPlace} from '../components/detail/DetailNearPlace';
import {DNPageRoute} from '../NavigationHelper';
import {Menu} from '../components/menu/Menu';
import {ReactMap} from "../components/map/ReactMap";
import {DetailMapTextItem} from '../components/detail/DetailMapTextItem';
import {ReactMapDirection} from '../components/map/ReactMapDirection';
import { NavigationActions } from 'react-navigation';
import {navigationStore, navigateToRouteAction} from '../stores/NavigationStore';
import Communications from 'react-native-communications';
import {GDNServiceInstance} from '../services/GDNService';

export class DetailScreen extends React.Component {
  state = {
    dataDetail: {}
  };

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
  }

  async componentDidMount() {
    const {params} = this.props.navigation.state;
    let itemId = (params && params.itemId) || 0;
    let data = await GDNServiceInstance.getPlaceById(itemId);
    this.setState({
      dataDetail: data,
    });
  }

  render() {
    if(!this.state.dataDetail) return null;
    let data = this.state.dataDetail;
    let detailInfo = [];
    detailInfo.push({infoIcon: data.addressIcon || '?', infoText: data.address});
    detailInfo.push({infoIcon: data.phoeneIcon || '?', infoText: data.phone});
    detailInfo.push({infoIcon: data.websiteIcon || '?', infoText: data.website, isUrl: true});
    detailInfo.push({infoIcon: data.openHourIcon || '?', infoText: data.openHour});
    let detailNearBy = MenuListItemData.filter(t => t.id != data.id);
    let destCoord = {
      latitude: 16.0699448,
      longitude: 108.2241556,
    };
    return (
      data ? (
          <Grid>
            <Col>
              <ScrollView>
                <Row size={1}>
                  <DetailBanner
                    coverImg={data.heroImage}
                    onSharedClicked={() => this.shareDetail(data.id)}
                    onFavoriteClicked={() => this.likeDetail(data.id)}/>
                </Row>
                <Row size={2}>
                  <View style={style.detailContent}>
                    <DetailText title={data.title} description={data.description}/>
                    <View style={style.detailMap}>
                      <ReactMap />

                      <View style={style.detailOverlay}>

                        <DetailMapTextItem leftText={data.address} leftIcon={data.addressIcon}
                                            rightText={"CHỈ ĐƯỜNG"} rightIcon={AppIcon.Direction}
                                           onMapItemClicked={()=> this.handleDirection(data.address, MapHelper.getRandomDestination())}
                        />
                        <DetailMapTextItem leftText={data.phone} leftIcon={data.phoeneIcon}
                                           rightText={"GỌI"} rightIcon={AppIcon.Calling}
                                           onMapItemClicked={()=> this.handleCalling(data.phone)}
                        />
                        <DetailMapTextItem leftText={data.website} leftIcon={data.websiteIcon}
                                           rightText={"LIÊN KẾT"} rightIcon={AppIcon.Link}
                                           onMapItemClicked={()=> this.handleLink(data.website)}
                        />
                        <DetailMapTextItem lastItem leftText={data.address} leftIcon={data.addressIcon}
                                           rightText={"ĐANG MỞ"}
                                           onMapItemClicked={()=> {}}
                        />
                      </View>
                    </View>
                    <DetailImage images={data.images}/>
                    <DetailNearPlace nearByPlaces={detailNearBy} onNearByClicked={(id) => this.goToPlace(id)}/>
                  </View>
                </Row>
              </ScrollView>
            </Col>
          </Grid>) : null
    )
  }

  shareDetail(id) {

  }

  likeDetail(id) {

  }

  goToPlace(id) {
    navigationStore.dispatch(navigateToRouteAction('DetailScreen',{itemId: id}));
  }

  handleDirection(address, coord) {
    navigationStore.dispatch(navigateToRouteAction('ReactMapDirection',{ coordinate:coord}));
  }

  handleCalling(tel) {
    Communications.phonecall(tel, true);
  }

  handleLink(website) {
    Communications.web(website);
  }
}