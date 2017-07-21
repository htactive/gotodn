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
    [Route("service")]
    public class ServiceController : BaseController
    {
        public ServiceController(HTRepository repository) : base(repository)
        {
        }

        [HttpGet, Route("get-all")]
        [AllowAnonymous]
        public List<HTServiceModel> GetAll()
        {
            var entities = this.HTRepository.HTServiceRepository.GetAll()
                .Include("HTServiceLanguages.Image")
                .Include("HTServiceLanguages.Icon")
                .Take(1000).ToList();

            var models = entities.Select(x => AutoMapper.Mapper.Map<HTService, HTServiceModel>(x)).ToList();

            return models;
        }

        [HttpPost, Route("create-service")]
        [HTAuthorize]
        public HTServiceModel CreateService()
        {
            var entity = new HTService();
            entity.CreatedDate = Common.DateTimeHelper.GetDateTimeNow();
            entity.UpdatedDate = Common.DateTimeHelper.GetDateTimeNow();
            entity.HTServiceLanguages = new List<HTServiceLanguage>()
            {
                new HTServiceLanguage()
                {
                    Title = "Chưa đặt tên",
                    Language = LanguageEnums.English,
                    UpdatedDate = DateTimeHelper.GetDateTimeNow(),
                    CreatedDate = DateTimeHelper.GetDateTimeNow(),
                }
            };

            this.HTRepository.HTServiceRepository.Save(entity);
            this.HTRepository.Commit();
            return AutoMapper.Mapper.Map<HTService, HTServiceModel>(entity);
        }

        [HttpPost, Route("delete-service")]
        [HTAuthorize]
        public bool DeleteService([FromBody]int Id)
        {
            var entity = this.HTRepository.HTServiceRepository.GetAll()
                .FirstOrDefault(x => x.Id == Id);
            if (entity == null) return false;
            this.HTRepository.HTServiceRepository.Delete(entity);
            this.HTRepository.Commit();
            return true;
        }

        [HttpPost, Route("update-service")]
        [HTAuthorize]
        public bool UpdateService([FromBody]HTServiceModel model)
        {
            if (model == null) return false;
            var entity = this.HTRepository.HTServiceRepository.GetAll()
                .Include("HTServiceLanguages.Image")
                .Include("HTServiceLanguages.Image")
                .FirstOrDefault(x => x.Id == model.Id);
            if (entity == null) return false;
            entity.UpdatedDate = DateTimeHelper.GetDateTimeNow();
            entity.CategoryId = model.CategoryId;

            foreach (var item in entity.HTServiceLanguages)
            {
                var en = model.HTServiceLanguages.FirstOrDefault(x => x.Id == item.Id);
                if (en != null)
                {
                    item.Title = en.Title;
                    item.ImageId = en.Image != null ? en.Image.Id : (int?)null;
                    item.IconId = en.Icon != null ? en.Icon.Id : (int?)null;
                    item.UpdatedDate = DateTimeHelper.GetDateTimeNow();
                }
            }

            this.HTRepository.HTServiceRepository.Save(entity);
            this.HTRepository.Commit();
            return true;
        }


        [HttpPost, Route("add-language")]
        [HTAuthorize]
        public HTServiceLanguageModel AddLanguage([FromBody]HTServiceLanguageModel model)
        {
            if (model == null) return null;
            var CatEntity = this.HTRepository.HTServiceRepository.GetAll()
                .FirstOrDefault(x => x.Id == model.HTServiceId.GetValueOrDefault());
            if (CatEntity == null) return null;
            if (CatEntity.HTServiceLanguages == null) CatEntity.HTServiceLanguages = new List<HTServiceLanguage>();

            var LangEntity = new HTServiceLanguage();
            LangEntity.HTServiceId = model.HTServiceId;
            LangEntity.Language = model.Language;
            LangEntity.Title = model.Title;
            LangEntity.UpdatedDate = DateTimeHelper.GetDateTimeNow();
            LangEntity.CreatedDate = DateTimeHelper.GetDateTimeNow();

            CatEntity.HTServiceLanguages.Add(LangEntity);
            this.HTRepository.HTServiceRepository.Save(CatEntity);
            this.HTRepository.Commit();

            return AutoMapper.Mapper.Map<HTServiceLanguage, HTServiceLanguageModel>(LangEntity); ;
        }

        [HttpPost, Route("delete-language")]
        [HTAuthorize]
        public bool DeleteLanguage([FromBody]int Id)
        {
            var entity = this.HTRepository.HTServiceLanguageRepository.GetAll()
                .FirstOrDefault(x => x.Id == Id);
            if (entity == null) return false;

            this.HTRepository.HTServiceLanguageRepository.Delete(entity);
            this.HTRepository.Commit();
            return true;
        }
    }
}
