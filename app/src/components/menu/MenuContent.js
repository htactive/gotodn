import React from 'react';
import { View} from 'react-native';
import {style} from '../../styles/style';
import {MenuTop} from './MenuTop';
import {MenuList} from './MenuList';

export class MenuContent extends React.Component {
  render() {
    let props = {
      onEventClicked: () => this.eventClicked(),
      onPlaceClicked: () => this.placeClicked(),
      onCategoryClicked: () => this.categoryClicked(),
      onServiceClicked: () => this.serviceClicked(),
      onHelpClicked: () => this.helpClicked(),
      onAboutUsClicked: () => this.aboutUsClicked(),
    };
    return (
      <View style={style.size1}>
        <View style={{flex: 10}}>
          <MenuTop onTakeCoverPhoto={()=> this.takeCoverPhoto()} onTakeAvatarPhoto={() => this.takeAvatarPhoto()}/>
        </View>
        <View style={{flex: 90}}>
          <MenuList {...props}/>
        </View>
      </View>

    )
  }

  takeCoverPhoto() {
  }

  takeAvatarPhoto() {
  }

  eventClicked() {

  }

  placeClicked() {

  }

  categoryClicked() {

  }

  serviceClicked() {

  }

  helpClicked() {

  }

  aboutUsClicked() {

  }
}