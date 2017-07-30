import React from 'react';
import {ScrollView, RefreshControl} from 'react-native';
import {Col, Row, Grid} from 'react-native-easy-grid';
import TopSlider from '../slider/TopSlider';
import {SlideType} from '../../common/constain';
import {ListItemDetail} from './ListItemDetail';
import {ListSlider} from './ListSlider';
import {viewportHeight} from '../../common/constain';
import {GDNServiceInstance} from '../../services/GDNService';

export class ListDetail extends React.Component {
  state = {
    refreshing: false,
    serviceId: 0,
    sliderData: null,
    placeData: null,
    showSlider: true,
  };

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
      let menuListData = await GDNServiceInstance.getMenuListPlace(serviceId);
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
            onRefresh={() => this.onFresh()} />
            }
      >
        <Grid>
          {this.state.showSlider ? <Row style={{ height: viewportHeight*.4 }}>
              <ListSlider navigation={this.props.navigation} dataSource={this.state.sliderData} title="Must See"/>
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
}