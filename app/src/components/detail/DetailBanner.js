import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';
import {style} from '../../styles/style';
import {AppIcon,Helper} from  '../../common/constain';

export class DetailBanner extends React.Component {
  render() {
    return (
      <View style={style.imageInner}>
        <Image
          source={{uri: this.props.coverImg || Helper.ImageUrl}}
          style={style.detailImage}
        >
          {this.props.disableButton || (
            <View style={style.detailImageActionInner}>
              <View style={style.detailImageActionContain}>
                <View style={style.detailImageActionIcon}>
                  <TouchableOpacity onPress={() => {
                  if (this.props.onFavoriteClicked)
                    this.props.onFavoriteClicked()
                } }>
                    <Image style={[style.iconImgSm, this.props.isFavorite ? {tintColor: '#E52B50'} : {tintColor: '#039be5'}]} source={AppIcon.Favorite || "https://s3-ap-southeast-1.amazonaws.com/dfwresource/coms/img/coms_8323f5ac-fad6-4c2d-a1ca-2276af4a4a99.jpg"}/>
                  </TouchableOpacity>
                </View>
                <View style={style.detailImageActionIcon}>
                  <TouchableOpacity onPress={() => {
                  if (this.props.onSharedClicked)
                    this.props.onSharedClicked()
                } }>
                    <Image style={[style.iconImgSm, {tintColor: '#039be5'}]} source={AppIcon.Share || "https://s3-ap-southeast-1.amazonaws.com/dfwresource/coms/img/coms_8323f5ac-fad6-4c2d-a1ca-2276af4a4a99.jpg"}/>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}

        </Image>
      </View>
    )
  }
}