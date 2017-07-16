import * as React from 'react';
import {CategoryModel} from "../../../models/CategoryModel";
import {LanguageEnums} from "../../../commons/constant";
import CategoryLanguageDetail from "./CategoryLanguageDetail";
import {CategoryLanguageModel} from "../../../models/CategoryLanguageModel";
interface thisProps {
  SelectedCategory: CategoryModel,
  SelectedLanguage: LanguageEnums,
  ChangeSelectedLanguage: (l: LanguageEnums) => void,
  OnCategoryLanguageChange: (destination: CategoryLanguageModel) => void,
  SaveCategory: (model: CategoryModel) => void,
  DeleteCategory: (Id: number) => void,
}

class CategoryDetail extends React.Component<thisProps, {}> {

  componentWillReceiveProps(props: thisProps) {
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
                  this.props.SelectedCategory.CategoryLanguages.map(x => <li
                    className={(this.props.SelectedLanguage || LanguageEnums.English) == x.Language ? 'active' : ''}>
                    <a onClick={() => this.props.ChangeSelectedLanguage(x.Language)}>
                      {languages.filter(r => r.Language == x.Language)[0].Title}</a>
                  </li>)
                }
              </ul>
              <div className="tab-content">
                {
                  this.props.SelectedCategory.CategoryLanguages.map(x => {
                    return <CategoryLanguageDetail IsSelected={x.Language == this.props.SelectedLanguage}
                                                   CategoryLanguage={x}
                                                   OnObjectChange={(obj: CategoryLanguageModel) =>
                                                     this.props.OnCategoryLanguageChange(obj)}
                    />
                  })
                }
              </div>
            </div>
            <hr/>
            <div className="form-group">
              <button className="btn btn-danger pull-right"
                      onClick={() => this.deleteCategory()}><i
                className="fa fa-trash-o"/> Xóa
              </button>

              <button className="btn btn-primary"
                      onClick={() => this.saveCategory()}>Lưu
              </button>

              <div className="btn-group dropup mr10 ml10">
                <button type="button" className="btn btn-success dropdown-toggle"
                        data-toggle="dropdown" aria-expanded="false">
                  Thêm ngôn ngữ
                  <span className="caret"></span>
                </button>
                <ul className="dropdown-menu left animated fadeIn" role="menu">
                  <li>
                    <a href="#">Tiếng Anh</a>
                  </li>
                  <li>
                    <a href="#">Tiếng Hàn</a>
                  </li>
                  <li>
                    <a href="#">Tiếng Trung</a>
                  </li>
                  <li>
                    <a href="#">Tiếng Pháp</a>
                  </li>
                </ul>
              </div>

              <button className="btn btn-default pull-right hidden"
                      onClick={() => this.discardChangesEditing()}>Làm lại
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
    this.props.DeleteCategory && this.props.DeleteCategory(this.props.SelectedCategory.Id);
  }

  private discardChangesEditing() {

  }

  private saveCategory() {
    let isInvalid = false;
    let firstInvalid: CategoryLanguageModel = null;
    this.props.SelectedCategory.CategoryLanguages.forEach(x => {
      x['__#validated#__'] = true;
      if (x['__#isInvalid#__']) {
        firstInvalid = firstInvalid || x;
      }
      isInvalid = isInvalid || x['__#isInvalid#__'];
    });
    if (isInvalid) {
      this.props.ChangeSelectedLanguage(firstInvalid.Language);
      return;
    }
    // if is valid, do submit here
    console.log('congratulation! your form is valid, do submit now ' + this.props.SelectedCategory);
    this.props.SaveCategory && this.props.SaveCategory(this.props.SelectedCategory);
  }
}

export  default CategoryDetail;