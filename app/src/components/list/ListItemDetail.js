import React from 'react';
import {Text, View, Image, ScrollView, TouchableOpacity, Dimensions, RefreshControl} from 'react-native';
import {Icon, Spinner} from 'native-base';
import {StyleBase} from '../../styles/style';
import {style} from "../../styles/style";
import {MenuListItemData} from '../../common/constain';
import {DNPageRoute} from '../../NavigationHelper';
import {DetailScreen} from '../../screens/DetailScreen';
import {navigationStore, navigateToRouteAction} from '../../stores/NavigationStore';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');
const largeImgHeight = Math.round(viewportHeight / 3);
const smallImgHeight = Math.round(viewportHeight / 5);
const textHeight = Math.round(viewportHeight / 6);
const largeItemHeight = largeImgHeight + textHeight;
const smallItemHeight = smallImgHeight + textHeight;

export class ListItemDetail extends React.Component {
  state = {
    isLoaded: false,
    dataLeft: [],
    dataRight: [],
    refreshing: false,
  };

  componentWillReceiveProps(nextProps) {
    this.loadData(nextProps.dataSource);
  }

  componentDidMount() {
  }

  loadData(listData) {
    if(listData) {
      let dataLeft = [], dataRight = [];
      for (let i = 0; i < listData.length; i++) {
        let data = listData[i];
        if (i % 2 === 0) dataLeft.push(data);
        else dataRight.push(data);
      }
      this.setState({
        dataLeft: dataLeft,
        dataRight: dataRight,
        isLoaded: true,
        refreshing: false,
      });
    } else {
      setTimeout(() => {
        this.setState({
          isLoaded: true,
          refreshing: false,
        });
      }, 1000);
    }
  }

  renderStart(starScore) {

    let floorStar = Math.floor(starScore);
    let modStar = starScore - floorStar;
    let stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < floorStar)
        stars.push(1);
      else {
        if (modStar > 0) {
          if (modStar <= 0.5) {
            stars.push(0);
          } else {
            stars.push(1);
          }
          modStar = 0;
        } else
          stars.push(0);
      }
    }
    return (
      <View style={style.menuItemStar}>
        {stars.map((t, key) => <Icon key={key}
                                     style={{alignSelf: 'flex-end',color:  t == 1 ?  '#000' : '#fff', fontSize:20, paddingHorizontal: 1}}
                                     name='ios-star'/>)}
      </View>
    );
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
                      style={[style.menuItemDetail, {height: (index % 2 === 0) ? largeItemHeight : smallItemHeight}]}
                      onPress={() => {this.goToDetail(data.id)}}
                      key={index}
                    >
                      <View style={style.imageContainer}>
                        <View
                          style={{flex: (index % 2 === 0) ? largeImgHeight/largeItemHeight : smallImgHeight/smallItemHeight}}>
                          <Image
                            source={{uri: data.heroImage}}
                            style={[style.menuItemImage, {height: (index % 2 === 0) ? largeImgHeight : smallImgHeight}]}
                          >
                            {data.star > 0 && this.renderStart(data.star)}
                          </Image>
                        </View>
                        <View
                          style={{flex: (index % 2 === 0) ? textHeight/largeItemHeight : textHeight/smallItemHeight}}>
                          <View style={style.menuItemTextContain}>
                            <Text style={style.menuItemTitle} numberOfLines={1}>{ data.title }</Text>
                            <Text style={style.menuItemSubTitle} numberOfLines={4}>{ data.description }</Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              <View style={[style.containerHalf, {marginLeft:5, marginRight:10}]}>
                {this.state.dataRight.length > 0 ? this.state.dataRight.map((data, index) =>
                    <View key={index} style={{alignSelf: 'stretch'}}>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        style={[style.menuItemDetail, {height: (index % 2 !== 0) ? largeItemHeight : smallItemHeight}]}
                        onPress={() => {this.goToDetail(data.id)}}
                        key={index}
                      >
                        <View style={style.imageContainer}>
                          <View
                            style={{flex: (index % 2 !== 0) ? largeImgHeight/largeItemHeight : smallImgHeight/smallItemHeight}}>
                            <Image
                              source={{uri: data.heroImage}}
                              style={[style.menuItemImage, {height: (index % 2 !== 0) ? largeImgHeight : smallImgHeight}]}
                            >
                              {data.star > 0 && this.renderStart(data.star)}
                            </Image>
                          </View>
                          <View
                            style={{flex: (index % 2 !== 0) ? textHeight/largeItemHeight : textHeight/smallItemHeight}}>
                            <View style={style.menuItemTextContain}>
                              <Text style={style.menuItemTitle} numberOfLines={1}>{ data.title }</Text>
                              <Text style={style.menuItemSubTitle} numberOfLines={4}>{ data.description }</Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </View>
                  ) : (<View style={{alignSelf: 'stretch'}}/>)}
              </View>
            </View>
          </ScrollView>
        ))
  }

  onFresh() {
    this.setState({refreshing: true});
    this.loadData(this.props.dataSource);
  }

  goToDetail(id) {
    navigationStore.dispatch(navigateToRouteAction('DetailScreen',{itemId: id}));
  }
}