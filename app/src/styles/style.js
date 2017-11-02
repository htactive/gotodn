import {StyleSheet, Platform, Dimensions} from 'react-native';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');
const menuItemHeight = Math.round(viewportHeight / 6);
const menuItemHeaderHeight = Math.round(viewportHeight / 20);
const slideHeight = viewportHeight * 0.3;

export const StyleBase = {
  header_color: '#039be5',
  header_height: 70,
  sp_regular: 'SourceSansPro-Regular',
  sp_semibold: 'SourceSansPro-SemiBold',
  sp_bold: 'SourceSansPro-Bold',
  sp_light: 'SourceSansPro-Light',
  sp_italic: 'SourceSansPro-Italic',
};

export const style = StyleSheet.create({

  size1: {
    flex: 1
  },
  size2: {
    flex: 2
  },
  size3: {
    flex: 3
  },
  size4: {
    flex: 4
  },
  size5: {
    flex: 5
  },
  size6: {
    flex: 6
  },
  size7: {
    flex: 7
  },
  size8: {
    flex: 8
  },
  size9: {
    flex: 9
  },
  color_white: {
    color: 'white'
  },
  color_green: {
    color: '#00c853'
  },
  color_black: {
    color: 'black'
  },
  color_red: {
    color: 'red'
  },
  color_note: {
    color: '#868686'
  },
  color_item: {
    color: '#f5f7fa'
  },
  color_item_text: {
    color: '#515151'
  },
  //end color
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row',
    minHeight: Math.round(viewportHeight * 5 / 10),
  },

  image_fullscreen: {
    flex: 1,
    width: null,
    height: null
  },
  right_align: {
    position: 'absolute',
    right: 5
  },
  padded_left: {
    paddingLeft: 20
  },
  inline_row: {
    paddingTop: 5,
    flexDirection: 'row'
  },
  avatar: {
    borderWidth: 3,
    borderColor: '#ffffff'
  },
  avatar_button: {
    backgroundColor: '#868686',
    borderRadius: 50, width: 30,
    height: 30
  },
  avatar_button_icon: {
    fontSize: 15,
    color: 'white',
    paddingBottom: 3
  },
  avatar_button_position: {
    paddingTop: 40,
    right: 30
  },
  list_item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 50,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#679ac3'
  },
    containerHalf: {
    flex: 1,
    alignItems: 'flex-start',
    flexDirection: 'column',
    marginBottom: 5,
  },
  imageContainer: {
    flex: 1
  },
  imageInner: {
    flex: 1,
    backgroundColor: '#fff',

  },
  textInner: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
  },
  textContain: {
    paddingBottom: 1,
    paddingRight: 1,
    backgroundColor: 'rgba(168, 168, 168, .5)',
  },
  image: {
    resizeMode: 'cover',
    
    height: menuItemHeight
  },
  imageListSlider: {
    resizeMode: 'cover',
     
    justifyContent: 'flex-end',
    flex: 1,
    width: viewportWidth / 2.5,
    height: viewportHeight * 0.34 - 10,
  },
  textInnerListSlider: {
    height: 35,
  },
  textListSlider: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingBottom: 3,
    backgroundColor: 'rgba(255, 255, 255, .8)',
  },
  titleListSlider: {
    color: '#263238',
    fontSize: 14,
    fontFamily: StyleBase.sp_semibold,
  },
  subtitleListSlider: {
    color: '#263238',
    fontSize: 12,
    fontFamily: StyleBase.sp_light,
  },
  title: {
    color: '#ffffff',
    fontSize: 16,
    alignSelf: 'flex-end',
    fontFamily: StyleBase.sp_bold
  },
  menuItemHeader: {
    height: menuItemHeaderHeight,
    paddingBottom: 5,
    marginBottom: 10,
    flexDirection: 'row',
    alignSelf: 'stretch',
    borderBottomWidth: 1,
    borderBottomColor: '#78909c'
  },
  menuItem: {
    height: menuItemHeight,
    marginBottom: 10,
    alignSelf: 'stretch',
  },
  menuItemDetail: {
    paddingBottom: 10,
    alignSelf: 'stretch',
  },
  menuItemImage: {
    resizeMode: 'cover',
     
  },
  menuItemTitle: {
    color: '#263238',
    fontSize: 14,
    fontFamily: StyleBase.sp_semibold,
  },
  menuItemSubTitle: {
    color: '#263238',
    fontSize: 12,
    fontFamily: StyleBase.sp_regular,
  },
  menuItemTextContain: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingHorizontal: 3,
    opacity: 0.8,
    paddingTop: 10,
  },
  menuItemImageInner: {
    flex: 7,
  },
  menuItemTextInner: {
    flex: 3,
  },
  menuItemStar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingBottom: 5,
    paddingRight: 5,
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  sliderItemStar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingBottom: 5,
    paddingRight: 5,
    backgroundColor: 'rgba(0, 0, 0, 0)'
  },
  detailImage: {
    resizeMode: 'cover',
     
    height: Math.round(viewportHeight / 3.3),
  },
  detailImageActionInner: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  detailImageActionContain: {
    flexDirection: 'row',
    paddingBottom: 15,
    paddingRight: 15,
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  detailImageActionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, .8)',
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailContent: {
    padding: 10,
    backgroundColor: '#fff',
  },
  detailOverlay: {
    height: (viewportHeight * 0.7) / 2,
    position: 'absolute',
    flex: 1,
    alignItems: 'flex-end',
    backgroundColor: 'rgba(255,255,255,.8)',
    bottom: 0,
    left: 0,
    right: 0
  },
  detailItem: {
    height: ((viewportHeight * 0.7) / 2)/4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  detailMap: {
    height: viewportHeight / 1.8,
    flex: 1,
    marginTop: 30,
  },
  detailContentTitle: {
    color: '#263238',
    fontSize: 16,
    lineHeight: 25,
    paddingBottom: 20,
    textAlign: 'justify',
    fontFamily: StyleBase.sp_bold,
  },
  detailContentText: {
    fontSize: 14,
    color: '#263238',
    lineHeight: 20,
    textAlign: 'justify',
    fontFamily: StyleBase.sp_regular
  },
  detailInfoContainer: {
    flexDirection: 'column',
    backgroundColor: '#fff',
  },

  detailInfoItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#a6a6a6',
  },

  detailInfoText: {
    color: '#263238',
    textAlign: 'justify',
    fontSize: 14,
    fontFamily: StyleBase.sp_semibold
  },

  detailInfoAction: {
    color: '#039be5',
    textAlign: 'justify',
    fontSize: 15,
    fontFamily: StyleBase.regular
  },
  detailImageContainer: {
    flexDirection: 'row',
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  listSliderContainer: {
    flexDirection: 'row',
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
    flex:1,
  },
  homeSlider: {
    width: viewportWidth * .3 - 10,
    flex:1 ,
    justifyContent: 'center',
    alignItems: 'center',
    height:  viewportHeight * 0.33,
  },
  listSlider: {
    width: viewportWidth * .6 - 10,
    flex:1 ,
    justifyContent: 'center',
    alignItems: 'center',
    height:  viewportHeight * 0.34 - 10,
  },
  listSliderTitle: {
    color: '#039be5',
    fontSize: 18,
    fontFamily: StyleBase.sp_light,
  },
  slideContainer: {
    flex: 84,
  },
  detailImageItem: {
    resizeMode: 'cover',
     
    width: (viewportWidth - 50) / 3,
    height: (viewportWidth - 50) / 3,
    borderRadius: 5,
  },

  detailNearByTitle: {
    color: '#263238',
    textAlign: 'justify',
    fontSize: 15,
    fontFamily: StyleBase.sp_semibold
  },
  detailNearBySubTitle: {
    color: '#263238',
    textAlign: 'justify',
    fontSize: 12,
    fontFamily: StyleBase.sp_regular
  },
  detailNearByInfo: {
    color: '#263238',
    textAlign: 'justify',
    fontSize: 13,
    fontFamily: StyleBase.sp_semibold,
    paddingHorizontal: 5
  },
  nearPlaceTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
  nearPlaceTitleText: {
    color: '#263238',
    fontSize: 18,
    lineHeight: 25,
    textAlign: 'justify',
    fontFamily: StyleBase.sp_semibold,

  },
  menuLeft: {
    position: 'absolute',
    left: 5,
    top: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuRight: {
    position: 'absolute',
    right: 5,
    top: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  pickerLeft: {
    position: 'absolute',
    left: 60,
    top: 13,
    justifyContent: 'center',
    alignItems: 'center',
    width: viewportWidth / 2,
  },
  centralizedContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuTitleText: {
    fontFamily: StyleBase.sp_regular,
    fontSize: 15,
    color: '#fff',
    width: viewportWidth/2,
    paddingBottom:3,
    textAlign: 'center',
  },
  menuSearchTitle: {
    color: '#263238',
    textAlign: 'justify',
    fontSize: 16,
    fontFamily: StyleBase.sp_semibold
  },
  menuSearchInfo: {
    color: '#263238',
    textAlign: 'justify',
    fontSize: 13,
    fontFamily: StyleBase.sp_light
  },
  industryItemTitle: {
    color: '#263238',
    fontSize: 14,
    fontFamily: StyleBase.sp_semibold,

  },
  industryItemSubTitle: {
    color: '#263238',
    fontSize: 12,
    fontFamily: StyleBase.sp_regular,
    paddingTop: 5,
  },
  iconImgXl: {
    resizeMode: 'contain',
    width: 45,
    height: 45,
     
  },
  iconImgLg: {
    resizeMode: 'contain',
    width: 40,
    height: 40,
     
  },
  iconImg: {
    resizeMode: 'contain',
    width: 35,
    height: 35,
     
  },
  iconImgSm: {
    resizeMode: 'contain',
    width: 30,
    height: 30,
     
  },
  iconImgXs: {
    resizeMode: 'contain',
    width: 25,
    height: 25,
     
  },
  iconImgXxs: {
    resizeMode: 'contain',
    width: 20,
    height: 20,
     
  },
  iconImgSmall: {
    resizeMode: 'contain',
    width: 15,
    height: 15,
     
  },
  iconImgTini: {
    resizeMode: 'contain',
    width: 7,
    height: 7,
     
  },
  loadingMore: {
    position: 'absolute',
    left: 0,
    bottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,.3)',
    width: viewportWidth
  }
});

