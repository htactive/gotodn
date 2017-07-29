import * as React from 'react';
import {BootstrapTable, TableHeaderColumn, SizePerPageDropDown} from 'react-bootstrap-table';

interface thisProps {
  data: GetGridResponseModel,
  request: GetGridRequestModel,
  trClassName?: (d: any) => string,
  defaultSortName?: string,
  defaultSortOrder?: boolean,
  onFilterRequest: (request: GetGridRequestModel) => void
}

class ReactTableSearchPanel extends React.Component<any, { search?: string }> {
  componentWillMount() {
    this.setState({
      search: '',
    });
  }

// It's necessary to implement getValue
  getValue() {
    return this.state.search;
  }

  // It's necessary to implement setValue
  setValue(value) {
    this.setState({
      search: value
    });
  }

  render() {
    return (
      <div className="col-lg-12 col-md-12" style={{paddingRight: 0}}>
        <div className="input-group input-group-sm">
          <input type="text" className="form-control" placeholder="Search..."
                 onChange={(e) => this.setState({search: e.target.value.toLowerCase()})}
                 onKeyDown={(e) => {
                   e.keyCode == 13 && this.props.search(e)
                 }}/>

          <span className="input-group-btn">
            <button className="btn btn-default" onClick={(e) => this.props.search(e)} type="button"><i
              className="fa fa-search"/></button>
          </span>

        </div>
      </div>);
  }
}

export class ReactTable extends React.Component<thisProps, {}> {
  componentWillMount() {
    this.setState({});
  }

  renderShowsTotal(start, to, total) {
    return (
      <p style={ { color: '#1a1a1a' } }>
        Hiển thị bảng ghi <b>{ start }</b> đến <b>{ to }</b> trên tổng số <b>{ total }</b>&nbsp;&nbsp;
      </p>
    );
  }

  render() {
    if (!this.props.data) return null;
    return (<BootstrapTable data={this.props.data.DataSource || []}
                            keyField="Id"
                            trClassName={(d) => this.props.trClassName(d)}
                            remote={true}
                            hover={true}
                            pagination={true}
                            fetchInfo={{dataTotalSize: this.props.data.TotalRecord}}
                            search={true}
                            options={{
                              noDataText: "There is no record to display",
                              sizePerPage: this.props.request.PageSize,
                              onPageChange: (pageNumber, pageSize) => this.onPageChange(pageNumber, pageSize),
                              onSortChange: (sortName, sortOrder) => this.onSortChange(sortName, sortOrder),
                              onFilterChange: (column) => this.onFilterChange(column),
                              sizePerPageList: [10, 15, 20, 25, 30],
                              page: this.props.request.CurrentPage,
                              sizePerPageDropDown: () => {
                                return <SizePerPageDropDown variation={"dropup"}/>
                              },
                              searchField: (props) => (<ReactTableSearchPanel { ...props }/>),
                              onSearchChange: (searchText, colInfos, multiColumnSearch) => this.onSearchChange(searchText, colInfos, multiColumnSearch),
                              defaultSortName: this.props.defaultSortName || 'Id',
                              defaultSortOrder: this.props.defaultSortOrder || 'desc',
                              paginationShowsTotal: this.renderShowsTotal,
                            }}>

      {this.props.children}
    </BootstrapTable>);
  }

  private async onPageChange(pageNumber: number, pageSize: number) {
    let request: GetGridRequestModel = {...this.props.request};
    request.PageSize = pageSize;
    request.CurrentPage = pageNumber;
    await this.sendRequest(request);
  }

  private async onSortChange(sortName: string, sortOrder: string) {
    let request = {...this.props.request};
    request.IsAsc = sortOrder === 'asc';
    request.SortExpression = sortName;
    await this.sendRequest(request);
  }

  private async onSearchChange(searchText: any, colInfos: any, multiColumnSearch: any) {
    let request = {...this.props.request};
    request.CurrentPage = 1;
    request.Search = searchText;
    await this.sendRequest(request);
  }

  private async onFilterChange(filterObj) {
    let request: GetGridRequestModel = {...this.props.request};
    request.Parameters = [];
    if (Object.keys(filterObj).length === 0) {
      return await this.sendRequest(request);;
    }

    for (const key in filterObj) {
      switch (filterObj[key].type) {
        case 'NumberFilter': {
          let filterValue = filterObj[key].value.number;
          let filter = {Key: key, Value: filterValue};
          request.Parameters.push(filter);
          break;
        }
        default: {
          let filterValue = (typeof filterObj[key].value === 'string') ? filterObj[key].value.toLowerCase() : filterObj[key].value;
          let filter = {Key: key, Value: filterValue};
          request.Parameters.push(filter);
          break;
        }
      }
    }
    await this.sendRequest(request);
  }

  private sendRequest(request: GetGridRequestModel) {
    this.props.onFilterRequest(request);
  }
}

export interface GetGridRequestModel {
  CurrentPage?: number;
  PageSize?: number;
  SortExpression?: string;
  IsAsc?: boolean;
  Search?: string;
  GridColumnFilterRequest?: GridColumnFilterRequest[];
  Parameters?: { Key: string, Value: any }[]
}

export interface GetGridResponseModel {
  TotalRecord: number;
  DataSource: any[];
}

export interface GridColumnFilterRequest {
  ColumnName?: string;
  FilterValue?: string[];
}