import React from 'react';
import {View, Image, TouchableOpacity, Text, Linking} from 'react-native';
import {Icon} from 'native-base';
import {style} from '../../styles/style';
import {viewportWidth, AppIcon, Helper} from '../../common/constain';
import {LStrings} from '../../common/LocalizedStrings';
import moment from 'moment';

export class DetailNearPlace extends React.Component {


  render() {
    return (
      <View style={style.detailInfoContainer}>
        <View style={style.nearPlaceTitle}>
          <Text style={style.nearPlaceTitleText}>{LStrings.Nearby}</Text>
        </View>
        {this.props.nearByPlaces && this.props.nearByPlaces.map((d, index) =>
          <TouchableOpacity key={index} style={[style.detailInfoItem]}
                            onPress={() => this.goPlace(d.id)}>
            <View style={{width: (viewportWidth - 30) / 5, justifyContent: 'flex-start', alignItems: 'flex-start'}}>
              <Image style={{resizeMode: 'cover', width: (viewportWidth - 30) / 5, height: (viewportWidth - 30) / 5}}
                     source={{uri: d.heroImage || Helper.ImageUrl}}/>
            </View>
            <View style={{flex: 1, paddingLeft: 10}}>
              <View style={{flex: 3, justifyContent:'flex-start'}}>
                <Text numberOfLines={1} style={style.detailNearByTitle}>{d.title}</Text>
              </View>
              <View style={{flex: 7, justifyContent:'space-between'}}>
                <View style={{flexDirection:'row'}}>
                  <View style={{width: 25, justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                    <Image style={style.iconImgXxs} source={AppIcon.Location}/>
                  </View>
                  <View style={{flex:9,justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                    <Text numberOfLines={2} style={style.detailNearByInfo}>{d.address}</Text>
                  </View>
                </View>
                <View style={{flexDirection:'row'}}>
                  <View style={{flexDirection:'row',flex: 1}}>
                    <View style={{width: 25, justifyContent: 'center', alignItems: 'flex-start'}}>
                      <Image style={style.iconImgXxs} source={AppIcon.Tel}/>
                    </View>
                    <View style={{flex:8, justifyContent: 'center', alignItems: 'flex-start'}}>
                      <Text numberOfLines={1} style={style.detailNearByInfo}>{d.phone}</Text>
                    </View>
                  </View>
                  <View style={{flexDirection:'row',flex: 1}}>
                    <View style={{width: 25, justifyContent: 'center', alignItems: 'flex-start'}}>
                      <Image style={style.iconImgXxs} source={AppIcon.Time}/>
                    </View>
                    <View style={{flex:8, justifyContent: 'center', alignItems: 'flex-start'}}>
                      <Text numberOfLines={1} style={style.detailNearByInfo}>{this.renderHour(d.open, d.close)}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </View>
    )
  }

  goPlace(id) {
    if(this.props.onNearByClicked)
      this.props.onNearByClicked(id);
  }

  renderHour(open, close) {
    if (moment(open).isValid() && moment(close).isValid()) {
      return moment(open).format('HH:mm') + ' - ' + moment(close).format('HH:mm');
    } else {
      if (moment(open).isValid()) {
        return moment(open).format('HH:mm') + ' -';
      } else if (moment(close).isValid()) {
        return '- ' + moment(close).format('HH:mm');
      }
    }
    return '';
  }
}