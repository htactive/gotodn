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
                .Take(1000).ToList();

            var models = entities.Select(x =>
            AutoMapper.Mapper.Map<Category, CategoryModel>(x, option =>
            {
                option.AfterMap((entity, model) =>
                {
                    model.CategoryLanguages = entity.CategoryLanguages.Select(m => AutoMapper.Mapper.Map<CategoryLanguage, CategoryLanguageModel>(m, opt =>
                    {
                        opt.AfterMap((en, mo) => mo.Image = AutoMapper.Mapper.Map<Image, ImageModel>(en.Image));
                    })).ToList();
                });
            })).ToList();

            return models;
        }
    }
}
