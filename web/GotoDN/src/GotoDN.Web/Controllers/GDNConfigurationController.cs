using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GotoDN.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using GotoDN.Web.Models;
using Microsoft.EntityFrameworkCore;
using GotoDN.Entities;
using GotoDN.Web.Authentication;
using GotoDN.Common;

namespace GotoDN.Web.Controllers
{
    [Route("configuration")]
    public class GDNConfigurationController : BaseController
    {
        public GDNConfigurationController(HTRepository repository) : base(repository)
        {
        }

        [HttpGet, Route("get-configuration")]
        [AllowAnonymous]
        public GDNConfigurationModel GetConfiguration()
        {
            var entity = this.HTRepository.GDNConfigurationRepository.GetAll().FirstOrDefault();
            if (entity == null)
                entity = new GDNConfiguration
                {
                    NumOfScreenShowAd = 5
                };
            var model = AutoMapper.Mapper.Map<GDNConfiguration, GDNConfigurationModel>(entity);
            return model;
        }

        [HttpPost, Route("save-configuration")]
        [HTAuthorize]
        public bool SaveConfiguration([FromBody]GDNConfigurationModel model)
        {

            var entity = this.HTRepository.GDNConfigurationRepository.GetAll().FirstOrDefault();
            if (entity == null)
                entity = new GDNConfiguration();
            entity.NumOfScreenShowAd = model.NumOfScreenShowAd;

            this.HTRepository.GDNConfigurationRepository.Save(entity);
            this.HTRepository.Commit();
            return true;
        }
    }
}
