import React from 'react';
import {View, Image, TouchableOpacity, ScrollView, Text} from 'react-native';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {MenuListItemData, MenuType, AppIcon, IconName} from '../common/constain';
import {Icon, Spinner} from 'native-base';
import {DetailBanner} from '../components/detail/DetailBanner';
import {style, StyleBase} from '../styles/style';
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
import {GoogleAPIServiceInstance} from '../services/GoogleAPIService';
import moment from 'moment';
import {appStore} from '../stores/AppStore';
import {LStrings} from '../common/LocalizedStrings';

export class DetailScreen extends React.Component {
  state = {
    dataDetail: {}
  };

  unSubscribe;

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
      const {params} = this.props.navigation.state;
      let itemId = (params && params.itemId) || 0;
      this.setState({
        dataDetail: {},
      });
      this.getDetailData(itemId);
      this.getNearByData(itemId);
    });
  }

  componentWillUnmount() {
    this.unSubscribe();
  }

  componentDidMount() {
    const {params} = this.props.navigation.state;
    let itemId = (params && params.itemId) || 0;
    this.getDetailData(itemId);
    this.getNearByData(itemId);
  }

  async getDetailData(id) {
    let data = await GDNServiceInstance.getPlaceById(id);
    this.setState({
      dataDetail: data,
    });
    let coord = await GoogleAPIServiceInstance.getGPSByAddress(data.address, data.district, data.city);
    this.setState({destCoord: coord});
  }

  async getNearByData(id) {
    let data = await GDNServiceInstance.getNearByPlaceById(id);
    this.setState({
      detailNearBy: data,
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
    //let detailNearBy = MenuListItemData.filter(t => t.id != data.id);

    return (
      !!data.id ? (
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
                    <DetailImage images={data.images}/>
                    <DetailText title={data.title || LStrings.NoTitle} description={data.description || LStrings.NoDescription}/>
                    <View style={style.detailMap}>
                      <ReactMap />

                      <View style={style.detailOverlay}>

                        <DetailMapTextItem leftText={data.address} leftIcon={AppIcon.Location}
                                            rightText={LStrings.Direction} rightIcon={AppIcon.Direction}
                                           onMapItemClicked={()=>
                                             this.handleDirection(data.address, this.state.destCoord)}
                        />
                        <DetailMapTextItem leftText={data.phone} leftIcon={AppIcon.Tel}
                                           rightText={LStrings.Call} rightIcon={AppIcon.Calling}
                                           onMapItemClicked={()=> this.handleCalling(data.phone)}
                        />
                        <DetailMapTextItem leftText={data.website} leftIcon={AppIcon.Web}
                                           rightText={LStrings.Link} rightIcon={AppIcon.Link}
                                           onMapItemClicked={()=> this.handleLink(data.website)}
                        />
                        <DetailMapTextItem lastItem leftText={this.renderHour(data.open, data.close)} leftIcon={AppIcon.Time}
                                           rightText={LStrings.Time}
                                           onMapItemClicked={()=> {}}
                        />
                      </View>
                    </View>
                    <DetailNearPlace nearByPlaces={this.state.detailNearBy || []} onNearByClicked={(id) => this.goToPlace(id)}/>
                  </View>
                </Row>
              </ScrollView>
            </Col>
          </Grid>) :
        <View style={[style.container,style.centralizedContent, {paddingTop: 10,}]}>
          <Spinner color={StyleBase.header_color}/>
        </View>
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

  renderHour(open, close) {
    if(moment(open).isValid() && moment(close).isValid()) {
      return moment(open).format('HH:mm') + ' - ' + moment(close).format('HH:mm');
    } else {
      if(moment(open).isValid()) {
        return 'from ' + moment(open).format('HH:mm');
      } else if(moment(close).isValid()) {
        return 'to ' + moment(close).format('HH:mm');
      }
    }
    return '';
  }
}