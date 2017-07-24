import * as React from 'react';
import {GetGridRequestModel, GetGridResponseModel, ReactTable} from "../../../commons/react-table";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Link} from "react-router";
import {UserModel} from "../../../models/UserModel";
import store from "../../modules/UserManagement/_store";
import noticeStore from '../../components/Notice/_store';
import {UserServiceInstance} from "../../services/UserService";
import {action_ChangeUserStatus, action_Filter, action_ViewDetail} from "../../modules/UserManagement/_actions";
import {SweetAlertResultEnums, SweetAlerts, SweetAlertTypeEnums} from "../../../commons/sweet-alerts";
import {action_ShowNoticeError, action_ShowNoticeSuccess} from "../Notice/_actions";
import {AdminRoutePath, RoleTypeEnums, UserStatusEnums} from "../../../commons/constant";
import UserPassword from "./UserPassword";

interface thisState {
  isViewDetail?: boolean,
  GridFilter?: GetGridRequestModel,
  GridData?: GetGridResponseModel,
  UserForChangePassword?: UserModel
}

class UserList extends React.Component<{}, thisState> {
  componentWillMount() {
    this.setState({
      GridFilter: {
        CurrentPage: 1,
        IsAsc: false,
        SortExpression: "Id",
        PageSize: 10
      }
    });
    store.subscribe(() => {
      let state = store.getState();
      this.setState({
        GridFilter: state.GetGridRequest,
        GridData: state.GetGridResponse,
        isViewDetail: !!state.Detail
      })
    });
  }

  componentDidMount() {
    (async () => {
      let request: GetGridRequestModel = {
        CurrentPage: 1,
        IsAsc: false,
        SortExpression: "Id",
        PageSize: 10
      };
      let result = await UserServiceInstance.Filter(request);
      store.dispatch(action_Filter(request, result));
    })();
  }

  renderHeader() {
    return (<div id="page-header" className="clearfix">
      <div className="page-header">
        <h2>Người dùng</h2>
        <span className="txt">Quản lý người dùng</span>
      </div>
      <div className="header-stats">
      </div>
    </div>);
  }

  render() {
    return (<div className={`page-content-inner`}>
      {this.renderHeader()}
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="panel panel-default plain toggle panelMove">
            <div className="panel-body">
              <div className="table-toolbar">
                <button className="btn btn-primary" onClick={() => this.create()}><i className="fa fa-plus"/> Thêm người
                  dùng
                </button>
              </div>
              <ReactTable request={this.state.GridFilter}
                          data={this.state.GridData}
                          trClassName={(d) => {
                            return ""
                          }}
                          defaultSortName={"Id"}
                          defaultSortOrder={false}
                          onFilterRequest={(request) => {
                            this.filterRequest(request);
                          }}
              >

                <TableHeaderColumn width="60" dataField="Name"
                                   dataFormat={(r, data: UserModel) => {
                                     return data.UserName;
                                   }} dataSort={ true }>
                  Tên đăng nhập</TableHeaderColumn>
                <TableHeaderColumn width="20" dataField="UserStatusId" dataAlign="center"
                                   dataFormat={(r, data) => this.bindToggleUserStatusData(data)} dataSort={ true }>
                  Đang hoạt động?</TableHeaderColumn>
                <TableHeaderColumn width="40" dataField="Action" dataAlign="center"
                                   dataFormat={(r, data) => this.bindActionData(data)} dataSort={ false }>
                  Thao tác</TableHeaderColumn>
              </ReactTable>
            </div>
          </div>
        </div>
      </div>
      <UserPassword onUpdate={(pass) => this.doChangePassword(pass)}
                    onCancel={() => this.setState({
                      UserForChangePassword: null
                    })}
                    User={this.state.UserForChangePassword}
      />
    </div>);
  }

  private bindToggleUserStatusData(data: UserModel) {
    let isSA = (data.UserRoles && data.UserRoles.some(x => x.Role && x.Role.RoleType == RoleTypeEnums.SuperAdmin));
    return (
      <div className={`toggle-custom${
        isSA ? ' disabled' : ''}`}>
        <label className="toggle" data-on="ON" data-off="OFF">
          <input type="checkbox"
                 checked={data.UserStatusId == UserStatusEnums.Active}
                 onChange={(v) => isSA ? null : this.toggleUserStatus(data, v.target.checked)}/>
          <span className="button-checkbox"/>
        </label>
      </div>
    );
  }

  private async toggleUserStatus(data: UserModel, checked: boolean) {
    data.UserStatusId = checked ? UserStatusEnums.Active : UserStatusEnums.Deactive;
    let saveResult = await UserServiceInstance.ChangeUserStatus(data);
    if (saveResult) {
      if (saveResult.IsSuccess) {
        noticeStore.dispatch(action_ShowNoticeSuccess());
        store.dispatch(action_ChangeUserStatus(data));
      }
      else {
        if (saveResult.ErrorCode == "DuplicateUserName") {
        }
        else {
          noticeStore.dispatch(action_ShowNoticeError());
        }
      }
    } else {
      noticeStore.dispatch(action_ShowNoticeError());
    }
  }


  private async filterRequest(request: GetGridRequestModel) {
    let result = await UserServiceInstance.Filter(request);
    store.dispatch(action_Filter(request, result));
  }

  private async delete(id: number) {
    if (await SweetAlerts.show({
        type: SweetAlertTypeEnums.Warning,
        title: 'Xác nhận xóa',
        text: 'Bạn có chắc muốn xóa người dùng này?',
        showCancelButton: true,
        confirmButtonText: 'Đồng ý xóa',
        closeOnConfirm: true
      }) == SweetAlertResultEnums.Confirm) {

      let deleteResult = await UserServiceInstance.Delete({Id: id});
      if (deleteResult) {
        if (deleteResult.IsSuccess) {
          noticeStore.dispatch(action_ShowNoticeSuccess());
          let request = store.getState().GetGridRequest;
          let result = await UserServiceInstance.Filter(request);
          store.dispatch(action_Filter(request, result));
        }
        else {
          noticeStore.dispatch(action_ShowNoticeError());
        }
      } else {
        noticeStore.dispatch(action_ShowNoticeError());
      }
    }
  }

  private create() {
    let model: UserModel = {
      Id: 0
    };
    store.dispatch(action_ViewDetail(model));
  }

  private bindActionData(data: UserModel) {
    return (<div className="table--actions-container">
      <button className="btn btn-primary" onClick={() => this.changePassword(data)}>
        <i className="fa fa-trash" aria-hidden="true">Đổi mật khẩu</i>
      </button>
      <button className="btn btn-danger" onClick={() => this.delete(data.Id)}>
        <i className="fa fa-trash" aria-hidden="true">Xóa</i>
      </button>
    </div>);
  }

  private changePassword(model: UserModel) {
    this.setState({
      UserForChangePassword: model
    });
  }

  private async doChangePassword(pass: string) {
    let model: UserModel = {Id: this.state.UserForChangePassword.Id, Password: pass};
    let saveResult = await UserServiceInstance.ChangeUserPassword(model);
    if (saveResult) {
      if (saveResult.IsSuccess) {
        noticeStore.dispatch(action_ShowNoticeSuccess());
        this.setState({
          UserForChangePassword: null
        });
      }
      else {
        noticeStore.dispatch(action_ShowNoticeError());

      }
    } else {
      noticeStore.dispatch(action_ShowNoticeError());
    }
  }
}

export default UserList;