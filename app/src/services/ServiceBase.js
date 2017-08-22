import * as React from 'react';
import {appStore} from '../stores/AppStore';

export class ServiceBase {

  async  executeFetch(url, notJson) {
    try {
      let appState = appStore.getState();
      let result = await fetch(url, {
        headers: {
          'lang': appState.language,
          'city': appState.city,
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
      console.log(e);
    }
  }

  async executeFetchPost(url, data) {
    try {
      let appState = appStore.getState();
      let result = await await fetch(url,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'lang': appState.language,
            'city': appState.city,
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
      console.log(e);
    }
  }
}