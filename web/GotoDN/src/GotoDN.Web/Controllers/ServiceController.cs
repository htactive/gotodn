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
                .Include("Category.CategoryLanguages")
                .Take(1000).ToList();

            var models = entities.Select(x => AutoMapper.Mapper.Map<HTService, HTServiceModel>
            (
                x, opt =>
                {
                    opt.AfterMap((ent, mod) =>
                    {
                        mod.Category = AutoMapper.Mapper.Map<CategoryModel>(ent.Category);
                    });
                })
            ).ToList();

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
                    Title = "Service Name",
                    Language = LanguageEnums.English,
                    UpdatedDate = DateTimeHelper.GetDateTimeNow(),
                    CreatedDate = DateTimeHelper.GetDateTimeNow(),
                },
                new HTServiceLanguage()
                {
                    Title = "",
                    Language = LanguageEnums.Vietnamese,
                    UpdatedDate = DateTimeHelper.GetDateTimeNow(),
                    CreatedDate = DateTimeHelper.GetDateTimeNow(),
                },
                new HTServiceLanguage()
                {
                    Title = "",
                    Language = LanguageEnums.France,
                    UpdatedDate = DateTimeHelper.GetDateTimeNow(),
                    CreatedDate = DateTimeHelper.GetDateTimeNow(),
                },
                new HTServiceLanguage()
                {
                    Title = "",
                    Language = LanguageEnums.Chinese,
                    UpdatedDate = DateTimeHelper.GetDateTimeNow(),
                    CreatedDate = DateTimeHelper.GetDateTimeNow(),
                },
                new HTServiceLanguage()
                {
                    Title = "",
                    Language = LanguageEnums.Japanese,
                    UpdatedDate = DateTimeHelper.GetDateTimeNow(),
                    CreatedDate = DateTimeHelper.GetDateTimeNow(),
                },
                new HTServiceLanguage()
                {
                    Title = "",
                    Language = LanguageEnums.Korean,
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

        [HttpPost, Route("translate-service-language")]
        [AllowAnonymous]
        public HTServiceLanguageModel TranslateServiceLanguage([FromBody]HTServiceModel model)
        {
            if (model == null || model.HTServiceLanguages == null || model.HTServiceLanguages.Count != 2) return null;
            var entity = model.HTServiceLanguages[0];
            if (entity == null) return null;
            var enServiceLanguage = model.HTServiceLanguages[1];
            if (enServiceLanguage == null) return null;
            entity.Title = TranslateHelper.TranslateText(enServiceLanguage.Title, TranslateHelper.GetLanguageCode(entity.Language ?? LanguageEnums.English));
            entity.ImageId = enServiceLanguage.ImageId;
            entity.Image = enServiceLanguage.Image;
            entity.IconId = enServiceLanguage.IconId;
            entity.Icon = enServiceLanguage.Icon;
            return entity;
        }

        [HttpPost, Route("translate-all-service-language")]
        [AllowAnonymous]
        public HTServiceModel TranslateAllServiceLanguage([FromBody]HTServiceModel model)
        {
            if (model == null || model.HTServiceLanguages == null) return null;
            var enServiceLanguage = model.HTServiceLanguages
                .FirstOrDefault(x => x.Language == LanguageEnums.English);
            if (enServiceLanguage == null) return null;
            foreach (var entity in model.HTServiceLanguages)
            {
                entity.Title = TranslateHelper.TranslateText(enServiceLanguage.Title, TranslateHelper.GetLanguageCode(entity.Language ?? LanguageEnums.English));
                entity.ImageId = enServiceLanguage.ImageId;
                entity.Image = enServiceLanguage.Image;
                entity.IconId = enServiceLanguage.IconId;
                entity.Icon = enServiceLanguage.Icon;
            }
            return model;
        }

        [HttpGet, Route("get-service-slider")]
        [AllowAnonymous]
        public List<SliderModel> GetServiceSlider()
        {
            var result = new List<SliderModel>();

            var Places = this.HTRepository.PlaceRepository.GetAll().
                Where(x => x.IsCategorySlider.HasValue && x.IsCategorySlider.Value)
                .Include("PlaceLanguages.Image").ToList();

            result = result.Union(Places.Select(x =>
                new SliderModel()
                {
                    Id = x.Id,
                    SubTitle = x.PlaceLanguages.Where(z => z.Language == LanguageEnums.English).FirstOrDefault().Description,
                    Title = x.PlaceLanguages.Where(z => z.Language == LanguageEnums.English).FirstOrDefault().Title,
                    Url = AutoMapper.Mapper.Map<Image, ImageModel>(x.PlaceLanguages.Where(z => z.Language == LanguageEnums.English).FirstOrDefault().Image) != null ? AutoMapper.Mapper.Map<Image, ImageModel>(x.PlaceLanguages.Where(z => z.Language == LanguageEnums.English).FirstOrDefault().Image).Url : Common.DefaultPhoto.ImageUrl,
                }).ToList()).ToList();

            return result;
        }

        [HttpGet, Route("get-list-slider")]
        [AllowAnonymous]
        public List<SliderModel> GetListSlider(int? serviceId)
        {
            var currentLanguage = LanguageEnums.English;
            var result = new List<SliderModel>();
            var today = DateTimeHelper.GetDateTimeNow();

            var eventPlaces = this.HTRepository.PlaceRepository.GetAll().
                Where(x => x.HTServiceId.HasValue && x.HTServiceId == serviceId && (
                (x.Category != null && x.Category.IsEvent.HasValue && x.Category.IsEvent.Value && x.StartDate <= today && x.EndDate > today) ||
                (x.IsCategorySlider.HasValue && x.IsCategorySlider.Value)))
                .Include("PlaceLanguages.Image").ToList();
            if (eventPlaces == null) return null;
            result = eventPlaces.Select(x =>
                new SliderModel()
                {
                    Id = x.Id,
                    SubTitle = x.PlaceLanguages.Where(z => z.Language == currentLanguage).FirstOrDefault().Description,
                    Title = x.PlaceLanguages.Where(z => z.Language == currentLanguage).FirstOrDefault().Title,
                    Url = x.PlaceLanguages.Where(z => z.Language == currentLanguage).FirstOrDefault().Image != null ? x.PlaceLanguages.Where(z => z.Language == currentLanguage).FirstOrDefault().Image.Url : Common.DefaultPhoto.ImageUrl,
                    CreateDate = x.CreatedDate,
                    IsEvent = x.Category != null ? x.Category.IsEvent : null,
                    IsCategorySlider = x.IsCategorySlider,
                }).ToList().OrderBy(t => t.IsEvent).ThenBy(t => t.IsCategorySlider).ThenByDescending(t => t.CreateDate).Take(20).ToList();

            return result;
        }

        [HttpGet, Route("get-list-data")]
        [AllowAnonymous]
        public List<PlaceModel> GetCategoryData(int? serviceId)
        {
            var currentLanguage = LanguageEnums.English;

            var result = new List<MenuListModel>();
            var places = this.HTRepository.PlaceRepository.GetAll()
                .Include("PlaceLanguages.Image")
                .Where(t => t.PlaceLanguages.Any(l => l.Language == currentLanguage) && t.HTServiceId.HasValue && t.HTServiceId == serviceId)
                .OrderByDescending(t => t.CreatedDate).Take(100);

            var placeModels = places.Select(t => AutoMapper.Mapper.Map<Place, PlaceModel>(t)).ToList();
            
            return placeModels;
        }
    }
}
