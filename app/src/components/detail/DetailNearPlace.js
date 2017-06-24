import React from 'react';
import {View, Image, TouchableOpacity, Text, Linking} from 'react-native';
import {Icon} from 'native-base';
import {style} from '../../styles/style';

export class DetailNearPlace extends React.Component {


  render() {
    return (
      <View style={style.detailInfoContainer}>
        {this.props.nearByPlaces && this.props.nearByPlaces.map((d, index) =>
          <View key={index} style={style.detailInfoItem}>
            <View style={{flex: 2}}>
              <Image style={{resizeMode: 'cover'}} source={{uri: d.heroImage}} />
            </View>
            <View style={{flex: 8}}>
            </View>
            <View style={{flex:15, justifyContent: 'center', alignItems: 'flex-start'}}>
              <Icon name={d.infoIcon} style={{color:'#263238', fontSize:35}}/>
            </View>
            <View style={{flex:85, justifyContent: 'center', alignItems: 'flex-start'}}>
              {d.isUrl ? (
                  <TouchableOpacity activeOpacity={.8} onPress={() => this.handleClick(d.infoText)}>
                    <Text numberOfLines={2}
                          style={[style.detailInfoText, {textDecorationLine: 'underline'}]}>{d.infoText}</Text>
                  </TouchableOpacity>
                ) : (
                  <Text numberOfLines={2} style={style.detailInfoText}>{d.infoText}</Text>
                )}
            </View>
          </View>
        )}
      </View>
    )
  }

  handleClick(infoText) {
    Linking.canOpenURL(infoText).then(supported => {
      if (supported) {
        Linking.openURL(infoText);
      } else {
      }
    });
  }
}