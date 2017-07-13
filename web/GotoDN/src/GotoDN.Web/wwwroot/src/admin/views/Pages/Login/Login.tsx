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
      <div className="app flex-row align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="card-group mb-0">
                <div className="card p-4">
                  <div className="form-horizontal card-block">
                    <h1>Đăng nhập</h1>
                    <p className="text-muted">Đăng nhập bằng tài khoản của bạn</p>
                    <div className={`form-group${this.state.UserName_IsInvalid ? ' has-error' : ''}`}>
                      <div className={`input-group mb-3`}>
                        <span className="input-group-addon"><i className="icon-user"></i></span>
                        <input type="text" className="form-control" placeholder="Tên đăng nhập"
                               value={this.state.UserName || ''}
                               onChange={(v) => this.UserNameChanged(v.target['value'])}
                        />
                      </div>
                      {this.state.UserName_IsInvalid ?
                        <span className="help-block">{this.state.UserName_InvalidMessage}</span>
                        : null}
                    </div>
                    <div className={`input-group mb-4${this.state.Password_IsInvalid ? ' has-error' : ''}`}>
                      <span className="input-group-addon"><i className="icon-lock"></i></span>
                      <input type="password" className="form-control" placeholder="Mật khẩu"/>
                      {this.state.Password_IsInvalid ?
                        <span className="help-block">{this.state.Password_InvalidMessage}</span>
                        : null}
                    </div>
                    <div className="row">
                      <div className="col-12 text-center">
                        <button type="button" className="btn btn-primary px-4" onClick={() => this.login()}>Đăng nhập
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card card-inverse card-primary py-5 d-md-down-none" style={{width: 44 + '%'}}>
                  <div className="card-block text-center">
                    <div>
                      <h2>Chưa có tài khoản</h2>
                      <p>Hiện tại Goto DN chưa hỗ trợ việc đăng ký tài khoản, xin vui lòng liên hệ Quản Trị Viên để được
                        hỗ trợ.</p>
                      <button type="button" className="btn btn-primary active mt-3"><i className="fa fa-envelope-o"/>
                        Gởi email!
                      </button>
                    </div>
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
