import * as React from 'react';
import {HTServiceModel} from "../../../models/HTServiceModel";
import HTServiceItem from "./ServiceItem";
import {LanguageEnums} from "../../../commons/constant";
import {CategoryModel} from "../../../models/CategoryModel";
import * as _ from 'lodash';
import {CategoryServiceInstance} from "../../services/CategoryService";

interface thisProps {
  HTServices: HTServiceModel[],
  SelectedHTService: HTServiceModel,
  ChangeSelectedService: (model: HTServiceModel) => void,
  CreateHTService: () => void,
  Categories: CategoryModel[]
}
interface thisState {
  Search?: string,
  Services?: HTServiceModel[],
  Categories?: CategoryModel[]
}

class HTServiceList extends React.Component<thisProps, thisState> {
  state: thisState = {Search: ''};

  componentWillMount() {
    this.componentWillReceiveProps(this.props.HTServices);
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.HTServices) {
      this.filterCategories(this.state.Search, nextProps.HTServices);
      // let cates = await CategoryServiceInstance.GetAll();
      // cates = cates.filter(c => c.HTServices && c.HTServices.length > 0);

    }
  }

  private createHTService() {
    this.props.CreateHTService && this.props.CreateHTService();
  }

  render() {
    let groupServices = [];
    if (this.state.Services) {
      let services = this.state.Services.slice();
      groupServices = _.chain(services).groupBy('CategoryId').map((value, key) => {
        let category = this.props.Categories.filter(c =>key != 'null' && c.Id == key)[0];
        return {
          Category: key,
          Services: value,
          CategoryName: key != 'null' && category ? category.CategoryLanguages.filter(c => c.Language == LanguageEnums.English)[0].Title : ''
        }
      })
        .value();
    }
    let flatGroupService = [];
    for (let i = 0; i < groupServices.length; i++) {
      flatGroupService.push({IsCategory: true, Title: groupServices[i].CategoryName});
      for (let j = 0; j < groupServices[i].Services.length; j++) {
        flatGroupService.push({IsCategory: false, ...groupServices[i].Services[j]})
      }
    }
    return (
      <div className="col-lg-4">
        <h3>Danh sách dịch vụ</h3>
        <hr/>
        <div className="form-group">
          <button className="btn btn-primary"
                  onClick={() => this.createHTService()}><i
            className="fa fa-plus"/> Thêm dịch vụ
          </button>
        </div>
        <div className="form-group" style={{position: 'relative'}}>
          <input value={this.state.Search} onChange={(e) => this.handleSearch(e)} type="text" className="form-control"
                 placeholder="Tìm kiếm dịch vụ..."/>
          {this.state.Search != '' &&
          <a onClick={() => this.clearSearch()}
             style={{position: 'absolute', top: 6, right: 8, zIndex: 2, color: '#555555'}}><i className="fa fa-times"/></a>}
        </div>
        <ul className="list-group">
          {flatGroupService ? flatGroupService.map((gs, id) =>
              gs.IsCategory ? <li key={id} className="list-group-item category-title">{gs.Title || " "}</li> :
                <HTServiceItem key={id} Model={gs}
                               IsSelected={this.props.SelectedHTService && gs.Id == this.props.SelectedHTService.Id}
                               changeSelectedHTService={() => this.props.ChangeSelectedService(gs)}
                />
            ) : null}
        </ul>
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
    let tempCates = services.slice();
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