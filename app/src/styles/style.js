import {StyleSheet, Platform, Dimensions} from 'react-native';

const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');
const menuItemHeight = Math.round(viewportHeight / 6);
const menuItemHeaderHeight = Math.round(viewportHeight / 25);

export const StyleBase = {
  header_color: '#039be5',
  header_height: 70,
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
    flex: 8,
    backgroundColor: '#fff',

  },
  textInner: {
    flex: 2,
    backgroundColor: '#fff',

  },
  textContain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 3,
    backgroundColor: '#a8a8a8',
    opacity: 0.8,
  },
  image: {
    resizeMode: 'cover',
    height: Math.round(menuItemHeight * 8 / 10)
  },
  title: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold'
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
    paddingBottom: 10,
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
    color: '#455a64',
    fontSize: 14,
    fontWeight: 'bold',
  },
  menuItemSubTitle: {
    color: '#263238',
    fontSize: 12,
  },
  menuItemTextContain: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 3,
    opacity: 0.8,
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
  }
});

