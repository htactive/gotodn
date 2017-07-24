import React from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';
import {Icon} from 'native-base';
import {style} from '../../styles/style';

export class DetailText extends React.Component {
  render() {
    return (
      <View>
        <Text style={style.detailContentTitle}>{this.props.title && this.props.title.toUpperCase()}</Text>
        <Text style={style.detailContentText}>{this.props.description}</Text>
      </View>
    )
  }
}