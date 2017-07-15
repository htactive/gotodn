import * as React from 'react';
import {CategoryModel} from "../../../models/CategoryModel";
import {LanguageEnums} from "../../../commons/constant";
import CategoryLanguageDetail from "./CategoryLanguageDetail";
interface thisState {
}
interface thisProps {
  SelectedCategory: CategoryModel,
  SelectedLanguage: LanguageEnums
}

class CategoryDetail extends React.Component<thisProps, thisState> {
  state: thisState = {};

  setState(state: thisState) {
    super.setState(state);
  }

  render() {
    let languages: { Language: LanguageEnums, Title: string }[] = [
      {Language: LanguageEnums.Vietnamese, Title: 'Tiếng Việt'},
      {Language: LanguageEnums.English, Title: 'Tiếng Anh'}
    ];
    return (
      <div className="col-lg-8 cate-right-form">
        <h3>Xem thông tin chi tiết danh mục</h3>
        <hr/>
        {this.props.SelectedCategory != null ?
          <div className="col-lg-12 col-sm-12 form-horizontal">
            <div className="tabs mb20">
              <ul className="nav nav-tabs">
                {
                  languages.map(x =>
                    <li
                      className={(this.props.SelectedLanguage || LanguageEnums.Vietnamese) == x.Language ? 'active' : ''}>
                      <a onClick={() => this.setState({
                        SelectedLanguage: x.Language
                      })}>{x.Title}</a>
                    </li>)
                }
              </ul>
              <div className="tab-content">
                {
                  languages.map(lang => {
                    let language = this.props.SelectedCategory.CategoryLanguages.filter(x => x.Language == lang.Language)[0];
                    language = language || {
                        Id: 0,
                        Language: lang.Language
                      };
                    return <CategoryLanguageDetail IsSelected={lang.Language == this.props.SelectedLanguage}
                                                   CategoryLanguage={language}
                    />
                  })
                }
              </div>
            </div>
            <hr/>
            <div className="form-group">
              <button className="btn btn-danger"
                      onClick={() => this.deleteCategory()}><i
                className="fa fa-trash-o"/> Xóa
              </button>
            </div>
          </div> :
          <div className="col-lg-12 col-sm-12 form-horizontal">
            <div className="form-group">
              <span className="help-block">Click vào danh mục để xem thông tin chi tiết</span>
            </div>
          </div>
        }
      </div>
    )
  }

  private deleteCategory() {

  }

  private discardChangesEditing() {

  }

  private saveCategory() {

  }
}

export  default CategoryDetail;