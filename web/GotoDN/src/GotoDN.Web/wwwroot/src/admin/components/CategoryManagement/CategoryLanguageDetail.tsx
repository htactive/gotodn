import * as React from 'react';
import {CategoryLanguageModel} from "../../../models/CategoryLanguageModel";
import {DynamicPanelComponent} from "../DynamicForm/DynamicPanelComponent";
import {DynamicFormModel} from "../../../models/dynamic-form-model";
import {DynamicFieldModel} from "../../../models/dynamic-field-model";
import {FieldStructureTypeEnums} from "../../../models/field-structure-model";
import {ValidateRuleTypeEnums, LanguageEnums} from "../../../commons/constant";
import {CategoryServiceInstance} from "../../services/CategoryService";
import {CategoryModel} from "../../../models/CategoryModel";
import {MessageBox, MessageBoxType, MessageBoxButtons, MessageBoxResult} from "../../../commons/message-box";
interface thisProps {
  CategoryLanguage: CategoryLanguageModel,
  EnCategoryLanguage?: CategoryLanguageModel,
  IsSelected: boolean,
  OnObjectChange: (obj: CategoryLanguageModel) => void,
}

interface thisState {
  EditingObjec1t?: CategoryLanguageModel
}

class CategoryLanguageDetail extends React.Component<thisProps, thisState> {
  editingForm: DynamicPanelComponent;
  state: thisState = {};

  setState(state: thisState) {
    super.setState(state);
  }

  render() {
    return (
      <div className={`tab-pane fade${this.props.IsSelected ? ' active in' : ''}`}>
        {this.props.CategoryLanguage ?
          <DynamicPanelComponent
            ref={(r) => this.editingForm = r}
            FormStructure={this.getFormStructure()}
            onFieldValueChange={(obj) => {
              this.props.OnObjectChange(obj)
            }}
            Object={this.props.CategoryLanguage || {}}
            onValidationChange={(isInvalid) => {
              this.props.CategoryLanguage['__#isInvalid#__'] = isInvalid
            }}
          /> : null}
        {this.props.CategoryLanguage && this.props.CategoryLanguage.Language != LanguageEnums.English ?
          <div className="form-group">
            <div className="col-lg-9 col-lg-offset-3 p0">
              <button className="btn btn-warning"
                      onClick={() => this.translateCategory()}>Dịch từ Tiếng Anh
              </button>
            </div>
          </div>: null
        }
      </div>);
  }

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
      let f_Title: DynamicFieldModel = {
        Priority: 1,
        LabelClass: 'col-lg-3',
        InputClass: 'col-lg-9',
        FieldStructure: {
          Name: 'Tiêu đề',
          FieldName: 'Title',
          PlaceHolder: '',
          Type: FieldStructureTypeEnums.TextBox,
          ValidateRules: [{
            Type: ValidateRuleTypeEnums.Required,
            InValidMessage: 'Trường này là bắt buộc'
          },
            {
              Type: ValidateRuleTypeEnums.MaxLength,
              InValidMessage: 'Không được vượt quá 50 ký tự',
              RuleData: '50'
            }
          ]
        }
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
      inforForm.DynamicFields.push(f_Title);
      inforForm.DynamicFields.push(f_Image);
      inforForm.DynamicFields.push(f_Icon);
      allForms.push(inforForm);
    }
    return allForms;
  }

  private saveCategory() {
    if (this.editingForm.isFormValid()) {

    }
    this.forceUpdate();
  }

  private async translateCategory() {
    let dialogResult = await MessageBox.instance.show({
      content: 'Dịch từ Tiếng anh sẽ ghi đè dữ liệu lên ngôn ngữ hiện tại. Bạn có chắc là bạn muốn dịch?',
      isShow: true,
      title: 'Xác nhận',
      type: MessageBoxType.Confirmation,
      buttons: MessageBoxButtons.YesNo
    });

    if (dialogResult == MessageBoxResult.Yes) {
      let cateModel: CategoryModel = {Id: 0, CreatedDate: null, UpdatedDate: null, CategoryLanguages: []};
      cateModel.CategoryLanguages.push(this.props.CategoryLanguage, this.props.EnCategoryLanguage);
      let translatedCateLang = await CategoryServiceInstance.TranslateCategory(cateModel);
      if(translatedCateLang != null && this.props.OnObjectChange) {
        this.props.OnObjectChange(translatedCateLang);
      }
    }
  }
}

export default CategoryLanguageDetail;