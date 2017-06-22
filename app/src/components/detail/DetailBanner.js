import React from 'react';
import {Image, View, Text, TouchableOpacity} from 'react-native';
import {Icon, Button, H3, Thumbnail} from 'native-base';

export class DetailBanner extends React.Component {
  render() {
    return (
      <Image source={ImagesConstant.menu_cover} style={style.image_fullscreen}>

      </Image>
    )
  }
}