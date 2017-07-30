import React from 'react';
import {View, ScrollView, TouchableHighlight, Text, Button, TouchableOpacity, Image} from 'react-native';
import {Title, Icon, Picker, Drawer, Input, Item} from 'native-base';
import {StyleBase, style} from '../../styles/style';
import {MenuType, viewportHeight, MenuListItemData, Helper, viewportWidth} from '../../common/constain';
import {GDNServiceInstance} from '../../services/GDNService';
import styles from '../../styles/slider-css';
import {Spinner}  from 'native-base';

export class MenuSearch extends React.Component {
  state = {
    data: [],
    search: '',
    selectedIndex: 0,
  };

  componentWillMount() {
    this.componentWillReceiveProps(this.props)
  }

  componentDidMount() {
    this.filterData('');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.search != this.props.search) {
      this.setState({
        data: null
      });
      this.filterData(nextProps.search);
    }
  }

  async filterData(search) {
    let result = await GDNServiceInstance.searchAllPlace(search);
    this.setState({
      data: result
    });
  }

  render() {
    return (
      <ScrollView style={{alignSelf: 'stretch'}}>
        {this.state.data ? this.state.data.map((d, index) =>
          <TouchableOpacity key={index}
                            onPress={() => this.props.onSearchSelected && this.props.onSearchSelected(d)}
                            style={[style.detailInfoItem, { paddingVertical: 15, paddingHorizontal: 10},
                              this.state.selectedIndex == index ? {
                                backgroundColor: '#b3e5fc'
                              } : {},
                              index == this.state.data.length && {borderBottomWidth: 0}
                            ]}>
            <View style={{flex: 25, justifyContent: 'center', alignItems: 'flex-start'}}>
              <Image style={{resizeMode: 'cover', width: (viewportWidth - 30) / 5, height: (viewportWidth - 30) / 5}}
                     source={{uri: d.heroImage}}/>
            </View>
            <View style={{flex: 75}}>
              <View style={{flex: 3}}>
                <Text numberOfLines={1} style={style.detailNearByTitle}>{d.title}</Text>
              </View>
              <View style={{flex: 7, justifyContent:'space-between'}}>
                <View style={{flexDirection:'row'}}>
                  <View style={{flex:1, justifyContent: 'center', alignItems: 'flex-start'}}>
                    <Image style={[style.iconImgXxs, {tintColor: '#263238'}]} source={{uri: d.addressIcon || '?'}}/>
                  </View>
                  <View style={{flex:9,justifyContent: 'center', alignItems: 'flex-start'}}>
                    <Text numberOfLines={1} style={[style.menuSearchInfo, {paddingLeft: 5}]}>{d.address}</Text>
                  </View>
                </View>
                <View style={{flexDirection:'row'}}>
                  <View style={{flex:1, justifyContent: 'center', alignItems: 'flex-start'}}>
                    <Image style={[style.iconImgXxs, {tintColor: '#263238'}]} source={{uri: d.phoeneIcon || '?'}}/>
                  </View>
                  <View style={{flex:9, justifyContent: 'center', alignItems: 'flex-start'}}>
                    <Text numberOfLines={1} style={[style.menuSearchInfo, {paddingLeft: 5}]}>{d.phone}</Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ) : <View style={[styles.container, style.centralizedContent]}>
            <Spinner color={StyleBase.header_color}/>
          </View>}
      </ScrollView>
    );
  }
}