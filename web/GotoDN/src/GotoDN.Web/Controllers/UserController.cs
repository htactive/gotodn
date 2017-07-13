using GotoDN.Entities;
using GotoDN.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GotoDN.Repository;
using HTActive.Core;
using GotoDN.Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using GotoDN.Web.Authentication;

namespace GotoDN.Web.Controllers
{
    [Route("user")]
    public class UserController : BaseController
    {
        public UserController(HTRepository repository) : base(repository)
        {
        }

        [HttpPost, Route("filter")]
        [AllowAnonymous]
        public GetGridResponseModel<UserModel> Filter([FromBody]GetGridRequestModel request)
        {
            var query = this.HTRepository.UserRepository.GetAll();
            query = query.Include("UserRoles.Role").Include("UserProfiles.Image");

            // search
            if (!string.IsNullOrEmpty(request.Search))
            {
                var search = request.Search.ToLower().Trim();
                query = query.Where(x => x.UserName != null && x.UserName.ToLower().Contains(search));
            }

            // sort
            switch (request.SortExpression)
            {
                case "Id":
                    query = request.IsAsc ? query.OrderBy(x => x.Id) : query.OrderByDescending(x => x.Id);
                    break;
                case "UserName":
                    query = request.IsAsc ? query.OrderBy(x => x.UserName) : query.OrderByDescending(x => x.UserName);
                    break;
                case "CreateDate":
                    query = request.IsAsc ? query.OrderBy(x => x.CreateDate) : query.OrderByDescending(x => x.CreateDate);
                    break;
                case "UpdatedDate":
                    query = request.IsAsc ? query.OrderBy(x => x.UpdatedDate) : query.OrderByDescending(x => x.UpdatedDate);
                    break;
            }
            // count
            var totalRecord = query.Count();

            // take
            var entities = query.Skip((request.CurrentPage - 1) * request.PageSize).Take(request.PageSize).ToList();

            //map
            var models = entities.Select(Map).ToList();

            var response = new GetGridResponseModel<UserModel>();
            response.DataSource = models;
            response.TotalRecord = totalRecord;
            return response;
        }

        private UserModel Map(User entity)
        {
            var model = Mappers.Mapper.ToModel(entity);
            if (model != null)
            {
                model.UserProfiles = entity.UserProfiles.Select(x =>
                {
                    var up = Mappers.Mapper.ToModel(x);
                    if (up != null)
                    {
                        up.Image = Mappers.Mapper.ToModel(x.Image);
                    }
                    return up;
                }).ToList();
                model.UserRoles = entity.UserRoles.Select(x =>
                {
                    var up = Mappers.Mapper.ToModel(x);
                    if (up != null)
                    {
                        up.Role = Mappers.Mapper.ToModel(x.Role);
                    }
                    return up;
                }).ToList();
            }
            return model;
        }

        [HttpGet, Route("get")]
        [AllowAnonymous]
        public UserModel Get(int id)
        {
            var query = this.HTRepository.UserRepository.GetAll();
            query = query.Include("UserRoles.Role").Include("UserProfiles.Image");
            var entity = query.FirstOrDefault(x => x.Id == id);
            return Map(entity);
        }

        [HttpPost, Route("create")]
        [HTAuthorize]
        public ObjectSavedResponseModel<UserModel> Create([FromBody]UserModel model)
        {
            if (this.HTRepository.UserRepository.GetAll().Any(x => x.UserName != null && x.UserName.ToLower() == "admin"))
            {
                return new ObjectSavedResponseModel<UserModel>()
                {
                    ErrorCode = "DuplicateUserName",
                    IsSuccess = false,
                };
            }
            var standardRole = this.HTRepository.RoleRepository.GetAll().Where(x => x.RoleType == Common.RoleTypeEnums.Admin).FirstOrDefault();
            if (standardRole == null)
            {
                throw new System.Exception("SuperAdmin is not found in database. Please run init roles");
            }
            var profile = new UserProfile()
            {
                Address = "",
                City = "",
                Email = "",
                FirstName = "",
                LastName = ""
            };
            var user = new User()
            {
                Id = 0,
                UserStatusId = UserStatusEnums.Active,
                Password = MD5Helper.Encode(model.Password),
                UserName = model.UserName,
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
            HTRepository.Commit();
            return new ObjectSavedResponseModel<UserModel>()
            {
                IsSuccess = true,
                Model = Map(user)
            };
        }

        [HttpPost, Route("change-password")]
        [HTAuthorize]
        public bool ChangePassword([FromBody]UserModel model)
        {
            var entity = HTRepository.UserRepository.GetAll().FirstOrDefault(x => x.Id == model.Id);
            if (entity == null) return false;
            entity.Password = MD5Helper.Encode(model.Password);
            HTRepository.UserRepository.Save(entity);
            HTRepository.Commit();
            return true;
        }
        [HttpPost, Route("change-user-status")]
        [HTAuthorize]
        public bool ChangeUserStatus([FromBody]UserModel model)
        {
            var entity = HTRepository.UserRepository.GetAll().FirstOrDefault(x => x.Id == model.Id);
            if (entity == null) return false;
            entity.UserStatusId = model.UserStatusId;
            HTRepository.UserRepository.Save(entity);
            HTRepository.Commit();
            return true;
        }
    }
}
