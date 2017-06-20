import React from 'react';
import {Text, View, Image, ScrollView, TouchableOpacity, Dimensions, RefreshControl} from 'react-native';
import {Icon, Spinner} from 'native-base';
import {StyleBase} from '../../styles/style';
import {style} from "../../styles/style";

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
        (<View style={{flex:1, alignItems: 'center', justifyContent: 'center',backgroundColor: '#ffffff',minHeight: Math.round(viewportHeight*5/10)}}>
          <View style={{alignSelf:'center'}}>
            <Spinner color={StyleBase.header_color}/>
          </View>
        </View>)
        :
        (
          <ScrollView
            refreshControl = {
              <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => this.onFresh()} />
            }
          >
            <View style={style.container}>
              <View style={[style.containerHalf, {marginLeft:10, marginRight:5}]}>
                {this.state.dataLeft.map((data, index) =>
                  <View key={index} style={{alignSelf: 'stretch'}}>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => {}}
                      style={style.menuItemHeader}
                    >
                      <Icon active name={data.categoryIcon}
                            style={{alignSelf: 'flex-end', color:'#12a1e7', fontSize:20, paddingRight: 5}}/>
                      <Text style={{alignSelf: 'flex-end', color: '#455a64'}}>{data.categoryName}</Text>
                    </TouchableOpacity>
                    {data.services && data.services.map((service, sIndex) =>
                      <TouchableOpacity
                        activeOpacity={0.7}
                        style={style.menuItem}
                        onPress={() => {}}
                        key={sIndex}
                      >
                        <View style={style.imageContainer}>
                          <View style={style.imageInner}>
                            <Image
                              source={{uri: service.heroImage}}
                              style={style.image}
                            />
                          </View>
                          <View style={style.textInner}>
                            <View style={style.textContain}>
                              <Text style={style.title} numberOfLines={1}>{ service.title }</Text>
                            </View>
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
                        onPress={() => {}}
                        style={style.menuItemHeader}
                      >
                        <Icon active name={data.categoryIcon}
                              style={{alignSelf: 'flex-end', color:'#12a1e7', fontSize:20, paddingRight: 5}}/>
                        <Text style={{alignSelf: 'flex-end', color: '#455a64'}}>{data.categoryName}</Text>
                      </TouchableOpacity>
                      {data.services && data.services.map((service, sIndex) =>
                        <TouchableOpacity
                          activeOpacity={0.7}
                          style={style.menuItem}
                          onPress={() => {}}
                          key={sIndex}
                        >
                          <View style={style.imageContainer}>
                            <View style={style.imageInner}>
                              <Image
                                source={{uri: service.heroImage}}
                                style={style.image}
                              />
                            </View>
                            <View style={style.textInner}>
                              <View style={style.textContain}>
                                <Text style={style.title} numberOfLines={1}>{ service.title }</Text>
                              </View>
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
}

const MenuListData = [
  {
    categoryName: 'Đồ Ăn Thức Uống',
    categoryIcon: 'ios-beer-outline',
    services: [
      {
        heroImage: 'http://vanvat.net/hinhanh/anhto/14714hinh-anh-nhung-ly-nuoc-giai-khat.jpg',
        title: 'Giải khát'
      },
      {
        heroImage: 'http://www.chupdep.com/wp-content/uploads/2015/12/a4.jpg',
        title: 'Món ăn ngon'
      },
      {
        heroImage: 'http://noithatart.com/wp-content/uploads/2016/01/thiet-ke-nha-hang-dep-va-lang-mang-prado-06.jpg',
        title: 'Nhà hàng'
      }
    ]
  },
  {
    categoryName: 'Mua sắm',
    categoryIcon: 'ios-cart-outline',
    services: [
      {
        heroImage: 'https://tourism.danang.vn/wp-content/uploads/2017/06/lotte-mart-da-nang1-560x420.jpg',
        title: 'Chợ & khu mua sắm'
      }
    ]
  },
  {
    categoryName: 'Cộng đồng',
    categoryIcon: 'ios-body-outline',
    services: [
      {
        heroImage: 'http://houstonlibrary.org/sites/default/files/anchor_service_passport.png',
        title: 'Nhập cảnh, hải quan'
      },
      {
        heroImage: 'http://userscontent2.emaze.com/images/16c6a1c5-ad96-4355-84fd-6515aa6b37e3/3e50fe67-935e-40e7-8a57-4a920827fee3.jpg',
        title: 'Truyền thông'
      },
      {
        heroImage: 'http://blog-xtraffic.pep.vn/wp-content/uploads/2013/12/customer-support-online.jpg',
        title: 'Hỗ trợ du khách'
      },
    ]
  },
  {
    categoryName: 'Vui chơi',
    categoryIcon: 'ios-game-controller-b-outline',
    services: [
      {
        heroImage: 'http://helio.vn/uploads/5_Cover/Play_Van%20dong.JPG',
        title: 'Khu vui chơi trong nhà'
      },
      {
        heroImage: 'http://phongnet.com/wp-content/uploads/2016/01/tieu-chuan-phong-net-cyber-game.jpg',
        title: 'Cyber Gaming Center'
      },
    ]
  }
];