import * as React from 'react';
import {AdminRoutePath, LoginResponseEnums, ValidateRuleTypeEnums} from "../../../../commons/constant";
import {Validation} from "../../../../commons/validate-helper";
import {UserServiceInstance} from "../../../services/UserService";
import {browserHistory} from 'react-router';

interface thisState {
  UserName?: string,
  UserName_IsInvalid?: boolean,
  UserName_InvalidMessage?: string,
  Password?: string,
  Password_IsInvalid?: boolean,
  Password_InvalidMessage?: string
}

class Login extends React.Component<{}, thisState> {
  componentWillMount() {
    this.setState({});
  }

  render() {
    return (
      <div className="login-page">
        <div className="container login-container">
          <div className="login-panel panel panel-default plain animated bounceIn">
            <div className="panel-heading">
              <h4 className="panel-title text-center">
                <img id="logo" src="/images/logo-dark.png" alt="Dynamic logo"/>
              </h4>
            </div>
            <div className="panel-body">
              <div className="form-horizontal mt0" id="login-form" role="form">
                <div className={`form-group${this.state.UserName_IsInvalid ? ' has-error' : ''}`}>
                  <div className="col-lg-12">
                    <div className="input-group input-icon">
                      <span className="input-group-addon"><i className="fa fa-envelope"></i></span>
                      <input type="text" className="form-control"
                             value={this.state.UserName} placeholder="Tên đăng nhập"/>
                    </div>
                    {this.state.UserName_IsInvalid ?
                      <span className="help-block">{this.state.UserName_InvalidMessage}</span>
                      : null}
                  </div>
                </div>
                <div className={`form-group${this.state.Password_IsInvalid ? ' has-error' : ''}`}>
                  <div className="col-lg-12">
                    <div className="input-group input-icon">
                      <span className="input-group-addon"><i className="fa fa-key"></i></span>
                      <input type="password"
                             className="form-control" value={this.state.Password} placeholder="Mật khẩu"/>
                    </div>
                    {this.state.Password_IsInvalid ?
                      <span className="help-block">{this.state.Password_InvalidMessage}</span>
                      : null}
                  </div>
                </div>
                <div className="form-group mb0">
                  <div className="col-lg-12 col-md-12 col-sm-12 col-xs-4 mb25 text-center">
                    <button className="btn btn-primary" type="button" onClick={() => this.login()}>Đăng nhập</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private async  login() {
    let isUserNameValid = this.UserNameValidate(this.state.UserName);
    let isPasswordValid = this.PasswordValidate(this.state.Password);
    if (isUserNameValid && isPasswordValid) {
      let loginResult = await UserServiceInstance.Login({
        Password: this.state.Password,
        UserName: this.state.UserName,
        IsRememberMe: true
      });
      if (loginResult) {
        if (loginResult.IsSuccess) {
          browserHistory.push(AdminRoutePath.Dashboard);
          return;
        } else {
          if (loginResult.ErrorMessage == LoginResponseEnums.WrongPassword) {
            this.setState({
              Password_IsInvalid: true,
              Password_InvalidMessage: 'Sai tên đăng nhập hoặc mật khẩu'
            });
            return;
          }
        }

      }
      else {
        this.setState({
          Password_IsInvalid: true,
          Password_InvalidMessage: 'Lỗi không xác định.'
        });
        return;
      }
    }
  }

  private UserNameChanged(val: string) {
    this.UserNameValidate(val);
    this.setState({
      UserName: val
    });
  }

  private  UserNameValidate(val: string): boolean {
    if (!Validation.validateNull(val)) {
      this.setState({
        UserName_IsInvalid: true,
        UserName_InvalidMessage: 'Xin hãy nhập tên đăng nhập của bạn'
      });
      return false;
    }
    this.setState({
      UserName_IsInvalid: false,
      UserName_InvalidMessage: ''
    });
    return true;
  }

  private PasswordChanged(val: string) {
    this.PasswordValidate(val);
    this.setState({
      Password: val
    });
  }

  private  PasswordValidate(val: string): boolean {
    if (!Validation.validateNull(val)) {
      this.setState({
        Password_IsInvalid: true,
        Password_InvalidMessage: 'Xin hãy nhập mật khẩu'
      });
      return false;
    }
    this.setState({
      Password_IsInvalid: false,
      Password_InvalidMessage: ''
    });
    return true;
  }
}

export default Login;
