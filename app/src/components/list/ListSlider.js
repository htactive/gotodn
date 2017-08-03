import React from 'react';
import {TouchableOpacity, Image, ScrollView, View, Text, PanResponder} from 'react-native';
import {Icon, Card, CardItem, Spinner} from 'native-base';
import {style, StyleBase} from '../../styles/style';
import {SlideData, viewportWidth, AppIcon, viewportHeight} from '../../common/constain';
import {DNPageRoute} from '../../NavigationHelper';
import {DetailScreen} from '../../screens/DetailScreen';
import {navigationStore, navigateToRouteAction} from '../../stores/NavigationStore';

export class ListSlider extends React.Component {
  state = {
    slideIndex: 0,
    slider: [],
    isLoaded: false,
  };

  // componentWillMount() {
  //
  //   this.setState({
  //     slider: SlideData,
  //   })
  // }

  componentWillReceiveProps(nextProps){
    if(nextProps.dataSource) {
      this.setState({
        slider: nextProps.dataSource,
        isLoaded: true,
      });
    }
  }


  render() {
    return (
      <View style={[style.size1]}>
        <View style={{flex: 87}}>
          <ScrollView horizontal
                      showsHorizontalScrollIndicator={false}
                      scrollEventThrottle={50}
                      onScroll={(event) => this.handleScroll(event)}
          >
            <View style={style.listSliderContainer}>
              {this.state.slider && this.state.slider.map((slide, index) =>
                <TouchableOpacity key={index} activeOpacity={.8} onPress={() => this.goToDetail(slide.id)}
                                  style={{paddingRight: index < this.state.slider.length - 1 ? 5 : 0}}>
                  <Card elevation={10}>
                    <CardItem cardBody>
                      <View style={style.listSlider}>
                        <Image
                          source={{uri: slide.image || "https://avatars3.githubusercontent.com/u/20336495?v=4&s=460"}}
                          style={[style.imageListSlider]}
                        >
                          <View style={style.textInnerListSlider}>
                            <View style={style.textListSlider}>
                              <Text style={[style.titleListSlider]} numberOfLines={1}>{ slide.title }</Text>
                              <Text style={[style.subtitleListSlider]} numberOfLines={2}>{ slide.subtitle }</Text>
                            </View>
                          </View>
                        </Image>
                      </View>
                    </CardItem>
                  </Card>
                </TouchableOpacity>
              ).concat(<View key={this.state.slider.length + 1} style={style.listSlider}/>)
                .concat(<View key={this.state.slider.length + 2} style={style.listSlider}/>)}
            </View>
          </ScrollView>
        </View>
        <View style={{
          flex: 5,
          justifyContent: 'center',
          alignItems: 'flex-start',
          flexDirection: 'row',
        }}
        >
          {this.state.slider && this.state.slider.map((slider, index) =>
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
      </View>
    )
  }

  goToDetail(id) {
    navigationStore.dispatch(navigateToRouteAction('DetailScreen', {itemId: id}));
  }

  handleScroll(event) {
    let index = Math.floor(event.nativeEvent.contentOffset.x / ((viewportWidth - 35) / 3));
    if (index != this.state.slideIndex)
      this.setState({
        slideIndex: index
      });
  }
}