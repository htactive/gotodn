import React from 'react';
import {Icon, Picker} from 'native-base';
import {View, PickerIOS, Platform, Text, TouchableOpacity} from 'react-native';
import {Col, Row, Grid} from 'react-native-easy-grid';
import {StyleBase} from '../../styles/style';
import {CityDropdown} from '../common/CityDropdown';
import {GDNServiceInstance} from '../../services/GDNService';
import {appStore} from '../../stores/AppStore';
import {Helper} from '../../common/constain';

const platform = Platform.OS;

const CITIES = [
  {
    Id: 1,
    Name: 'Da Nang',
  },
  {
    Id: 2,
    Name: 'Ha Noi',
  },
  {
    Id: 3,
    Name: 'Ho Chi Minh',
  },
  {
    Id: 4,
    Name: 'Hue',
  }
];

export class LocationPicker extends React.Component {
  state = {cities: [], showPicker: false};

  componentWillMount() {
    this.setState({
      selectedCity: 1
    });
    // appStore.subscribe(() => {
    //   let appState = appStore.getState();
    //   this.setState({
    //     selectedCity: appState.city
    //   });
    // });
  }

  componentDidMount() {
    this.getData();
  }

  async getData() {
    let result = await GDNServiceInstance.getAllCity();
    if(result) {
      let appState = appStore.getState();
      this.setState({
        cities: result,
        selectedCity: appState.city
      });
    }
    else {
      this.setState({
        cities: [],
        selectedCity: 0
      });
    }
  }

  render() {
    let city = this.state.cities.filter(c => c.Id == this.state.selectedCity)[0];
    return (
      <Row>
        <Col size={3} style={{justifyContent:'center',alignItems:'flex-start'}}>
          <Text numberOfLines={1} style={{color:'#fff', fontFamily: StyleBase.sp_italic, fontSize: 15, paddingRight:5}}>GOTO</Text>
        </Col>
        <Col size={7} style={{justifyContent:'center',alignItems:'flex-start'}}>
          <TouchableOpacity style={{flexDirection: 'row',justifyContent:'center',alignItems:'center'}}
                            onPress={() => { this.setState({showPicker: true}) }}>
            <Text numberOfLines={1} style={{  fontSize: 15, fontFamily: StyleBase.sp_regular, color: '#fff'}}>
              {city && city.Name.toUpperCase()}</Text>
            <Icon name={'ios-arrow-down-outline'} style={{color: '#fff', fontSize: 20, paddingHorizontal: 15}}/>
          </TouchableOpacity>
          <CityDropdown visible={this.state.showPicker}
                       onCloseModal={() => { this.setState({showPicker: false}) }}
                       selectedItem={city}
                       dataSource={this.state.cities}
                       onDataSelected={(d) => this.cityChanged(d.Id)}
          />
        </Col>
      </Row>
    )
  }

  cityChanged(city) {
    this.setState({
      selectedCity: city,
      showPicker: false
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

