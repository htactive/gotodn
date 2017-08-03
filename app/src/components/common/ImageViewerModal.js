import React from 'react';
import {Modal, View, TouchableOpacity} from 'react-native';
import {Icon, Button}  from 'native-base';
import ImageViewer from 'react-native-image-zoom-viewer';

export class ImageViewerModal extends React.Component {
  state = {
    visible: false,
  };

  componentWillMount() {
    this.setState({
      visible: this.props.visible
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.visible
    })
  }

  render() {
    return (
      <Modal animationType={"fade"}
             visible={this.state.visible || false}
             transparent={true}
             onRequestClose={() => {if(this.props.onClose) this.props.onClose()}}>
        <ImageViewer
          imageUrls={this.props.images || "https://avatars3.githubusercontent.com/u/20336495?v=4&s=460"}
          index={this.props.selectedIndex}
          saveToLocalByLongPress={false}
        />
        <Button iconLeft transparent onPress={() => this.setState({visible: false}) } title={""}
                style={{position: 'absolute',left: 20,top: 30 }}>
          <Icon name={'ios-close'} style={{color: '#fff', fontSize: 35}}/>
        </Button>
      </Modal>
    )
  }
}