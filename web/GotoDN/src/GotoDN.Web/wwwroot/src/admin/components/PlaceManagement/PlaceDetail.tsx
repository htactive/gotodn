import * as React from 'react';
import {PlaceModel} from "../../../models/PlaceModel";
import {LanguageEnums, ValidateRuleTypeEnums} from "../../../commons/constant";
import PlaceLanguageDetail from "./PlaceLanguageDetail";
import {PlaceLanguageModel} from "../../../models/PlaceLanguageModel";
import {ComboBox, ReactSelectModel} from "../ComboBox/ComboBox";
import {CategoryModel} from "../../../models/CategoryModel";
import {HTServiceModel} from "../../../models/HTServiceModel";
import {DynamicPanelComponent} from "../DynamicForm/DynamicPanelComponent";
import {FieldStructureTypeEnums} from "../../../models/field-structure-model";
import {DynamicFieldModel} from "../../../models/dynamic-field-model";
import {DynamicFormModel} from "../../../models/dynamic-form-model";
interface thisProps {
  SelectedPlace: PlaceModel,
  SelectedLanguage: LanguageEnums,
  ChangeSelectedLanguage: (l: LanguageEnums) => void,
  OnPlaceLanguageChange: (destination: PlaceLanguageModel) => void,
  OnPlaceChange: (obj: PlaceModel) => void,
  SavePlace: (model: PlaceModel) => void,
  DeletePlace: (Id: number) => void,
  AddPlaceLanguage: (lang: LanguageEnums) => void,
  DeletePlaceLanguage: (Id: number) => void,
  Categories: CategoryModel[],
  HTServices: HTServiceModel[],
  ClickSlectCategory: (Id) => void,
  ClickSlectHTService: (Id) => void,
}

class PlaceDetail extends React.Component<thisProps, {}> {
  editingForm: DynamicPanelComponent;

  private getFormStructure(): DynamicFormModel[] {
    let allForms: DynamicFormModel[] = [];
    {
      let inforForm: DynamicFormModel = {
        Icon: 'fa fa-info',
        Priority: 1,
        Title: '',
        BlankPanel: true,
        DynamicFields: [],
      };
      let IsCategorySlider: DynamicFieldModel = {
        Priority: 1,
        LabelClass: 'col-lg-3',
        InputClass: 'col-lg-9',
        FieldStructure: {
          Name: 'Xuất hiện trên Slider Category',
          FieldName: 'IsCategorySlider',
          PlaceHolder: '',
          Type: FieldStructureTypeEnums.Toggle,
          ValidateRules: []
        }
      };

      let IsHomeSlider: DynamicFieldModel = {
        Priority: 1,
        LabelClass: 'col-lg-3',
        InputClass: 'col-lg-9',
        FieldStructure: {
          Name: 'Xuất hiện trên Slider Trang chủ',
          FieldName: 'IsHomeSlider',
          PlaceHolder: '',
          Type: FieldStructureTypeEnums.Toggle,
          ValidateRules: []
        }
      };

      let Rating: DynamicFieldModel = {
        Priority: 1,
        LabelClass: 'col-lg-3',
        InputClass: 'col-lg-9',
        FieldStructure: {
          Name: 'Đánh giá',
          FieldName: 'Rating',
          PlaceHolder: '',
          Type: FieldStructureTypeEnums.Number,
          ValidateRules: [{
              Type: ValidateRuleTypeEnums.MinValue,
              InValidMessage: 'Không được nhỏ hơn 0',
              RuleData: '0'
            },
            {
              Type: ValidateRuleTypeEnums.MaxValue,
              InValidMessage: 'Không được lớn hơn 5',
              RuleData: '5'
            }
          ]
        }
      };

      let City: DynamicFieldModel = {
        Priority: 1,
        LabelClass: 'col-lg-3',
        InputClass: 'col-lg-9',
        FieldStructure: {
          Name: 'Thành phố',
          FieldName: 'City',
          PlaceHolder: '',
          Type: FieldStructureTypeEnums.TextBox,
          ValidateRules: []
        }
      };

      let District: DynamicFieldModel = {
        Priority: 1,
        LabelClass: 'col-lg-3',
        InputClass: 'col-lg-9',
        FieldStructure: {
          Name: 'Quận huyện',
          FieldName: 'District',
          PlaceHolder: '',
          Type: FieldStructureTypeEnums.TextBox,
          ValidateRules: []
        }
      };

      let Address: DynamicFieldModel = {
        Priority: 1,
        LabelClass: 'col-lg-3',
        InputClass: 'col-lg-9',
        FieldStructure: {
          Name: 'Địa chỉ',
          FieldName: 'Address',
          PlaceHolder: '',
          Type: FieldStructureTypeEnums.TextBox,
          ValidateRules: []
        }
      };

      let Phone: DynamicFieldModel = {
        Priority: 1,
        LabelClass: 'col-lg-3',
        InputClass: 'col-lg-9',
        FieldStructure: {
          Name: 'Số điện thoại',
          FieldName: 'Phone',
          PlaceHolder: '',
          Type: FieldStructureTypeEnums.TextBox,
          ValidateRules: []
        }
      };

      let Website: DynamicFieldModel = {
        Priority: 1,
        LabelClass: 'col-lg-3',
        InputClass: 'col-lg-9',
        FieldStructure: {
          Name: 'Trang web',
          FieldName: 'Website',
          PlaceHolder: '',
          Type: FieldStructureTypeEnums.TextBox,
          ValidateRules: []
        }
      };
      inforForm.DynamicFields.push(Phone);
      inforForm.DynamicFields.push(Address);
      inforForm.DynamicFields.push(City);
      inforForm.DynamicFields.push(District);
      inforForm.DynamicFields.push(Rating);
      inforForm.DynamicFields.push(Website);
      inforForm.DynamicFields.push(IsCategorySlider);
      inforForm.DynamicFields.push(IsHomeSlider);
      allForms.push(inforForm);
    }
    return allForms;
  }

