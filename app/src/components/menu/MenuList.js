import React from 'react';
import {ScrollView, View, TouchableHighlight, Switch, Text}  from 'react-native';
import {MenuListItem} from './MenuListItem';
import {style} from '../../styles/style';
import {Icon}  from 'native-base';

export class MenuList extends React.Component{
  render() {
    return (
      <ScrollView style={style.size1}>
        <MenuListItem itemText='Sự kiện nổi bật' onItemClicked={() => this.props.onEventClicked()}/>
        <MenuListItem itemText='Địa điểm nổi bật' onItemClicked={() => this.props.onPlaceClicked()}/>
        <MenuListItem itemText='Danh sách hoạt động' onItemClicked={() => this.props.onCategoryClicked()}/>
        <MenuListItem itemText='Danh sách dịch vụ' onItemClicked={() => this.props.onServiceClicked()}/>
        <View style={{height:15, backgroundColor:'#f5f7fa'}}>
        </View>
        <MenuListItem itemText='Trợ giúp' onItemClicked={() => this.props.onHelpClicked()}/>
        <MenuListItem itemText='Về chúng tôi' onItemClicked={() => this.props.onAboutUsClicked()}/>
      </ScrollView>
    );
  }
}