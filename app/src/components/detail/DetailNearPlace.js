import React from 'react';
import {View, Image, TouchableOpacity, Text, Linking} from 'react-native';
import {Icon} from 'native-base';
import {style} from '../../styles/style';
import {viewportWidth, IconName} from '../../common/constain';

export class DetailNearPlace extends React.Component {


  render() {
    return (
      <View style={style.detailInfoContainer}>
        <View style={style.nearPlaceTitle}>
          <Text style={style.nearPlaceTitleText}>NEAR BY PLACE</Text>
        </View>
        {this.props.nearByPlaces && this.props.nearByPlaces.map((d, index) =>
          <View key={index} style={[style.detailInfoItem, { paddingVertical: 10, paddingLeft: 0}]}>
            <View style={{flex: 2, justifyContent: 'center', alignItems: 'flex-start'}}>
              <TouchableOpacity onPress={() => this.goPlace(d.id)}>
                <Image style={{resizeMode: 'cover', width: (viewportWidth - 30) / 5, height: (viewportWidth - 30) / 5}}
                       source={{uri: d.heroImage}}/>
              </TouchableOpacity>
            </View>
            <View style={{flex: 8, paddingLeft: 15}}>
              <View style={{flex: 3}}>
                <TouchableOpacity onPress={() => this.goPlace(d.id)}>
                  <Text numberOfLines={1} style={style.detailNearByTitle}>{d.title}</Text>
                </TouchableOpacity>
              </View>
              <View style={{flex: 7, justifyContent:'space-between'}}>
                <View style={{flexDirection:'row'}}>
                  <View style={{flex:1, justifyContent: 'center', alignItems: 'flex-start'}}>
                    <Image style={style.iconImgXxs} source={{uri: IconName.Location}}/>
                  </View>
                  <View style={{flex:9,justifyContent: 'center', alignItems: 'flex-start'}}>
                    <Text numberOfLines={1} style={style.detailNearByInfo}>{d.address}</Text>
                  </View>
                </View>
                <View style={{flexDirection:'row'}}>
                  <View style={{flexDirection:'row',flex: 1}}>
                    <View style={{flex:2, justifyContent: 'center', alignItems: 'flex-start'}}>
                      <Image style={style.iconImgXxs} source={{uri: IconName.Telephone}}/>
                    </View>
                    <View style={{flex:8, justifyContent: 'center', alignItems: 'flex-start'}}>
                      <Text numberOfLines={1} style={style.detailNearByInfo}>{d.phone}</Text>
                    </View>
                  </View>
                  <View style={{flexDirection:'row',flex: 1}}>
                    <View style={{flex:2, justifyContent: 'center', alignItems: 'flex-start'}}>
                      <Image style={style.iconImgXxs} source={{uri: IconName.Clock}}/>
                    </View>
                    <View style={{flex:8, justifyContent: 'center', alignItems: 'flex-start'}}>
                      <Text numberOfLines={1} style={style.detailNearByInfo}>{d.openHour}</Text>
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