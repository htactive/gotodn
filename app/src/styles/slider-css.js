import {StyleSheet, Dimensions, Platform} from 'react-native';

const platform = Platform.OS;

export const colors = {
  black: '#1a1917',
  whiteGray: '#a8a8a8',
  white: '#fff',
  gray: '#a8a8a8',
  background1: '#00b140',
  background2: 'hsl(230, 30%, 45%)'
};

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = viewportHeight * 0.3;
const slideWidth = wp(40);
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
    flex: 8
  },
  dotContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  titleSlideContainer: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  slideInnerContainer: {
    width: itemWidth,
    height: slideHeight,
    //paddingHorizontal: 2,
    paddingBottom: 5 // needed for shadow
  },
  imageContainer: {
    flex: 1
  },
  imageInner: {
    flex: 7,
    backgroundColor: colors.white,

  },
  textInner: {
    flex: 3,
    backgroundColor: colors.white,

  },
  textContain: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: colors.gray,
    opacity: 0.8,
    borderBottomLeftRadius: entryBorderRadius,
    borderBottomRightRadius: entryBorderRadius
  },
  imageContainerEven: {
    backgroundColor: colors.gray
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    borderRadius: Platform.OS === 'ios' ? entryBorderRadius : 0,
    borderTopLeftRadius: entryBorderRadius,
    borderTopRightRadius: entryBorderRadius
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
    fontWeight: 'bold'
  },
  slideTitle: {
    color: '#039be5',
    fontSize: 16,
  },
  titleEven: {
    color: 'white'
  },
  subtitle: {
    color: colors.white,
    fontSize: 12
  },
  subtitleEven: {
    color: 'rgba(255, 255, 255, 0.7)'
  },
  slider: {
    marginBottom: 5
  },
  sliderContainer: {
    paddingHorizontal: 5
  }
});
