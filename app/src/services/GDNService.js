import {ServiceBase} from './ServiceBase';
import {timeout, MenuListData} from '../common/DummyData';
import {Helper, LanguageEnums, IconName} from '../common/constain';
import {appStore} from '../stores/AppStore';
class GDNService extends ServiceBase {
  host = "http://192.168.0.106:50915/";

  async getHomeSlider() {
    let url = this.host + "category/get-category-slider";
    let result = await super.executeFetch(url);
    if (result && result.length > 0) {
      let slider = [];
      for (let i = 0; i < result.length / 2; i++) {
        if(i * 2 + 1 < result.length) {
          slider.push({
            id: i,
            data: [
              {
                title: result[i * 2] ? result[i * 2].Title : "",
                subtitle: result[i * 2] ? result[i * 2].SubTitle : "",
                image: result[i * 2] ? result[i * 2].Url : Helper.ImageUrl,
                id: result[i * 2] ? result[i * 2].Id : 0,
              },
              {
                title: result[i * 2 + 1] ? result[i * 2 + 1].Title : "",
                subtitle: result[i * 2 + 1] ? result[i * 2 + 1].SubTitle : "",
                image: result[i * 2 + 1] ? result[i * 2 + 1].Url : Helper.ImageUrl,
                id: result[i * 2 + 1] ? result[i * 2 + 1].Id : 0,
              }
            ]
          });
        } else {
          slider.push({
            id: i,
            data: [
              {
                title: result[i * 2] ? result[i * 2].Title : "",
                subtitle: result[i * 2] ? result[i * 2].SubTitle : "",
                image: result[i * 2] ? result[i * 2].Url : Helper.ImageUrl,
                id: result[i * 2] ? result[i * 2].Id : 0,
              },
            ]
          });
        }
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
      for (let i = 0; i < result.length; i++) {
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

  async getListSlider(serviceId) {
    let url = this.host + "service/get-list-slider?serviceId="+ serviceId;
    let result = await super.executeFetch(url);
    if (result && result.length > 0) {
      let slider = [];
      for (let i = 0; i < result.length; i++) {
        slider.push({
          title: result[i] ? result[i].Title : "",
          subtitle: result[i] ? result[i].SubTitle : "",
          image: result[i] ? result[i].Url : Helper.ImageUrl,
          id: result[i] ? result[i].Id : 0,
        });
      }
      return slider;
    }
    return null;
  }

  async getMenuListPlace(serviceId) {
    let url = this.host + "service/get-list-data?serviceId=" + serviceId;
    let result = await super.executeFetch(url);

    if (result && result.length > 0) {
      let data = [];
      let currentLanguage = appStore.getState().language || LanguageEnums.English;
      for (let i = 0; i < result.length; i++) {
        let enLang = result[i].PlaceLanguages.filter(t => t.Language == currentLanguage)[0];
        if(enLang) {
          data.push({
            id: result[i] ? result[i].Id : 0,
            heroImage: enLang.Image ? enLang.Image.Url : Helper.ImageUrl,
            star: result[i].Rating || 0,
            title: enLang.Title,
            description: enLang.Description,
          });
        }
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
      data.open = result.OpenTime;
      data.close = result.CloseTime;
      data.city = result.City ? result.City.Name : "";
      data.district = result.District ? result.District.Name : "";
      data.images = result.PlaceLanguages[0].PlaceImages.map(x => {
        return {
          id: x.Id,
          url: x.Image.Url,
        };
      })

      return data;
    }
    return null;
  }

  async getMenuData() {

    let url = this.host + "category/get-all";
    let result = await super.executeFetch(url);
    if (result) {
      let rs = [];
      let currentLanguage = appStore.getState().language || LanguageEnums.English;
      rs = result.map(t => {
        let enLanguage = t.CategoryLanguages.filter(l => l.Language == currentLanguage)[0];
        return {
          id: t.Id,
          categoryName: enLanguage ? enLanguage.Title : '',
          categoryIcon: enLanguage && enLanguage.Icon ? enLanguage.Icon.Url : null,
          isNoService: !t.HTServices || t.HTServices.length == 0,
        }
      });
      return rs;
    }
  }

  async searchAllPlace(search) {

    let url = this.host + "place/gdn-search-place?search=" + search;
    let result = await super.executeFetch(url);
    if (result) {

      let rs = result.map(t => {
        return {
          id: t.Id,
          heroImage: t.CoverImage ? t.CoverImage.Url : Helper.ImageUrl,
          title: t.Title,
          address: t.Address + ', ' + t.District + ', ' + t.City,
          phone: t.Phone,
          phoeneIcon: IconName.Telephone,
        }
      });
      return rs;
    }
  }

  async getNearByPlaceById(Id: number) {
    let url = this.host + "place/get-nearby-place-by-id?id=" + Id;
    let result = await super.executeFetch(url);
    if (result && result.length > 0) {
      let data = [];
      for (var i = 0; i < result.length; i++) {
        data.push({
          id: result[i] ? result[i].Id : 0,
          heroImage: result[i].Image ? result[i].Image.Url : Helper.ImageUrl,
          title: result[i] ? result[i].Title : "",
          description: result[i].Description,
          star: result[i].Place.Rating,
          address: result[i].Place.Address,
          phone: result[i].Place.Phone,
          website: result[i].Place.Website,
          images: result[i].PlaceImages.map(x => {
            return {
              id: x.Id,
              url: x.Image.Url,
            };
          })
        });
      }
      return data;
    }
    return null;
  }

  async getCategoryById(Id) {
    let url = this.host + "category/get-category-by-id?id=" + Id;
    let result = await super.executeFetch(url);
    if (result) {
      let data = {};
      data.id = result.Id;
      data.categoryName = result.Name;
      data.categoryIcon = result.Icon;
      data.services = result.Items.map(x => {
        return {heroImage: x ? x.Url : null, title: x ? x.Title : "", id: x.Id};
      });
      return data;
    }
    return null;
  }

  async getCagegoryNoServiceById(id) {
    let url = this.host + "category/get-category-no-service-by-id?id=" + id;
    let result = await super.executeFetch(url);
    if (result) {
      let objectData = {};
      let data = [];
      let currentLanguage = appStore.getState().language || LanguageEnums.English;
      let d = result.Places.filter((p) => {
        let enPlace = p.PlaceLanguages.filter(l => l.Language == currentLanguage)[0];
        return !!enPlace

      });
      data = d.map((p) => {
        let enPlace = p.PlaceLanguages.filter(l => l.Language == currentLanguage)[0];
        return {
          id: p.Id,
          heroImage: enPlace.Image ? enPlace.Image.Url : Helper.ImageUrl,
          title: enPlace.Title,
          description: enPlace.Description,
        }
      });

      let cateLang = result.CategoryLanguages.filter(l => l.Language == currentLanguage )[0];

      objectData.id = result.Id;
      objectData.categoryName = cateLang ? cateLang.Title : '';
      objectData.data = data;

      return objectData;
    }
    return null;
  }

  async getAllCity() {
    let url = this.host + "city/get-all-city";
    return await super.executeFetch(url);
  }
}

const GDNServiceInstance = new GDNService();
export {GDNServiceInstance};