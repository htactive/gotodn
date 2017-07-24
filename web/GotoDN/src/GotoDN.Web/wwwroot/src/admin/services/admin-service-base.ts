import {ServiceBase} from "../../commons/ServiceBase";
import {AdminRoutePath} from "../../commons/constant";

function default401Callback() {
  window.location.href = AdminRoutePath.Error403Page;
}
export class AdminServiceBase extends ServiceBase {
  protected async executeFetch(url, shouldBlockUI = false, _401Callback?: () => void): Promise<any> {
    try {
      return await super.executeFetch(url, shouldBlockUI);
    }
    catch (e) {
      if (e === 401) {
        _401Callback = _401Callback || default401Callback;
        _401Callback();
      }
    }
  }

  protected async executeFetchPost(url, data, shouldBlockUI = true, _401Callback?: () => void): Promise<any> {
    try {
      return await super.executeFetchPost(url, data, shouldBlockUI);
    }
    catch (e) {

      if (e === 401) {
        _401Callback = _401Callback || default401Callback;
        _401Callback();
      }
    }
  }

  protected async executeFetchPostImage(url, image, shouldBlockUI = true, _401Callback?: () => void): Promise<any> {
    try {
      return await super.executeFetchPostImage(url, image, shouldBlockUI);
    }
    catch (e) {

      if (e === 401) {
        _401Callback = _401Callback || default401Callback;
        _401Callback();
      }
    }
  }
}