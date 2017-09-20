import {ServiceBase} from './ServiceBase';
import {timeout, MenuListData} from '../common/DummyData';
import {Helper, LanguageEnums} from '../common/constain';
import {appStore} from '../stores/AppStore';
class GDNService extends ServiceBase {
  host = "http://192.168.14.135:50915/";

  async getHomeSlider(index) {
    let url = this.host + "category/get-category-slider?index=" + index;
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
    let url = this.host + "service/get-list-slider?serviceId="+ serviceId+ "&index=" + index;
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
      let currentLanguage = appStore.getState().language;
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
      let currentLanguage = appStore.getState().language;
      let lang = result.PlaceLanguages.filter(l => l.Language == currentLanguage)[0];
      let data = {};
      data.id = result.Id;
      data.heroImage = lang && lang.Image ? lang.Image.Url : Helper.ImageUrl;
      data.title = lang ? lang.Title : null;
      data.description = lang ? lang.Description : null;
      data.star = result.Rating;
      data.address = result.Address;
      data.phone = result.Phone;
      data.website = result.Website;
      data.open = result.OpenTime;
      data.close = result.CloseTime;
      data.city = result.City ? result.City.Name : "";
      data.district = result.District ? result.District.Name : "";
      data.images = lang && lang.PlaceImages ? lang.PlaceImages.map(x => {
        return {
          id: x.Id,
          url: x.Image.Url,
        };
      }) : null;
      data.moreinfo =[];
      if(lang && lang.PlaceMoreInfo) {
        for (let i = 0; i < lang.PlaceMoreInfo.length; i++) {
          let placeInfo = lang.PlaceMoreInfo[i];
          let info = {};
          if(placeInfo.IsHalf) {
            info.isMulti = true;
            if(i < lang.PlaceMoreInfo.length - 1 && lang.PlaceMoreInfo[i + 1].IsHalf) {
              let placeInfo1 = lang.PlaceMoreInfo[i + 1];
              info.dataInfo = [{
                infoIcon: placeInfo.Icon ? placeInfo.Icon.Url : null,
                infoText: placeInfo.Name + ' : ' + placeInfo.Value,
              },{
                infoIcon: placeInfo1.Icon ? placeInfo1.Icon.Url : null,
                infoText: placeInfo1.Name + ' : ' + placeInfo1.Value,
              }];
              i++;
            } else {
              info.dataInfo = [{
                infoIcon: placeInfo.Icon ? placeInfo.Icon.Url : null,
                infoText: placeInfo.Name + ' : ' + placeInfo.Value,
              },null];
            }
          } else {
            info = {
              infoIcon: placeInfo.Icon ? placeInfo.Icon.Url : null,
              infoText: placeInfo.Name + ' : ' + placeInfo.Value,
            }
          }
          data.moreinfo.push(info);
        }
      }
      return data;
    }
    return null;
  }

  async getMenuData() {

    let url = this.host + "category/app-menu-get-all";
    let result = await super.executeFetch(url);
    if (result) {
      let rs = [];
      let currentLanguage = appStore.getState().language;
      rs = result.map(t => {
        let enLanguage = t.CategoryLanguages.filter(l => l.Language == currentLanguage)[0];
        let cateIcon = t.CategoryLanguages.filter(l => l.Language == LanguageEnums.English)[0];
        return {
          id: t.Id,
          categoryName: enLanguage ? enLanguage.Title : '',
          categoryIcon: cateIcon.Icon ? cateIcon.Icon.Url : null,
          isNoService: !t.HTServices || t.HTServices.length == 0,
        }
      });
      return rs;
    }
  }

  async searchAllPlace(search, index) {

    let url = this.host + "place/gdn-search-place?search=" + search + "&index=" + index;
    let result = await super.executeFetch(url);
    if (result) {

      let rs = result.map(t => {
        return {
          id: t.Id,
          heroImage: t.CoverImage ? t.CoverImage.Url : Helper.ImageUrl,
          title: t.Title || "",
          address: t.Address || "" + ', ' + t.District || "" + ', ' + t.City || "",
          phone: t.Phone || "",
        }
      });
      return rs;
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
          address: t.Address || "" + ', ' + t.District || "" + ', ' + t.City || "",
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
        data.push({
          id: result[i] ? result[i].PlaceId : 0,
          heroImage: result[i] && result[i].Image ? result[i].Image.Url : Helper.ImageUrl,
          title: result[i] ? result[i].Title : "",
          description: result[i] ? result[i].Description : "",
          star: result[i] ? result[i].Place.Rating : null,
          open: result[i] && result[i].Place.OpenTime,
          close: result[i] && result[i].Place.CloseTime,
          address: result[i] && result[i].Place.Address + ', ' +
          (result[i].Place.District ? result[i].Place.District.Name : '') + ', ' +
          (result[i].Place.City ? result[i].Place.City.Name : ''),
          phone: result[i] && result[i].Place.Phone,
          website: result[i] && result[i].Place.Website,
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

  async getCategoryNameById(Id) {
    let url = this.host + "category/get-category-name-by-id?id=" + Id;
    let result = await super.executeFetch(url, true);
    return result;
  }

  async getCagegoryNoServiceById(id, index) {
    let url = this.host + "category/get-category-no-service-by-id?id=" + id+ "&index=" + index;
    let result = await super.executeFetch(url);
    if (result) {
      let objectData = {};
      let data = [];
      let currentLanguage = appStore.getState().language;
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

      let cateLang = result.CategoryLanguages.filter(l => l.Language == currentLanguage )[0];

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
    let url = this.host + "/configuration/get-configuration";
    let result =  await super.executeFetch(url);
    if(result) {
      return result.NumOfScreenShowAd;
    }
    return 5;
  }
}

const GDNServiceInstance = new GDNService();
export {GDNServiceInstance};