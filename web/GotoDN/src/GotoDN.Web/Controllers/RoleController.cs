using GotoDN.Common;
using GotoDN.Entities;
using GotoDN.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GotoDN.Web.Controllers
{
    [Route("role")]
    public class RoleController : BaseController
    {
        public RoleController(Repository.HTRepository _HTRepository) : base(_HTRepository)
        {

        }
        [HttpGet, Route("init-roles")]
        [AllowAnonymous]
        public bool InitRoles()
        {
            if (!this.HTRepository.RoleRepository.GetAll().Any(x => x.RoleType == RoleTypeEnums.NormalUser))
            {
                this.HTRepository.RoleRepository.Save(new Role()
                {
                    DisplayName = "Normal User",
                    Id = 0,
                    Name = "NormalUser",
                    RoleType = RoleTypeEnums.NormalUser
                });
            }

            if (!this.HTRepository.RoleRepository.GetAll().Any(x => x.RoleType == RoleTypeEnums.Admin))
            {
                this.HTRepository.RoleRepository.Save(new Role()
                {
                    DisplayName = "Admin",
                    Id = 0,
                    Name = "Admin",
                    RoleType = RoleTypeEnums.Admin
                });
            }
            if (!this.HTRepository.RoleRepository.GetAll().Any(x => x.RoleType == RoleTypeEnums.SuperAdmin))
            {
                this.HTRepository.RoleRepository.Save(new Role()
                {
                    DisplayName = "Super Admin",
                    Id = 0,
                    Name = "SuperAdmin",
                    RoleType = RoleTypeEnums.SuperAdmin
                });
            }

            this.HTRepository.Commit();

            return true;
        }

        [HttpGet, Route("init-role-claims")]
        [AllowAnonymous]
        public bool InitRoleClaims()
        {
            var roleClaims = this.HTRepository.RoleClaimRepository.GetAll().ToList();
            this.HTRepository.RoleClaimRepository.Delete(roleClaims);
            this.HTRepository.Commit();
            
            this.AddClaimToRoles("MyProfile_R", new List<RoleTypeEnums>() {
                RoleTypeEnums.SuperAdmin,
                RoleTypeEnums.Admin,
            });
            this.AddClaimToRoles("User_W", new List<RoleTypeEnums>() {
                RoleTypeEnums.SuperAdmin,
            });
            this.HTRepository.Commit();
            return true;
        }

        private void AddClaimToRoles(string claim, List<RoleTypeEnums> roleTypes)
        {
            var claimEntity = this.HTRepository.ClaimRepository.GetAll()
                .Include(x => x.RoleClaims)
                .FirstOrDefault(x => x.ClaimName == claim);
            if (claimEntity == null)
            {
                claimEntity = new Claim()
                {
                    ClaimName = claim,
                    RoleClaims = new List<RoleClaim>()
                };
            }
            var roleIds = this.HTRepository.RoleRepository.GetAll()
                .Where(x => roleTypes.Contains(x.RoleType)).Select(x => x.Id).ToList();
            foreach (var roleId in roleIds)
            {
                if (!claimEntity.RoleClaims.Any(x => x.RoleId == roleId))
                {
                    claimEntity.RoleClaims.Add(new RoleClaim()
                    {
                        RoleId = roleId
                    });
                }
            }
            this.HTRepository.ClaimRepository.Save(claimEntity);
        }

        [HttpGet, Route("get-all-user-roles")]
        [AllowAnonymous]
        public List<RoleModel> GetAllUserRoles()
        {
            var entities = this.HTRepository.RoleRepository.GetAll().ToList();

            return Mappers.Mapper.ToModel(entities);
        }
        
    }
}
