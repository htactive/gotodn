import React from 'react';
import {View, Text, Image} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {wp} from '../../styles/slider-css';
import HomeSliderItem from './HomeSliderItem'
import styles from '../../styles/slider-css';
import {Spinner}  from 'native-base';
import {viewportWidth, AppIcon, platform} from '../../common/constain';
import {style, StyleBase} from '../../styles/style';

const slideWidth = wp(85);
const itemWidth = slideWidth + wp(1);

export default class HomeSlider extends React.Component {
  state = {sliders: null, slideIndex: 0};
  carousel;

  componentWillMount() {
    this.setState({
      slideIndex: 0
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataSource) {
      this.setState({
        sliders: nextProps.dataSource,
      });
      if(nextProps.currentIndex == 0 && !nextProps.loadingMore) {
        if(this.carousel && this.carousel.currentIndex != 0) {
          this.carousel.snapToItem(0);
        }
        this.setState({
          slideIndex: 0
        });
      }
    }
  }

  componentDidMount() {

  }

  render() {
    let sW = viewportWidth, iW = itemWidth, sScale = .95, sOpacity = 0.7;
    let sliders = this.state.sliders;
    return (
      sliders ? (
          <View style={styles.container}>
            <View style={styles.slideContainer}>
              <Carousel
                ref={(carousel) => { this.carousel = carousel; }}
                sliderWidth={sW}
                itemWidth={iW}
                firstItem={this.state.slideIndex}
                inactiveSlideScale={sScale}
                inactiveSlideOpacity={sOpacity}
                enableMomentum={platform === 'ios'}
                scrollEndDragDebounceValue={1}
                containerCustomStyle={styles.slider}
                contentContainerCustomStyle={styles.sliderContainer}
                showsHorizontalScrollIndicator={false}
                removeClippedSubviews={false}
                onSnapToItem={(index) => this.sliderChanged(index) }
              >
                {sliders.map((slider, index) =>
                  <HomeSliderItem
                    key={index}
                    {...slider}
                  />
                ).concat(<View key={sliders.length + 1} style={style.homeSlider}>
                  {this.props.loadingMore ? <View>
                      <Spinner color={StyleBase.header_color}/>
                    </View> : null}
                </View>)}
              </Carousel>
            </View>
            <View style={styles.dotContainer}>
              {sliders.map((slider, index) =>
                <Image key={index} source={ index == this.state.slideIndex ? AppIcon.EllipseActive : AppIcon.Ellipse}
                       style={[style.iconImgTini,{marginHorizontal: 5}]}/>
              )}
            </View>
            <View style={styles.titleSlideContainer}>
              <Text style={styles.slideTitle} numberOfLines={1}>{ this.props.title || '' }</Text>
            </View>
          </View>
        ) : (
          <View style={[styles.container, style.centralizedContent]}>
            <Spinner color={StyleBase.header_color}/>
          </View>
        )
    )
  }

  sliderChanged(index) {
    this.setState({slideIndex: index});
    if((index + 1) == (10 * (this.props.currentIndex + 1))) {
      if (!this.props.loadingMore) {
        let nextId = this.props.currentIndex + 1;
        if(this.props.onLoadMore)
          this.props.onLoadMore(nextId);
      }
    }
  }
}

