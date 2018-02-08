import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {Icon, Spinner} from 'native-base';
import {style, StyleBase} from '../../styles/style';
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
                    {this.props.isFavorite != null ?
                      <Image style={[style.iconImgSm, this.props.isFavorite ? {tintColor: '#E52B50'} : {tintColor: '#039be5'}]} source={AppIcon.Favorite}/>
                      : <Spinner color={StyleBase.header_color}/>
                    }
                  </TouchableOpacity>
                </View>
                <View style={style.detailImageActionIcon}>
                  <TouchableOpacity onPress={() => {
                  if (this.props.onSharedClicked)
                    this.props.onSharedClicked()
                } }>
                    <Image style={[style.iconImgSm, {tintColor: '#039be5'}]} source={AppIcon.Share}/>
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