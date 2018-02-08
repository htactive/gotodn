import React from 'react';
import {View, Image, TouchableOpacity, Text} from 'react-native';
import {Icon} from 'native-base';
import {style} from '../../styles/style';
import {
  LazyloadView
} from 'react-native-lazyload';

export class DetailText extends React.Component {
  render() {
    return (
      <LazyloadView host="lazyload-detailscreen">
        <Text style={style.detailContentTitle}>{this.props.title && this.props.title.toUpperCase()}</Text>
        <Text style={style.detailContentText}>{this.props.description}</Text>
      </LazyloadView>
    )
  }
}