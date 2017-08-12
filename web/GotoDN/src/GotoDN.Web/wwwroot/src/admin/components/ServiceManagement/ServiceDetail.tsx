import * as React from 'react';
import {HTServiceModel} from "../../../models/HTServiceModel";
import {LanguageEnums} from "../../../commons/constant";
import ServiceLanguageDetail from "./ServiceLanguageDetail";
import {HTServiceLanguageModel} from "../../../models/HTServiceLanguageModel";
import {ComboBox, ReactSelectModel} from "../ComboBox/ComboBox";
import {CategoryModel} from "../../../models/CategoryModel";
import {MessageBox, MessageBoxType, MessageBoxButtons, MessageBoxResult} from "../../../commons/message-box";
import {HTServiceInstance} from "../../services/HTService";
import {DynamicFormModel} from "../../../models/dynamic-form-model";
import {DynamicFieldModel} from "../../../models/dynamic-field-model";
import {FieldStructureTypeEnums} from "../../../models/field-structure-model";
import {DynamicPanelComponent} from "../DynamicForm/DynamicPanelComponent";
interface thisProps {
  SelectedHTService: HTServiceModel,
  SelectedLanguage: LanguageEnums,
  ChangeSelectedLanguage: (l: LanguageEnums) => void,
  OnHTServiceLanguageChange: (destination: HTServiceLanguageModel) => void,
  SaveHTService: () => void,
  DeleteHTService: (Id: number) => void,
  AddHTServiceLanguage: (lang: LanguageEnums) => void,
  DeleteHTServiceLanguage: (Id: number) => void,
  Categories: CategoryModel[],
  ClickSlectCategory: (Id) => void,
  cancelService: () => void,
}

