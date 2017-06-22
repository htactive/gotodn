import React from 'react';
import {View, ScrollView, Text, StatusBar} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {sliderWidth, itemWidth, wp, colors} from '../../styles/slider-css';
import TopSliderItem from './TopSliderItem'
import styles from '../../styles/slider-css';
import {Icon}  from 'native-base';
import {viewportWidth, SlideType} from '../../common/constain';

export default class TopSlider extends React.Component {
  state = {sliders: [], slideIndex: 0};
  carousel;

  componentWillMount() {
    this.setState({
      sliders: SlideData,
      slideIndex: Math.round(SlideData ? SlideData.length / 2 : 0)
    });
  }

  componentDidMount() {

  }

  render() {
    let sW = sliderWidth, iW = itemWidth, sScale = 0.8, sOpacity = 0.7;
    let slideItem = {};
    let textOuter = [styles.textContain];
    let titleOuter = {};
    let subTitleOuter = {};
    let sliders = this.state.sliders;
    let sliderType = this.props.sliderType;
    switch (sliderType) {
      case SlideType.HomeScreen:
        break;
      case SlideType.ListScreen:
        iW = wp(40);
        sScale = .99;
        sOpacity = .99;
        textOuter.push({
          borderWidth: 1,
          borderColor: colors.gray,
          backgroundColor: colors.white,
        });
        titleOuter = {color: '#455a64'};
        subTitleOuter={color: '#263238'};
        slideItem = {paddingHorizontal: 5};
        break;
    }
    return (
      <View style={styles.container}>
        <View style={styles.slideContainer}>
          <Carousel
            ref={(carousel) => { this.carousel = carousel; }}
            sliderWidth={sW}
            itemWidth={iW}
            firstItem={this.state.slideIndex}
            inactiveSlideScale={sScale}
            inactiveSlideOpacity={sOpacity}
            enableMomentum={true}
            containerCustomStyle={styles.slider}
            contentContainerCustomStyle={styles.sliderContainer}
            showsHorizontalScrollIndicator={false}
            removeClippedSubviews={false}
            onSnapToItem={(index) => this.setState({slideIndex: index})}
            activeSlideOffset={50}
          >
            {sliders.map((slider, index) =>
              <TopSliderItem
                key={index}
                even={(index + 1) % 2 === 0}
                textOuterStyle={textOuter}
                titleOuter={titleOuter}
                subTitleOuter={subTitleOuter}
                slideItem={slideItem}
                {...slider}
              />
            )}
          </Carousel>
        </View>
        <View style={styles.dotContainer}>
          {sliders.map((slider, index) =>
            <Icon key={index} name={`ios-radio-button-${index == this.state.slideIndex ? 'on' : 'off'}`}
                  style={{color: '#039be6',fontSize:15, paddingHorizontal:3}}/>
          )}
        </View>
        <View style={styles.titleSlideContainer}>
          <Text style={styles.slideTitle} numberOfLines={1}>{ this.props.title }</Text>
        </View>
      </View>
    )
  }
}

const SlideData = [
  {
    title: 'Beautiful and dramatic Antelope Canyon',
    subtitle: 'Mô tả tiếng Việt cho Antelop Canyon',
    image: 'http://i.imgur.com/UYiroysl.jpg'
  },
  {
    title: 'Earlier this morning, NYC',
    subtitle: 'Bình minh ở NYC',
    image: 'http://i.imgur.com/UPrs1EWl.jpg'
  },
  {
    title: 'White Pocket Sunset',
    subtitle: 'Mặt trời lặn ở White Pocket',
    image: 'http://i.imgur.com/MABUbpDl.jpg'
  },
  {
    title: 'Acrocorinth, Greece',
    subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
    image: 'http://i.imgur.com/KZsmUi2l.jpg'
  },
  {
    title: 'The lone tree, majestic landscape of New Zealand',
    subtitle: 'Lorem ipsum dolor sit amet',
    image: 'http://i.imgur.com/2nCt3Sbl.jpg'
  },
  {
    title: 'Middle Earth, Germany',
    subtitle: 'Lorem ipsum dolor sit amet',
    image: 'http://i.imgur.com/lceHsT6l.jpg'
  }
];