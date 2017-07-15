import * as React from 'react';
import CategoryList from "../../components/CategoryManagement/CategoryList";
import {CategoryServiceInstance} from "../../services/CategoryService";
import CategoryDetail from "../../components/CategoryManagement/CategoryDetail";
import {CategoryModel} from "../../../models/CategoryModel";
import {LanguageEnums} from "../../../commons/constant";
import {CategoryLanguageModel} from "../../../models/CategoryLanguageModel";
interface thisState {
  Categories?: CategoryModel[],
  SelectedCategory?: CategoryModel,
  SelectedLanguage?: LanguageEnums
}
class CategoryManagement extends React.Component<{}, thisState> {
  state: thisState = {
    SelectedLanguage: LanguageEnums.Vietnamese
  };

  setState(state: thisState) {
    super.setState(state);
  }

  componentDidMount() {
    (async () => {
      this.setState({
        Categories: await CategoryServiceInstance.GetAll()
      });
    })();
  }

  render() {
    return (
      <div className="page-content-wrapper">
        <div className={`page-content-inner`}>
          <div id="page-header" className="clearfix">
            <div className="page-header">
              <h2>Danh mục</h2>
              <span className="txt">Quản lý danh mục</span>
            </div>
            <div className="header-stats">
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="panel panel-default plain toggle panelMove">
                <div className="panel-body">
                  <CategoryList Categories={this.state.Categories}
                                SelectedCategory={this.state.SelectedCategory}
                                ChangeSelectedCateogry={(model) => this.setState({SelectedCategory: model})}
                  />
                  <CategoryDetail SelectedCategory={this.state.SelectedCategory}
                                  SelectedLanguage={this.state.SelectedLanguage}
                                  ChangeSelectedLanguage={(language) => this.setState({
                                    SelectedLanguage: language
                                  })}
                                  OnCategoryLanguageChange={(obj: CategoryLanguageModel) => {
                                    for (let i = 0; i < this.state.SelectedCategory.CategoryLanguages.length; i++) {
                                      if(this.state.SelectedCategory.CategoryLanguages[i].Language == obj.Language){
                                        this.state.SelectedCategory.CategoryLanguages[i] = obj;
                                        break;
                                      }
                                    }
                                    this.forceUpdate();
                                  }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default CategoryManagement;