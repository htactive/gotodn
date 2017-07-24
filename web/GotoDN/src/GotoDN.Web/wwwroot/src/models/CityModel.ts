export interface CityModel {
  Id: number,
  Name: string,
  Districts?: DistrictModel[],
}

export interface DistrictModel {
  Id: number,
  Name: string,
  CityId?: number,
  City?: CityModel,
}