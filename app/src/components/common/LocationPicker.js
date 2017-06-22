import React from 'react';
import {Icon, Picker} from 'native-base';
import {View, PickerIOS ,Platform, Text} from 'react-native';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {StyleBase} from '../../styles/style';

const platform = Platform.OS;

const CITIES = [
  {
    Id: 1,
    Name: 'Đà Nẵng',
  },
  {
    Id: 2,
    Name: 'Hà Nội',
  },
  {
    Id: 3,
    Name: 'Hồ Chí Minh',
  },
  {
    Id: 4,
    Name: 'Huế',
  }
];

export class LocationPicker extends React.Component {
  state = {cities: []};

  componentWillMount() {
    this.setState({
      selectedCity: 1
    });
  }

  componentDidMount() {
    this.setState({
      cities: CITIES
    });
  }

  render() {
    return (
      <Row>
        <Col size={30} style={{justifyContent:'center',alignItems:'center'}}>
          <Text style={{color:'#fff', fontStyle: 'italic'}} >ĐI ĐẾN</Text>
        </Col>
        <Col size={70} style={{paddingTop:3}}>
          <Picker
            style={this.getPickerStyle()}
            textStyle={this.getPickerTextStyle()}
            mode="dropdown"
            selectedValue={this.state.selectedCity}
            onValueChange={(city) => this.cityChanged(city)}>
            {this.state.cities && this.state.cities.map((city, id) =>
              <Picker.Item key={id} label={city.Name} value={city.Id}/>)}
          </Picker>
        </Col>
      </Row>
    )
  }

  cityChanged(city) {
    this.setState({
      selectedCity: city
    });
    if (this.props.onCityChanged)
      this.props.onCityChanged(city);
  }

  getPickerStyle() {
    return platform === 'ios' ? null : {color:'#fff', backgroundColor: StyleBase.header_color}
  }

  getPickerTextStyle() {
    return platform === 'ios' ? {color:'#fff'} : null
  }
}

