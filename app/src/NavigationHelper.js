import React from 'react';
import {StackNavigator} from 'react-navigation';
import {SplashScreen} from './screens/SplashScreen';
import {HomeScreen} from './screens/HomeScreen';
import {ListScreen} from './screens/ListScreen';
import {DetailScreen} from './screens/DetailScreen';
import {Menu} from './components/menu/Menu'
import {MenuType, MenuListData} from './common/constain';
import {IndustryListScreen} from './screens/IndustryListScreen';
import {IndustryDetailScreen} from './screens/IndustryDetailScreen';

export function DNPageRoute(page) {
  let key = page.displayName || page['name'];
  return Object.keys(DNNavigatorConfig).filter(t => t == key)[0] || '';
}

export const DNNavigatorConfig = {
  SplashScreen: {
    screen: SplashScreen
  },
  HomeScreen: {
    screen: HomeScreen
  },
  ListScreen: {
    screen: ListScreen
  },
  DetailScreen: {
    screen: DetailScreen
  },
  IndustryListScreen: {
    screen: IndustryListScreen
  },
  IndustryDetailScreen: {
    screen: IndustryDetailScreen
  },
};

export const DNNavigatorOptions = {
  initialRouteName: DNPageRoute(HomeScreen),
  headerMode: 'none',
  onTransitionStart: (transProps) => {
    if(transProps && transProps.scene && transProps.scene.route)
    {
      let params ;
      let listId = 0;
      let currentList = {};
      switch (transProps.scene.route.routeName) {
        case propName(DNNavigatorConfig, DNNavigatorConfig.HomeScreen):
          Menu.instance.enableMenu();
          Menu.instance.setType(MenuType.HomeScreen);
          Menu.instance.setTitle('');
          break;
        case propName(DNNavigatorConfig, DNNavigatorConfig.IndustryListScreen):
          Menu.instance.enableMenu();
          params = transProps.scene.route.params;
          listId = (params && params.listId) || 0;
          currentList = MenuListData.filter(t => t.id == listId)[0];
          Menu.instance.setTitle(currentList.categoryName);
          Menu.instance.enableMenu();
          Menu.instance.setType(MenuType.ListScreen);
          break;
        case propName(DNNavigatorConfig, DNNavigatorConfig.ListScreen):
          Menu.instance.enableMenu();
          let params = transProps.scene.route.params;
          let listId = (params && params.listId) || 0;
          let currentList = MenuListData.filter(t => t.id == listId)[0];
          Menu.instance.setTitle(currentList.categoryName);
          Menu.instance.enableMenu();
          Menu.instance.setType(MenuType.ListScreen);
          break;
        case propName(DNNavigatorConfig, DNNavigatorConfig.DetailScreen):
          Menu.instance.enableMenu();
          Menu.instance.setType(MenuType.DetailScreen);
          Menu.instance.setTitle('');
          break;
        case propName(DNNavigatorConfig, DNNavigatorConfig.IndustryDetailScreen):
          Menu.instance.enableMenu();
          Menu.instance.setType(MenuType.DetailScreen);
          Menu.instance.setTitle('');
          break;
        case propName(DNNavigatorConfig, DNNavigatorConfig.SplashScreen):
          Menu.instance.disableMenu();
          Menu.instance.setTitle('');
          break;
        default:
          Menu.instance.enableMenu();
          Menu.instance.setType(MenuType.HomeScreen);
          Menu.instance.setTitle('');
          break;
      }
    }
  },
};

function propName(prop, value){
  for(let i in prop) {
    if (prop[i] == value){
      return i;
    }
  }
  return false;
}

export const DNNavigator = StackNavigator(DNNavigatorConfig,DNNavigatorOptions);