  render() {
    let languages: { Language: LanguageEnums, Title: string }[] = [
      {Language: LanguageEnums.Vietnamese, Title: 'Tiếng Việt'},
      {Language: LanguageEnums.English, Title: 'Tiếng Anh'},
      {Language: LanguageEnums.France, Title: 'Tiếng Pháp'},
      {Language: LanguageEnums.Chinese, Title: 'Tiếng Trung'},
      {Language: LanguageEnums.Japanese, Title: 'Tiếng Nhật'},
      {Language: LanguageEnums.Korean, Title: 'Tiếng Hàn'},
    ];

    let Categories: ReactSelectModel[] = [];
    if (this.props.Categories && this.props.Categories.length > 0) {
      Categories = this.props.Categories.map(
        x => {
          return {label: x.CategoryLanguages ? x.CategoryLanguages[0].Title : "", value: x.Id}
        }
      );
    }
    let HTServices: ReactSelectModel[] = [];
    if (this.props.HTServices && this.props.HTServices.length > 0) {
      HTServices = this.props.HTServices.map(
        x => {
          return {label: x.HTServiceLanguages ? x.HTServiceLanguages[0].Title : "", value: x.Id}
        }
      );
    }



    return (
      <div className="col-lg-8 cate-right-form">
        <h3>Thông tin chi tiết của địa điểm hoặc sự kiện</h3>
        <hr/>
        {this.props.SelectedPlace != null ?
          <div className="col-lg-12 col-sm-12 form-horizontal">
            <div className="tabs mb20">
              <ul className="nav nav-tabs">
                {
                  this.props.SelectedPlace.PlaceLanguages.map(x =>
                    <li key={x.Id}
                        className={(this.props.SelectedLanguage || LanguageEnums.English) == x.Language ? 'active' : ''}>
                      <a onClick={() => this.props.ChangeSelectedLanguage(x.Language)}>
                        {languages.filter(r => r.Language == x.Language)[0].Title}
                        &nbsp;
                        &nbsp;
                        {x.Language == LanguageEnums.Vietnamese ?
                          null : <span onClick={() => this.props.DeletePlaceLanguage
                          && this.props.DeletePlaceLanguage(x.Id)}
                          >
                            <i className="fa fa-remove"/>
                          </span>}
                      </a>
                    </li>)
                }
              </ul>
              <div className="tab-content">
                {
                  this.props.SelectedPlace.PlaceLanguages.map(x => {
                    return <PlaceLanguageDetail
                      key={x.Id}
                      IsSelected={x.Language == this.props.SelectedLanguage}
                      PlaceLanguage={x}
                      OnObjectChange={(obj: PlaceLanguageModel) =>
                        this.props.OnPlaceLanguageChange(obj)}
                    />
                  })
                }
              </div>
            </div>

            <hr/>
            <div className="form-group">
              <div className="col-sm-3">
                <ComboBox
                  placeHolder="Chọn category..."
                  options={Categories}
                  value={this.props.SelectedPlace.CategoryId}
                  onChange={(Id) => this.props.ClickSlectCategory(Id)}
                />
              </div>

              <div className="col-sm-3">
                <ComboBox
                  placeHolder="Chọn service..."
                  options={HTServices}
                  value={this.props.SelectedPlace.HTServiceId}
                  onChange={(Id) => this.props.ClickSlectHTService(Id)}
                />
              </div>

              <div className="btn-group dropup mr10 ml10">
                <button type="button" className="btn btn-success dropdown-toggle"
                        data-toggle="dropdown" aria-expanded="false">
                  Thêm ngôn ngữ
                  <span className="caret"></span>
                </button>
                <ul className="dropdown-menu left animated fadeIn" role="menu">
                  {languages.filter(x =>
                    this.props.SelectedPlace && this.props.SelectedPlace.PlaceLanguages &&
                    !this.props.SelectedPlace.PlaceLanguages.some(r => r.Language == x.Language)
                  ).map((item, index) =>
                    <li key={index}>
                      <a onClick={() => this.props.AddPlaceLanguage
                      && this.props.AddPlaceLanguage(item.Language)}>{item.Title}</a>
                    </li>
                  )}
                </ul>
              </div>

              <button className="btn btn-default pull-right hidden"
                      onClick={() => this.discardChangesEditing()}>Làm lại
              </button>

            </div>

            <hr/>

            <DynamicPanelComponent
              ref={(r) => this.editingForm = r}
              FormStructure={this.getFormStructure()}
              onFieldValueChange={(obj: PlaceModel) => this.props.OnPlaceChange(obj)}
              Object={this.props.SelectedPlace}
              onValidationChange={(isInvalid) => {
                this.props.SelectedPlace['__#isInvalid#__'] = isInvalid
              }}
            />

            <hr/>
            <div className="form-group">
              <button className="btn btn-danger pull-right"
                      onClick={() => this.deletePlace()}><i
                className="fa fa-trash-o"/> Xóa
              </button>

              <button className="btn btn-primary"
                      onClick={() => this.savePlace()}>Lưu
              </button>
            </div>
          </div> :
          <div className="col-lg-12 col-sm-12 form-horizontal">
            <div className="form-group">
              <span className="help-block">Click vào từng mục để xem thông tin chi tiết</span>
            </div>
          </div>
        }
      </div>
    )
  }

  private deletePlace() {
    this.props.DeletePlace && this.props.DeletePlace(this.props.SelectedPlace.Id);
  }

  private discardChangesEditing() {

  }

  private savePlace() {
    let isInvalid = false;
    let firstInvalid: PlaceLanguageModel = null;
    this.props.SelectedPlace.PlaceLanguages.forEach(x => {
      x['__#validated#__'] = true;
      if (x['__#isInvalid#__']) {
        firstInvalid = firstInvalid || x;
      }
      isInvalid = isInvalid || x['__#isInvalid#__'];
    });
    if (isInvalid) {
      this.props.ChangeSelectedLanguage(firstInvalid.Language);
      return;
    }
    // if is valid, do submit here
    console.log('congratulation! your form is valid, do submit now ' + this.props.SelectedPlace);
    this.props.SavePlace && this.props.SavePlace(this.props.SelectedPlace);
  }
}

export  default PlaceDetail;