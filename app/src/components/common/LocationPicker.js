import React from 'react';
import {Icon} from 'native-base';
import {View, PickerIOS ,Platform, Picker} from 'react-native';
import {Col, Row, Grid} from 'react-native-easy-grid';

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

  componentDidMount() {
    this.setState({
      selectedCity: 1,
      cities: CITIES
    });
  }

  render() {
    return (
      <Row>
        <Col size={20} style={{justifyContent:'center',alignItems:'center'}}>
          <Icon name={this.props.iconName || 'ios-locate-outline'}
                style={{color:'#ffffff', fontSize:25, paddingHorizontal: 5}}/>
        </Col>
        <Col size={80} style={{paddingTop:3}}>
          {platform.OS === 'ios' ? (
              <PickerIOS
                style={{color:'#fff'}}
                selectedValue={this.state.selectedCity}
                onValueChange={(city) => this.cityChanged(city)}>
                {this.state.cities && this.state.cities.map((city, id) =>
                  <PickerIOS.Item key={id} label={city.Name} value={city.Id}/>)}
              </PickerIOS>
            ) : (
              <Picker
                style={{color:'#fff'}}
                mode="dropdown"
                selectedValue={this.state.selectedCity}
                onValueChange={(city) => this.cityChanged(city)}>
                {this.state.cities && this.state.cities.map((city, id) =>
                  <Picker.Item key={id} label={city.Name} value={city.Id}/>)}
              </Picker>
            )}

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
}

