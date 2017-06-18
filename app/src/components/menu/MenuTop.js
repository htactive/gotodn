import React from 'react';
import {Image, View, Text} from 'react-native';
import {Icon, Button, H3, Thumbnail} from 'native-base';
import {ImagesConstant} from '../../common/images';
import {style} from '../../styles/style';

export class MenuTop extends React.Component {
  render() {
    return (
      <Image source={ImagesConstant.menu_cover} style={style.image_fullscreen}>
        <View style={{flex:20}}>

        </View>
        <View style={{flex:45}}>

        </View>
        <View style={{flex:35}}>

        </View>
      </Image>
    )
  }

  takeCoverPhoto() {
    if (this.props.onTakeCoverPhoto)
      this.props.onTakeCoverPhoto();
  }

  takeAvatarPhoto() {
    if (this.props.onTakeAvatarPhoto)
      this.props.onTakeAvatarPhoto();
  }

}

