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
                    <Image style={[style.iconImgSm, {tintColor: '#039be5'}]} source={AppIcon.Favorite || "https://avatars3.githubusercontent.com/u/20336495?v=4&s=460"}/>
                  </TouchableOpacity>
                </View>
                <View style={style.detailImageActionIcon}>
                  <TouchableOpacity onPress={() => {
                  if (this.props.onSharedClicked)
                    this.props.onSharedClicked()
                } }>
                    <Image style={[style.iconImgSm, {tintColor: '#039be5'}]} source={AppIcon.Share || "https://avatars3.githubusercontent.com/u/20336495?v=4&s=460"}/>
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