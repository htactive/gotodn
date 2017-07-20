import * as React from 'react';
import {CategoryModel} from "../../../models/CategoryModel";
import {LanguageEnums} from "../../../commons/constant";
interface thisProps {
  Model: CategoryModel,
  IsSelected: boolean,
  changeSelectedCategory: () => void,
}
interface thisState {
}
class CategoryItem extends React.Component<thisProps, thisState> {
  componentWillMount() {
    this.setState({});
  }

  render() {
    let firstLanguage = this.props.Model.CategoryLanguages
                          .sort((a, b) => a.Language - b.Language)
                          .filter(t => t.Language == LanguageEnums.English)[0];
    return (
      <a className={`list-group-item${this.props.IsSelected ? ' active' : ''}`}
         onClick={() => this.props.changeSelectedCategory()}>
        {(firstLanguage ? firstLanguage.Title : '') }
      </a>);
  }
}


export default CategoryItem;