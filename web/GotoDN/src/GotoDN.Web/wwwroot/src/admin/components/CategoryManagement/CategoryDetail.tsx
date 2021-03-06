import * as React from 'react';
import {CategoryModel} from "../../../models/CategoryModel";
import {LanguageEnums} from "../../../commons/constant";
import CategoryLanguageDetail from "./CategoryLanguageDetail";
import {CategoryLanguageModel} from "../../../models/CategoryLanguageModel";
import {CategoryServiceInstance} from "../../services/CategoryService";
import {MessageBox, MessageBoxType, MessageBoxButtons, MessageBoxResult} from "../../../commons/message-box";
import {DynamicFormModel} from "../../../models/dynamic-form-model";
import {DynamicFieldModel} from "../../../models/dynamic-field-model";
import {FieldStructureTypeEnums} from "../../../models/field-structure-model";
import {DynamicPanelComponent} from "../DynamicForm/DynamicPanelComponent";
interface thisProps {
  SelectedCategory: CategoryModel,
  SelectedLanguage: LanguageEnums,
  ChangeSelectedLanguage: (l: LanguageEnums) => void,
  OnCategoryLanguageChange: (destination: CategoryLanguageModel, isTranslate?: boolean) => void,
  SaveCategory: (model: CategoryModel) => void,
  DeleteCategory: (Id: number) => void,
  AddCategoryLanguage: (lang: LanguageEnums) => void,
  DeleteCategoryLanguage: (Id: number) => void,
  ChangeEvent: (check: boolean) => void,
  ChangeGovernment: (check: boolean) => void,
  OnTranslateAll?: (model: CategoryModel) => void,
  cancelCategory: () => void,
}

class CategoryDetail extends React.Component<thisProps, {}> {
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
          Name: 'Ảnh đại diện',
          FieldName: 'Image',
          PlaceHolder: '',
          FieldData: {
            CssClass: 'dn-image',
            Type: 'Image',
          },
          Type: FieldStructureTypeEnums.SingleImage,
          ValidateRules: [
          ]
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
    let languages: {Language: LanguageEnums, Title: string}[] = [
      {Language: LanguageEnums.English, Title: 'Tiếng Anh'},
      {Language: LanguageEnums.Vietnamese, Title: 'Tiếng Việt'},
      {Language: LanguageEnums.France, Title: 'Tiếng Pháp'},
      {Language: LanguageEnums.Chinese, Title: 'Tiếng Trung'},
      {Language: LanguageEnums.Japanese, Title: 'Tiếng Nhật'},
      {Language: LanguageEnums.Korean, Title: 'Tiếng Hàn'},
      {Language: LanguageEnums.All, Title: 'Tất cả'},
    ];

