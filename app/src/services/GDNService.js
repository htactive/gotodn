import {ServiceBase} from './ServiceBase';
import {timeout, MenuListData} from '../common/DummyData';

class GDNService extends ServiceBase {
  host = "http://192.168.1.113:50915/";

  async getHomeSlider() {
    let url = this.host + "category/get-category-slider";
    let result = await super.executeFetch(url);
    if (result && result.length > 0) {
      let slider = [];
      for (var i = 0; i < result.length / 2; i++) {
        slider.push({
          id: i,
          data: [
            {
              title: result[i * 2].Title,
              subtitle: result[i * 2].SubTitle,
              image: result[i * 2].Url,
              id: result[i * 2].Id,
            },
            {
              title: result[i * 2 + 1].Title,
              subtitle: result[i * 2 + 1].SubTitle,
              image: result[i * 2 + 1].Url,
              id: result[i * 2 + 1].Id,
            }
          ]
        });
      }
      return slider;
    }
    return null;
  }

  async getHomeMenuList() {
    await timeout(1500);
    return MenuListData;
  }
}

const GDNServiceInstance = new GDNService();
export {GDNServiceInstance};