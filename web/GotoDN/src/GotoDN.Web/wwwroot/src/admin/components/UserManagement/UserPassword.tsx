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
interface PasswordModel {
  Password?: string,
}
interface thisState {
  Password: PasswordModel
}
interface thisProps {
  User: UserModel,
  onCancel: () => void,
  onUpdate: (password: string) => void
}
class UserPassword extends React.Component<thisProps, thisState> {
  componentWillMount() {
    this.setState({
      Password: {}
    });
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(props: thisProps) {
    this.setState({
      Password: {}
    });
  }

  render() {
    return (
      <Modal show={!!this.props.User} onHide={() => this.cancel()}>
        <Modal.Header closeButton>
          <Modal.Title>Thay đổi mật khẩu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.state.Password ?
            <DynamicPanelComponent
              ref={(r) => this.editingForm = r}
              FormStructure={this.getFormStructure()}
              onFieldValueChange={(obj) => this.onFieldValueChange(obj)}
              Object={this.state.Password}
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
      inforForm.DynamicFields.push(f_Password);
      allForms.push(inforForm);
    }
    return allForms;
  }

  private onFieldValueChange(obj: PasswordModel) {
    this.setState({
      Password: obj
    });
  }

  editingForm: DynamicPanelComponent;

  private cancel() {
    this.props.onCancel();
  }

  private async save() {
    if (this.editingForm.isFormValid()) {
      this.props.onUpdate(this.state.Password.Password);
    }
    this.forceUpdate();
  }
}
export default UserPassword;