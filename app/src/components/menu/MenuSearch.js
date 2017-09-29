import React from 'react';
import {View, ScrollView, TouchableHighlight, Text, Button, TouchableOpacity, Image, Dimensions, Keyboard} from 'react-native';
import {Title, Icon, Picker, Drawer, Input, Item} from 'native-base';
import {StyleBase, style} from '../../styles/style';
import {MenuType, viewportHeight, MenuListItemData, Helper, viewportWidth, AppIcon} from '../../common/constain';
import {GDNServiceInstance} from '../../services/GDNService';
import styles from '../../styles/slider-css';
import {Spinner}  from 'native-base';

export class MenuSearch extends React.Component {
  state = {
    data: null,
    search: '',
    selectedIndex: 0,
    loadingMore: false,
    currentIndex: 0,
    keyboardShow: false,
  };

  itemHeight;
  scrollContent;
  keyboardDidShowListener; keyboardDidHideListener;
  componentWillMount() {
    this.componentWillReceiveProps(this.props);
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {this._keyboardDidShow()});
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {this._keyboardDidHide()});
  }

  _keyboardDidShow () {
    this.setState({
      keyboardShow: true,
    })
  }

  _keyboardDidHide () {
    this.setState({
      keyboardShow: false,
    })
  }

  componentDidMount() {
    //this.filterData('');
  }

  componentWillUnmount() {
    if (this.loadMoreTimeout) {
      clearTimeout(this.loadMoreTimeout);
    }
    if(this.keyboardDidShowListener) {
      this.keyboardDidShowListener.remove();
    }
    if(this.keyboardDidHideListener) {
      this.keyboardDidHideListener.remove();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.search != this.props.search) {
      this.setState({
        data: null
      });
      if(nextProps.search && nextProps.search.trim() != '' && nextProps.search.trim().length >= 2)
        this.filterData(nextProps.search);
    }
  }

  async filterData(search) {
    let result = await GDNServiceInstance.searchAllPlace(search, 0);

    if (result) {
      this.setState({
        data: result,
        currentIndex: 0,
      });
    }
  }

  render() {
    return (
      <View style={style.size1}>
        <ScrollView ref={(sv) => this.scrollContent = sv} style={{alignSelf: 'stretch'}}
                    onScroll={(e) => {this.handleScrollBottom(e)}}>
          {this.state.data ? this.state.data.map((d, index) =>
              <TouchableOpacity key={index}
                                onLayout={(event) => {
                                  const {height} = event.nativeEvent.layout;
                                  this.itemHeight = height;
                                }}
                                onPress={() => this.props.onSearchSelected && this.props.onSearchSelected(d)}
                                style={[style.detailInfoItem, { paddingVertical: 15, paddingHorizontal: 10},
                              this.state.selectedIndex == index ? {
                                backgroundColor: '#b3e5fc'
                              } : {},
                              index == this.state.data.length && {borderBottomWidth: 0}
                            ]}>
                <View style={{flex: 25, justifyContent: 'center', alignItems: 'flex-start'}}>
                  <Image
                    style={{resizeMode: 'cover', width: (viewportWidth - 30) / 5, height: (viewportWidth - 30) / 5}}
                    source={{uri: d.heroImage || Helper.ImageUrl}}/>
                </View>
                <View style={{flex: 75}}>
                  <View style={{flex: 3}}>
                    <Text numberOfLines={1} style={style.detailNearByTitle}>{d.title}</Text>
                  </View>
                  <View style={{flex: 7, justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row'}}>
                      <View style={{flex:1, justifyContent: 'center', alignItems: 'flex-start'}}>
                        <Image style={[style.iconImgXxs, {tintColor: '#263238'}]} source={AppIcon.Location}/>
                      </View>
                      <View style={{flex:9,justifyContent: 'center', alignItems: 'flex-start'}}>
                        <Text numberOfLines={1} style={[style.menuSearchInfo, {paddingLeft: 5}]}>{d.address}</Text>
                      </View>
                    </View>
                    <View style={{flexDirection:'row'}}>
                      <View style={{flex:1, justifyContent: 'center', alignItems: 'flex-start'}}>
                        <Image style={[style.iconImgXxs, {tintColor: '#263238'}]} source={AppIcon.Tel}/>
                      </View>
                      <View style={{flex:9, justifyContent: 'center', alignItems: 'flex-start'}}>
                        <Text numberOfLines={1} style={[style.menuSearchInfo, {paddingLeft: 5}]}>{d.phone}</Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ) : this.props.search && this.props.search.trim() != '' && this.props.search.trim().length >= 2 ? <View style={[styles.container, style.centralizedContent, {backgroundColor: 'rgba(255,255,255,0)'}]}>
              <Spinner color={StyleBase.header_color}/>
            </View> : null}
          {this.state.data && this.state.loadingMore ?
            <View style={[style.loadingMore]}>
              <Spinner color={StyleBase.header_color}/>
            </View> : null}
        </ScrollView>

      </View>
    );
  }

  loadMoreTimeout;

  handleScrollBottom(e) {
    if (!this.state.loadingMore) {
      if (this.loadMoreTimeout)
        clearTimeout(this.loadMoreTimeout);
      let windowHeight = Dimensions.get('window').height * .9,
        height = this.itemHeight ? (this.itemHeight * 30 * (this.state.currentIndex + 1)) : 0;
        offset = e.nativeEvent.contentOffset.y;
      if (height > 0 && windowHeight + offset >= height*.6) {
        this.loadMoreTimeout = setTimeout(() => {
          this.setState({
            loadingMore: true,
          });
          (async() => {
            let nextId = this.state.currentIndex + 1;
            let result = await GDNServiceInstance.searchAllPlace(this.props.search, nextId);
            this.setState({
              loadingMore: false,
            });
            let oldData = this.state.data ? this.state.data.slice() : [];
            if (result) {
              let newData = oldData.concat(result);
              this.setState({
                data: newData,
                currentIndex: nextId,
              });
            }
          })();
        }, 100);
      }
    }
  }
}