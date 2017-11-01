import React from 'react';
import {BackHandler, ToastAndroid, Platform, AsyncStorage} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {SplashScreen} from './screens/SplashScreen';
import {HomeScreen} from './screens/HomeScreen';
import {ListScreen} from './screens/ListScreen';
import {DetailScreen} from './screens/DetailScreen';
import {Menu} from './components/menu/Menu'
import {MenuType} from './common/constain';
import {IndustryListScreen} from './screens/IndustryListScreen';
import {IndustryDetailScreen} from './screens/IndustryDetailScreen';
import {ReactMapDirection} from './components/map/ReactMapDirection';
import {FavoriteScreen} from './screens/FavoriteScreen';
import {NavigationActions} from 'react-navigation'
import {Helper} from './common/constain';
import {LStrings} from './common/LocalizedStrings';
import {commonStore, closeSearchBar, scrollTopDetail, CommonStoreActions} from './stores/CommonStore';
import {AdmobInterstitials} from './components/common/AdmobInterstitials';
import {appStore} from './stores/AppStore';
import {GDNServiceInstance} from './services/GDNService';

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
  FavoriteScreen: {
    screen: FavoriteScreen
  },
};
let categories = [];
commonStore.subscribe(() => {
  let commonState = commonStore.getState();
  if(commonState.type == CommonStoreActions.ReloadData) {
    (async () => {
      let numOfScreens = await GDNServiceInstance.getNumOfScreen();
      await AsyncStorage.setItem(Helper.AdsTimes, numOfScreens + '');
      transitionTime = 0;
    })();
  }
});

let confirmTimeout;
let transitionTime = 0;
export const DNNavigatorOptions = {
  initialRouteName: DNPageRoute(SplashScreen),
  headerMode: 'none',
  onTransitionStart: (transProps) => {

    if (transProps && transProps.scene && transProps.scene.route) {

      //Show Interstitial Ads
      if(transProps.scene.route.routeName != 'SplashScreen') {
        Menu.instance.setNavigation(transProps.navigation);
        transitionTime++;
        (async () => {
          let adsTime = await AsyncStorage.getItem(Helper.AdsTimes);
          if(adsTime && transitionTime == parseInt(adsTime)) {
            AdmobInterstitials.instance.showInterstitial();
            transitionTime = 0;
          }
        })();
      }

      //Handle Back on Android
      if (Platform.OS === 'android') {
        let existConfirmTime = 0;

        BackHandler.removeEventListener('hardwareBackPress');
        BackHandler.addEventListener('hardwareBackPress', () => {
          let showSearchBar = commonStore.getState().showSearchBar;
          if(showSearchBar) {
            commonStore.dispatch(closeSearchBar());
            return true;
          } else {
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
            ToastAndroid.showWithGravity(LStrings.ExitTitle, 2000, ToastAndroid.BOTTOM);
            return true;
          }
        });
      }

      let params;
      let listId = 0;
      let title = '';

      let category ;
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
          (async () => {
            await AsyncStorage.setItem(Helper.CurrentCategoryId, listId + '');
            title = await GDNServiceInstance.getCategoryNameById(listId);
            Menu.instance.setTitle(title);
          })();

          Menu.instance.enableMenu();
          Menu.instance.setType(MenuType.ListScreen);
          break;
        case propName(DNNavigatorConfig, DNNavigatorConfig.ListScreen):
          Menu.instance.enableMenu();
          params = transProps.scene.route.params;
          listId = (params && params.listId) || 0;
          (async () => {
            await AsyncStorage.setItem(Helper.CurrentCategoryId, listId + '');
            title = await GDNServiceInstance.getCategoryNameById(listId);
            Menu.instance.setTitle(title);
          })();

          Menu.instance.enableMenu();
          Menu.instance.setType(MenuType.ListScreen);
          break;
        case propName(DNNavigatorConfig, DNNavigatorConfig.ReactMapDirection):
          Menu.instance.enableMenu();
          Menu.instance.setType(MenuType.DetailScreen);
          Menu.instance.setTitle('');
          break;
        case propName(DNNavigatorConfig, DNNavigatorConfig.DetailScreen):
          commonStore.dispatch(scrollTopDetail());
          Menu.instance.enableMenu();
          Menu.instance.setType(MenuType.DetailScreen);
          Menu.instance.setTitle('');
          break;
        case propName(DNNavigatorConfig, DNNavigatorConfig.IndustryDetailScreen):
          Menu.instance.enableMenu();
          Menu.instance.setType(MenuType.DetailScreen);
          Menu.instance.setTitle('');
          break;
        case propName(DNNavigatorConfig, DNNavigatorConfig.FavoriteScreen):
          Menu.instance.enableMenu();
          Menu.instance.setType(MenuType.ListScreen);
          Menu.instance.setTitle(LStrings.FavoritePlace);
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

const prevGetStateForActionDNNavigator = DNNavigator.router.getStateForAction;
DNNavigator.router.getStateForAction = (action, state) => {

  if (state && action.type === 'ReplaceCurrentScreen') {
    const routes = state.routes.filter(r => r.routeName != action.routeName);
    routes.push(action);
    return {
      ...state,
      routes,
      index: routes.length - 1,
    };
  }
  if (state && action.type === 'GoHome') {
    const routes = state.routes.filter(r => r.routeName == action.routeName);
    return {
      ...state,
      routes,
      index: 0,
    };
  }
  return prevGetStateForActionDNNavigator(action, state);
};