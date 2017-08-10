import React from 'react';
import {BackHandler, ToastAndroid, Platform} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {SplashScreen} from './screens/SplashScreen';
import {HomeScreen} from './screens/HomeScreen';
import {ListScreen} from './screens/ListScreen';
import {DetailScreen} from './screens/DetailScreen';
import {Menu} from './components/menu/Menu'
import {MenuType, MenuListData} from './common/constain';
import {IndustryListScreen} from './screens/IndustryListScreen';
import {IndustryDetailScreen} from './screens/IndustryDetailScreen';
import {ReactMapDirection} from './components/map/ReactMapDirection';
import {NavigationActions} from 'react-navigation'

export function DNPageRoute(page) {
  let key = page.displayName || page['name'];
  return Object.keys(DNNavigatorConfig).filter(t => t == key)[0] || '';
}

export function DNNavigationAction(routeName, params) {
  return NavigationActions.navigate({
    routeName: routeName,
    params: params || {}
  });
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
  ReactMapDirection: {
    screen: ReactMapDirection
  },
};
let confirmTimeout;
export const DNNavigatorOptions = {
  initialRouteName: DNPageRoute(SplashScreen),
  headerMode: 'none',
  onTransitionStart: (transProps) => {

    if (transProps && transProps.scene && transProps.scene.route) {

      if (Platform.OS === 'android') {
        let existConfirmTime = 0;

        BackHandler.removeEventListener('hardwareBackPress');
        BackHandler.addEventListener('hardwareBackPress', () => {
          if (transProps.navigation.state.routes.length > 1) {
            transProps.navigation.goBack();
            existConfirmTime = 0;
            return true;
          }
          if (existConfirmTime < 2)
            existConfirmTime += 1;
          if (confirmTimeout) clearTimeout(confirmTimeout);
          confirmTimeout = setTimeout(() => {
            if (existConfirmTime > 0)
              existConfirmTime -= 1;
          }, 2000);
          if (existConfirmTime >= 2) {
            existConfirmTime = 0;
            BackHandler.exitApp();
            return false;
          }
          ToastAndroid.showWithGravity('Nhấn BACK lần nữa để thoát', 2000, ToastAndroid.BOTTOM);
          return true;
        });
      }
      let params;
      let listId = 0;
      let title = '';
      let currentList = {};
      switch (transProps.scene.route.routeName) {
        case propName(DNNavigatorConfig, DNNavigatorConfig.HomeScreen):
          Menu.instance.enableMenu();
          Menu.instance.handleNetInfo();
          Menu.instance.setType(MenuType.HomeScreen);
          Menu.instance.setTitle('');
          break;
        case propName(DNNavigatorConfig, DNNavigatorConfig.IndustryListScreen):
          Menu.instance.enableMenu();
          params = transProps.scene.route.params;
          listId = (params && params.listId) || 0;
          title = (params && params.categoryName) || '';
          Menu.instance.setTitle("");
          Menu.instance.enableMenu();
          Menu.instance.setType(MenuType.ListScreen);
          break;
        case propName(DNNavigatorConfig, DNNavigatorConfig.ListScreen):
          Menu.instance.enableMenu();
          params = transProps.scene.route.params;
          listId = (params && params.listId) || 0;
          title = (params && params.categoryName) || '';
          Menu.instance.setTitle("");
          Menu.instance.enableMenu();
          Menu.instance.setType(MenuType.ListScreen);
          break;
        case propName(DNNavigatorConfig, DNNavigatorConfig.ReactMapDirection):
          Menu.instance.enableMenu();
          Menu.instance.setType(MenuType.DetailScreen);
          Menu.instance.setTitle('');
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

function propName(prop, value) {
  for (let i in prop) {
    if (prop[i] == value) {
      return i;
    }
  }
  return false;
}

export const DNNavigator = StackNavigator(DNNavigatorConfig, DNNavigatorOptions);
