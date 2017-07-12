import {ServiceBase} from './ServiceBase';
import {timeout, SliderData, MenuListData} from '../common/DummyData';

export class GDNService extends ServiceBase {
  static async getHomeSlider() {
    await timeout(1000);
    return SliderData;
  }

  static async getHomeMenuList() {
    await timeout(1500);
    return MenuListData;
  }
}