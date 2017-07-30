import {StyleSheet, Dimensions, Platform} from 'react-native';
import {StyleBase} from './style';
import {viewportHeight, viewportWidth} from '../common/constain';

const platform = Platform.OS;

export const colors = {
  black: '#1a1917',
  whiteGray: '#a8a8a8',
  white: '#fff',
  gray: '#a8a8a8',
  background1: '#00b140',
  background2: 'hsl(230, 30%, 45%)'
};

export function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = viewportHeight * 0.3;
const slideWidth = wp(80);
const itemHorizontalMargin = wp(1);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin;

const entryBorderRadius = 4;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10
  },
  slideContainer: {
    flex: 86,
  },
  dotContainer: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  titleSlideContainer: {
    flex: 8,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  slideInnerContainer: {
    width: itemWidth,
    height: slideHeight,
    //paddingHorizontal: 2,
    paddingBottom: 2 // needed for shadow
  },
  slideInnerContainerList: {
    width: wp(38),
    height: slideHeight,
    //paddingHorizontal: 2,
    paddingBottom: 2, // needed for shadow
  },
  imageContainer: {
    flex: 1
  },
  imageInner: {
    flex: 1,
    backgroundColor: colors.white,

  },
  textInner: {
    height: slideHeight/4,
  },
  textInnerList: {
    height: slideHeight/3.5,
  },
  textContain: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  textListContain: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  imageContainerEven: {
    backgroundColor: colors.gray
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    borderRadius: Platform.OS === 'ios' ? entryBorderRadius : 0,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3
  },
  // image's border radius is buggy on ios; let's hack it!
  radiusMask: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: entryBorderRadius,
    backgroundColor: 'white'
  },
  radiusMaskEven: {
    backgroundColor: colors.black
  },
  textContainer: {
    justifyContent: 'center',
    paddingTop: 20 - entryBorderRadius,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    borderBottomLeftRadius: entryBorderRadius,
    borderBottomRightRadius: entryBorderRadius
  },
  textContainerEven: {
    backgroundColor: colors.black
  },
  title: {
    color: colors.white,
    fontSize: 14,
    fontFamily: StyleBase.sp_semibold,
  },
  titleList: {
    color: '#263238',
    fontSize: 14,
    fontFamily: StyleBase.sp_semibold,
  },
  slideTitle: {
    color: '#039be5',
    fontSize: 16,
    fontFamily: StyleBase.sp_light,
  },
  titleEven: {
    color: 'white'
  },
  subtitle: {
    color: colors.white,
    fontSize: 12,
    fontFamily: StyleBase.sp_light,
  },
  subtitleList: {
    color: '#263238',
    fontSize: 12,
    fontFamily: StyleBase.sp_light,
  },
  subtitleEven: {
    color: 'rgba(255, 255, 255, 0.7)'
  },
  slider: {
    marginBottom: 0
  },
  sliderContainer: {
    paddingHorizontal: 0
  }
});
