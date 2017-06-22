import React from 'react';
import {Image, View, Text, TouchableOpacity} from 'react-native';
import {Icon, Button, H3, Thumbnail} from 'native-base';
import {ImagesConstant} from '../../common/images';
import {style} from '../../styles/style';

export class MenuTop extends React.Component {
  render() {
    return (
      <View style={{flex:1, flexDirection:'row', justifyContent: 'center', alignItems:'center',
      backgroundColor: '#01579b',borderBottomWidth: 1,borderBottomColor: '#679ac3'}}>
        <View style={{flex:2}}>
          <Text style={{marginLeft: 50, color:'#fff', fontSize: 16}}> </Text>
        </View>
        <View style={{flex:6, justifyContent:'center', alignItems: 'flex-start'}}>
          <Text style={{color:'#fff', fontSize: 16}}>GO TO</Text>
        </View>
        <View style={{flex:2, justifyContent:'center', alignItems: 'flex-end'}}>
          <TouchableOpacity onPress={() => this.closeMenu()} style={{alignSelf:'flex-end',paddingRight: 10}}>
            <Icon name='ios-menu' style={{color:'#ffffff', fontSize:30}}/>
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

