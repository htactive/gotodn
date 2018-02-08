import React from 'react';
import {StyleSheet, Text, View,AsyncStorage} from 'react-native';
import {DNNavigator} from './src/NavigationHelper';
import {Menu} from './src/components/menu/Menu';
import {Helper, LanguageEnums} from './src/common/constain';
import {GDNServiceInstance} from './src/services/GDNService';
export default class App extends React.Component {

  state = {
    ready: false,
  };

  async componentWillMount(){

    //Init default language value
    let langValue = await AsyncStorage.getItem(Helper.LanguageKey);
    if(!langValue) {
      await AsyncStorage.setItem(Helper.LanguageKey, LanguageEnums.English + '');
    }

    //Init default city value
    let cityValue = await AsyncStorage.getItem(Helper.CityKey);
    if(!cityValue) {
      let selectedCityId = 0;
      let result = await GDNServiceInstance.getAllCity();
      if(result) {
        let selectedCity = result.filter(t => Helper.stripDiacritics(t.Name).toLowerCase() == 'da nang' || Helper.stripDiacritics(t.Name).toLowerCase() == 'danang')[0];
        selectedCityId = selectedCity ? selectedCity.Id : (result[0] ? result[0].Id : 0);
      }
      await AsyncStorage.setItem(Helper.CityKey, selectedCityId + '');
    }
    this.setState({
      ready: true,
    });
  }

  render() {
    return (
        this.state.ready &&
        <Menu>
          <DNNavigator>
          </DNNavigator>
        </Menu>
    );
  }
}
