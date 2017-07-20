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
        [AllowAnonymous]
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
                }
            };

            this.HTRepository.CategoryRepository.Save(entity);
            this.HTRepository.Commit();
            return AutoMapper.Mapper.Map<Category, CategoryModel>(entity);
        }

        [HttpPost, Route("delete-category")]
        [AllowAnonymous]
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
        [AllowAnonymous]
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
        [AllowAnonymous]
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

            return AutoMapper.Mapper.Map<CategoryLanguage, CategoryLanguageModel>(LangEntity); ;
        }

        [HttpPost, Route("delete-language")]
        [AllowAnonymous]
        public bool DeleteLanguage([FromBody]int Id)
        {
            var entity = this.HTRepository.CategoryLanguageRepository.GetAll()
                .FirstOrDefault(x => x.Id == Id);
            if (entity == null) return false;

            this.HTRepository.CategoryLanguageRepository.Delete(entity);
            this.HTRepository.Commit();
            return true;
        }
    }
}
