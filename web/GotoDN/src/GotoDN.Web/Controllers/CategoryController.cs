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
using Google.Cloud.Translation.V2;
using Google.Apis.Services;
using Google.Apis.Translate.v2;
using Google.Apis.Translate.v2.Data;
using TranslationsResource = Google.Apis.Translate.v2.Data.TranslationsResource;

namespace GotoDN.Web.Controllers
{
    [Route("category")]
    public class CategoryController : BaseController
    {
        public CategoryController(HTRepository repository) : base(repository)
        {
        }

        [HttpGet, Route("get-all")]
        [AllowAnonymous]
        public List<CategoryModel> GetAll()
        {
            var entities = this.HTRepository.CategoryRepository.GetAll()
                .Include("CategoryLanguages.Image")
                .Include("CategoryLanguages.Icon")
                .Include(c => c.HTServices)
                .Take(1000).OrderBy(t => t.Order).ToList();

            var models = entities.Select(x => AutoMapper.Mapper.Map<Category, CategoryModel>(x)).ToList();

            return models;
        }

        [HttpPost, Route("create-category")]
        [HTAuthorize]
        public CategoryModel CreateCategory()
        {
            var entity = new Category();
            entity.CreatedDate = Common.DateTimeHelper.GetDateTimeNow();
            entity.UpdatedDate = Common.DateTimeHelper.GetDateTimeNow();
            entity.CategoryLanguages = new List<CategoryLanguage>()
            {
                new CategoryLanguage()
                {
                    Title = "New Category",
                    Language = LanguageEnums.English,
                    UpdatedDate = DateTimeHelper.GetDateTimeNow(),
                    CreatedDate = DateTimeHelper.GetDateTimeNow(),
                },
                new CategoryLanguage()
                {
                    Title = "",
                    Language = LanguageEnums.Vietnamese,
                    UpdatedDate = DateTimeHelper.GetDateTimeNow(),
                    CreatedDate = DateTimeHelper.GetDateTimeNow(),
                },
                new CategoryLanguage()
                {
                    Title = "",
                    Language = LanguageEnums.France,
                    UpdatedDate = DateTimeHelper.GetDateTimeNow(),
                    CreatedDate = DateTimeHelper.GetDateTimeNow(),
                },
                new CategoryLanguage()
                {
                    Title = "",
                    Language = LanguageEnums.Chinese,
                    UpdatedDate = DateTimeHelper.GetDateTimeNow(),
                    CreatedDate = DateTimeHelper.GetDateTimeNow(),
                },
                new CategoryLanguage()
                {
                    Title = "",
                    Language = LanguageEnums.Korean,
                    UpdatedDate = DateTimeHelper.GetDateTimeNow(),
                    CreatedDate = DateTimeHelper.GetDateTimeNow(),
                },
                new CategoryLanguage()
                {
                    Title = "",
                    Language = LanguageEnums.Japanese,
                    UpdatedDate = DateTimeHelper.GetDateTimeNow(),
                    CreatedDate = DateTimeHelper.GetDateTimeNow(),
                },
            };

            this.HTRepository.CategoryRepository.Save(entity);
            this.HTRepository.Commit();
            return AutoMapper.Mapper.Map<Category, CategoryModel>(entity);
        }

        [HttpPost, Route("delete-category")]
        [HTAuthorize]
        public bool DeleteCategory([FromBody]int Id)
        {
            var entity = this.HTRepository.CategoryRepository.GetAll()
                .FirstOrDefault(x => x.Id == Id);
            if (entity == null) return false;
            this.HTRepository.CategoryRepository.Delete(entity);
            this.HTRepository.Commit();
            return true;
        }