class HTServiceDetail extends React.Component<thisProps, {}> {
  private getFormStructure(): DynamicFormModel[] {
    let allForms: DynamicFormModel[] = [];
    {
      let inforForm: DynamicFormModel = {
        Icon: 'fa fa-info',
        Priority: 1,
        Title: '',
        BlankPanel: true,
        DynamicFields: []
      };

      let f_Image: DynamicFieldModel = {
        Priority: 2,
        LabelClass: 'col-lg-3',
        InputClass: 'col-lg-9',
        FieldStructure: {
          Name: 'Image',
          FieldName: 'Image',
          PlaceHolder: '',
          FieldData: {
            CssClass: 'dn-image',
            Type: 'Image',
          },
          Type: FieldStructureTypeEnums.SingleImage,
          ValidateRules: []
        }
      };

      let f_Icon: DynamicFieldModel = {
        Priority: 3,
        LabelClass: 'col-lg-3',
        InputClass: 'col-lg-9',
        FieldStructure: {
          Name: 'Icon',
          FieldName: 'Icon',
          PlaceHolder: '',
          FieldData: {
            CssClass: 'dn-icon',
            Type: 'Icon',
          },
          Type: FieldStructureTypeEnums.SingleImage,
          ValidateRules: []
        }
      };
      inforForm.DynamicFields.push(f_Image);
      inforForm.DynamicFields.push(f_Icon);
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
      {Language: LanguageEnums.All, Title: 'Tất cả'},
    ];
    let Categories: ReactSelectModel[] = [];
    if (this.props.Categories && this.props.Categories.length > 0) {
      Categories = this.props.Categories.map(
        x => {
          return {label: x.CategoryLanguages ? x.CategoryLanguages[0].Title : "", value: x.Id}
        }
      );
    }

    let enHTServiceLanguage: HTServiceLanguageModel = {Id: 0};
    if (this.props.SelectedHTService && this.props.SelectedHTService.HTServiceLanguages)
      enHTServiceLanguage = this.props.SelectedHTService.HTServiceLanguages.filter(t => t.Language == LanguageEnums.English)[0];
    return (
      <div className="col-lg-8 cate-right-form" style={{marginBottom: 150}}>
        <h3>Xem thông tin chi tiết dịch vụ</h3>
        <hr/>
        {this.props.SelectedHTService != null ?
          <div className="col-lg-12 col-sm-12 form-horizontal">
            <div className="tabs mb20">
              <ul className="nav nav-tabs">
                {
                  this.props.SelectedHTService.HTServiceLanguages.map((x, index) =>
                    <li key={index}
                        className={(this.props.SelectedLanguage || LanguageEnums.English) == x.Language ? 'active' : ''}>
                      <a onClick={() => this.props.ChangeSelectedLanguage(x.Language)}>
                        {languages.filter(r => r.Language == x.Language)[0].Title}
                        &nbsp;
                        &nbsp;
                        {x.Language == LanguageEnums.English ?
                          null : <span onClick={() => this.props.DeleteHTServiceLanguage
                          && this.props.DeleteHTServiceLanguage(x.Id)}
                                       style={{background: 'transparent', border: 'transparent', boxShadow: 'none'}}
                          >
                            <i className="fa fa-remove"/>
                          </span>}
                      </a>
                    </li>)
                }
              </ul>
              <div className="tab-content">
                {
                  this.props.SelectedHTService.HTServiceLanguages.map((x, index) => {
                    return <ServiceLanguageDetail
                      key={index}
                      IsSelected={x.Language == this.props.SelectedLanguage}
                      HTServiceLanguage={x}
                      EnHTServiceLanguage={enHTServiceLanguage}
                      OnObjectChange={(obj: HTServiceLanguageModel) =>
                        this.props.OnHTServiceLanguageChange(obj)}
                    />
                  })
                }
              </div>
            </div>
            <div className="toggle-custom col-lg-12 p0">
              <DynamicPanelComponent
                FormStructure={this.getFormStructure()}
                onFieldValueChange={(obj) => {
                  this.props.OnHTServiceLanguageChange(obj)
                }}
                Object={this.props.SelectedHTService.HTServiceLanguages
                  .filter(x => x.Language == LanguageEnums.English)[0] || {}}
              />
            </div>
            <div className="toggle-custom col-lg-12 p0">
              <div style={{paddingTop: '5px', fontWeight: 'normal'}} className="col-lg-3 control-label">Danh mục</div>
              <div className="col-lg-6">
                <ComboBox
                  placeHolder="Chọn danh mục..."
                  options={Categories}
                  value={this.props.SelectedHTService.CategoryId}
                  onChange={(Id) => this.props.ClickSlectCategory(Id)}
                />
              </div>
            </div>
            <hr className="col-lg-12 p0"/>
            <div className="form-group">
              {this.props.SelectedHTService.Id != 0 ?
                <button className="btn btn-danger pull-right"
                        onClick={() => this.deleteHTService()}><i
                  className="fa fa-trash-o"/> Xóa
                </button> :
                <button className="btn btn-default pull-right"
                        onClick={() => this.cancelHTService()}><i
                  className="fa fa-trash-o"/> Hủy
                </button>
              }

              <button className="btn btn-primary pull-right mr10 ml10"
                      onClick={() => this.saveHTService()}>Lưu
              </button>
              <button className="btn btn-warning"
                      onClick={() => {
                        this.translateAllLanguage()
                      }}>Dịch tất cả từ Tiếng Anh
              </button>
              {this.props.SelectedHTService.HTServiceLanguages && this.props.SelectedHTService.HTServiceLanguages.length < 6 ?
                <div className="btn-group dropup mr10 ml10">
                  <button type="button" className="btn btn-success dropdown-toggle"
                          data-toggle="dropdown" aria-expanded="false">
                    Thêm ngôn ngữ
                    <span className="caret"></span>
                  </button>
                  <ul className="dropdown-menu left animated fadeIn" role="menu">
                    {languages.filter(x =>
                      this.props.SelectedHTService && this.props.SelectedHTService.HTServiceLanguages && !this.props.SelectedHTService.HTServiceLanguages.some(r => r.Language == x.Language)
                    ).map((item, index) =>
                      <li key={index}>
                        <a onClick={() => this.props.AddHTServiceLanguage
                        && this.props.AddHTServiceLanguage(item.Language)}>{item.Title}</a>
                      </li>
                    )}
                  </ul>
                </div> : null}
              <button className="btn btn-default pull-right hidden"
                      onClick={() => this.discardChangesEditing()}>Làm lại
              </button>
            </div>
          </div> :
          <div className="col-lg-12 col-sm-12 form-horizontal">
            <div className="form-group">
              <span className="help-block">Click vào dịch vụ để xem thông tin chi tiết</span>
            </div>
          </div>
        }
      </div>
    )
  }

  private deleteHTService() {
    this.props.DeleteHTService && this.props.DeleteHTService(this.props.SelectedHTService.Id);
  }

  private discardChangesEditing() {

  }

  private saveHTService() {
    let isInvalid = false;
    let firstInvalid: HTServiceLanguageModel = null;
    this.props.SelectedHTService.HTServiceLanguages.forEach(x => {
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
    console.log('congratulation! your form is valid, do submit now ' + this.props.SelectedHTService);
    this.props.SaveHTService && this.props.SaveHTService();
  }

  private async translateAllLanguage() {
    let dialogResult = await MessageBox.instance.show({
      content: 'Dịch từ Tiếng anh sẽ ghi đè dữ liệu lên ngôn ngữ tất cả các ngôn ngữ. Bạn có chắc là bạn muốn dịch?',
      isShow: true,
      title: 'Xác nhận',
      type: MessageBoxType.Confirmation,
      buttons: MessageBoxButtons.YesNo
    });

    if (dialogResult == MessageBoxResult.Yes) {
      let result = await HTServiceInstance.TranslateAllService(this.props.SelectedHTService);
      if (result != null) {
        result.HTServiceLanguages.forEach((item) => {
          this.props.OnHTServiceLanguageChange(item)
        });
      }
    }
  }

  private cancelHTService() {
    this.props.cancelService && this.props.cancelService();
  }
}

export default HTServiceDetail;