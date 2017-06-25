import React from 'react';
import {ScrollView, View, TouchableHighlight, Switch, Text}  from 'react-native';
import {MenuListItem} from './MenuListItem';
import {style} from '../../styles/style';
import {Icon}  from 'native-base';
import {MenuListData} from '../../common/constain';

export class MenuList extends React.Component {
  state = {menuData: [], activeIndex: -1, isHelpActived: false, isAboutActived: false};

  componentDidMount() {
    this.setState({
      menuData: MenuListData
    });
  }

  render() {
    return (
      <ScrollView style={[style.size1, {backgroundColor: '#01589d'}]}>
        {this.state.menuData.map((menuD, index) =>
          <MenuListItem key={index} actived={index==this.state.activeIndex} itemText={menuD.categoryName}
                        itemIcon={menuD.categoryIcon} onItemClicked={() => {

                          this.setState({
                            activeIndex: index,
                            isHelpActived: false,
                            isAboutActived: false
                          });
                          if(this.props.onListItemClicked)
                            this.props.onListItemClicked(menuD.id);
                        }}/>
        )}
        <MenuListItem itemText='Trợ giúp' actived={this.state.isHelpActived} itemIcon="ios-help-circle-outline" onItemClicked={() => {
          this.setState({
            activeIndex: -1,
            isHelpActived: true,
            isAboutActived: false
          });
          this.props.onHelpClicked();
        }}/>
        <MenuListItem itemText='Về chúng tôi' actived={this.state.isAboutActived} itemIcon="ios-hand-outline"
                      onItemClicked={() => {
                        this.setState({
                          activeIndex: -1,
                          isHelpActived: false,
                          isAboutActived: true
                        });
                        this.props.onAboutUsClicked();
                      }}/>
        <MenuListItem itemText='Ngôn ngữ' itemIcon="logo-yen" onItemClicked={() => {
          this.props.onLanguageClicked();
        }}/>
      </ScrollView>
    );
  }
}