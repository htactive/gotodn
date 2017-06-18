import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Icon}  from 'native-base';
import {style} from '../../styles/style';

export class MenuListItem extends React.Component{
  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.onItemClicked() }>
        <View style={style.list_item}>
          <Text style={{color: '#515151', paddingHorizontal:20}}>{this.props.itemText}</Text>
          <Icon name='md-arrow-dropright' style={{color: '#868686', paddingHorizontal:10}}/>
        </View>
      </TouchableOpacity>
    )
  }
}