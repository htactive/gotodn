import React from 'react';
import {Modal, View, TouchableOpacity, Text, ScrollView} from 'react-native';
import {Icon, Button}  from 'native-base';
import {style, StyleBase} from '../../styles/style'
import {viewportWidth, viewportHeight, platform} from '../../common/constain';

export class CityDropdown extends React.Component {

  state = {
    visible: false,
    selectedItem: 0,
  };

  cityScr;

  scrollIndex = 0;

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
    let data = this.props.dataSource || [];
    return (

      <Modal animationType={"fade"}
             transparent={true}
             visible={this.state.visible}
             onRequestClose={() => {
               if (this.props.onCloseModal) this.props.onCloseModal();
             }}>
        <View style={[{flex: 1, backgroundColor: 'rgba(0, 0, 0, 0)',}, style.centralizedContent]}>
          <View style={{
            position: 'absolute',
            top: platform === 'ios' ? 15 : 5, left: 55, bottom: 0, right: 0,
            backgroundColor: 'rgba(255, 255, 255, 1)',
            width: viewportWidth / 2,
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            borderRadius: 15,

            maxHeight: 201,
          }}>
            <TouchableOpacity
              style={[{
                    width: viewportWidth / 2,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'stretch',
                    height: 40,
                    padding: 10,
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                  }]}
              onPress={() => {
                          this.setState({visible: false})
                        }}
            >
              <View
                style={{
                        position: 'absolute', right: 5, top: 8,
                        justifyContent: 'center', alignItems: 'center', zIndex: 99
                      }}

              >
                <Icon name={'ios-arrow-up-outline'}
                      style={{color: '#2a363c', fontSize: 25, paddingHorizontal: 15}}/>
              </View>
              <Text numberOfLines={1} style={{
                        color: '#546e7a', fontFamily: StyleBase.sp_italic,
                        position: 'absolute', left: 5, top: 10,
                        fontSize: 15, paddingRight: 5
                      }}>GOTO</Text>
              <Text numberOfLines={1}
                    style={{fontSize: 15, fontFamily: StyleBase.sp_regular, color: '#546e7a',}}>
                {this.state.selectedItem && this.state.selectedItem.Name ? this.state.selectedItem.Name.toUpperCase() : ''}
              </Text>
            </TouchableOpacity>
            <ScrollView style={{alignSelf: 'stretch',}} ref={(scr) => this.cityScr = scr}
                        onScroll={(e) => {this.handleScrollBottom(e)}}>
              {data.map((d, index) =>
                <TouchableOpacity style={{}} key={index} onPress={() => {
                  this.changeData(d)
                }}>
                  <View style={[{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 40,
                    padding: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: '#b2b2b2',
                  },
                    index == 0 ? {borderTopWidth: 1, borderTopColor: '#b2b2b2',} : {},
                    this.state.selectedItem && this.state.selectedItem.Id == d.Id ? {backgroundColor: '#eeeeee'} : {}]}>
                    <Text numberOfLines={1}
                          style={{fontSize: 15, fontFamily: StyleBase.sp_regular, color: '#546e7a',}}>
                      {d && d.Name && d.Name.toUpperCase()}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            </ScrollView>
            <TouchableOpacity
              style={{ justifyContent: 'center', alignItems: 'center',alignSelf: 'stretch', }}
              onPress={() => this.scrollToNextCity()}>
              <View style={{
                      flexDirection: 'row',
                      justifyContent: 'center', alignItems: 'center',
                      height: 40,
                    }}>
                <Icon name={'ios-arrow-down-outline'}
                      style={{color: '#2a363c', fontSize: 25, paddingHorizontal: 15}}/>
              </View>
            </TouchableOpacity>
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

  handleScrollBottom(e) {
    let offset = e.nativeEvent.contentOffset.y;
    this.scrollIndex = Math.round(offset / 40);
  }

  scrollToNextCity() {
    if (this.props.dataSource && this.props.dataSource.length > (this.scrollIndex + 3)) {
      this.cityScr.scrollTo({y: (this.scrollIndex + 1) * 40, animated: true})
    }
  }
}