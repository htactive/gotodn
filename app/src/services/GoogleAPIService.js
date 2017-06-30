import {ServiceBase} from './ServiceBase';

export class GoogleAPIService extends ServiceBase {
  private googleURL: string = 'https://maps.googleapis.com/maps/api/';
  private key: string = 'AIzaSyCywwRaPWRhT1xRYsOk-Dw4PfC2uvbsaKQ';

  async searchNearBy(loc: string, range?: number): Promise<boolean> {
    let url = this.googleURL + 'place/nearbysearch/json?location=' + loc + '&key=' + this.key + '&rankby=distance';
    return (await super.executeFetch(url)).results || [];
  }

  getDirections(start: any, end: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let url = 'https://maps.googleapis.com/maps/api/directions/json?origin=' + start.latitude + ',' + start.longitude + '&destination=' + end.latitude + ',' + end.longitude + '&key=' + this.key;
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