    let enCategoryLanguage: CategoryLanguageModel = {Id: 0};
    if (this.props.SelectedCategory && this.props.SelectedCategory.CategoryLanguages)
      enCategoryLanguage = this.props.SelectedCategory.CategoryLanguages.filter(t => t.Language == LanguageEnums.English)[0];
    return (
      <div className="col-lg-8 cate-right-form">
        <h3>Xem thông tin chi tiết danh mục</h3>
        <hr/>
        {this.props.SelectedCategory != null ?
          <div className="col-lg-12 col-sm-12 form-horizontal">
            <div className="tabs mb20">
              <ul className="nav nav-tabs">
                {
                  this.props.SelectedCategory.CategoryLanguages.map((x, index) =>
                    <li key={index}
                        className={(this.props.SelectedLanguage || LanguageEnums.English) == x.Language ? 'active' : ''}>
                      <a onClick={() => this.props.ChangeSelectedLanguage(x.Language)}>
                        {languages.filter(r => r.Language == x.Language)[0].Title}
                        &nbsp;
                        &nbsp;
                        {x.Language == LanguageEnums.English ?
                          null : <span onClick={() => this.props.DeleteCategoryLanguage
                          && this.props.DeleteCategoryLanguage(x.Id)}
                          >
                            <i className="fa fa-remove"/>
                          </span>}
                      </a>
                    </li>)
                }
              </ul>
              <div className="tab-content">
                {
                  this.props.SelectedCategory.CategoryLanguages.map((x, index) => {
                    return <CategoryLanguageDetail
                      key={index}
                      IsSelected={x.Language == this.props.SelectedLanguage}
                      CategoryLanguage={x}
                      EnCategoryLanguage={enCategoryLanguage}
                      OnObjectChange={(obj: CategoryLanguageModel) =>
                        this.props.OnCategoryLanguageChange(obj)}
                    />
                  })
                }
              </div>
            </div>
            <div className="toggle-custom col-lg-12 p0">
              <DynamicPanelComponent
                FormStructure={this.getFormStructure()}
                onFieldValueChange={(obj) => {
                  this.props.OnCategoryLanguageChange(obj)
                }}
                Object={this.props.SelectedCategory.CategoryLanguages
                  .filter(x => x.Language == LanguageEnums.English)[0] || {}}
              />
            </div>
            <div className="toggle-custom col-lg-12 p0">
              <label htmlFor="checkbox-toggle" style={{paddingTop: '2px', fontWeight: 'normal'}}
                     className="col-lg-3 control-label">Là danh mục Sự Kiện? &nbsp;&nbsp;</label>
              <div className="col-lg-9">
                <label className="toggle " data-on="YES" data-off="NO">
                  <input type="checkbox" id="checkbox-toggle"
                         name="checkbox-toggle"
                         onChange={(e) => this.props.ChangeEvent(e.target.checked)}
                         checked={this.props.SelectedCategory.IsEvent || false}
                  />
                  <span className="button-radio"/>
                </label>
              </div>
            </div>
            <div className="toggle-custom col-lg-12 p0">
              <label htmlFor="checkbox-toggle" style={{paddingTop: '2px', fontWeight: 'normal'}}
                     className="col-lg-3 control-label">Là danh mục Chính Quyền? &nbsp;&nbsp;</label>
              <div className="col-lg-9">
                <label className="toggle " data-on="YES" data-off="NO">
                  <input type="checkbox" id="checkbox-toggle"
                         name="checkbox-toggle"
                         onChange={(e) => this.props.ChangeGovernment(e.target.checked)}
                         checked={this.props.SelectedCategory.IsGovernment || false}
                  />
                  <span className="button-radio"/>
                </label>
              </div>
            </div>
            <hr className="col-lg-12 p0" style={{marginTop: 0}}/>
            <div className="form-group">
              {this.props.SelectedCategory.Id != 0 ?
                <button className="btn btn-danger pull-right"
                        onClick={() => this.deleteCategory()}><i
                  className="fa fa-trash-o"/> Xóa
                </button> :
                <button className="btn btn-default pull-right"
                        onClick={() => this.cancelHTService()}><i
                  className="fa fa-trash-o"/> Hủy
                </button>
              }
              <button className="btn btn-primary pull-right mr10 ml10"
                      onClick={() => this.saveCategory()}>Lưu
              </button>
              <button className="btn btn-warning mr10 ml10"
                      onClick={() => {
                        this.translateAllLanguage()
                      }}>Dịch tất cả từ Tiếng Anh
              </button>
              { this.props.SelectedCategory.CategoryLanguages && this.props.SelectedCategory.CategoryLanguages.length < 6 ?
                <div className="btn-group dropup">
                  <button type="button" className="btn btn-success dropdown-toggle"
                          data-toggle="dropdown" aria-expanded="false">
                    Thêm ngôn ngữ
                    <span className="caret"></span>
                  </button>
                  <ul className="dropdown-menu left animated fadeIn" role="menu">
                    {languages.filter(x =>
                      this.props.SelectedCategory && this.props.SelectedCategory.CategoryLanguages && !this.props.SelectedCategory.CategoryLanguages.some(r => r.Language == x.Language)
                    ).map((item, index) =>
                      <li key={index}>
                        <a onClick={() => this.props.AddCategoryLanguage
                        && this.props.AddCategoryLanguage(item.Language)}>{item.Title}</a>
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
              <span className="help-block">Click vào danh mục để xem thông tin chi tiết</span>
            </div>
          </div>
        }
      </div>
    )
  }

  private deleteCategory() {
    this.props.DeleteCategory && this.props.DeleteCategory(this.props.SelectedCategory.Id);
  }

  private discardChangesEditing() {

  }

  private saveCategory() {
    let isInvalid = false;
    let firstInvalid: CategoryLanguageModel = null;
    this.props.SelectedCategory.CategoryLanguages.forEach(x => {
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
    this.props.SaveCategory && this.props.SaveCategory(this.props.SelectedCategory);
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
      let result = await CategoryServiceInstance.TranslateAllCategory(this.props.SelectedCategory);
      if (result != null) {
        result.CategoryLanguages.forEach((item) => {
          this.props.OnCategoryLanguageChange(item)
        });
      }
    }

  }

  private cancelHTService() {
    this.props.cancelCategory && this.props.cancelCategory();
  }
}

export  default CategoryDetail;