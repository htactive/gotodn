import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Icon}  from 'native-base';
import {style, StyleBase} from '../../styles/style';

export class MenuListItem extends React.Component{
  state = {};

  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.onItemClicked() }>
        <View style={[style.list_item, this.props.actived ? {backgroundColor: StyleBase.header_color}: {backgroundColor: '#01589d'}]}>
          <View style={{flex:2, alignItems: 'center', justifyContent: 'center'}}>
            <Icon name={this.props.itemIcon} style={this.props.actived ? {color: '#fff'} : {color: '#fff'}}/>
          </View>
          <View style={{flex:8, alignItems: 'flex-start', justifyContent: 'center'}}>
            <Text style={this.props.actived ? {color: '#fff'} : {color: '#fff'}}>{this.props.itemText}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}