import * as React from 'react';
import {HTServiceModel} from "../../../models/HTServiceModel";
import HTServiceItem from "./ServiceItem";
import {LanguageEnums} from "../../../commons/constant";

interface thisProps {
  HTServices: HTServiceModel[],
  SelectedHTService: HTServiceModel,
  ChangeSelectedService: (model: HTServiceModel) => void,
  CreateHTService: () => void,
}
interface thisState {
  Search?: string,
  Services?: HTServiceModel[]
}

class HTServiceList extends React.Component<thisProps, thisState> {
  state: thisState = {Search: ''};

  componentWillMount() {
    this.componentWillReceiveProps(this.props.HTServices);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.HTServices) {
      this.filterCategories(this.state.Search, nextProps.HTServices);
    }
  }

  private createHTService() {
    this.props.CreateHTService && this.props.CreateHTService();
  }

  render() {
    return (
      <div className="col-lg-4">
        <h3>Danh sách dịch vụ</h3>
        <hr/>
        <div className="form-group" style={{position: 'relative'}}>
          <input value={this.state.Search} onChange={(e) => this.handleSearch(e)} type="text" className="form-control"
                 placeholder="Tìm kiếm dịch vụ..."/>
          {this.state.Search != '' &&
          <a onClick={() => this.clearSearch()} style={{position: 'absolute', top: 6, right: 8, zIndex: 2, color: '#555555'}}><i className="fa fa-times"/></a>}
        </div>
        <ul className="list-group">
          {this.state.Services ? this.state.Services.map(x =>
            <HTServiceItem key={x.Id} Model={x}
                          IsSelected={this.props.SelectedHTService && x.Id == this.props.SelectedHTService.Id}
                          changeSelectedHTService={() => this.props.ChangeSelectedService(x)}
            />) : null}
        </ul>
        <hr/>
        <div className="form-group">
          <button className="btn btn-primary"
                  onClick={() => this.createHTService()}><i
            className="fa fa-plus"/> Thêm dịch vụ
          </button>
        </div>
      </div>
    );
  }

  private handleSearch(e: any) {
    let text = e.target.value;
    this.filterCategories(text, this.props.HTServices);
    this.setState({
      Search: text,
    })
  }

  private filterCategories(text, services) {
    let tempCates =services.slice();
    let filters = tempCates.filter(t => {
      let firstLanguage = t.HTServiceLanguages
        .sort((a, b) => a.Language - b.Language)
        .filter(t => t.Language == LanguageEnums.English)[0];
      return (text.trim() == '') || firstLanguage.Title.toLowerCase().indexOf(text.toLowerCase()) != -1
    });
    this.setState({
      Services: filters
    })
  }

  private clearSearch() {
    this.filterCategories('', this.props.HTServices);
    this.setState({
      Search: ''
    })
  }
}

export default HTServiceList;