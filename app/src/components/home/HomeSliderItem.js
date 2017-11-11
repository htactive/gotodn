import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles, {itemWidth} from '../../styles/slider-css';
import {viewportHeight} from '../../common/constain';
import {DetailScreen} from '../../screens/DetailScreen';
import {navigationStore, navigateToRouteAction} from '../../stores/NavigationStore';

export default class HomeSliderItem extends React.Component {

  render() {
    return (
      <View style={{width: itemWidth, height: viewportHeight * 0.3 ,flexDirection: 'row'}}>
        {this.props.data && this.props.data.map((d, index) =>
          <View style={[styles.imageContainer,{marginHorizontal:5}]} key={index}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{flex:1}}
              onPress={() => {
                navigationStore.dispatch(navigateToRouteAction('DetailScreen',{itemId: d.id}));
            }}
            >
              <View style={styles.imageInner}>
                <Image
                  source={{uri: d.image || Helper.ImageUrl}}
                  style={[styles.image,{justifyContent:'flex-end'}]}
                >
                  <View style={styles.textInner}>
                    <View style={styles.textContain}>
                      <Text style={[styles.title]} numberOfLines={2}>{ d.title }</Text>
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