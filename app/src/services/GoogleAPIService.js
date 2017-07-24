import {ServiceBase} from './ServiceBase';

export class GoogleAPIService extends ServiceBase {
  static googleURL = 'https://maps.googleapis.com/maps/api/';
  static key = 'AIzaSyCywwRaPWRhT1xRYsOk-Dw4PfC2uvbsaKQ';

  static async searchNearBy(loc, range) {
    let url = this.googleURL + 'place/nearbysearch/json?location=' + loc + '&key=' + this.key + '&rankby=distance';
    return (await super.executeFetch(url)).results || [];
  }

  static getDirections(start, end) {
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