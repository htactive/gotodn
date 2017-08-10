import React from 'react';
import {ScrollView, RefreshControl, Dimensions} from 'react-native';
import {Col, Row, Grid} from 'react-native-easy-grid';
import TopSlider from '../slider/TopSlider';
import {SlideType} from '../../common/constain';
import {ListItemDetail} from './ListItemDetail';
import {ListSlider} from './ListSlider';
import {viewportHeight} from '../../common/constain';
import {GDNServiceInstance} from '../../services/GDNService';
import {appStore} from '../../stores/AppStore';
import {LStrings} from '../../common/LocalizedStrings';

export class ListDetail extends React.Component {
  state = {
    refreshing: false,
    serviceId: 0,
    sliderData: null,
    placeData: null,
    showSlider: true,
    loadingMore: false,
    currentIndex: 0,
  };

  unSubscribe;

  componentWillMount() {
    this.unSubscribe = appStore.subscribe(() => {
      this.onFresh();
    });
  }

  componentWillUnmount() {
    this.unSubscribe();
  }

  componentDidMount() {
    this.setState({
      serviceId: this.props.serviceId
    });
    this.loadData(this.props.serviceId);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.serviceId && nextProps.serviceId != this.props.serviceId) {
      this.setState({
        serviceId: nextProps.serviceId
      });
      this.loadData(nextProps.serviceId);
    }
  }

  loadData(serviceId) {
    (async() => {
      let menuListData = await GDNServiceInstance.getMenuListPlace(serviceId, 0);
      this.setState({menuListData, menuListLoad: true});
      if (this.state.sliderLoaded) {
        this.setState({
          refreshing: false
        });
      }
    })();
    (async() => {
      let sliderData = await GDNServiceInstance.getListSlider(serviceId);
      if (!sliderData || sliderData.length == 0) {
        this.setState({showSlider: false});
      }
      this.setState({sliderData, sliderLoaded: true});
      if (this.state.menuListLoad) {
        this.setState({
          refreshing: false
        });
      }
    })();
  }

  render() {

    return (
      <ScrollView
        refreshControl={
              <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => this.onFresh()}
            />
            }
        //onScroll={(e) => {this.handleScrollBottom(e)}}
      >
        <Grid>
          {this.state.showSlider ? <Row style={{ height: viewportHeight*.4 }}>
              <ListSlider navigation={this.props.navigation} dataSource={this.state.sliderData} title={LStrings.MustSee}/>
            </Row> : <Row style={{ height: 0 }}>

            </Row>}
          <Row >
            <ListItemDetail dataSource={this.state.menuListData} navigation={this.props.navigation}/>
          </Row>
        </Grid>
      </ScrollView>
    );
  }

  onFresh() {
    this.setState({refreshing: true});
    this.loadData(this.props.serviceId);
  }

  loadMoreTimeout;

  // handleScrollBottom(e) {
  //   if (!this.state.loadingMore) {
  //     if (this.loadMoreTimeout)
  //       clearTimeout(this.loadMoreTimeout);
  //     let windowHeight = Dimensions.get('window').height * this.state.showSlider ? .5 : .9,
  //       height = e.nativeEvent.contentSize.height,
  //       offset = e.nativeEvent.contentOffset.y;
  //     if (windowHeight + offset >= height && !this.state.keyboardShow) {
  //       this.loadMoreTimeout = setTimeout(() => {
  //         this.setState({
  //           loadingMore: true,
  //         });
  //         (async() => {
  //           let nextId = this.state.currentIndex + 1;
  //           let result = await GDNServiceInstance.searchAllPlace(this.props.search, nextId);
  //           this.setState({
  //             loadingMore: false,
  //           });
  //           let oldData = this.state.data ? this.state.data.slice() : [];
  //           if (result) {
  //             let newData = oldData.concat(result);
  //             this.setState({
  //               data: newData,
  //               currentIndex: nextId,
  //             });
  //           }
  //         })();
  //       }, 500);
  //     }
  //   }
  // }
}