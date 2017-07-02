import React from 'react';
import {Text, View, Image, ScrollView, TouchableOpacity, Dimensions, RefreshControl} from 'react-native';
import {Icon, Spinner} from 'native-base';
import {StyleBase} from '../../styles/style';
import {style} from "../../styles/style";
import {MenuListData} from '../../common/constain';
import {DNPageRoute} from '../../NavigationHelper';
import {ListScreen} from '../../screens/ListScreen'
import {IndustryListScreen} from '../../screens/IndustryListScreen';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');
const menuItemHeight = Math.round(viewportHeight / 6);
const menuItemHeaderHeight = Math.round(viewportHeight / 25);

export class HomeMenuList extends React.Component {
  state = {
    isLoaded: false,
    dataLeft: [],
    dataRight: [],
    refreshing: false,
  };

  componentDidMount() {
    this.loadData();
  }

  loadData() {
    let leftHeight = 0, rightHeight = 0;
    let dataLeft = [], dataRight = [];
    for (let i = 0; i < MenuListData.length; i++) {
      let data = MenuListData[i];
      if (leftHeight <= rightHeight) {
        dataLeft.push(data);
        leftHeight += menuItemHeaderHeight + (data.services.length) * menuItemHeight;
      } else {
        dataRight.push(data);
        rightHeight += menuItemHeaderHeight + (data.services.length) * menuItemHeight;
      }
    }

    setTimeout(() => {
      this.setState({
        dataLeft: dataLeft,
        dataRight: dataRight,
        isLoaded: true,
        refreshing: false,
      });
    }, 1000)
  }

  render() {
    return (
      !this.state.isLoaded ?
        (<View style={{flex:1, alignItems: 'center', justifyContent: 'center',
                backgroundColor: '#ffffff',minHeight: Math.round(viewportHeight*5/10), paddingTop: 10}}>
          <View style={{alignSelf:'center'}}>
            <Spinner color={StyleBase.header_color}/>
          </View>
        </View>)
        :
        (
          <ScrollView
            refreshControl={
              <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => this.onFresh()} />
            }
          >
            <View style={[style.container, {paddingTop: 10}]}>
              <View style={[style.containerHalf, {marginLeft:10, marginRight:5}]}>
                {this.state.dataLeft.map((data, index) =>
                  <View key={index} style={{alignSelf: 'stretch'}}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => {this.goToList(data.id, 0, data.isIndustry)}}
                      style={style.menuItemHeader}
                    >
                      <Image style={[style.iconImgXs, {tintColor: '#12a1e7', marginBottom: 10, flex:2}]} source={{uri: data.categoryIcon || '?'}}/>
                      <Text numberOfLines={1}
                        style={{alignSelf: 'flex-end', color: '#263238', fontFamily: StyleBase.sp_regular, fontSize: 17, flex:8 }}>{data.categoryName}</Text>
                    </TouchableOpacity>
                    {data.services && data.services.map((service, sIndex) =>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        style={style.menuItem}
                        onPress={() => {this.goToList(data.id, sIndex, data.isIndustry)}}
                        key={sIndex}
                      >
                        <View style={style.imageContainer}>
                          <View style={style.imageInner}>
                            <Image
                              source={{uri: service.heroImage}}
                              style={style.image}
                            >
                              {data.isIndustry || (
                                <View style={style.textInner}>
                                  <View style={style.textContain}>
                                    <Text style={style.title} numberOfLines={1}>{ service.title }</Text>
                                  </View>
                                </View>
                              )}
                            </Image>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                  </View>
                )}
              </View>
              <View style={[style.containerHalf, {marginLeft:5, marginRight:10}]}>
                {this.state.dataRight.length > 0 ? this.state.dataRight.map((data, index) =>
                    <View key={index} style={{alignSelf: 'stretch'}}>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={() => {this.goToList(data.id, 0, data.isIndustry)}}
                        style={style.menuItemHeader}
                      >
                        <Image style={[style.iconImgXs, {tintColor: '#12a1e7', flex:2}]} source={{uri: data.categoryIcon || '?'}}/>
                        <Text numberOfLines={1}
                          style={{alignSelf: 'flex-end', color: '#263238', fontFamily: StyleBase.sp_regular, fontSize: 17,flex: 8 }}>{data.categoryName}</Text>
                      </TouchableOpacity>
                      {data.services && data.services.map((service, sIndex) =>
                        <TouchableOpacity
                          activeOpacity={0.7}
                          style={style.menuItem}
                          onPress={() => {this.goToList(data.id, sIndex, data.isIndustry)}}
                          key={sIndex}
                        >
                          <View style={style.imageContainer}>
                            <View style={style.imageInner}>
                              <Image
                                source={{uri: service.heroImage}}
                                style={style.image}
                              >
                                {data.isIndustry || (
                                  <View style={style.textInner}>
                                    <View style={style.textContain}>
                                      <Text style={style.title} numberOfLines={1}>{ service.title }</Text>
                                    </View>
                                  </View>
                                )}
                              </Image>
                            </View>
                          </View>
                        </TouchableOpacity>
                      )}
                    </View>
                  ) : (<View style={{alignSelf: 'stretch'}}/>)}
              </View>
            </View>
          </ScrollView>
        ))
  }

  onFresh() {
    this.setState({refreshing: true});
    this.loadData();
  }

  goToList(id, index, isIndustry) {
    if (isIndustry)
      this.props.navigation.navigate(DNPageRoute(IndustryListScreen), {listId: id});
    else
      this.props.navigation.navigate(DNPageRoute(ListScreen), {listId: id, initIndex: index});
  }
}

