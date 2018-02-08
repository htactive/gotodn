import * as React from 'react';
import {CategoryModel} from "../../../models/CategoryModel";
import {LanguageEnums} from "../../../commons/constant";
interface thisProps {
  Model: CategoryModel,
  IsSelected: boolean,
  changeSelectedCategory: () => void,
  DeleteCategory:(Id: number) => void,
}
interface thisState {
}
class CategoryItem extends React.Component<thisProps, thisState> {
  state = {
    hoverOnDelete: false,
  };

  componentWillMount() {
    this.setState({});
  }

  render() {
    let firstLanguage = this.props.Model.CategoryLanguages
      .sort((a, b) => a.Language - b.Language)
      .filter(t => t.Language == LanguageEnums.English)[0];
    return (
      <a className={`list-group-item${this.props.IsSelected ? ' active' : ''}`}
         onClick={() => this.state.hoverOnDelete || this.props.changeSelectedCategory()}>
        {(firstLanguage ? firstLanguage.Title : 'Chưa đặt tên') }
        <span className="pull-right">
          <button className="btn btn-xs btn-danger"
                  onMouseEnter={() => {this.setState({hoverOnDelete: true})}}
                  onMouseLeave={() => {this.setState({hoverOnDelete: false})}}
                  onClick={() => {this.deleteCategory()}}>
             <i className="fa fa-trash" aria-hidden="true"/></button>
        </span>
      </a>);
  }

  private deleteCategory() {
    this.props.DeleteCategory && this.props.DeleteCategory(this.props.Model.Id);
  }
}


export default CategoryItem;