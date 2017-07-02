import React from 'react';
import {View, ScrollView, Text, StatusBar, Image} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { wp, colors} from '../../styles/slider-css';
import HomeSliderItem from './HomeSliderItem'
import styles from '../../styles/slider-css';
import {Icon}  from 'native-base';
import {viewportWidth, SlideType, viewportHeight, AppIcon, platform} from '../../common/constain';
import {style} from '../../styles/style';

const slideHeight = viewportHeight * 0.3;
const slideWidth = wp(75);
const itemWidth = slideWidth + wp(1);

export default class HomeSlider extends React.Component {
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
    let sW = viewportWidth, iW = itemWidth, sScale = .9, sOpacity = 0.6;
    let sliders = this.state.sliders;
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
            enableMomentum={platform === 'ios'}
            scrollEndDragDebounceValue={1}
            carouselHorizontalPadding={0}
            containerCustomStyle={styles.slider}
            contentContainerCustomStyle={styles.sliderContainer}
            showsHorizontalScrollIndicator={false}
            removeClippedSubviews={false}
            onSnapToItem={(index) => this.setState({slideIndex: index})}
          >
            {sliders.map((slider, index) =>
              <HomeSliderItem
                navigation={this.props.navigation}
                key={index}
                {...slider}
              />
            )}
          </Carousel>
        </View>
        <View style={styles.dotContainer}>
          {sliders.map((slider, index) =>
            <Image key={index} source={ index == this.state.slideIndex ? AppIcon.EllipseActive : AppIcon.Ellipse}
                   style={[style.iconImgTini,{marginHorizontal: 5}]}/>
          )}
        </View>
        <View style={styles.titleSlideContainer}>
          <Text style={styles.slideTitle} numberOfLines={1}>{ this.props.title }</Text>
        </View>
      </View>
    )
  }

  sVScroll(event) {
    console.log(event);
  }
}

const SlideData = [
  {
    id: 1,
    data: [
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
    ]
  },
  {
    id: 2,
    data: [
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
    ]
  },
  {
    id: 3,
    data: [
      {
        title: 'Công viên Châu Á',
        subtitle: 'Trải rộng trên diện tích 868.694 m2 bên bờ Tây sông Hàn',
        image: 'https://goo.gl/dhzAiC',
        id: 8,
      },
      {
        title: 'Khu tắm bùn Galina Đà Nẵng',
        subtitle: 'Galina Đà Nẵng Mud Bath & Spa là khu tắm bùn khoáng và spa đầu tiên bên bờ biển Đà Nẵng',
        image: 'http://i.imgur.com/lceHsT6l.jpg',
        id: 8,
      }
    ]
  },
  {
    id: 4,
    data: [
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
    ]
  },
  {
    id: 5,
    data: [
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
    ]
  },
  {
    id: 6,
    data: [
      {
        title: 'Công viên Châu Á',
        subtitle: 'Trải rộng trên diện tích 868.694 m2 bên bờ Tây sông Hàn',
        image: 'https://goo.gl/dhzAiC',
        id: 8,
      },
      {
        title: 'Khu tắm bùn Galina Đà Nẵng',
        subtitle: 'Galina Đà Nẵng Mud Bath & Spa là khu tắm bùn khoáng và spa đầu tiên bên bờ biển Đà Nẵng',
        image: 'http://i.imgur.com/lceHsT6l.jpg',
        id: 8,
      }
    ]
  },

];