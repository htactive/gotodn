import React from 'react';
import {View, Image, TouchableOpacity, ScrollView} from 'react-native';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {DetailBanner} from '../components/detail/DetailBanner';
import {style} from '../styles/style';
import {DetailText} from '../components/detail/DetailText';
import {DetailInfo} from '../components/detail/DetailInfo';
import {DetailImage} from '../components/detail/DetailImage';
import {DetailNearPlace} from '../components/detail/DetailNearPlace';
import {DNPageRoute} from '../NavigationHelper';
import {DetailFactory} from '../components/detail/DetailFactory';
import {IndustryData} from '../common/constain';

export class IndustryDetailScreen extends React.Component {
  state = {
    dataDetail: {}
  };

  componentWillMount() {
  }

  componentDidMount() {
    const {params} = this.props.navigation.state;
    let itemId = (params && params.itemId) || 0;
    let data = IndustryData.filter(t => t.id == itemId);
    this.setState({
      dataDetail: data.length > 0 ? data[0] : null
    });
  }

  render() {

    let data = this.state.dataDetail;
    let detailInfo = [];
    detailInfo.push({infoIcon: data.addressIcon || '?', infoText: data.address});
    detailInfo.push({infoIcon: data.phoeneIcon || '?', infoText: data.phone});
    detailInfo.push({infoIcon: data.faxIcon || '?', infoText: data.fax});
    detailInfo.push({infoIcon: data.websiteIcon || '?', infoText: data.website, isUrl: true});
    detailInfo.push({isMulti: true, dataInfo: [
      {infoIcon: data.totalAreaIcon || '?', infoText: 'Tổng : ' + data.totalArea },
      {infoIcon: data.vacantLandIcon || '?', infoText: 'Trống: ' +  data.vacantLand }
    ] });
    let factoryInfo = '';
    if((data && data.factoryList))
      factoryInfo += 'Nhà máy: ' + data.factoryList.length ;
    detailInfo.push({infoIcon: data.factoryIcon || '?', infoText: factoryInfo});
    let factories =data.factoryList;
    return (data ? (
        <Grid>
          <Col>
            <ScrollView>
              <Row size={1}>
                <DetailBanner
                  coverImg={data.heroImage}
                  disableButton
                />
              </Row>
              <Row size={2}>
                <View style={style.detailContent}>
                  <DetailText title={data.title} description={data.description}/>
                  <DetailInfo detailInfo={detailInfo}/>
                  <DetailFactory factories={factories} />
                </View>
              </Row>
            </ScrollView>
          </Col>
        </Grid>) : null);
  }
}