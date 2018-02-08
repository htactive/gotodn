import React from 'react';
import {ScrollView, RefreshControl, Dimensions,View} from 'react-native';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {Spinner}  from 'native-base';
import TopSlider from '../slider/TopSlider';
import {SlideType} from '../../common/constain';
import {ListItemDetail} from './ListItemDetail';
import {ListSlider} from './ListSlider';
import {viewportHeight} from '../../common/constain';
import {GDNServiceInstance} from '../../services/GDNService';
import {appStore} from '../../stores/AppStore';
import {LStrings} from '../../common/LocalizedStrings';
import {StyleBase, style} from '../../styles/style';
import {commonStore,reloadData} from '../../stores/CommonStore';
import {
  LazyloadScrollView
} from 'react-native-lazyload';

export class ListDetail extends React.Component {
  state = {
    refreshing: false,
    serviceId: 0,
    sliderData: null,
    placeData: null,
    showSlider: true,
    loadingMore: false,
    loadingMoreSlider: false,
    currentIndex: 0,
    currentIndexSlider: 0,
  };

  unSubscribe;
  itemHeight = 0;

  componentWillMount() {
    this.unSubscribe = appStore.subscribe(() => {
      this.onFresh();
    });
  }

  componentWillUnmount() {
    if (typeof this.unSubscribe === "function")
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
    this.setState({
      currentIndex: 0,
      currentIndexSlider: 0,
    });
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
      let sliderData = await GDNServiceInstance.getListSlider(serviceId, 0);
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
      <LazyloadScrollView
        name="lazyload-listscreen"
        refreshControl={
              <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => this.onFresh()}
            />
            }
        onScroll={(e) => {this.handleScrollBottom(e)}}
      >
        <Grid>
          {this.state.showSlider ? <Row style={{ height: viewportHeight*.4 }}>
              <ListSlider navigation={this.props.navigation} dataSource={this.state.sliderData}
                          onLoadMore={(index) => this.loadMoreSlider(index)}
                          loadingMore={this.state.loadingMoreSlider}
                          currentIndex={this.state.currentIndexSlider}
                          title={LStrings.MustSee}/>
            </Row> : <Row style={{ height: 0 }}>
            </Row>}
          <Row >
            <ListItemDetail onLayoutItem={(height) => this.layoutItem(height)} dataSource={this.state.menuListData}
                            navigation={this.props.navigation}/>
            {this.state.menuListData && this.state.loadingMore ?
              <View style={[style.loadingMore]}>
                <Spinner color={StyleBase.header_color}/>
              </View> : null}
          </Row>
        </Grid>
      </LazyloadScrollView>
    );
  }

  onFresh() {
    this.setState({refreshing: true});
    this.loadData(this.props.serviceId);
    commonStore.dispatch(reloadData());
  }

  loadMoreTimeout;

  handleScrollBottom(e) {
    if (!this.state.loadingMore) {
      if (this.loadMoreTimeout)
        clearTimeout(this.loadMoreTimeout);
      let windowHeight = Dimensions.get('window').height * this.state.showSlider ? .5 : .9,
        height = this.itemHeight ? (this.itemHeight * 10 * (this.state.currentIndex + 1)) : 0;
      offset = e.nativeEvent.contentOffset.y;
      if (height > 0 && windowHeight + offset >= height * .7) {
        this.loadMoreTimeout = setTimeout(() => {
          this.setState({
            loadingMore: true,
          });
          (async() => {
            let nextId = this.state.currentIndex + 1;
            let result = await GDNServiceInstance.getMenuListPlace(this.props.serviceId, nextId);
            this.setState({
              loadingMore: false,
            });
            let oldData = this.state.menuListData ? this.state.menuListData.slice() : [];
            if (result) {
              let newData = oldData.concat(result);
              this.setState({
                menuListData: newData,
                currentIndex: nextId,
              });
            }
          })();
        }, 100);
      }
    }
  }

  layoutItem(height) {
    if (this.itemHeight < height)
      this.itemHeight = height;
  }

  async loadMoreSlider(index) {
    this.setState({
      loadingMoreSlider: true,
    });
    let result = await GDNServiceInstance.getListSlider(this.props.serviceId, index);
    setTimeout(() => {
      this.setState({
        loadingMoreSlider: false,
      });
    }, 500);

    let oldData = this.state.sliderData ? this.state.sliderData.slice() : [];
    if (result) {
      let newData = oldData.concat(result);
      this.setState({
        sliderData: newData,
        currentIndexSlider: index,
      });
    }
  }
}