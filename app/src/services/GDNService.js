import {ServiceBase} from './ServiceBase';
import {timeout, MenuListData} from '../common/DummyData';
import {Helper} from '../common/constain';
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
              title: result[i * 2] ? result[i * 2].Title : "",
              subtitle: result[i * 2] ? result[i * 2].SubTitle : "",
              image: result[i * 2] ? result[i * 2].Url : "https://image.ibb.co/dWMJtQ/ic_stay.png",
              id: result[i * 2] ? result[i * 2].Id : 0,
            },
            {
              title: result[i * 2 + 1] ? result[i * 2 + 1].Title : "",
              subtitle: result[i * 2 + 1] ? result[i * 2 + 1].SubTitle : "",
              image: result[i * 2 + 1] ? result[i * 2 + 1].Url : "https://image.ibb.co/dWMJtQ/ic_stay.png",
              id: result[i * 2 + 1] ? result[i * 2 + 1].Id : 0,
            }
          ]
        });
      }
      return slider;
    }
    return null;
  }

  async getHomeMenuList() {
    let url = this.host + "category/get-category-data";
    let result = await super.executeFetch(url);
    if (result && result.length > 0) {
      let data = [];
      for (var i = 0; i < result.length; i++) {
          data.push({
            id: result[i] ? result[i].Id : 0,
            categoryName: result[i] ? result[i].Name : "",
            categoryIcon: result[i] ? result[i].Icon : null,
            isNoService: result[i] && result[i].Items == null,
            services: result[i].Items ? result[i].Items.map(x => {
              return {heroImage: x ? x.Url : null, title: x ? x.Title : ""};
            }) : [
              {
                heroImage: result[i].Image,
                title: result[i].Name,
              }
            ],
          });
      }
      return data;
    }
    return null;
  }

  async getPlaceById(Id: number) {
    let url = this.host + "place/get-place-by-id?id=" + Id;
    let result = await super.executeFetch(url);
    if (result) {
      let data = {};
      data.id = result.Id;
      data.heroImage = result.PlaceLanguages[0].Image ? result.PlaceLanguages[0].Image.Url : Helper.ImageUrl;
      data.title = result.PlaceLanguages[0].Title;
      data.description = result.PlaceLanguages[0].Description;
      data.star = result.Rating;
      data.address = result.Address;
      data.phone = result.Phone;
      data.website = result.Website;


      return data;
    }
  }
}

const GDNServiceInstance = new GDNService();
export {GDNServiceInstance};