import React from 'react';
import {ScrollView, View, TouchableHighlight, Switch, Text, AsyncStorage}  from 'react-native';
import {MenuListItem} from './MenuListItem';
import {style} from '../../styles/style';
import {Icon}  from 'native-base';
import {AppIcon, LanguageEnums, Helper} from '../../common/constain';
import {GDNServiceInstance} from '../../services/GDNService';
import {appStore} from '../../stores/AppStore';
import {LStrings} from '../../common/LocalizedStrings';
import {commonStore, CommonStoreActions} from '../../stores/CommonStore';

export class MenuList extends React.Component {
  state = {menuData: [], activeIndex: -1, isHelpActived: false, isAboutActived: false};

  unSubscribe;
  componentWillMount() {
    this.unSubscribe = appStore.subscribe(() => {
      this.loadData();
    });
    commonStore.subscribe(() => {
      let commonState = commonStore.getState();
      if(commonState.type == CommonStoreActions.ReloadData) {
        this.loadData();
      }
    });
  }

  componentDidMount() {
    (async () => {
      let menuData = await GDNServiceInstance.getMenuData();
      this.setState({
        menuData: menuData
      });
    })();
  }

  componentWillUnmount() {
    if (typeof this.unSubscribe === "function")
      this.unSubscribe();
  }

  loadData() {
    (async () => {
      let menuData = await GDNServiceInstance.getMenuData();
      this.setState({
        menuData: menuData
      });
    })();
  }

  render() {
    return (
      <ScrollView style={[style.size1, {backgroundColor: '#01589d'}]}>
        {this.state.menuData && this.state.menuData.map((menuD, index) =>
          <MenuListItem key={index} actived={index==this.state.activeIndex} itemText={menuD.categoryName}
                        itemIcon={menuD.categoryIcon} onItemClicked={() => {

                          this.setState({
                            activeIndex: index,
                            isHelpActived: false,
                            isAboutActived: false
                          });
                          if(this.props.onListItemClicked)
                            this.props.onListItemClicked(menuD.id, menuD.isNoService, menuD.categoryName);
                        }}/>
        )}
        {/*<MenuListItem itemText='Trợ giúp' actived={this.state.isHelpActived} system itemIcon={AppIcon.Help} onItemClicked={() => {*/}
          {/*this.setState({*/}
            {/*activeIndex: -1,*/}
            {/*isHelpActived: true,*/}
            {/*isAboutActived: false*/}
          {/*});*/}
          {/*this.props.onHelpClicked();*/}
        {/*}}/>*/}
        {/*<MenuListItem itemText='Về chúng tôi' system actived={this.state.isAboutActived} itemIcon={AppIcon.AppLogo}*/}
                      {/*onItemClicked={() => {*/}
                        {/*this.setState({*/}
                          {/*activeIndex: -1,*/}
                          {/*isHelpActived: false,*/}
                          {/*isAboutActived: true*/}
                        {/*});*/}
                        {/*this.props.onAboutUsClicked();*/}
                      {/*}}/>*/}
        <MenuListItem itemText={LStrings.FavoritePlace} system itemIcon={AppIcon.Favorite} onItemClicked={() => {
          this.props.onFavoriteClicked();
        }}/>
        <MenuListItem itemText={LStrings.Language} system itemIcon={AppIcon.Language} onItemClicked={() => {
          this.props.onLanguageClicked();
        }}/>
      </ScrollView>
    );
  }
}