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

    iW = wp(40);
    sScale = .99;
    sOpacity = .99;
    slideItem = {marginHorizontal: 5};
    textOuter.push({
      backgroundColor: colors.white,
    });
    titleOuter = {color: '#455a64'};
    subTitleOuter={color: '#263238'};
    return (
      <View style={[styles.container,{paddingTop: 5}]}>
        <View style={styles.slideContainer}>
          <Carousel
            ref={(carousel) => { this.carousel = carousel; }}
            sliderWidth={sW}
            itemWidth={iW}
            firstItem={this.state.slideIndex}
            inactiveSlideScale={sScale}
            inactiveSlideOpacity={sOpacity}
            enableMomentum={false}
            scrollEndDragDebounceValue={1}
            containerCustomStyle={styles.slider}
            contentContainerCustomStyle={styles.sliderContainer}
            showsHorizontalScrollIndicator={false}
            removeClippedSubviews={false}
            onSnapToItem={(index) => this.setState({slideIndex: index})}
            swipeThreshold={50}
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
    title: 'Cuộc thi Marathon',
    subtitle: 'Cuộc thi là giải chạy Marathon chuyên nghiệp đầu tiên tại Việt Nam',
    image: 'https://goo.gl/rREKZ2',
    id: 8,
  },
  {
    title: 'Làng nghề bánh tráng Túy Loan',
    subtitle: 'Làng nghề bánh trang Túy Loan, xã Hòa Phong, huyện Hòa Vang nổi tiếng với nghề làm bánh tráng và mì Quảng.',
    image: 'https://goo.gl/5xQRBG',
    id: 8,
  },
  {
    title: 'Chùa Linh Ứng',
    subtitle: 'Chùa Linh Ứng Sơn Trà nằm tựa lưng vào đỉnh Sơn Trà vững chãi, được xem là ngôi chùa lớn nhất ở thành phố Đà Nẵng',
    image: 'https://goo.gl/5WveJi',
    id: 8,
  },
  {
    title: 'Biển Đà Nẵng',
    subtitle: 'Trải dài trên 60 km từ chân đèo Hải Vân đến Non Nước với nhiều bãi biển cát trắng mịn',
    image: 'https://goo.gl/oXyWaU',
    id: 8,
  },
  {
    title: 'Công viên Châu Á',
    subtitle: 'Trải rộng trên diện tích 868.694 m2 bên bờ Tây sông Hàn',
    image: 'https://goo.gl/dhzAiC'
  },
  {
    title: 'Khu tắm bùn Galina Đà Nẵng',
    subtitle: 'Galina Đà Nẵng Mud Bath & Spa là khu tắm bùn khoáng và spa đầu tiên bên bờ biển Đà Nẵng',
    image: 'http://i.imgur.com/lceHsT6l.jpg'
  }
];