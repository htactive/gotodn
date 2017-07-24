import React from 'react';
import {Modal, View, TouchableOpacity, Text, ScrollView} from 'react-native';
import {Icon, Button}  from 'native-base';
import {style, StyleBase} from '../../styles/style'
import {viewportWidth, viewportHeight} from '../../common/constain';

export class PickerModal extends React.Component {

  state = {
    visible: false,
    selectedItem: 0,
  };

  componentWillMount() {
    this.setState({
      visible: this.props.visible,
      selectedItem: this.props.selectedItem
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      visible: nextProps.visible,
      selectedItem: nextProps.selectedItem
    })
  }

  render() {
    return (

      <Modal animationType={"fade"}
             transparent={true}
             visible={this.state.visible}
             onRequestClose={() => {if(this.props.onCloseModal) this.props.onCloseModal();}}>
        <View style={[{flex:1,backgroundColor: 'rgba(0, 0, 0, .5)',}, style.centralizedContent]}>
          <View style={{
            backgroundColor: 'rgba(255, 255, 255, .9)',
            width: viewportWidth/1.5,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            borderRadius: 15,
            borderBottomWidth: 1,
            borderBottomColor: '#696d70',
            maxHeight: viewportHeight/1.5,
          }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: 50,
                position: 'relative',
                alignSelf: 'stretch'
              }}>
              <Button iconLeft transparent onPress={() => this.closeModal() } title={""}
                      style={{position: 'absolute',right: 0,top: 5 }}>
                <Icon name={'ios-close'} style={{color: '#6b6f72', fontSize: 40}}/>
              </Button>
              <Text numberOfLines={1} style={{
                  fontSize: 15,
                  fontFamily: StyleBase.sp_bold,
                  color: '#039be5'
                }}>
                {this.props.tilte && this.props.tilte.toUpperCase()}
              </Text>
            </View>
            <ScrollView style={{alignSelf: 'stretch',}}>
              {this.props.dataSource && this.props.dataSource.map((d, index) =>
                <TouchableOpacity style={{
                  alignSelf: 'stretch',
                }} key={index} onPress={() => { this.changeData(d)}}>
                  <View style={[{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: 50,
                    alignSelf: 'stretch',
                    padding: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: '#696d70',
                  },
                this.state.selectedItem.Id == d.Id ? {backgroundColor: 'rgba(187, 222, 251, .5)'} : {}]}>
                    <Text numberOfLines={1}
                          style={{  fontSize: 15, fontFamily: StyleBase.sp_regular, color: '#039be5'}}>
                      {d && d.Name && d.Name.toUpperCase()}
                    </Text>
                    <Icon name={ this.state.selectedItem.Id == d.Id ? 'ios-radio-button-on' : 'ios-radio-button-off'}
                          style={{color: '#039be5', fontSize: 35}}/>
                  </View>
                </TouchableOpacity>
              )}
            </ScrollView>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: 50,
                alignSelf: 'stretch',
              }}>
            </View>
          </View>
        </View>
      </Modal>

    )
  }

  closeModal() {
    this.setState({visible: false});
    if(this.props.onCloseModal) this.props.onCloseModal();
  }

  changeData(d) {
    this.setState({
      selectedItem: d,
    });
    if (this.props.onDataSelected)
      this.props.onDataSelected(d);
  }
}