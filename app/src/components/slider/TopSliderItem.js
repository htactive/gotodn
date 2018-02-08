import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Card, CardItem, Body} from 'native-base';
import styles from '../../styles/slider-css';
import {Helper} from '../../common/constain';

export default class TopSliderItem extends React.Component {

  render() {
    const {title, subtitle, image, even} = this.props;

    return (
      <Card style={{margin: 10}} >
        <CardItem cardBody >
          <TouchableOpacity
            activeOpacity={0.7}
            style={[styles.slideInnerContainerList]}
            onPress={() => {

        }}
          >
            <View style={styles.imageContainer}>
              <View style={styles.imageInner}>
                <Image
                  source={{uri: image || Helper.ImageUrl}}
                  style={[styles.image,{justifyContent:'flex-end'}]}
                >
                  <View style={styles.textInnerList}>
                    <View style={this.props.textOuterStyle || styles.textListContain}>
                      <Text style={[styles.titleList, this.props.titleOuter]} numberOfLines={1}>{ title }</Text>
                      <Text style={[styles.subtitleList, this.props.subTitleOuter]}
                            numberOfLines={2}>{ subtitle }</Text>
                    </View>
                  </View>
                </Image>
              </View>
            </View>
          </TouchableOpacity>
        </CardItem>
      </Card>

    );
  }
}