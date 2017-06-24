import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import {Icon} from 'native-base';
import {style} from '../../styles/style';

export class DetailBanner extends React.Component {
  render() {
    return (
      <View style={style.imageInner}>
        <Image
          source={{uri: this.props.coverImg}}
          style={style.detailImage}
        >
          <View style={style.detailImageActionInner}>
            <View style={style.detailImageActionContain}>
              <View style={style.detailImageActionIcon}>
                <TouchableOpacity onPress={() => {
                  if (this.props.onFavoriteClicked)
                    this.props.onFavoriteClicked()
                } }>
                  <Icon name='md-heart-outline'
                        style={{color:'#049ae6', fontSize:30}}/>
                </TouchableOpacity>
              </View>
              <View style={style.detailImageActionIcon}>
                <TouchableOpacity onPress={() => {
                  if (this.props.onSharedClicked)
                    this.props.onSharedClicked()
                } }>
                  <Icon name='md-share'
                        style={{color:'#049ae6', fontSize:30}}/>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Image>
      </View>
    )
  }
}