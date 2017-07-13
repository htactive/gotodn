import * as React from 'react';
import {GetGridRequestModel, GetGridResponseModel, ReactTable} from "../../../commons/react-table";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {Link} from "react-router";
import {UserModel} from "../../../models/UserModel";
import store from "../../modules/UserManagement/_store";
import {UserServiceInstance} from "../../services/UserService";
import {action_Filter} from "../../modules/UserManagement/_actions";

interface thisState {
  isViewDetail?: boolean,
  GridFilter?: GetGridRequestModel,
  GridData?: GetGridResponseModel
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
      store.dispatch(action_Filter(request,result));
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
    return (<div className={`page-content-inner${this.state.isViewDetail ? ' hidden' : ''}`}>
      {this.renderHeader()}
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="panel panel-default plain toggle panelMove">
            <div className="panel-body">
              <div className="table-toolbar">
                <button className="btn btn-success" onClick={() => this.create()}><i className="fa fa-plus"/> Create
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

                <TableHeaderColumn width="80" dataField="Name"
                                   dataFormat={(r, data) => {
                                     return <Link to={`users/${data.Id}`}> {data.Name}</Link>
                                   }} dataSort={ true }>
                  Name</TableHeaderColumn>
                <TableHeaderColumn width="20" dataField="Action" dataAlign="center"
                                   dataFormat={(r, data) => this.bindActionData(data)} dataSort={ false }>
                  Action</TableHeaderColumn>
              </ReactTable>
            </div>
          </div>
        </div>
      </div>
    </div>);
  }

  private filterRequest(request: GetGridRequestModel) {

  }

  private delete(id: number) {

  }

  private create() {

  }

  private bindActionData(data: UserModel) {
    return (<div className="table--actions-container">
      <button className="btn btn-danger" onClick={() => this.delete(data.Id)}>
        <i className="fa fa-trash" aria-hidden="true">Delete</i>
      </button>
    </div>);
  }
}

export default UserList;