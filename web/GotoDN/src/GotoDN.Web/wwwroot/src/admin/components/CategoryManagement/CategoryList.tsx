import * as React from 'react';
import {CategoryModel} from "../../../models/CategoryModel";
import CategoryItem from "./CategoryItem";

interface thisProps {
  Categories: CategoryModel[],
  SelectedCategory: CategoryModel,
  ChangeSelectedCateogry: (model: CategoryModel) => void
}
interface thisState {

}

class CategoryList extends React.Component<thisProps, thisState> {
  state: thisState = {};

  componentWillMount() {
  }

  render() {
    return (
      <div className="col-lg-4">
        <h3>Danh sách danh mục</h3>
        <hr/>
        <ul className="list-group">
          {this.props.Categories ? this.props.Categories.map(x =>
            <CategoryItem key={x.Id} Model={x}
                          IsSelected={this.props.SelectedCategory && x.Id == this.props.SelectedCategory.Id}
                          changeSelectedCategory={() => this.props.ChangeSelectedCateogry(x)}
            />) : null}
        </ul>
      </div>
    );
  }
}

export default CategoryList;