import {AsyncStorage} from 'react-native';
import {ServiceBase} from './ServiceBase';
import {timeout} from '../common/DummyData';
import {Helper, LanguageEnums} from '../common/constain';
import {appStore} from '../stores/AppStore';
class GDNService extends ServiceBase {
  host = "http://gotodanang.com/";

  async getHomeSlider(index) {
    let url = this.host + "category/get-category-slider?index=" + index;
    let result = await super.executeFetch(url);
    if (result && result.length > 0) {
      let slider = [];
      for (let i = 0; i < result.length / 2; i++) {
        if (i * 2 + 1 < result.length) {
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
    if (result) {
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

  async getListSlider(serviceId, index) {
    let url = this.host + "service/get-list-slider?serviceId=" + serviceId + "&index=" + index;
    let result = await super.executeFetch(url);
    if (result && result.length > 0) {
      let slider = [];
      for (let i = 0; i < result.length; i++) {
        slider.push({
          title: result[i] ? result[i].Title : "",
          subtitle: result[i] ? result[i].SubTitle : "",
          image: result[i] ? result[i].Url : Helper.ImageUrl,
          id: result[i] ? result[i].Id : 0,
          star: result[i] ? result[i].Star : null,
        });
      }
      return slider;
    }
    return null;
  }

  async getMenuListPlace(serviceId, index) {
    let url = this.host + "service/get-list-data?serviceId=" + serviceId + "&index=" + index;
    let result = await super.executeFetch(url);

    if (result && result.length > 0) {
      let data = [];
      for (let i = 0; i < result.length; i++) {
        data.push({
          id: result[i] ? result[i].Id : 0,
          heroImage: result[i].ImageUrl || Helper.ImageUrl,
          star: result[i].Star || 0,
          title: result[i].Title || '',
          description: result[i].Description || '',
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
      data.heroImage = result.ImageUrl || Helper.ImageUrl;
      data.title = result.Title || null;
      data.description = result.Description || null;
      data.star = result.Star || 0;
      data.address = result.Address;
      data.phone = result.Phone;
      data.website = result.Website;
      data.open = result.OpenTime;
      data.close = result.CloseTime;
      data.city = result.City;
      data.district = result.District;
      data.images = [];
      data.moreinfo = [];
      return data;
    }
    return null;
  }

  async getPlaceImagesById(Id: number) {
    let url = this.host + "place/app-get-place-images-by-id?id=" + Id;
    let result = await super.executeFetch(url);
    if (result) {
      let data = [];
      data = result.map(x => {
        return {
          id: x.Id,
          url: x.ImageUrl,
        };
      });
      return data;
    }
    return null;
  }

  async getPlaceInfoById(Id: number) {
    let url = this.host + "place/app-get-place-info-by-id?id=" + Id;
    let result = await super.executeFetch(url);
    if (result) {
      let moreInfo = [];
      for (let i = 0; i < result.length; i++) {
        let placeInfo = result[i];
        let info = {};
        if (placeInfo.IsHalf) {
          info.isMulti = true;
          if (i < result.length - 1 && result[i + 1].IsHalf) {
            let placeInfo1 = result[i + 1];
            info.dataInfo = [{
              infoIcon: placeInfo.Icon ? placeInfo.Icon.Url : null,
              infoText: placeInfo.Name + ' : ' + placeInfo.Value,
            }, {
              infoIcon: placeInfo1.Icon ? placeInfo1.Icon.Url : null,
              infoText: placeInfo1.Name + ' : ' + placeInfo1.Value,
            }];
            i++;
          } else {
            info.dataInfo = [{
              infoIcon: placeInfo.Icon ? placeInfo.Icon.Url : null,
              infoText: placeInfo.Name + ' : ' + placeInfo.Value,
            }, null];
          }
        } else {
          info = {
            infoIcon: placeInfo.Icon ? placeInfo.Icon.Url : null,
            infoText: placeInfo.Name + ' : ' + placeInfo.Value,
          }
        }
        moreInfo.push(info);
      }
      return moreInfo;
    }

    return null;
  }

  async getMenuData() {

    let url = this.host + "category/app-menu-get-all";
    let result = await super.executeFetch(url);
    if (result) {
      let rs = [];
      rs = result.map(t => {
        return {
          id: t.Id,
          categoryName: t.Name || '',
          categoryIcon: t.IconUrl || null,
          isNoService: t.IsNoService,
        }
      });
      return rs;
    }
  }

  async searchAllPlace(search, index) {

    let url = this.host + "place/gdn-search-place?search=" + search + "&index=" + index;
    let result = await super.executeFetch(url);
    if (result) {

      return result.map(t => {
        return {
          id: t.Id,
          heroImage: t.CoverImage ? t.CoverImage.Url : Helper.ImageUrl,
          title: t.Title || "",
          address: Helper.getAndress(t.Address, t.District),
          phone: t.Phone || "",
        }
      });
    }
  }

  async getFavoritePlaces(favoriteIdStr) {

    let url = this.host + "place/gdn-get-favorite?favoriteIdStr=" + favoriteIdStr;
    let result = await super.executeFetch(url);
    if (result) {

      let rs = result.map(t => {
        return {
          id: t.Id,
          heroImage: t.CoverImage ? t.CoverImage.Url : Helper.ImageUrl,
          title: t.Title || "",
          address: Helper.getAndress(t.Address, t.District),
          phone: t.Phone || "",
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
      for (let i = 0; i < result.length; i++) {
        if (result[i]) {
          data.push({
            id: result[i].Id || 0,
            heroImage: result[i].ImageUrl || Helper.ImageUrl,
            title: result[i].Title || "",
            description: result[i].Description || "",
            open: result[i].OpenTime,
            close: result[i].CloseTime,
            address: Helper.getAndress(result[i].Address, result[i].District),
            phone: result[i].Phone
          });
        }
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

  async getCategoryNameById(Id) {
    let url = this.host + "category/get-category-name-by-id?id=" + Id;
    let result = await super.executeFetch(url, true);
    return result;
  }

  async getCagegoryNoServiceById(id, index) {
    let url = this.host + "category/get-category-no-service-by-id?id=" + id + "&index=" + index;
    let result = await super.executeFetch(url);
    if (result) {
      let objectData = {};
      let data = [];
      let currentLanguage = await AsyncStorage.getItem(Helper.LanguageKey);
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
          isDistrictGovernment: p.IsDistrictGovernment,
        }
      });

      let cateLang = result.CategoryLanguages.filter(l => l.Language == currentLanguage)[0];

      objectData.id = result.Id;
      objectData.categoryName = cateLang ? cateLang.Title : '';
      objectData.data = data;
      objectData.isGovernment = result.IsGovernment;

      return objectData;
    }
    return null;
  }

  async getAllCity() {
    let url = this.host + "city/get-all-city";
    return await super.executeFetch(url);
  }

  async convertUrlToBase64(imageUrl) {
    let url = this.host + "image/conver-url-to-base64?url=" + imageUrl;
    return await super.executeFetch(url, true);
  }

  async getNumOfScreen() {
    let url = this.host + "configuration/get-configuration";
    let result = await super.executeFetch(url);
    if (result) {
      return result.NumOfScreenShowAd;
    }
    return 5;
  }
}

const GDNServiceInstance = new GDNService();
export {GDNServiceInstance};