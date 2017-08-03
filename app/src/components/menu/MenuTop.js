import React from 'react';
import {Image, View, Text, TouchableOpacity} from 'react-native';
import {Icon, Button, H3, Thumbnail} from 'native-base';
import {ImagesConstant} from '../../common/images';
import {style} from '../../styles/style';
import {AppIcon} from '../../common/constain';

export class MenuTop extends React.Component {
  render() {
    return (
      <View style={{flex:1, flexDirection:'row', justifyContent: 'center', alignItems:'center',
      backgroundColor: '#01579b',borderBottomWidth: 1,borderBottomColor: '#679ac3'}}>
        <View style={{flex:2}}>
          <Text style={{marginLeft: 50, color:'#fff', fontSize: 16}}> </Text>
        </View>
        <View style={{flex:6, justifyContent:'center', alignItems: 'flex-start', paddingTop: 10, paddingLeft: 5}}>
          <Text style={{color:'#fff', fontSize: 16, fontFamily: 'Source Sans Pro'}}>Goto</Text>
        </View>
        <View style={{flex:2, justifyContent:'center',paddingTop: 10, alignItems: 'flex-end'}}>
          <TouchableOpacity onPress={() => this.closeMenu()} style={{alignSelf:'flex-end',paddingRight: 10}}>
            <Image style={[style.iconImg, {tintColor: '#fff'}]} source={AppIcon.Menu || "https://s3-ap-southeast-1.amazonaws.com/dfwresource/coms/img/coms_8323f5ac-fad6-4c2d-a1ca-2276af4a4a99.jpg"}/>
          </TouchableOpacity>
        </View>

      </View>
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

  closeMenu() {
    if (this.props.onCloseMenu)
      this.props.onCloseMenu();
  }
}

