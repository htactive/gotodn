import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {Icon}  from 'native-base';
import {style, StyleBase} from '../../styles/style';

export class MenuListItem extends React.Component{
  state = {};

  render() {
    return (
      <TouchableOpacity
        onPress={() => this.props.onItemClicked() }>
        <View style={[style.list_item, this.props.actived ? {backgroundColor: StyleBase.header_color}: {backgroundColor: '#01589d'}]}>
          <View style={{flex:2, alignItems: 'flex-start', justifyContent: 'center'}}>
            {this.props.system ? (
                <Image style={[style.iconImgXs, {tintColor: '#fff'}]} source={this.props.itemIcon || "https://s3-ap-southeast-1.amazonaws.com/dfwresource/coms/img/coms_8323f5ac-fad6-4c2d-a1ca-2276af4a4a99.jpg"}/>
              ) : (
                <Image style={[style.iconImgXs, {tintColor: '#fff'}]} source={{uri: this.props.itemIcon || "https://s3-ap-southeast-1.amazonaws.com/dfwresource/coms/img/coms_8323f5ac-fad6-4c2d-a1ca-2276af4a4a99.jpg"}}/>
              )}
          </View>
          <View style={{flex:8, alignItems: 'flex-start', justifyContent: 'center'}}>
            <Text style={[this.props.actived ? {color: '#fff'} : {color: '#fff'}, {fontFamily: 'Source Sans Pro', fontSize: 16}]}>{this.props.itemText}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}