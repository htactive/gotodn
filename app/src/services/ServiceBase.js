import * as React from 'react';
import {AsyncStorage} from 'react-native';
import {Helper} from '../common/constain';
import {appStore} from '../stores/AppStore';

export class ServiceBase {

  async  executeFetch(url, notJson) {
    try {
      let language = await AsyncStorage.getItem(Helper.LanguageKey);
      let city = await AsyncStorage.getItem(Helper.CityKey);

      let result = await fetch(url, {
        headers: {
          'lang': language,
          'city': city,
        },
        method: 'GET',
        /**
         * make a fetch request with credentials such as cookies
         */
      });

      if (result.ok) {
        if(notJson) {
          return await result.text();
        } else {
          return await result.json();
        }
      }
      return null;
    }
    catch (e) {
    }
  }

  async executeFetchPost(url, data) {
    try {
      let language = await AsyncStorage.getItem(Helper.LanguageKey);
      let city = await AsyncStorage.getItem(Helper.CityKey);
      let result = await await fetch(url,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'lang': language,
            'city': city,
          },
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify(data)
        });

      if (result.ok) {
        return await result.json();
      }
      return null;
    }
    catch (e) {
    }
  }
}