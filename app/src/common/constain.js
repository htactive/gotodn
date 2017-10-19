import {Platform, Dimensions} from 'react-native';
import map from './characterMap';

export const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');
export const platform = Platform.OS;

export const SlideType = {
  HomeScreen: 1,
  ListScreen: 2,
};

export const MenuType = {
  HomeScreen: 1,
  ListScreen: 2,
  DetailScreen: 3,
  FavoriteScreen: 4,
};



export const AppIcon = {
  AppLogo: require('../../assets/icons/ic-goto.png'),
  AppLogoBig: require('../../assets/icons/ic-goto-big.png'),
  Share: require('../../assets/icons/ic-share.png'),
  Favorite: require('../../assets/icons/ic-favorite.png'),
  // Shutdown: require('../../assets/icons/shutdown.png'),
  // Setting: require('../../assets/icons/setting.png'),
  Language: require('../../assets/icons/ic-language.png'),
  Ellipse: require('../../assets/icons/ellipse.png'),
  EllipseActive: require('../../assets/icons/ellipse_active.png'),
  Menu: require('../../assets/icons/ic-menu.png'),
  Search: require('../../assets/icons/ic-search.png'),
  Help: require('../../assets/icons/ic-help.png'),
  LocationMarker: require('../../assets/icons/location_marker.gif'),
  Down: require('../../assets/icons/ic-down.png'),
  Direction: require('../../assets/icons/ic-direction.png'),
  Link: require('../../assets/icons/ic-link.png'),
  Location: require('../../assets/icons/ic-location.png'),
  Phone: require('../../assets/icons/ic-phone.png'),
  Time: require('../../assets/icons/ic-time.png'),
  Web: require('../../assets/icons/ic-web.png'),
  Area: require('../../assets/icons/ic-area.png'),
  VacantLand: require('../../assets/icons/ic-vacant-land.png'),
  Tel: require('../../assets/icons/ic-tel.png'),
  Calling: require('../../assets/icons/ic-calling.png'),
  Fax: require('../../assets/icons/ic-fax.png'),
};

export class LanguageEnums {
  static English = 1;
  static Vietnamese = 2;
  static Chinese = 3;
  static Japanese = 4;
  static Korean = 5;
  static France = 6;
}

export const Language = [
  {Id: LanguageEnums.Vietnamese, Name: 'Tiếng Việt', Code: ''},
  {Id: LanguageEnums.English, Name: 'English', Code: ''},
  {Id: LanguageEnums.France, Name: 'French', Code: ''},
  {Id: LanguageEnums.Chinese, Name: 'Chinese', Code: ''},
  {Id: LanguageEnums.Japanese, Name: 'Japanese', Code: ''},
  {Id: LanguageEnums.Korean, Name: 'Korean', Code: ''},
];

export class MapHelper {
  static decodePolyline(encoded) {
    if (!encoded) {
      return [];
    }
    let poly = [];
    let index = 0, len = encoded.length;
    let lat = 0, lng = 0;

    while (index < len) {
      let b, shift = 0, result = 0;

      do {
        b = encoded.charCodeAt(index++) - 63;
        result = result | ((b & 0x1f) << shift);
        shift += 5;
      } while (b >= 0x20);

      let dlat = (result & 1) != 0 ? ~(result >> 1) : (result >> 1);
      lat += dlat;

      shift = 0;
      result = 0;

      do {
        b = encoded.charCodeAt(index++) - 63;
        result = result | ((b & 0x1f) << shift);
        shift += 5;
      } while (b >= 0x20);

      let dlng = (result & 1) != 0 ? ~(result >> 1) : (result >> 1);
      lng += dlng;

      let p = {
        latitude: lat / 1e5,
        longitude: lng / 1e5,
      };
      poly.push(p);
    }
    return poly;
  }

  static getRegionForCoordinates(points) {
    let minX, maxX, minY, maxY;

    ((point) => {
      minX = point.latitude;
      maxX = point.latitude;
      minY = point.longitude;
      maxY = point.longitude;
    })(points[0]);

    points.map((point) => {
      minX = Math.min(minX, point.latitude);
      maxX = Math.max(maxX, point.latitude);
      minY = Math.min(minY, point.longitude);
      maxY = Math.max(maxY, point.longitude);
    });

    const midX = (minX + maxX) / 2;
    const midY = (minY + maxY) / 2;
    const deltaX = (maxX - minX) + (maxX - minX) * .4;
    const deltaY = (maxY - minY) + (maxY - minY) * .4;

    return {
      latitude: midX,
      longitude: midY,
      latitudeDelta: deltaX,
      longitudeDelta: deltaY
    };
  }

  static getRandomDestination() {
    let id = Math.floor((Math.random() * this.destinations.length));
    return this.destinations[id];
  }

  static destinations = [
    {
      latitude: 16.0699448,
      longitude: 108.2241556,
    },
    {
      latitude: 16.0715812,
      longitude: 108.2005879,
    },
    {
      latitude: 16.0755271,
      longitude: 108.1448972,
    },
    {
      latitude: 16.05036,
      longitude: 108.150634,
    },

    {
      latitude: 16.056302,
      longitude: 108.1860076,
    },
    {
      latitude: 16.0387819,
      longitude: 108.2073699,
    },
    {
      latitude: 16.0069699,
      longitude: 108.2192207,
    },
    {
      latitude: 16.0022288,
      longitude: 108.2534457,
    },
    {
      latitude: 16.0394033,
      longitude: 108.2441354,
    },
    {
      latitude: 16.020549,
      longitude: 108.1989321,
    }
  ];
}

export class Helper {
  static CloneObject(obj) {
    return JSON.parse(JSON.stringify(obj))
  }

  static stripDiacritics(str) {
    for (let i = 0; i < map.length; i++) {
      str = str.replace(map[i].letters, map[i].base);
    }
    return str;
  };

  static ImageUrl = "https://s3-ap-southeast-1.amazonaws.com/dfwresource/coms/img/coms_8323f5ac-fad6-4c2d-a1ca-2276af4a4a99.jpg";
  static IconUrl = "https://s3-ap-southeast-1.amazonaws.com/dfwresource/coms/img/coms_6105178d-8189-46d8-b446-f7fdb5860523.png";

  static LanguageKey = 'LanguageKey';
  static CityKey = 'CityKey';
  static FavoriteKey = 'FavoriteKey';
  static CategoryKey = 'CategoryArray';
  static AdsTimes = 'AdsTimes';
  static CurrentCategoryId = 'CurrentCategoryId';
  static SeparateKey = '||';
  static AdUnitId_Banner = __DEV__ ? 'ca-app-pub-3940256099942544/6300978111' : 'ca-app-pub-8440343014846849/2335511010';
  static AdUnitId_FullScreen = __DEV__ ? 'ca-app-pub-3940256099942544/1033173712' : 'ca-app-pub-8440343014846849/3812244218';

  static getAndress() {
    if(arguments.length == 0) return "";
    if(arguments.length == 1) return arguments[0];
    if(arguments.length == 2) {
      return (arguments[0] || "") +  (arguments[0] && arguments[0].trim() != '' ? ', ' : '')
            + (arguments[1] || "");
    }
    if(arguments.length == 3) {
      return (arguments[0] || "") +  (arguments[0] && arguments[0].trim() != '' ? ', ' : '')
        + (arguments[1] || "") +  (arguments[1] && arguments[1].trim() != '' ? ', ' : '')
        + (arguments[2] || "");
    }
    return "";
  }

}

export function Guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}
