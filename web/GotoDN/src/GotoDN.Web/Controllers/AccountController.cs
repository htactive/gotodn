using GotoDN.Web.Models;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
using GotoDN.Entities;
using Microsoft.AspNetCore.Http.Authentication;
using System.Threading.Tasks;
using System.Security.Claims;
using GotoDN.Web.Authentication;
using System.Collections.Generic;
using Newtonsoft.Json;
using GotoDN.Common;
using System;
using GotoDN.Repository;

namespace GotoDN.Web.Controllers
{
    [Route("account")]
    public class AccountController : BaseController
    {
        public AccountController(HTRepository _dfwdbRepository) : base(_dfwdbRepository)
        {

        }

        private const string LoginProviderKey = "LoginProvider";
        private const string XsrfKey = "XsrfId";

        [HttpPost, Route("login")]
        [AllowAnonymous]
        public LoginResponseModel Login([FromBody]LoginRequestModel request)
        {
            var result = new LoginResponseModel()
            {
                ErrorMessage = LoginResponseEnums.UnknowError,
                IsSuccess = false
            };

            var passwordHashed = MD5Helper.Encode(request.Password);
            var user = this.HTRepository.UserRepository.GetAll()
                .FirstOrDefault(x => x.UserName.ToLower().Equals(request.UserName.ToLower())
                && x.Password == passwordHashed);
            if (user == null)
            {
                result.ErrorMessage = LoginResponseEnums.WrongPassword;
                return result;
            }

            if (user.UserStatusId == UserStatusEnums.Deactive)
            {
                result.ErrorMessage = LoginResponseEnums.WasBanned;
                return result;
            }

            return new LoginResponseModel()
            {
                AccessToken = UserLogin(user, request.IsRememberMe),
                IsSuccess = true
            };
        }

        private string UserLogin(User user, bool isRememberMe)
        {
            var token = new Entities.UserLoginToken()
            {
                Id = 0,
                UserId = user.Id
            };
            token.LastLoginDated = GotoDN.Common.DateTimeHelper.GetDateTimeNow();

            token.ExpiredDated = token.LastLoginDated.AddDays(isRememberMe ? 14 : 1);

            token.Token = System.Guid.NewGuid().ToString().Replace("-", "");

            HTRepository.UserLoginTokenRepository.Save(token);
            HTRepository.Commit();

            // Delete user's expired tokens 
            var expiredTokens = HTRepository.UserLoginTokenRepository.GetAll()
                .Where(t => t.UserId == user.Id &&
                t.ExpiredDated < DateTimeHelper.GetDateTimeNow()).ToList();
            HTRepository.UserLoginTokenRepository.Delete(expiredTokens);
            HTRepository.Commit();

            // @TODO : Merge anonymous data to logged in user and delete current anonymous user & its tokens
            var tokenString = JwtHelper.CreateJwtToken(token.Token, token.ExpiredDated);

            if (!string.IsNullOrEmpty(tokenString))
            {
                this.Response.Cookies.Delete("auth");
                this.Response.Cookies.Append("auth", tokenString, new Microsoft.AspNetCore.Http.CookieOptions()
                {
                    Path = "/",
                    Expires = new DateTimeOffset(DateTimeHelper.GetDateTimeNow().AddYears(2))
                });
            }

            return tokenString;
        }

        [HttpGet, Route("register")]
        [AllowAnonymous]
        private IActionResult Register()
        {
            ViewBag.Title = "Register";
            return View(new RegisterViewModel());
        }

        [HttpPost, Route("register")]
        [AllowAnonymous]
        private IActionResult Register(RegisterViewModel request)
        {
            ViewBag.Title = "Register";
            if (this.HTRepository.UserRepository.GetAll().Any(x => x.UserName == request.Email))
            {
                request.IsError = true;
                request.ErrorMessage = "Duplicate username";
                return View("Register", request);
            }
            var standardRole = this.HTRepository.RoleRepository.GetAll().Where(x => x.RoleType == Common.RoleTypeEnums.NormalUser).FirstOrDefault();
            if (standardRole == null)
            {
                throw new System.Exception("NormalUserRole is not found in database. Please run init roles");
            }
            var profile = new UserProfile()
            {
                Address = "",
                City = "",
                Email = request.Email,
                FirstName = "",
                LastName = ""
            };
            var user = new User()
            {
                Id = 0,
                UserStatusId = UserStatusEnums.Active,
                Password = MD5Helper.Encode(request.Password),
                UserName = request.Email,
                CreateDate = DateTimeHelper.GetDateTimeNow(),
                UserRoles = new List<UserRole>() {
                    new UserRole()
                    {
                        RoleId = standardRole.Id
                    }
                },
                UserProfiles = new List<UserProfile>()
                {
                    profile
                }
            };
            this.HTRepository.UserRepository.Save(user);
            var token = this.UserLogin(user, true);

            this.HTRepository.Commit();
            if (string.IsNullOrEmpty(token))
            {
                request.IsError = true;
                request.ErrorMessage = "Internal server error. Please try again";
                return View("Register", request);
            }
            return Redirect("/");
        }

