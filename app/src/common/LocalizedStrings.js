import LocalizedStrings from 'react-native-localization';
import {LanguageEnums} from './constain';

let jsonLanguages = require('../data/LanguageStrings.json');

export const LStrings = new LocalizedStrings(jsonLanguages);


export function changeAppLanguage(language) {
  switch (language) {
    case LanguageEnums.English:
      LStrings.setLanguage('en');
      break;
    case LanguageEnums.Vietnamese:
      LStrings.setLanguage('vi');
      break;
    case LanguageEnums.France:
      LStrings.setLanguage('fr');
      break;
    case LanguageEnums.Chinese:
      LStrings.setLanguage('zh');
      break;
    case LanguageEnums.Japanese:
      LStrings.setLanguage('ja');
      break;
    case LanguageEnums.Korean:
      LStrings.setLanguage('ko');
      break;
  }
}