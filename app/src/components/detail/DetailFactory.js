import React from 'react';
import {View, Image, TouchableOpacity, Text, Linking} from 'react-native';
import {Icon} from 'native-base';
import {style} from '../../styles/style';
import {viewportWidth, IconName} from '../../common/constain';

export class DetailFactory extends React.Component {


  render() {
    return (
      <View style={style.detailInfoContainer}>
        <View style={style.nearPlaceTitle}>
          <Text style={style.nearPlaceTitleText}>DANH SÁCH NHÀ MÁY</Text>
        </View>
        {this.props.factories && this.props.factories.map((d, index) =>
          <View key={index} style={[style.detailInfoItem, { paddingVertical: 10, paddingLeft: 0}]}>
            <View style={{flex: 25, justifyContent: 'center', alignItems: 'flex-start'}}>
              <Image style={{
                resizeMode: 'cover',
                width: (viewportWidth - 30) * .25,
                height: (viewportWidth - 30) * .25,
                borderWidth: 1,
                borderColor: '#263238',
                borderRadius:2,
              }}
                     source={{uri: d.url}}/>
            </View>
            <View style={{flex: 75, paddingLeft: 15}}>
              <View style={{flex: 1}}>
                <Text numberOfLines={1} style={style.detailNearByTitle}>{d.title}</Text>
                <Text numberOfLines={1} style={style.detailNearBySubTitle}>{d.subTitle}</Text>
              </View>
              <View style={{flex: 1, justifyContent:'flex-end'}}>
                <View style={{flexDirection:'row'}}>
                  <View style={{flexDirection:'row',flex: 1}}>
                    <View style={{flex:2, justifyContent: 'center', alignItems: 'flex-start'}}>
                      <Image style={style.iconImgXs} source={{uri: IconName.Telephone}}/>
                     {/* <Icon name={d.phoeneIcon || 'ios-sad-outline'} style={{color:'#263238', fontSize:25}}/>*/}
                    </View>
                    <View style={{flex:8, justifyContent: 'center', alignItems: 'flex-start'}}>
                      <Text numberOfLines={1} style={[style.detailNearByInfo]}>{d.phone}</Text>
                    </View>
                  </View>
                  <View style={{flexDirection:'row',flex: 1}}>
                    <View style={{flex:2, justifyContent: 'center', alignItems: 'flex-start'}}>
                      <Image style={style.iconImgXs} source={{uri: IconName.Fax}}/>
                    </View>
                    <View style={{flex:8, justifyContent: 'center', alignItems: 'flex-start'}}>
                      <Text numberOfLines={1} style={[style.detailNearByInfo]}>{d.fax}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    )
  }

  goPlace(id) {
    if(this.props.onNearByClicked)
      this.props.onNearByClicked(id);
  }
}