        [HttpPost, Route("update-category")]
        [HTAuthorize]
        public bool UpdateCategory([FromBody]CategoryModel model)
        {
            if (model == null) return false;
            var entity = this.HTRepository.CategoryRepository.GetAll()
                .Include("CategoryLanguages.Image")
                .Include("CategoryLanguages.Icon")
                .FirstOrDefault(x => x.Id == model.Id);
            if (entity == null) return false;
            entity.UpdatedDate = DateTimeHelper.GetDateTimeNow();
            entity.IsEvent = model.IsEvent;
            foreach (var item in entity.CategoryLanguages)
            {
                var en = model.CategoryLanguages.FirstOrDefault(x => x.Id == item.Id);
                if (en != null)
                {
                    item.Title = en.Title;
                    item.ImageId = en.Image != null ? en.Image.Id : (int?)null;
                    item.IconId = en.Icon != null ? en.Icon.Id : (int?)null;
                    item.UpdatedDate = DateTimeHelper.GetDateTimeNow();
                }
            }

            this.HTRepository.CategoryRepository.Save(entity);
            this.HTRepository.Commit();
            return true;
        }

        [HttpPost, Route("add-language")]
        [HTAuthorize]
        public CategoryLanguageModel AddLanguage([FromBody]CategoryLanguageModel model)
        {
            if (model == null) return null;
            var CatEntity = this.HTRepository.CategoryRepository.GetAll()
                .FirstOrDefault(x => x.Id == model.CategoryId.GetValueOrDefault());
            if (CatEntity == null) return null;
            if (CatEntity.CategoryLanguages == null) CatEntity.CategoryLanguages = new List<CategoryLanguage>();

            var LangEntity = new CategoryLanguage();
            LangEntity.CategoryId = model.CategoryId;
            LangEntity.Language = model.Language;
            LangEntity.Title = model.Title;
            LangEntity.UpdatedDate = DateTimeHelper.GetDateTimeNow();
            LangEntity.CreatedDate = DateTimeHelper.GetDateTimeNow();

            CatEntity.CategoryLanguages.Add(LangEntity);
            this.HTRepository.CategoryRepository.Save(CatEntity);
            this.HTRepository.Commit();

            return AutoMapper.Mapper.Map<CategoryLanguage, CategoryLanguageModel>(LangEntity);
        }

        [HttpPost, Route("delete-language")]
        [HTAuthorize]
        public bool DeleteLanguage([FromBody]int Id)
        {
            var entity = this.HTRepository.CategoryLanguageRepository.GetAll()
                .FirstOrDefault(x => x.Id == Id);
            if (entity == null) return false;

            this.HTRepository.CategoryLanguageRepository.Delete(entity);
            this.HTRepository.Commit();
            return true;
        }

        [HttpPost, Route("translate-category-language")]
        [AllowAnonymous]
        public CategoryLanguageModel TranslateCategoryLanguage([FromBody]CategoryModel model)
        {
            if (model == null || model.CategoryLanguages == null || model.CategoryLanguages.Count != 2) return null;
            var entity = model.CategoryLanguages[0];
            if (entity == null) return null;
            var enCateLanguage = model.CategoryLanguages[1];
            if (enCateLanguage == null) return null;
            entity.Title = TranslateHelper.TranslateText(enCateLanguage.Title, TranslateHelper.GetLanguageCode(entity.Language ?? LanguageEnums.English));
            entity.ImageId = enCateLanguage.ImageId;
            entity.Image = enCateLanguage.Image;
            entity.IconId = enCateLanguage.IconId;
            entity.Icon = enCateLanguage.Icon;
            return entity;
        }

        [HttpPost, Route("translate-all-category-language")]
        [AllowAnonymous]
        public CategoryModel TranslateAllCategoryLanguage([FromBody]CategoryModel model)
        {
            if (model == null || model.CategoryLanguages == null) return null;
            var enCateLanguage = model.CategoryLanguages
                .FirstOrDefault(x => x.Language == LanguageEnums.English);
            if (enCateLanguage == null) return null;
            foreach (var entity in model.CategoryLanguages)
            {
                entity.Title = TranslateHelper.TranslateText(enCateLanguage.Title, TranslateHelper.GetLanguageCode(entity.Language ?? LanguageEnums.English));
                entity.ImageId = enCateLanguage.ImageId;
                entity.Image = enCateLanguage.Image;
                entity.IconId = enCateLanguage.IconId;
                entity.Icon = enCateLanguage.Icon;
            }
            return model;
        }

