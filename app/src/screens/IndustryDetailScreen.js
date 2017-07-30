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
import {IndustryData, AppIcon, MapHelper} from '../common/constain';
import { NavigationActions } from 'react-navigation';
import {navigationStore, navigateAction, navigateToRouteAction} from '../stores/NavigationStore';
import Communications from 'react-native-communications';
import {ReactMap} from "../components/map/ReactMap";
import {DetailMapTextItem} from '../components/detail/DetailMapTextItem';
import {ReactMapDirection} from '../components/map/ReactMapDirection';

export class IndustryDetailScreen extends React.Component {
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

    detailInfo.push({isMulti: true, dataInfo: [
      {infoIcon: data.totalAreaIcon || '?', infoText: 'Total : ' + data.totalArea },
      {infoIcon: data.vacantLandIcon || '?', infoText: 'Free: ' +  data.vacantLand }
    ] });
    let factoryInfo = '';
    if((data && data.factoryList))
      factoryInfo += 'Factory: ' + data.factoryList.length ;
    detailInfo.push({infoIcon: data.factoryIcon || '?', infoText: factoryInfo});
    let factories =data.factoryList;
    let destCoord = {
      latitude: 16.020549,
      longitude: 108.1989321,
    };
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
                  <View style={style.detailMap}>
                    <ReactMap />

                    <View style={style.detailOverlay}>

                      <DetailMapTextItem leftText={data.address} leftIcon={data.addressIcon}
                                         rightText={"DIRECTION"} rightIcon={AppIcon.Direction}
                                         onMapItemClicked={()=> this.handleDirection(data.address, MapHelper.getRandomDestination())}
                      />
                      <DetailMapTextItem leftText={data.phone} leftIcon={data.phoeneIcon}
                                         rightText={"CALL"} rightIcon={AppIcon.Calling}
                                         onMapItemClicked={()=> this.handleCalling(data.phone)}
                      />
                      <DetailMapTextItem  leftText={data.fax} leftIcon={data.faxIcon}
                                         rightText={"FAX"}
                                         onMapItemClicked={()=> {}}
                      />
                      <DetailMapTextItem  leftText={data.website} leftIcon={data.websiteIcon}
                                         rightText={"LINK"} rightIcon={AppIcon.Link}
                                         onMapItemClicked={()=> this.handleLink(data.website)}
                      />

                    </View>
                  </View>

                  <DetailInfo detailInfo={detailInfo}/>
                  <DetailFactory factories={factories} />
                </View>
              </Row>
            </ScrollView>
          </Col>
        </Grid>) : null);
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