        [HttpGet, Route("get-my-profile")]
        [HTAuthorize]
        public UserModel GetMyProfile()
        {
            var currentUserId = this.CurrentUser.Id;

            var entity = this.HTRepository.UserRepository.GetAll()
                .Include("UserProfiles.Image")
                .Include("UserRoles.Role")
                .FirstOrDefault(x => x.Id == currentUserId);

            var model = Mappers.Mapper.ToModel(entity);
            if (model != null)
            {
                model.UserProfiles = entity.UserProfiles.Select(x =>
                {

                    var profile = Mappers.Mapper.ToModel(x);
                    if (profile != null)
                    {
                        profile.Image = Mappers.Mapper.ToModel(x.Image);
                    }
                    return profile;
                }).ToList();
                model.UserRoles = entity.UserRoles.Select(x =>
                {
                    var ur = Mappers.Mapper.ToModel(x);
                    if (ur != null)
                    {
                        ur.Role = Mappers.Mapper.ToModel(x.Role);
                    }
                    return ur;
                }).ToList();
            }

            return model;
        }


        [HttpPost, Route("external-login")]
        [AllowAnonymous]
        private IActionResult ExternalLogin(string provider, string returnUrl = null)
        {
            var redirectUrl = "account/external-login-callback?returnUrl=" + System.Net.WebUtility.UrlEncode(returnUrl);
            var properties = new AuthenticationProperties { RedirectUri = redirectUrl };
            properties.Items[LoginProviderKey] = provider;
            return Challenge(properties, provider);
        }

        [HttpGet, Route("external-login-callback")]
        [AllowAnonymous]
        private async Task<IActionResult> ExternalLoginCallback(string returnUrl = null, string remoteError = null)
        {
            try
            {
                var auth = await this.HttpContext.Authentication.GetAuthenticateInfoAsync("ExternalCookiesAuthentication");
                var providerKey = auth.Principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;

                var token = "";
                if (!string.IsNullOrEmpty(providerKey))
                {
                    var provider = auth?.Properties?.Items[LoginProviderKey];
                    var user = this.HTRepository.UserRepository.GetAll().Where(x => x.ProviderKey == providerKey && x.ProviderName == provider).FirstOrDefault();
                    if (user == null)
                    {
                        var email = auth?.Principal?.FindFirst(ClaimTypes.Email)?.Value;
                        var firstName = auth?.Principal?.FindFirst(ClaimTypes.GivenName)?.Value;
                        var lastName = auth?.Principal?.FindFirst(ClaimTypes.Surname)?.Value;
                        var standardRole = this.HTRepository.RoleRepository.GetAll().Where(x => x.RoleType == Common.RoleTypeEnums.NormalUser).FirstOrDefault();
                        if (standardRole == null)
                        {
                            throw new System.Exception("Role NormalUser is not found in database. Please run init roles.");
                        }
                        user = new Entities.User()
                        {
                            Id = 0,
                            Password = string.Empty,
                            ProviderKey = providerKey,
                            ProviderName = provider,
                            UserName = string.Format("{0}_{1}", provider, providerKey),
                            UserStatusId = Common.UserStatusEnums.Active,
                            UserProfiles = new System.Collections.Generic.List<UserProfile>()
                            {
                            new UserProfile()
                            {
                                Email = email,
                                FirstName = firstName,
                                LastName = lastName,
                                WasVerifiedEmail=true,
                            }
                            },
                            UserRoles = new List<UserRole>()
                            {
                                new UserRole()
                                {
                                    RoleId = standardRole.Id
                                }
                            }
                        };
                        this.HTRepository.UserRepository.Save(user);
                        this.HTRepository.Commit();
                    }
                    else
                    {
                        if (user.UserStatusId == UserStatusEnums.Deactive)
                        {
                            await HttpContext.Authentication.SignOutAsync("ExternalCookiesAuthentication");
                            var request = new LoginViewModel();
                            request.ErrorMessage = "Your account was deactivated by Administrator";
                            request.IsError = true;
                            return View("Login", request);
                        }

                        var firstProfile = this.HTRepository.UserProfileRepository.GetAll().FirstOrDefault(x => x.UserId.HasValue && x.UserId.Value == user.Id);
                        if (firstProfile != null && (!firstProfile.WasVerifiedEmail.HasValue || !firstProfile.WasVerifiedEmail.Value))
                        {
                            firstProfile.WasVerifiedEmail = true;
                            this.HTRepository.UserProfileRepository.Save(firstProfile);
                            this.HTRepository.Commit();
                        }
                    }

                    var loginResponse = this.UserLogin(user, true);
                    token = loginResponse;
                }

                ViewBag.token = token;
                ViewBag.ReturnUrl = returnUrl;
            }
            catch (System.Exception ee)
            {
                throw ee;

            }
            finally
            {
                await HttpContext.Authentication.SignOutAsync("ExternalCookiesAuthentication");
            }
            return Redirect(string.IsNullOrEmpty(returnUrl) ? "/" : returnUrl);
        }

        [HttpGet, Route("log-out")]
        [AllowAnonymous]
        public IActionResult LogOut()
        {
            string jwt = this.HttpContext.Request.Cookies["auth"];

            if (string.IsNullOrEmpty(jwt)) return Redirect("/");

            var payloadString = JwtHelper.Decode(jwt);

            if (string.IsNullOrEmpty(payloadString)) return Redirect("/");

            var payLoad = JsonConvert.DeserializeObject<Dictionary<string, string>>(payloadString);
            var token = payLoad["token"];
            if (string.IsNullOrEmpty(token)) return Redirect("/");

            var loginSession = HTRepository.UserLoginTokenRepository.GetAll()
                .Include(x => x.User)
                .FirstOrDefault(x => x.Token == token);

            if (loginSession == null) return Redirect("/");

            this.HTRepository.UserLoginTokenRepository.Delete(loginSession);
            this.HTRepository.Commit();
            this.Response.Cookies.Delete("auth");
            return Redirect("/");
        }
    }
}
