import React from 'react';
import { View} from 'react-native';
import {style} from '../../styles/style';
import {MenuTop} from './MenuTop';
import {MenuList} from './MenuList';
import {DNPageRoute} from '../../NavigationHelper';
import {ListScreen} from '../../screens/ListScreen'

export class MenuContent extends React.Component {
  render() {
    let props = {
      onListItemClicked: (id) => this.listItemClicked(id),
      onHelpClicked: () => this.helpClicked(),
      onAboutUsClicked: () => this.aboutUsClicked(),
    };
    return (
      <View style={style.size1}>
        <View style={{flex: 10}}>
          <MenuTop onCloseMenu={() => this.props.onCloseMenu && this.props.onCloseMenu()} onTakeCoverPhoto={()=> this.takeCoverPhoto()} onTakeAvatarPhoto={() => this.takeAvatarPhoto()}/>
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

  helpClicked() {

  }

  aboutUsClicked() {

  }

  listItemClicked(id) {
    this.props.navigation.navigate(DNPageRoute(ListScreen), {listId: id, initIndex: 0 });
    this.props.onCloseMenu && this.props.onCloseMenu();
  }
}