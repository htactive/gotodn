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
            entity.Id = 0;
            entity.CreatedDate = Common.DateTimeHelper.GetDateTimeNow();
            entity.UpdatedDate = Common.DateTimeHelper.GetDateTimeNow();
            entity.HTServiceLanguages = new List<HTServiceLanguage>()
            {
                new HTServiceLanguage()
                {
                    Title = "New Service",
                    Language = LanguageEnums.English,
                    UpdatedDate = DateTimeHelper.GetDateTimeNow(),
                    CreatedDate = DateTimeHelper.GetDateTimeNow(),
                },
                new HTServiceLanguage()
                {
                    Title = "New Service",
                    Language = LanguageEnums.Vietnamese,
                    UpdatedDate = DateTimeHelper.GetDateTimeNow(),
                    CreatedDate = DateTimeHelper.GetDateTimeNow(),
                },
                new HTServiceLanguage()
                {
                    Title = "New Service",
                    Language = LanguageEnums.France,
                    UpdatedDate = DateTimeHelper.GetDateTimeNow(),
                    CreatedDate = DateTimeHelper.GetDateTimeNow(),
                },
                new HTServiceLanguage()
                {
                    Title = "New Service",
                    Language = LanguageEnums.Chinese,
                    UpdatedDate = DateTimeHelper.GetDateTimeNow(),
                    CreatedDate = DateTimeHelper.GetDateTimeNow(),
                },
                new HTServiceLanguage()
                {
                    Title = "New Service",
                    Language = LanguageEnums.Japanese,
                    UpdatedDate = DateTimeHelper.GetDateTimeNow(),
                    CreatedDate = DateTimeHelper.GetDateTimeNow(),
                },
                new HTServiceLanguage()
                {
                    Title = "New Service",
                    Language = LanguageEnums.Korean,
                    UpdatedDate = DateTimeHelper.GetDateTimeNow(),
                    CreatedDate = DateTimeHelper.GetDateTimeNow(),
                }
            };

            return AutoMapper.Mapper.Map<HTService, HTServiceModel>(entity);
        }

        [HttpPost, Route("delete-service")]
        [HTAuthorize]
        public bool DeleteService([FromBody]int Id)
        {
            var entity = this.HTRepository.HTServiceRepository.GetAll()
                .Include(s => s.Places)
                .FirstOrDefault(x => x.Id == Id);
            if (entity == null || (entity.Places != null && entity.Places.Count > 0)) return false;
            this.HTRepository.HTServiceRepository.Delete(entity);
            this.HTRepository.Commit();
            return true;
        }

        [HttpPost, Route("update-service")]
        [HTAuthorize]
        public HTServiceModel UpdateService([FromBody]HTServiceModel model)
        {
            if (model == null) return null;
            var entity = this.HTRepository.HTServiceRepository.GetAll()
                .Include("HTServiceLanguages.Image")
                .Include("HTServiceLanguages.Icon")
                .FirstOrDefault(x => x.Id == model.Id);
            if (entity == null)
            {
                entity = new HTService();
            };
            entity.UpdatedDate = DateTimeHelper.GetDateTimeNow();
            entity.CategoryId = model.CategoryId;

            if (entity.HTServiceLanguages == null || entity.HTServiceLanguages.Count == 0)
            {
                entity.HTServiceLanguages = model.HTServiceLanguages.Select(s => new HTServiceLanguage
                {
                    Title = s.Title,
                    ImageId = s.Image != null ? s.Image.Id : (int?)null,
                    IconId = s.Icon != null ? s.Icon.Id : (int?)null,
                    UpdatedDate = DateTimeHelper.GetDateTimeNow(),
                    Language = s.Language
                }).ToList();
            }
            else
            {
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
            }

            this.HTRepository.HTServiceRepository.Save(entity);
            this.HTRepository.Commit();
            if (model.Id == 0) model.Id = entity.Id;
            return model;
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

            return AutoMapper.Mapper.Map<HTServiceLanguage, HTServiceLanguageModel>(LangEntity);
        }

        [HttpPost, Route("add-all-language")]
        [HTAuthorize]
        public HTServiceModel AddAllLanguage([FromBody]int Id)
        {
            var HTServiceEntity = this.HTRepository.HTServiceRepository.GetAll()
                .Include(x => x.HTServiceLanguages)
                .FirstOrDefault(x => x.Id == Id);

            if (HTServiceEntity == null) return null;

            foreach (var lang in LanguageArrays.GetLanguageArray())
            {
                if (!HTServiceEntity.HTServiceLanguages.Any(x => x.Language == (LanguageEnums)lang))
                {
                    HTServiceEntity.HTServiceLanguages.Add(new HTServiceLanguage()
                    {
                        Language = (LanguageEnums)lang,
                        HTServiceId = Id,
                        Title = "",
                        UpdatedDate = DateTimeHelper.GetDateTimeNow(),
                        CreatedDate = DateTimeHelper.GetDateTimeNow(),
                    });
                }
            }
            this.HTRepository.HTServiceRepository.Save(HTServiceEntity);
            this.HTRepository.Commit();

            return AutoMapper.Mapper.Map<HTService, HTServiceModel>(HTServiceEntity);
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
        public List<SliderModel> GetListSlider(int? serviceId, int? index)
        {
            var currentLanguage = this.CurrentLanguage;
            var currentCity = this.CurrentCityId;
            var result = new List<SliderModel>();
            var today = DateTimeHelper.GetDateTimeNow();
            var currentId = index ?? 0;
            var itemsPerIndex = 20;

            var place = this.HTRepository.PlaceRepository.GetAll();
            var placeLanguage = this.HTRepository.PlaceLanguageRepository.GetAll();
            var image = this.HTRepository.ImageRepository.GetAll();

            result = (from p in place
                      join pl in placeLanguage on p.Id equals pl.PlaceId
                      join img in image on pl.ImageId equals img.Id into imgs
                      from img in imgs.DefaultIfEmpty()
                      where pl.Language == currentLanguage && p.CityId == CurrentCityId &&
                             p.HTServiceId == serviceId && p.IsCategorySlider == true
                      orderby p.Id descending
                      select new SliderModel()
                      {
                          Id = p.Id,
                          SubTitle = pl.Description,
                          Title = pl.Title,
                          Url = img != null ? GetUrl(img) : Common.DefaultPhoto.ImageUrl,
                          CreateDate = p.CreatedDate,
                          Star = p.Rating,
                          IsCategorySlider = p.IsCategorySlider,
                      }
                     )
                     .Skip(currentId * itemsPerIndex).Take(itemsPerIndex).ToList();

            return result;
        }

        [HttpGet, Route("get-list-data")]
        [AllowAnonymous]
        public List<AppServicePlaceModel> GetCategoryData(int? serviceId, int? index)
        {
            var currentLanguage = this.CurrentLanguage;
            var currentCityId = this.CurrentCityId;
            var currentId = index ?? 0;
            var itemsPerIndex = 30;

            var place = this.HTRepository.PlaceRepository.GetAll();
            var placeLanguage = this.HTRepository.PlaceLanguageRepository.GetAll();
            var image = this.HTRepository.ImageRepository.GetAll();

            var result = new List<AppServicePlaceModel>();

            result = (from p in place
                     join pl in placeLanguage on p.Id equals pl.PlaceId
                     join img in image on pl.ImageId equals img.Id into imgs
                     from img in imgs.DefaultIfEmpty()
                     where p.CityId == currentCityId && pl.Language == currentLanguage &&
                            p.HTServiceId == serviceId
                     orderby p.Id descending
                     select new AppServicePlaceModel()
                     {
                         Id = p.Id,
                         ImageUrl = GetUrl(img),
                         Star = p.Rating,
                         Title = pl.Title,
                         Description = pl.Description,
                     })
                     .Skip(currentId * itemsPerIndex).Take(itemsPerIndex).ToList();

            return result;
        }
    }
}
