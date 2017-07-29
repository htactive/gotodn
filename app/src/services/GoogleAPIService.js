import {ServiceBase} from './ServiceBase';

class GoogleAPIService extends ServiceBase {
  googleURL = 'https://maps.googleapis.com/maps/api/';
  key = 'AIzaSyCywwRaPWRhT1xRYsOk-Dw4PfC2uvbsaKQ';

  async searchNearBy(loc, range) {
    let url = this.googleURL + 'place/nearbysearch/json?location=' + loc + '&key=' + this.key + '&rankby=distance';
    return (await super.executeFetch(url)).results || [];
  }

  async getGPSByAddress(address, district, city) {
    let param = address + ',' + district + ',' + city;
    let url = this.googleURL + 'geocode/json?address=' + encodeURIComponent(param);
    let result = await super.executeFetch(url);
    if (result.results.length > 0)
      return {latitude: result.results[0].geometry.location.lat, longitude: result.results[0].geometry.location.lng};
    else
      return {};
  }

  getDirections(start, end) {
    return new Promise((resolve, reject) => {
      let url = 'https://maps.googleapis.com/maps/api/directions/json' +
        '?origin=' + start.latitude + ',' + start.longitude +
        '&destination=' + end.latitude + ',' + end.longitude +
        '&alternatives=true' +
        '&mode=driving' +
        '&key=' + this.key;
      fetch(url)
        .then((response) => {
          return response.json();
        }).then((json) => {
        resolve(json);
      }).catch((err) => {
        reject(err);
      });
    });
  }
}

const GoogleAPIServiceInstance = new GoogleAPIService();
export {GoogleAPIServiceInstance};