        [HttpGet, Route("get-category-slider")]
        [AllowAnonymous]
        public List<SliderModel> GetCategorySlider()
        {
            var result = new List<SliderModel>();
            var today = DateTimeHelper.GetDateTimeNow();

            var eventPlaces = this.HTRepository.PlaceRepository.GetAll().
                Where(x => x.Category != null && x.Category.IsEvent.HasValue && x.Category.IsEvent.Value
                && x.StartDate <= today && x.EndDate > today)
                .Include("PlaceLanguages.Image").ToList();

            result = result.Union(eventPlaces.Select(x =>
                new SliderModel()
                {
                    Id = x.Id,
                    SubTitle = x.PlaceLanguages.Where(z => z.Language == LanguageEnums.English).FirstOrDefault().Description,
                    Title = x.PlaceLanguages.Where(z => z.Language == LanguageEnums.English).FirstOrDefault().Title,
                    Url = AutoMapper.Mapper.Map<Image, ImageModel>(x.PlaceLanguages.Where(z => z.Language == LanguageEnums.English).FirstOrDefault().Image) != null ? AutoMapper.Mapper.Map<Image, ImageModel>(x.PlaceLanguages.Where(z => z.Language == LanguageEnums.English).FirstOrDefault().Image).Url : Common.DefaultPhoto.ImageUrl,
                    CreateDate = x.CreatedDate,
                }).ToList()).ToList();

            var Places = this.HTRepository.PlaceRepository.GetAll().
                Where(x => x.IsHomeSlider.HasValue && x.IsHomeSlider.Value)
                .Include("PlaceLanguages.Image").ToList();

            result = result.Union(Places.Select(x =>
                new SliderModel()
                {
                    Id = x.Id,
                    SubTitle = x.PlaceLanguages.Where(z => z.Language == LanguageEnums.English).FirstOrDefault().Description,
                    Title = x.PlaceLanguages.Where(z => z.Language == LanguageEnums.English).FirstOrDefault().Title,
                    Url = x.PlaceLanguages.Where(z => z.Language == LanguageEnums.English).FirstOrDefault().Image != null ? x.PlaceLanguages.Where(z => z.Language == LanguageEnums.English).FirstOrDefault().Image.Url : Common.DefaultPhoto.ImageUrl,                   
                    CreateDate = x.CreatedDate,
                }).ToList()).ToList();

            result = result.OrderByDescending(x => x.CreateDate).Take(20).ToList();
            return result;
        }

        [HttpGet, Route("get-category-data")]
        [AllowAnonymous]
        public List<MenuListModel> GetCategoryData()
        {
            var result = new List<MenuListModel>();
            var CategoryEntity = this.HTRepository.CategoryRepository.GetAll()
                .Include("HTServices.HTServiceLanguages.Image");

            var CateService = CategoryEntity.Where(x => x.HTServices.Count > 0);
            var CatePlace = CategoryEntity.Where(x => x.HTServices.Count == 0 && x.Places.Count > 0);

            result = result.Union(CateService.Select(x =>
                new MenuListModel()
                {
                    Id = x.Id,
                    Order = x.Order,
                    Name = x.CategoryLanguages.Where(z => z.Language == LanguageEnums.English).FirstOrDefault().Title,
                    Icon = x.CategoryLanguages.Where(z => z.Language == LanguageEnums.English).FirstOrDefault().Icon != null ? AutoMapper.Mapper.Map<Image, ImageModel>(x.CategoryLanguages.Where(z => z.Language == LanguageEnums.English).FirstOrDefault().Icon).Url : null,
                    Items = x.HTServices.Select(y => new MenuItemModel()
                    {
                        Title = y.HTServiceLanguages.Where(z => z.Language == LanguageEnums.English).FirstOrDefault().Title,
                        Url = y.HTServiceLanguages.Where(z => z.Language == LanguageEnums.English).FirstOrDefault().Image != null ? AutoMapper.Mapper.Map<Image, ImageModel>(y.HTServiceLanguages.Where(z => z.Language == LanguageEnums.English).FirstOrDefault().Image).Url : Common.DefaultPhoto.ImageUrl,
                    }).ToList(),
                })).ToList();

            result = result.Union(CatePlace.Select(x =>
            new MenuListModel()
            {
                Id = x.Id,
                Order = x.Order,
                Name = x.CategoryLanguages.Where(z => z.Language == LanguageEnums.English).FirstOrDefault().Title,
                Image = x.CategoryLanguages.Where(z => z.Language == LanguageEnums.English).FirstOrDefault().Image != null ? AutoMapper.Mapper.Map<Image, ImageModel>(x.CategoryLanguages.Where(z => z.Language == LanguageEnums.English).FirstOrDefault().Image).Url : Common.DefaultPhoto.ImageUrl,
                Icon = x.CategoryLanguages.Where(z => z.Language == LanguageEnums.English).FirstOrDefault().Icon != null ? AutoMapper.Mapper.Map<Image, ImageModel>(x.CategoryLanguages.Where(z => z.Language == LanguageEnums.English).FirstOrDefault().Icon).Url : null,
                Items = null})).ToList();

            result = result.OrderBy(x => x.Order).ToList();
            return result;
        }

