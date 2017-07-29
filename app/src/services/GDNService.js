import {ServiceBase} from './ServiceBase';
import {timeout, MenuListData} from '../common/DummyData';
import {Helper,LanguageEnums} from '../common/constain';
class GDNService extends ServiceBase {
  host = "http://192.168.1.30:50915/";

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
    let url = this.host + "place/app-get-place-by-id?id=" + Id;
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
      data.images = result.PlaceLanguages[0].PlaceImages.map(x => {return {
        id: x.Id,
        url: x.Image.Url,
      };});

      return data;
    }
  }

  async getMenuData() {

    let url = this.host + "category/get-all";
    let result = await super.executeFetch(url);
    if (result) {
      let rs = [];
      rs = result.map(t => {
        let enLanguage = t.CategoryLanguages.filter(l => l.Language == LanguageEnums.English)[0];
        return {
          id: result.Id,
          categoryName: enLanguage ? enLanguage.Title : '',
          categoryIcon: enLanguage && enLanguage.Icon ? enLanguage.Icon.Url : null,
          isNoService: !t.HTServices || t.HTServices.length == 0,
        }
      });
      return rs;
    }
  }
}

const GDNServiceInstance = new GDNService();
export {GDNServiceInstance};