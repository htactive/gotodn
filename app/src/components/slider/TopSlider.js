import React from 'react';
import {View, ScrollView, Text, StatusBar} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {sliderWidth, itemWidth} from '../../styles/slider-css';
import TopSliderItem from './TopSliderItem'
import styles from '../../styles/slider-css';
import {Icon}  from 'native-base';

export default class TopSlider extends React.Component {
  state = {sliders: [], slideIndex : 0};
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
    let sliders = this.state.sliders;
    return (
      <View style={styles.container}>
        <View style={styles.slideContainer}>
          <Carousel
            ref={(carousel) => { this.carousel = carousel; }}
            sliderWidth={sliderWidth}
            itemWidth={itemWidth}
            firstItem={this.state.slideIndex}
            inactiveSlideScale={0.8}
            inactiveSlideOpacity={0.7}
            enableMomentum={true}
            containerCustomStyle={styles.slider}
            contentContainerCustomStyle={styles.sliderContainer}
            showsHorizontalScrollIndicator={false}
            removeClippedSubviews={false}
            onSnapToItem={(index) => this.setState({slideIndex: index})}
          >
            {sliders.map((slider, index) =>
              <TopSliderItem
                key={index}
                even={(index + 1) % 2 === 0}
                {...slider}
              />
            )}
          </Carousel>
        </View>
        <View style={styles.dotContainer}>
          {sliders.map((slider, index) =>
            <Icon key={index} name={`ios-radio-button-${index == this.state.slideIndex ? 'on' : 'off'}`} style={{color: '#b0bec5',fontSize:15, paddingHorizontal:3}}/>
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