        [HttpPost, Route("order-category")]
        [AllowAnonymous]
        public List<CategoryModel> OrderCategory([FromBody]List<int> categoryIds)
        {
            for (int i = 0; i < categoryIds.Count; i++)
            {
                var cateEntity = this.HTRepository.CategoryRepository.GetObject(categoryIds[i]);
                if (cateEntity != null)
                {
                    cateEntity.Order = (i + 1);
                    this.HTRepository.CategoryRepository.Save(cateEntity);
                }
            }
            this.HTRepository.Commit();
            var entities = this.HTRepository.CategoryRepository.GetAll()
                .Include("CategoryLanguages.Image")
                .Include("CategoryLanguages.Icon")
                .Take(1000).OrderBy(t => t.Order).ToList();

            var models = entities.Select(x => AutoMapper.Mapper.Map<Category, CategoryModel>(x)).ToList();

            return models;
        }


        [HttpGet, Route("get-category-by-id")]
        [AllowAnonymous]
        public MenuListModel GetCategoryById(int Id)
        {
            var result = new MenuListModel();
            var CategoryEntity = this.HTRepository.CategoryLanguageRepository.GetAll()
                .Include(x => x.Icon).Include("Category.HTServices.HTServiceLanguages.Image")
                .Where(x => x.CategoryId == Id && x.Language == LanguageEnums.English).FirstOrDefault();
            if (CategoryEntity == null) return result;

            result.Id = CategoryEntity.CategoryId.Value;
            result.Icon = CategoryEntity.Icon != null ? CategoryEntity.Icon.Url : "";
            result.Name = CategoryEntity.Title;
            result.Items = CategoryEntity.Category.HTServices.Select(y => new MenuItemModel()
            {
                Id = y.Id,
                Title = y.HTServiceLanguages.Where(z => z.Language == LanguageEnums.English).FirstOrDefault().Title,
                Url = y.HTServiceLanguages.Where(z => z.Language == LanguageEnums.English).FirstOrDefault().Image != null ? AutoMapper.Mapper.Map<Image, ImageModel>(y.HTServiceLanguages.Where(z => z.Language == LanguageEnums.English).FirstOrDefault().Image).Url : Common.DefaultPhoto.ImageUrl,
            }).ToList();

            return result;
        }

        [HttpGet, Route("get-category-no-service-by-id")]
        [AllowAnonymous]
        public CategoryModel GetCategoryNoServiceById(int id)
        {
            var category = this.HTRepository.CategoryRepository.GetAll()
                .Include("Places.PlaceLanguages.Image")
                .Where(x => x.Places.All(p => p.HTServiceId == null || p.HTServiceId == 0) && x.Id == id).FirstOrDefault();
            if (category == null) return null;
            return AutoMapper.Mapper.Map<CategoryModel>(category);
        }
    }
}
