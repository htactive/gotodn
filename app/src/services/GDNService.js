import {ServiceBase} from './ServiceBase';
import {timeout,  MenuListData} from '../common/DummyData';

class GDNService extends ServiceBase {
  host = "http://192.168.1.113:50915/";

  async getHomeSlider() {
    let url = this.host + "category/get-category-slider";
    return (await super.executeFetch(url)) || [];
  }

  async getHomeMenuList() {
    await timeout(1500);
    return MenuListData;
  }
}

const GDNServiceInstance = new GDNService();
export {GDNServiceInstance};