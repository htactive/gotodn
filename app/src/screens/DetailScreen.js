import React from 'react';
import {View, Image, TouchableOpacity, ScrollView} from 'react-native';
import {Col, Row, Grid} from 'react-native-easy-grid';

import {MenuListItemData, MenuType} from '../common/constain';
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
    detailInfo.push({infoIcon: data.addressIcon || 'ios-sad-outline', infoText: data.address});
    detailInfo.push({infoIcon: data.phoeneIcon || 'ios-sad-outline', infoText: data.phone});
    detailInfo.push({infoIcon: data.websiteIcon || 'ios-sad-outline', infoText: data.website, isUrl: true});
    detailInfo.push({infoIcon: data.openHourIcon || 'ios-sad-outline', infoText: data.openHour});
    let detailNearBy = MenuListItemData.filter(t => t.id != data.id);
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
                    </View>
                    <DetailInfo detailInfo={detailInfo}/>
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
}