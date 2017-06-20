import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from '../../styles/slider-css';

export default class TopSliderItem extends React.Component {

  render() {
    const {title, subtitle, image, even} = this.props;

    const uppercaseTitle = title ? (
        <Text style={[styles.title, even ? styles.titleEven : {}]} numberOfLines={2}>{ title.toUpperCase() }</Text>
      ) : false;

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.slideInnerContainer}
        onPress={() => {

        }}
      >
        <View style={styles.imageContainer}>
          <View style={styles.imageInner}>
            <Image
              source={{uri: image}}
              style={styles.image}
            />
          </View>
          <View style={styles.textInner}>
            <View style={styles.textContain}>
              <Text style={styles.title} numberOfLines={1}>{ title }</Text>
              <Text style={styles.subtitle} numberOfLines={1}>{ subtitle }</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}