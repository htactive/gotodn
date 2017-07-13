import * as React from 'react';
import {UserModel} from "../../../models/UserModel";
import store from "../../modules/UserManagement/_store";
import {DynamicPanelComponent} from "../DynamicForm/DynamicPanelComponent";
import {Link, browserHistory} from 'react-router';
import {AdminRoutePath, RoleTypeEnums} from "../../../commons/constant";
import UserManagement from "../../modules/UserManagement/UserManagement";
import {DynamicFormModel} from "../../../models/dynamic-form-model";
import {DynamicFieldModel} from "../../../models/dynamic-field-model";
import {FieldStructureTypeEnums} from "../../../models/field-structure-model";

interface thisState {
  Object?: UserModel,
  EditingObject?: UserModel,
}
class UserDetail extends React.Component<{}, thisState> {
  editingForm: DynamicPanelComponent;

  componentWillMount() {
    this.setState({});
    store.subscribe(() => {
      let st = store.getState();
      this.setState({
        Object: st.Detail,
      }, () => this.editingForm && this.editingForm.isFormValid());
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

  protected renderHeader(): JSX.Element {
    return (<div id="page-header" className="clearfix">
      <button type="button" className="btn btn-sm btn-danger btn-round btn-alt mr15 mt25 pull-left"
              onClick={() => this.cancel()}>
        <i className="fa fa-arrow-left"/>
      </button>
      <div className="page-header">
        <h2>{this.state.Object.UserName}</h2>
      </div>
    </div>);
  }

  render() {
    if (!this.state.Object)return null;
    return null;
  }

  private cancel() {

  }
}
export default UserDetail;