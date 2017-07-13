import * as moment from 'moment';

export const virtualPath = "";

export const AdminRoutePath = {
  Index: `${virtualPath}/`,
  Login: `${virtualPath}/login`,
  Error403Page: `${virtualPath}/access-denied`,
  Dashboard:`${virtualPath}/dashboard`,

};

export const SearchRoutePath = {
  Index: `${virtualPath}/search`,
}

export const ComponentNames = {
  GetInTouchComponent: "GetInTouchComponent",
  FBLikeComponent: "FBLikeComponent",
  HtmlParagraphComponent: "HtmlParagraphComponent",
  TopSlideHeaderComponent: "TopSlideHeaderComponent",
  AllBuildersComponent: "AllBuildersComponent",
  ListObjectOverviewComponent: "ListObjectOverviewComponent",
  AreaDetailComponent: "AreaDetailComponent",
  CommunityDetailComponent: "CommunityDetailComponent",
  BuilderDetailComponent: "BuilderDetailComponent",
  CMAComponent: "CMAComponent",
  ListYourHomeComponent: "ListYourHomeComponent",
  NeighborhoodSoldReportComponent: "NeighborhoodSoldReportComponent"
};

export const USStates: [{ Id: number, Name: string }] = [
  {Id: 1, Name: 'Alabama'},
  {Id: 2, Name: 'Alaska'},
  {Id: 56, Name: 'Alberta'},
  {Id: 3, Name: 'Arizona'},
  {Id: 4, Name: 'Arkansas'},
  {Id: 55, Name: 'British Columbia'},
  {Id: 5, Name: 'California'},
  {Id: 6, Name: 'Colorado'},
  {Id: 7, Name: 'Connecticut'},
  {Id: 8, Name: 'Delaware'},
  {Id: 9, Name: 'District of Columbia'},
  {Id: 10, Name: 'Florida'},
  {Id: 11, Name: 'Georgia'},
  {Id: 12, Name: 'Hawaii'},
  {Id: 13, Name: 'Idaho'},
  {Id: 14, Name: 'Illinois'},
  {Id: 15, Name: 'Indiana'},
  {Id: 16, Name: 'Iowa'},
  {Id: 17, Name: 'Kansas'},
  {Id: 18, Name: 'Kentucky'},
  {Id: 19, Name: 'Louisiana'},
  {Id: 20, Name: 'Maine'},
  {Id: 57, Name: 'Manitoba'},
  {Id: 21, Name: 'Maryland'},
  {Id: 22, Name: 'Massachusetts'},
  {Id: 23, Name: 'Michigan'},
  {Id: 24, Name: 'Minnesota'},
  {Id: 25, Name: 'Mississippi'},
  {Id: 26, Name: 'Missouri'},
  {Id: 27, Name: 'Montana'},
  {Id: 28, Name: 'Nebraska'},
  {Id: 29, Name: 'Nevada'},
  {Id: 60, Name: 'New Brunswick'},
  {Id: 30, Name: 'New Hampshire'},
  {Id: 31, Name: 'New Jersey'},
  {Id: 32, Name: 'New Mexico'},
  {Id: 33, Name: 'New York'},
  {Id: 61, Name: 'Newfoundland &amp; Labrador'},
  {Id: 34, Name: 'North Carolina'},
  {Id: 35, Name: 'North Dakota'},
  {Id: 63, Name: 'Northwest Territories'},
  {Id: 59, Name: 'Nova Scotia'},
  {Id: 36, Name: 'Ohio'},
  {Id: 37, Name: 'Oklahoma'},
  {Id: 53, Name: 'Ontario'},
  {Id: 38, Name: 'Oregon'},
  {Id: 39, Name: 'Pennsylvania'},
  {Id: 62, Name: 'Prince Edward Island'},
  {Id: 40, Name: 'Puerto Rico'},
  {Id: 54, Name: 'Quebec'},
  {Id: 41, Name: 'Rhode Island'},
  {Id: 58, Name: 'Saskatchewan'},
  {Id: 42, Name: 'South Carolina'},
  {Id: 43, Name: 'South Dakota'},
  {Id: 44, Name: 'Tennessee'},
  {Id: 45, Name: 'Texas'},
  {Id: 46, Name: 'Utah'},
  {Id: 47, Name: 'Vermont'},
  {Id: 48, Name: 'Virginia'},
  {Id: 49, Name: 'Washington'},
  {Id: 50, Name: 'West Virginia'},
  {Id: 51, Name: 'Wisconsin'},
  {Id: 52, Name: 'Wyoming'},
  {Id: 64, Name: 'Yukon'}];

export enum ValidateRuleTypeEnums{
  Required = 1,
  MaxLength = 2,
  MinLength = 3,
  MaxValue = 4,
  MinValue = 5,
  IsAnEmail = 10,
  IsAPhoneNumber = 11,
  NotEquals = 12,
  Equals = 13,
  CustomExpression = 100
}

export enum ObjectParagraphTypeEnums{
  NormalText = 1,
  List = 2,
  ThreeColumnsBox = 3,
  OneColumnBox = 4
}

export enum ContentPageComponentRelationshipTypeEnums{
  SecondaryContent = 3,
  MiniBottom = 4,
  ContentBody = 5,
  TopSlide = 6
}

export enum TopSlideHeaderTypeEnums
{
  ForOverview = 1,
  ForDetailObject = 2
}

export enum ListObjectOverviewComponentForTypeEnums
{
  Builders = 1,
  Communities = 2,
  Cities = 3
}


export class Helper {
  static ESC = 27;
  static TAB = 9;
  static ENTER = 13;

  static GetKey(e) {
    if (window.event) {
      return e.keyCode;
    }  // IE
    else if (e.which) {
      return e.which;
    }
  }
}
export enum RoleTypeEnums
{
  NormalUser = 10,
  Mod = 20,
  Operator = 30,
  Admin = 40,
  SuperAdmin = 50,
  Executor = 60,
}
export enum UserStatusEnums
{
  Active = 1,
  Deactive = 2,
}

export enum LoginResponseEnums
{
  UnknowError = 0,
  WrongPassword = 1,
  ErrorCaptcha = 2,
  WasBanned = 3,
  DuplicateUserName = 4,
}