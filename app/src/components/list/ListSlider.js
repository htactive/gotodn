import React from 'react';
import {TouchableOpacity, Image, ScrollView, View, Text, PanResponder,Dimensions} from 'react-native';
import {Icon, Card, CardItem, Spinner} from 'native-base';
import {style, StyleBase} from '../../styles/style';
import {SlideData, viewportWidth, AppIcon, viewportHeight, Helper} from '../../common/constain';
import {DNPageRoute} from '../../NavigationHelper';
import {DetailScreen} from '../../screens/DetailScreen';
import {navigationStore, navigateToRouteAction} from '../../stores/NavigationStore';

export class ListSlider extends React.Component {
  state = {
    slideIndex: 0,
    slider: [],
    isLoaded: false,
  };

  sliderWidth;
  sliderScroll;

  // componentWillMount() {
  //
  //   this.setState({
  //     slider: SlideData,
  //   })
  // }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataSource) {
      this.setState({
        slider: nextProps.dataSource,
        isLoaded: true,
      });
      if(nextProps.currentIndex == 0 && this.sliderScroll) {
        this.sliderScroll.scrollTo({x: 0, animated: false});
      }
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
      <View style={style.sliderItemStar}>
        {stars.map((t, key) => <Icon key={key}
                                     style={{alignSelf: 'flex-end',color:  t == 1 ?  '#000' : '#fff', fontSize:20,width: 20, paddingHorizontal: 1}}
                                     name='ios-star'/>)}
      </View>
    );
  }

  render() {
    return (
      this.state.isLoaded ?
        (<View style={[style.size1]}>
          <View style={{flex: 85}}>
            <ScrollView horizontal
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={50}
                        onScroll={(event) => this.handleScroll(event)}
                        onContentSizeChange={(w, h) => {this.sliderWidth = w}}
                        ref={(slider) => this.sliderScroll = slider}
            >
              <View style={style.listSliderContainer}>
                {this.state.slider && this.state.slider.map((slide, index) =>
                  <TouchableOpacity key={index} activeOpacity={.8} onPress={() => this.goToDetail(slide.id)}
                                    style={{paddingRight: index < this.state.slider.length - 1 ? 5 : 0}}>
                    <Card elevation={10}>
                      <CardItem cardBody>
                        <Image
                          source={{uri: slide.image || Helper.ImageUrl}}
                          style={[style.imageListSlider]}
                        >
                          {slide.star && slide.star > 0 && this.renderStart(slide.star)}
                          <View style={style.textInnerListSlider}>
                            <View style={style.textListSlider}>
                              <Text style={[style.titleListSlider]} numberOfLines={1}>{ slide.title }</Text>
                            </View>
                          </View>
                        </Image>
                      </CardItem>
                    </Card>
                  </TouchableOpacity>
                ).concat(<View key={this.state.slider.length + 1} style={style.listSlider}>
                  {this.props.loadingMore ? <View>
                      <Spinner color={StyleBase.header_color}/>
                    </View> : null}
                </View>)}
              </View>
            </ScrollView>
          </View>
          <View style={{
          flex: 7,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}
          >
            {this.state.slider && this.state.slider.slice(0, 20).map((slider, index) =>
              <Image key={index} source={ index == this.state.slideIndex ? AppIcon.EllipseActive : AppIcon.Ellipse}
                     style={[style.iconImgTini,{marginHorizontal: 5}]}/>
            )}
          </View>
          <View style={{
          flex: 8,
          justifyContent: 'center',
          flexDirection: 'row',
        }}
          >
            <Text style={style.listSliderTitle} numberOfLines={1}>{ this.props.title }</Text>
          </View>
        </View>) : (
          <View style={{flex:1, alignItems: 'center', justifyContent: 'center',
                backgroundColor: '#ffffff',minHeight: Math.round(viewportHeight*5/10), paddingTop: 10}}>
            <View style={{alignSelf:'center'}}>
              <Spinner color={StyleBase.header_color}/>
            </View>
          </View>
        )
    )
  }

  goToDetail(id) {
    navigationStore.dispatch(navigateToRouteAction('DetailScreen', {itemId: id}));
  }

  handleScroll(event) {
    let index = 0;
    if(this.state.slider && this.state.slider.length > 0) {
      let sliderSpaceW = viewportWidth * .6 - 10;
      let sliderW = ((this.sliderWidth - sliderSpaceW) / this.state.slider.length);
      index = Math.floor((event.nativeEvent.contentOffset.x + 10) / sliderW);
      this.handleLazyLoad(event);
    }
    index = index < 0 ? 0 : index;
    if (index != this.state.slideIndex)
      this.setState({
        slideIndex: index
      });
  }

  handleLazyLoad(e) {
    if (!this.props.loadingMore) {
      let sliderSpaceW = viewportWidth * .6 - 10;
      let sliderW = ((this.sliderWidth - sliderSpaceW) / this.state.slider.length);
      let windowWidth = Dimensions.get('window').width,
        width = sliderW * 20 * (this.props.currentIndex + 1),
        offset = e.nativeEvent.contentOffset.x;
      if (width > 0 && windowWidth + offset >= width*.7 ) {
        let nextId = this.props.currentIndex + 1;
        if(this.props.onLoadMore)
          this.props.onLoadMore(nextId);
      }
    }
  }
}