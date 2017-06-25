import React from 'react';
import {Icon, Picker} from 'native-base';
import {View, PickerIOS, Platform, Text, TouchableOpacity} from 'react-native';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {StyleBase} from '../../styles/style';
import {PickerModal} from './PickerModal';

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
  state = {cities: [], showPicker: false};

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
    let city = this.state.cities.filter(c => c.Id == this.state.selectedCity)[0];
    return (
      <Row>
        <Col size={3} style={{justifyContent:'center',alignItems:'flex-start'}}>
          <Text numberOfLines={1} style={{color:'#fff', fontFamily: StyleBase.sp_italic, fontSize: 15}}>ĐI ĐẾN</Text>
        </Col>
        <Col size={7} style={{justifyContent:'center',alignItems:'flex-start'}}>
          <TouchableOpacity style={{flexDirection: 'row',justifyContent:'center',alignItems:'center'}} onPress={() => { this.setState({showPicker: true}) }}>
            <Text numberOfLines={1} style={{  fontSize: 15, fontFamily: StyleBase.sp_regular, color: '#fff'}}>
              {city && city.Name.toUpperCase()}</Text>
            <Icon name={'ios-arrow-down-outline'} style={{color: '#fff', fontSize: 20, paddingHorizontal: 15}}/>
          </TouchableOpacity>
          <PickerModal tilte="Chọn thành phố"
                       visible={this.state.showPicker}
                       onCloseModal={() => { this.setState({showPicker: false}) }}
                       selectedItem={city}
                       dataSource={this.state.cities}
                       onDataSelected={(d) => this.setState({selectedCity: d.Id, showPicker: false})}
          />
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
    return platform === 'ios' ? null : {color: '#fff', backgroundColor: StyleBase.header_color}
  }

  getPickerTextStyle() {
    return platform === 'ios' ? {color: '#fff'} : null
  }
}

