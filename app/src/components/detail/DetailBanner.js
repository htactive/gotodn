import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';
import {style} from '../../styles/style';
import {AppIcon} from  '../../common/constain';

export class DetailBanner extends React.Component {
  render() {
    return (
      <View style={style.imageInner}>
        <Image
          source={{uri: this.props.coverImg}}
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
                    <Image style={style.iconImgSm} source={AppIcon.Favorite}/>
                  </TouchableOpacity>
                </View>
                <View style={style.detailImageActionIcon}>
                  <TouchableOpacity onPress={() => {
                  if (this.props.onSharedClicked)
                    this.props.onSharedClicked()
                } }>
                    <Image style={style.iconImgSm} source={AppIcon.Share}/>
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