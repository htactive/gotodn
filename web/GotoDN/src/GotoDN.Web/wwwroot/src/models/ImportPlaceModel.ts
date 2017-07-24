import {LanguageEnums} from "../commons/constant";
export interface ImportPlaceModel{
  PlaceName:string,
  PlaceDuplicate?:boolean,
  Category?:string,
  CategoryNotExist?:boolean,
  Service?:string,
  ServiceNotExist?: boolean,
  Description:string,
  CoverImage?:string,
  IsCategorySlider?:boolean,
  IsHomeSlider?:boolean,
  City?:string,
  CityNotExist?: boolean,
  District?:string,
  DistrictNotExist?: boolean,
  Address?:string,
  Phone?: string,
  Fax?:string,
  OpenTime?: string,
  CloseTime?:string,
  Website?: string,
  AdditionalInfo?: any,
  AdditionalInfoError?: boolean,
  PlaceImages?: string[],
  PlaceImageError?: boolean,
  Language?: LanguageEnums,
}

export interface ImportPlaceGroupModel {
  Language?: LanguageEnums,
  ImportPlaces?: ImportPlaceModel[]
}