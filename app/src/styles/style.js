import { StyleSheet} from 'react-native';

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
  color_red:{
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
    alignItems: 'center',
    justifyContent: 'center',
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
    borderBottomColor: '#f5f7fa'
  }
});

