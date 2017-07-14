import * as React from 'react';
import {UserModel} from "../../../models/UserModel";
import store from "../../modules/UserManagement/_store";
import noticeStore from "../../components/Notice/_store";
import {DynamicPanelComponent} from "../DynamicForm/DynamicPanelComponent";
import {Link, browserHistory} from 'react-router';
import {AdminRoutePath, RoleTypeEnums, ValidateRuleTypeEnums} from "../../../commons/constant";
import UserManagement from "../../modules/UserManagement/UserManagement";
import {DynamicFormModel} from "../../../models/dynamic-form-model";
import {DynamicFieldModel} from "../../../models/dynamic-field-model";
import {FieldStructureTypeEnums} from "../../../models/field-structure-model";
import {Modal, Button, Form, FormGroup, Col, ControlLabel, FormControl, Checkbox} from 'react-bootstrap';
import {action_Filter, action_ViewDetail} from "../../modules/UserManagement/_actions";
import {UserServiceInstance} from "../../services/UserService";
import {action_ShowNoticeError, action_ShowNoticeSuccess} from "../Notice/_actions";

interface thisState {
  Object?: UserModel,
  EditingObject?: UserModel,
  ErrorCode?: string,
  ErrorMessage?: string
}
class UserDetail extends React.Component<{}, thisState> {
  editingForm: DynamicPanelComponent;

  componentWillMount() {
    this.setState({});
    store.subscribe(() => {
      let st = store.getState();
      this.setState({
        Object: st.Detail,
      });
      if (st.Detail) {
        let editingObject = {...st.Detail};
        if (!this.state.EditingObject || this.state.EditingObject.Id != editingObject.Id) {
          this.setState({
            EditingObject: editingObject,
          });
        }
      } else {
        this.setState({
          EditingObject: null
        });
      }
    });
  }

  render() {
    return (
      <Modal show={!!this.state.EditingObject} onHide={() => this.cancel()}>
        <Modal.Header closeButton>
          <Modal.Title>{this.state.EditingObject && this.state.EditingObject.Id == 0
            ? 'Tạo mới người dùng' : 'Chỉnh sửa người dùng'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.state.EditingObject ?
            <DynamicPanelComponent
              ref={(r) => this.editingForm = r}
              FormStructure={this.getFormStructure()}
              onFieldValueChange={(obj) => this.onFieldValueChange(obj)}
              Object={this.state.EditingObject}
            /> : null}
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-primary" onClick={() => this.save()}>Lưu</button>
        </Modal.Footer>
      </Modal>);
  }

  protected getFormStructure(): DynamicFormModel[] {
    let allForms: DynamicFormModel[] = [];
    {
      let inforForm: DynamicFormModel = {
        Icon: 'fa fa-info',
        Priority: 1,
        Title: 'User Information',
        BlankPanel: true,
        DynamicFields: []
      };
      let f_UserName: DynamicFieldModel = {
        Priority: 1,
        LabelClass: 'col-lg-3',
        InputClass: 'col-lg-9',
        FieldStructure: {
          Name: 'Tên đăng nhập',
          FieldName: 'UserName',
          PlaceHolder: '',
          Type: FieldStructureTypeEnums.TextBox,
          ValidateRules: [{
            Type: ValidateRuleTypeEnums.Required,
            InValidMessage: 'Trường này là bắt buộc'
          },
            {
              Type: ValidateRuleTypeEnums.MinLength,
              InValidMessage: 'Yêu cầu ít nhất 3 ký tự',
              RuleData: '3'
            },
            {
              Type: ValidateRuleTypeEnums.MaxLength,
              InValidMessage: 'Không được vượt quá 50 ký tự',
              RuleData: '50'
            }
          ]
        }
      };
      if (this.state.ErrorCode == "DuplicateUserName") {
        f_UserName.FieldStructure.ValidateRules.push({
          Type: ValidateRuleTypeEnums.NotEquals,
          RuleData: this.state.ErrorMessage,
          InValidMessage:'Tên đăng nhập này đã được sử dụng'
        });
      }
      let f_Password: DynamicFieldModel = {
        Priority: 2,

        LabelClass: 'col-lg-3',
        InputClass: 'col-lg-9',
        FieldStructure: {
          Name: 'Mật khẩu',
          FieldName: 'Password',
          PlaceHolder: '',
          Type: FieldStructureTypeEnums.TextBox,
          ValidateRules: [{
            Type: ValidateRuleTypeEnums.Required,
            InValidMessage: 'Trường này là bắt buộc'
          },
            {
              Type: ValidateRuleTypeEnums.MinLength,
              InValidMessage: 'Yêu cầu ít nhất 6 ký tự',
              RuleData: '6'
            },
            {
              Type: ValidateRuleTypeEnums.MaxLength,
              InValidMessage: 'Không được vượt quá 50 ký tự',
              RuleData: '50'
            }
          ]
        }
      };
      inforForm.DynamicFields.push(f_UserName);
      inforForm.DynamicFields.push(f_Password);
      allForms.push(inforForm);
    }
    return allForms;
  }

  private onFieldValueChange(obj: UserModel) {
    this.setState({
      EditingObject: obj
    });
  }

  private cancel() {
    store.dispatch(action_ViewDetail(null));
    browserHistory.push(AdminRoutePath.UserManagement);
  }

  private async save() {
    if (this.editingForm.isFormValid()) {
      let saveResult = await UserServiceInstance.Create(this.state.EditingObject);
      if (saveResult) {
        if (saveResult.IsSuccess) {
          noticeStore.dispatch(action_ShowNoticeSuccess());
          if (this.state.EditingObject.Id == 0) {
            let request = store.getState().GetGridRequest;
            let response = await UserServiceInstance.Filter(request);
            store.dispatch(action_Filter(request, response));
          }
          store.dispatch(action_ViewDetail(null));
        }
        else {
          if (saveResult.ErrorCode == "DuplicateUserName") {
            this.setState({
              ErrorCode: saveResult.ErrorCode,
              ErrorMessage: this.state.EditingObject.UserName
            });
          }
          else {
            noticeStore.dispatch(action_ShowNoticeError());
          }
        }
      } else {
        noticeStore.dispatch(action_ShowNoticeError());
      }
    }
    this.forceUpdate();
  }
}
export default UserDetail;