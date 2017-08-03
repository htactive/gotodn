import React from 'react';
import {View, Image, TouchableOpacity, ScrollView, Text} from 'react-native';
import {Icon} from 'native-base';
import {style} from '../../styles/style';

export class DetailMapTextItem extends React.Component {
  render() {
    return (
      <View style={[style.detailItem,
      this.props.lastItem ? {} : {borderBottomWidth: 1, borderBottomColor: '#9f9f9f',}] }>
        <View style={{flex: 50, flexDirection: 'row'}}>
          <View style={{flex:2, justifyContent: 'center', alignItems: 'flex-start'}}>
            {/*<Icon name={d.infoIcon} style={{color:'#263238', fontSize:35}}/>*/}
            <Image style={style.iconImgXs} source={{uri: this.props.leftIcon || "https://avatars3.githubusercontent.com/u/20336495?v=4&s=460"}}/>
          </View>
          <View style={{flex:8, justifyContent: 'center', alignItems: 'flex-start'}}>
            <Text numberOfLines={2}
                  style={[style.detailInfoText, ]}>{this.props.leftText || ''}</Text>
          </View>
        </View>
        <View style={{flex: 15,flexDirection: 'row'}}>

        </View>
        <TouchableOpacity onPress={() => this.props.onMapItemClicked && this.props.onMapItemClicked()}
                          style={{flex: 35,flexDirection: 'row', }}>

          <View style={{flex:8, justifyContent: 'center', alignItems: 'flex-start'}}>
            <Text style={[style.detailInfoAction, ]}>{this.props.rightText || ''}</Text>
          </View>
          <View style={{flex:2, justifyContent: 'center', alignItems: 'flex-start'}}>
            {/*<Icon name={d.infoIcon} style={{color:'#263238', fontSize:35}}/>*/}
            <Image style={[style.iconImgXs, {tintColor: '#039be5'}]} source={this.props.rightIcon || "https://avatars3.githubusercontent.com/u/20336495?v=4&s=460"}/>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}