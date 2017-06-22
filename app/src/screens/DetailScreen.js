import React from 'react';
import {} from 'react-native';
import {Col, Row, Grid} from 'react-native-easy-grid';

export class DetailScreen extends React.Component {
  componentWillMount() {
  }

  render() {
    return (
      <Grid>
        <Row size={1}>

        </Row>
        <Row size={2}>
          <HomeMenuList navigation={this.props.navigation} />
        </Row>
      </Grid>

    )
  }
}