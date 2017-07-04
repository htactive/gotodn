import React from 'react';
import {Modal, View, TouchableOpacity, Text, ScrollView} from 'react-native';
import {Icon, Button}  from 'native-base';
import {style, StyleBase} from '../../styles/style'
import {viewportWidth, viewportHeight,platform} from '../../common/constain';

export class CityDropdown extends React.Component {

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
        <View style={[{flex:1,backgroundColor: 'rgba(0, 0, 0, 0)',}, style.centralizedContent]}>
          <View style={{
            position:'absolute',
            top: platform  === 'ios' ? 15 : 5, left: 55, bottom: 0, right:0,
            backgroundColor: 'rgba(255, 255, 255, 1)',
            width: viewportWidth/2,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            borderRadius: 15,
            borderBottomWidth: 1,
            borderBottomColor: '#696d70',
            maxHeight: 201,
          }}>
            <ScrollView style={{alignSelf: 'stretch',}}>
              {this.props.dataSource && this.props.dataSource.map((d, index) =>
                <TouchableOpacity style={{
                }} key={index} onPress={() => { this.changeData(d)}}>
                  <View style={[{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 40,
                    padding: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: '#b2b2b2',
                  },
                  index == 0 && {borderTopLeftRadius: 15, borderTopRightRadius: 15},
                this.state.selectedItem.Id == d.Id ? {backgroundColor: '#eeeeee'} : {}]}>
                    <Text numberOfLines={1}
                          style={{  fontSize: 15, fontFamily: StyleBase.sp_regular, color: '#546e7a',}}>
                      {d && d.Name && d.Name.toUpperCase()}
                    </Text>
                    {index == 0 && (
                      <TouchableOpacity style={{ position: 'absolute', right: 5, top: 10,
                                        justifyContent:'center',alignItems:'center', zIndex:99}}
                                        onPress={() => { this.setState({visible: false}) }}>
                        <Icon name={'ios-arrow-up-outline'} style={{color: '#2a363c', fontSize: 20, paddingHorizontal: 15}}/>
                      </TouchableOpacity>
                    )}
                    {index == 0 && (
                      <Text numberOfLines={1} style={{
                        color:'#546e7a', fontFamily: StyleBase.sp_italic,
                        position: 'absolute', left: 5, top: 10,
                        fontSize: 15, paddingRight:5}}>ĐI ĐẾN</Text>
                    )}
                  </View>
                </TouchableOpacity>
              )}
            </ScrollView>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: 40,
                alignSelf: 'stretch',
              }}>
            </View>
          </View>
        </View>
      </Modal>

    )
  }



  changeData(d) {
    this.setState({
      selectedItem: d,
    });
    if (this.props.onDataSelected)
      this.props.onDataSelected(d);
  }
}