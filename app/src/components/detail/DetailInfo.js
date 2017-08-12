import React from 'react';
import {View, Image, TouchableOpacity, Text, Linking} from 'react-native';
import {Icon} from 'native-base';
import {style} from '../../styles/style';
import {Helper} from '../../common/constain';

export class DetailInfo extends React.Component {


  render() {
    return (
      <View style={style.detailInfoContainer}>
        {this.props.detailInfo && this.props.detailInfo.map((d, index) =>
          d.isMulti ? (
              <View key={index} style={style.detailInfoItem}>
                <View style={{flex:15, justifyContent: 'center', alignItems: 'flex-start'}}>
                  {/*<Icon name={d.infoIcon} style={{color:'#263238', fontSize:35}}/>*/}
                  {d.dataInfo[0].infoIcon &&
                  <Image style={style.iconImgXs}
                         source={{uri: d.dataInfo[0].infoIcon || Helper.IconUrl}}/>}
                </View>
                <View style={{flex:35, justifyContent: 'center', alignItems: 'flex-start'}}>
                  <Text numberOfLines={2} style={style.detailInfoText}>{ d.dataInfo[0].infoText}</Text>
                </View>
                <View style={{flex:15, justifyContent: 'center', alignItems: 'flex-start'}}>
                  {/*<Icon name={d.infoIcon} style={{color:'#263238', fontSize:35}}/>*/}
                  {d.dataInfo[1] && d.dataInfo[1].infoIcon &&
                  <Image style={style.iconImgXs}
                         source={{uri: d.dataInfo[1].infoIcon || Helper.IconUrl}}/>
                  }
                </View>
                <View style={{flex:35, justifyContent: 'center', alignItems: 'flex-start'}}>
                  {d.dataInfo[1] && <Text numberOfLines={2} style={style.detailInfoText}>{ d.dataInfo[1].infoText}</Text>}
                </View>
              </View>
            ) :
            (
              <View key={index} style={style.detailInfoItem}>
                <View style={{flex:15, justifyContent: 'center', alignItems: 'flex-start'}}>
                  {/*<Icon name={d.infoIcon} style={{color:'#263238', fontSize:35}}/>*/}
                  {d.infoIcon &&
                  <Image style={style.iconImgXs}
                         source={{uri: d.infoIcon || Helper.IconUrl}}/>}
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
            )
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