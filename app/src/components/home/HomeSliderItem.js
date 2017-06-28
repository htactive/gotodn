import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles, {itemWidth} from '../../styles/slider-css';
import {viewportHeight} from '../../common/constain';
import {DNPageRoute} from '../../NavigationHelper';
import {DetailScreen} from '../../screens/DetailScreen';

export default class HomeSliderItem extends React.Component {

  render() {
    const {title, subtitle, image, even} = this.props;

    return (

      <View style={{width: itemWidth, height: viewportHeight * 0.3 ,flexDirection: 'row'}}>
        {this.props.data && this.props.data.map((d, index) =>

          <View style={[styles.imageContainer,{marginHorizontal:5}]} key={index}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{flex:1}}
              onPress={() => {
this.props.navigation.navigate(DNPageRoute(DetailScreen), {itemId: d.id});
            }}
            >
              <View style={styles.imageInner}>
                <Image
                  source={{uri: d.image}}
                  style={[styles.image,{justifyContent:'flex-end'}]}
                >
                  <View style={styles.textInner}>
                    <View style={styles.textContain}>
                      <Text style={[styles.title]} numberOfLines={1}>{ d.title }</Text>
                      <Text style={[styles.subtitle]} numberOfLines={1}>{ d.subtitle }</Text>
                    </View>
                  </View>
                </Image>
              </View>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}