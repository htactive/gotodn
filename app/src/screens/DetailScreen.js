import React from 'react';
import {View, Image, TouchableOpacity, ScrollView, Text} from 'react-native';
import {Col, Row, Grid} from 'react-native-easy-grid';

import {MenuListItemData, MenuType, AppIcon} from '../common/constain';
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

export class DetailScreen extends React.Component {
  state = {
    dataDetail: {}
  };

  componentWillMount() {
  }

  componentDidMount() {
    const {params} = this.props.navigation.state;
    let itemId = (params && params.itemId) || 0;
    let data = MenuListItemData.filter(t => t.id == itemId);
    this.setState({
      dataDetail: data.length > 0 ? data[0] : null
    });
  }

  render() {

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
                                           onMapItemClicked={()=> this.handleDirection(data.address, destCoord)}
                        />
                        <DetailMapTextItem leftText={data.phone} leftIcon={data.phoeneIcon}
                                           rightText={"GỌI"} rightIcon={AppIcon.Calling}
                                           onMapItemClicked={()=> this.handleCalling()}
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
    this.props.navigation.navigate(DNPageRoute(DetailScreen), {itemId: id});
  }

  handleDirection(address, coord) {

    this.props.navigation.navigate(DNPageRoute(ReactMapDirection), { coordinate:coord});
  }

  handleCalling() {

  }

  handleLink(website) {
    
  }
}