import {UIBlocker} from '../commons/ui-blocker';
export class ServiceBase {
  protected async executeFetch(url, shouldBlockUI = false): Promise<any> {
    try {
      if(!UIBlocker || !UIBlocker.instance){
        shouldBlockUI=false;
      }
      if (shouldBlockUI) {
        UIBlocker.instance.block();
      }
      let result = await fetch(url, {
        headers: {
          'auth': localStorage.getItem("user_token") + ""
        },
        method: 'GET',
        /**
         * make a fetch request with credentials such as cookies
         */
        credentials: 'include'
      });
      if (shouldBlockUI) {
        UIBlocker.instance.unblock();
      }
      if (result.ok) {
        return await result.json();
      }
      if (result.status == 401) {
        throw 401;
      }
      return null;
    }
    catch (e) {
      if(e==401){
        throw e;
      }
    }
  }

  protected async executeFetchPost(url, data, shouldBlockUI = true): Promise<any> {
    try {
      if(!UIBlocker || !UIBlocker.instance){
        shouldBlockUI=false;
      }
      if (shouldBlockUI) {
        UIBlocker.instance.block();
      }
      let result = await fetch(url,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'auth': localStorage.getItem("user_token") + ""
          },
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify(data)
        });

      if (shouldBlockUI) {
        UIBlocker.instance.unblock();
      }
      if (result.ok) {
        return await result.json();
      }
      if (result.status == 401) {
        throw 401;
      }
      return null;
    }
    catch (e) {
      if(e==401){
        throw e;
      }
    }
  }

  protected async executeFetchPostImage(url, image, shouldBlockUI = true): Promise<any> {
    try {
      if(!UIBlocker || !UIBlocker.instance){
        shouldBlockUI=false;
      }

      if (shouldBlockUI) {
        UIBlocker.instance.block();
      }
      const formData = new FormData();
      formData.append('file', image);
      let result = await fetch(url,
        {
          headers: {
            'auth': localStorage.getItem("user_token") + ""
          },
          method: 'POST',
          credentials: 'include',
          body: formData
        });

      if (shouldBlockUI) {
        UIBlocker.instance.unblock();
      }
      if (result.ok) {
        return await result.json();
      }
      if (result.status == 401) {
        throw 401;
      }
      return null;
    }
    catch (e) {
      if(e==401){
        throw e;
      }
    }
  }

  protected async executeFetchPostImages(url, images, shouldBlockUI = true): Promise<any> {
    try {
      if(!UIBlocker || !UIBlocker.instance){
        shouldBlockUI=false;
      }

      if (shouldBlockUI) {
        UIBlocker.instance.block();
      }
      const formData = new FormData();
      for (let i = 0; i < images.length ; i++) {
        formData.append(images[i].name, images[i]);
      }
      let result = await fetch(url,
        {
          headers: {
            'auth': localStorage.getItem("user_token") + ""
          },
          method: 'POST',
          credentials: 'include',
          body: formData
        });

      if (shouldBlockUI) {
        UIBlocker.instance.unblock();
      }
      if (result.ok) {
        return await result.json();
      }
      if (result.status == 401) {
        throw 401;
      }
      return null;
    }
    catch (e) {
      if(e==401){
        throw e;
      }
    }
  }
}