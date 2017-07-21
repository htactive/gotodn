import * as React from 'react';
import {CategoryModel} from "../../../models/CategoryModel";
import CategoryItem from "./CategoryItem";
import {LanguageEnums} from "../../../commons/constant";

interface thisProps {
  Categories: CategoryModel[],
  SelectedCategory: CategoryModel,
  ChangeSelectedCategory: (model: CategoryModel) => void,
  CreateCategory: () => void,
}
interface thisState {
  Search?: string,
  Categories?: CategoryModel[]
}

class CategoryList extends React.Component<thisProps, thisState> {
  state: thisState = {Search: ''};

  componentWillMount() {
    this.componentWillReceiveProps(this.props.Categories);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.Categories) {
      this.filterCategories(this.state.Search, nextProps.Categories);
    }
  }

  private createCategory() {
    this.props.CreateCategory && this.props.CreateCategory();
  }

  render() {
    return (
      <div className="col-lg-4">
        <h3>Danh sách danh mục</h3>
        <hr/>
        <div className="form-group" style={{position: 'relative'}}>
          <input value={this.state.Search} onChange={(e) => this.handleSearch(e)} type="text" className="form-control"
                 placeholder="Tìm kiếm danh mục..."/>
          {this.state.Search != '' &&
          <a onClick={() => this.clearSearch()} style={{position: 'absolute', top: 6, right: 8, zIndex: 2, color: '#555555'}}><i className="fa fa-times"/></a>}
        </div>
        <ul className="list-group">
          {this.state.Categories ? this.state.Categories.map(x =>
              <CategoryItem key={x.Id} Model={x}
                            IsSelected={this.props.SelectedCategory && x.Id == this.props.SelectedCategory.Id}
                            changeSelectedCategory={() => this.props.ChangeSelectedCategory(x)}
              />) : null}
        </ul>
        <hr/>
        <div className="form-group">
          <button className="btn btn-primary"
                  onClick={() => this.createCategory()}><i
            className="fa fa-plus"/> Thêm danh mục
          </button>
        </div>
      </div>
    );
  }

  private handleSearch(e: any) {
    let text = e.target.value;
    this.filterCategories(text, this.props.Categories);
    this.setState({
      Search: text,
    })
  }

  private filterCategories(text, categories) {
    let tempCates =categories.slice();
    let filters = tempCates.filter(t => {
      let firstLanguage = t.CategoryLanguages
        .sort((a, b) => a.Language - b.Language)
        .filter(t => t.Language == LanguageEnums.English)[0];
      return (text.trim() == '') || firstLanguage.Title.toLowerCase().indexOf(text.toLowerCase()) != -1
    });
    this.setState({
      Categories: filters
    })
  }

  private clearSearch() {
    this.filterCategories('', this.props.Categories);
    this.setState({
      Search: ''
    })
  }
}

export default CategoryList;