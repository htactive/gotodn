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
    SelectedLanguage: LanguageEnums.English,
    Categories: [],
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

  private async createCategory() {
    let result = await CategoryServiceInstance.CreateCategory();
    if (result) {
      if (this.state.Categories) {
        this.state.Categories.push(result);
        this.setState({
          SelectedCategory: result,
          SelectedLanguage: result.CategoryLanguages ? result.CategoryLanguages[0].Language : LanguageEnums.English,
        });
        this.forceUpdate();
      }
    }
  }

  private async updateCategory(model: CategoryModel) {
    let result = await CategoryServiceInstance.UpdateCategory(model);
    if (result) {

    }
  }

  private async deleteCategory(Id: number) {
    let result = await CategoryServiceInstance.DeleteCategory(Id);
    if (result) {
      this.setState({
        Categories: this.state.Categories.filter(x => x.Id != Id),
        SelectedCategory: null,
        SelectedLanguage: null
      });
    }
  }

  private async addCategoryLanguage(lang: LanguageEnums) {
    let categoryLanguage: CategoryLanguageModel = {
      Id: 0,
      Title: "",
      CategoryId: this.state.SelectedCategory.Id,
      Language: lang,
    };

    let result = await CategoryServiceInstance.AddLanguage(categoryLanguage);
    if (result) {
      this.state.SelectedCategory.CategoryLanguages.push(result);
      this.setState({
        SelectedLanguage: lang,
      });
    }
  }

  private async deleteCategoryLanguage(Id: number) {
    let result = await CategoryServiceInstance.DeleteLanguage(Id);
    if (result) {
      this.state.SelectedCategory.CategoryLanguages = this.state.SelectedCategory.CategoryLanguages
        .filter(x => x.Id != Id);
      this.setState({SelectedLanguage: LanguageEnums.English})
      this.forceUpdate();
    }
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
                                ChangeSelectedCateogry={(model) => this.setState({
                                  SelectedCategory: model,
                                  SelectedLanguage: LanguageEnums.English,
                                })}
                                CreateCategory={() => this.createCategory()}
                  />
                  <CategoryDetail SelectedCategory={this.state.SelectedCategory}
                                  SelectedLanguage={this.state.SelectedLanguage}
                                  ChangeSelectedLanguage={(language) => this.setState({
                                    SelectedLanguage: language
                                  })}
                                  OnCategoryLanguageChange={(obj: CategoryLanguageModel) => {
                                    for (let i = 0; i < this.state.SelectedCategory.CategoryLanguages.length; i++) {
                                      if (this.state.SelectedCategory.CategoryLanguages[i].Language == obj.Language) {
                                        this.state.SelectedCategory.CategoryLanguages[i] = obj;
                                        break;
                                      }
                                    }
                                    this.forceUpdate();
                                  }}
                                  SaveCategory={(model) => this.updateCategory(model)}
                                  DeleteCategory={(Id: number) => this.deleteCategory(Id)}
                                  AddCategoryLanguage={(lang: LanguageEnums) => this.addCategoryLanguage(lang)}
                                  DeleteCategoryLanguage={(Id: number) => this.deleteCategoryLanguage(Id)}
                                  ChangeEvent={(check: boolean) => {
                                    this.state.SelectedCategory.IsEvent = check;
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