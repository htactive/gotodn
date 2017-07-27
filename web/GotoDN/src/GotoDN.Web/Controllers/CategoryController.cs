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
                .Take(1000).ToList();

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
            var result = new List<SliderModel>() ;
            var eventCategories = this.HTRepository.CategoryRepository.GetAll()
                .Where(x => x.IsEvent == true).Include("Places.PlaceLanguages.Image").ToList();

            if(eventCategories != null)
            {
                foreach(var category in eventCategories)
                {
                    var a = category.Places.Select(x => 
                        new SliderModel()
                        {
                            Id = x.Id,
                            SubTitle = x.PlaceLanguages.Where(z => z.Language == LanguageEnums.English).FirstOrDefault().Description,
                            Title = x.PlaceLanguages.Where(z => z.Language == LanguageEnums.English).FirstOrDefault().Title,
                            Url = AutoMapper.Mapper.Map<Image,ImageModel>(x.PlaceLanguages.Where(z => z.Language == LanguageEnums.English).FirstOrDefault().Image)?.Url,
                        }).ToList();
                    foreach(var item in a)
                    {
                        result.Add(item);
                    }
                }
            }
            return result;
        }
    }
}
