import React from 'react';
import {ScrollView, RefreshControl} from 'react-native';
import {Col, Row, Grid} from 'react-native-easy-grid';
import TopSlider from '../slider/TopSlider';
import {SlideType} from '../../common/constain';
import {ListItemDetail} from './ListItemDetail';
import {ListSlider} from './ListSlider';
import {viewportHeight} from '../../common/constain';

export class ListDetail extends React.Component {
  state = {
    refreshing: false,
  };

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
          <Row style={{ height: viewportHeight*.4 }}>
            <ListSlider navigation={this.props.navigation} title="Highlight"/>
          </Row>
          <Row >
            <ListItemDetail navigation={this.props.navigation}/>
          </Row>
        </Grid>
      </ScrollView>
    );
  }

  onFresh() {
    this.setState({refreshing: true});
    setTimeout(() => {
      this.setState({refreshing: false});
    },2000);
  }
}