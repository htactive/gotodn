import React from 'react';
import {View} from 'react-native';
import {style} from '../../styles/style';
import {MenuTop} from './MenuTop';
import {MenuList} from './MenuList';
import {DNPageRoute} from '../../NavigationHelper';
import {ListScreen} from '../../screens/ListScreen'
import {Language} from '../../common/constain';
import {PickerModal} from '../common/PickerModal';
import {IndustryListScreen} from '../../screens/IndustryListScreen';

export class MenuContent extends React.Component {
  state = {selectedLang: 1, showPicker: false};

  render() {
    let props = {
      onListItemClicked: (id, isIndustry) => this.listItemClicked(id, isIndustry),
      onHelpClicked: () => this.helpClicked(),
      onAboutUsClicked: () => this.aboutUsClicked(),
      onLanguageClicked: () => this.languageUsClicked(),
    };

    let language = Language.filter(l => l.Id == this.state.selectedLang)[0];

    return (
      <View style={style.size1}>
        <View style={{flex: 10}}>
          <MenuTop onCloseMenu={() => this.props.onCloseMenu && this.props.onCloseMenu()}
                   onTakeCoverPhoto={()=> this.takeCoverPhoto()} onTakeAvatarPhoto={() => this.takeAvatarPhoto()}/>
        </View>
        <View style={{flex: 90}}>
          <MenuList {...props}/>
          <PickerModal tilte="Chọn ngôn ngữ"
                       visible={this.state.showPicker}
                       onCloseModal={() => { this.setState({showPicker: false}) }}
                       selectedItem={language}
                       dataSource={Language}
                       onDataSelected={(d) => this.setState({selectedLang: d.Id, showPicker: false})}/>
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

  listItemClicked(id, isIndustry) {
    if (isIndustry)
      this.props.navigation.navigate(DNPageRoute(IndustryListScreen), {listId: id});
    else
      this.props.navigation.navigate(DNPageRoute(ListScreen), {listId: id, initIndex: 0});
    this.props.onCloseMenu && this.props.onCloseMenu();
  }

  languageUsClicked() {
    this.setState({showPicker: true});
    this.props.onCloseMenu && this.props.onCloseMenu();
  }
}