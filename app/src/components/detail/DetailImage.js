import React from 'react';
import {TouchableOpacity, Image, ScrollView, View} from 'react-native';
import {Icon} from 'native-base';
import {style} from '../../styles/style';
import {ImageViewerModal} from '../common/ImageViewerModal'

export class DetailImage extends React.Component {
  state = {
    visible: false,
    selectedIndex: 0,
  };

  render() {
    return (
      <ScrollView horizontal >
        <View style={style.detailImageContainer}>
          {this.props.images && this.props.images.map((img, index) =>
            <TouchableOpacity key={index} activeOpacity={.8} onPress={() => this.showImage(index)}
                              style={{paddingRight: index < this.props.images.length ? 10 : 0}}>
              <Image style={style.detailImageItem} source={{uri: img.url || "https://avatars3.githubusercontent.com/u/20336495?v=4&s=460"}}/>
            </TouchableOpacity>
          )}
        </View>
        <ImageViewerModal visible={this.state.visible}
                          images={this.props.images}
                          selectedIndex={this.state.selectedIndex}
                          onClose={() => this.setState({visible: false})}
        />
      </ScrollView>
    )
  }

  showImage(index) {
    this.setState({
      visible: true,
      selectedIndex: index,
    });
  }
}