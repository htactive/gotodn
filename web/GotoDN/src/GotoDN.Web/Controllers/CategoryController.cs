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
        public List<Category> GetAll()
        {
            var entities = this.HTRepository.CategoryRepository.GetAll()
                .Include("CategoryLanguages.Image")
                .Take(1000).ToList();
            return entities;
            //var models = entities.Select(AutoMapper.Mapper.Map<Category, CategoryModel>).ToList();

            //return models;
        }
    }
}
