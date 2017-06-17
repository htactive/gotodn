import React, {Component} from 'react';
import {View, ScrollView, Text, StatusBar} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {sliderWidth, itemWidth} from './styles/SliderEntry.style';
import SliderEntry from './components/SliderEntry';
import styles from './styles/index.style';
import {ENTRIES1, ENTRIES2} from './static/entries';

export default class SnapCarousel extends Component {

  getSlides(entries) {
    if (!entries) {
      return false;
    }

    return entries.map((entry, index) => {
      return (
        <SliderEntry
          key={`carousel-entry-${index}`}
          even={(index + 1) % 2 === 0}
          {...entry}
        />
      );
    });
  }

  get slider1() {
    return (
      <Carousel
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        firstItem={1}
        inactiveSlideScale={0.9}
        inactiveSlideOpacity={0.6}
        enableMomentum={false}
        containerCustomStyle={styles.slider}
        contentContainerCustomStyle={styles.sliderContainer}
        showsHorizontalScrollIndicator={false}
        snapOnAndroid={true}
        removeClippedSubviews={false}
      >
        { this.getSlides(ENTRIES1) }
      </Carousel>
    );
  }

  get slider2() {
    return (
      <Carousel
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        inactiveSlideScale={1}
        inactiveSlideOpacity={1}
        enableMomentum={true}
        autoplay={true}
        autoplayDelay={500}
        autoplayInterval={2500}
        containerCustomStyle={styles.slider}
        contentContainerCustomStyle={styles.sliderContainer}
        showsHorizontalScrollIndicator={false}
        snapOnAndroid={true}
        removeClippedSubviews={false}
      >
        { this.getSlides(ENTRIES2) }
      </Carousel>
    );
  }

  render() {
    return (
      <View style={styles.container}>

        <ScrollView
          style={styles.scrollview}
          indicatorStyle={'white'}
          scrollEventThrottle={200}
        >
          { this.slider1 }
        </ScrollView>
      </View>
    );
  }
}
