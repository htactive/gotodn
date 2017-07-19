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
    [Route("city")]
    public class CityController : BaseController
    {
        public CityController(HTRepository repository) : base(repository)
        {
        }

        [HttpPost, Route("filter")]
        [AllowAnonymous]
        public GetGridResponseModel<CityModel> Filter([FromBody]GetGridRequestModel request)
        {
            var query = this.HTRepository.CityRepository.GetAll();
            query = query.Include(x => x.District);
            // search
            if (!string.IsNullOrEmpty(request.Search))
            {
                var search = request.Search.ToLower().Trim();
                query = query.Where(x => (x.Name != null && x.Name.ToLower().Contains(search)));
            }

            // sort
            switch (request.SortExpression)
            {
                case "Id":
                    query = request.IsAsc ? query.OrderBy(x => x.Id) : query.OrderByDescending(x => x.Id);
                    break;
                case "Name":
                    query = request.IsAsc ? query.OrderBy(x => x.Name) : query.OrderByDescending(x => x.Name);
                    break;
            }
            // count
            var totalRecord = query.Count();

            // take
            var entities = query.Skip((request.CurrentPage - 1) * request.PageSize).Take(request.PageSize).ToList();

            //map
            var models = entities.Select(x => AutoMapper.Mapper.Map<City, CityModel>(x)).ToList();

            var response = new GetGridResponseModel<CityModel>();
            response.DataSource = models;
            response.TotalRecord = totalRecord;
            return response;
        }

        [HttpPost, Route("create-city")]
        [AllowAnonymous]
        public CityModel CreateCity()
        {
            var entity = new City();
            entity.Name = "";

            this.HTRepository.CityRepository.Save(entity);
            this.HTRepository.Commit();
            return AutoMapper.Mapper.Map<City, CityModel>(entity);
        }

        [HttpPost, Route("delete-city")]
        [AllowAnonymous]
        public bool DeleteCity([FromBody]int Id)
        {
            var entity = this.HTRepository.CityRepository.GetAll()
                .FirstOrDefault(x => x.Id == Id);
            if (entity == null) return false;
            this.HTRepository.CityRepository.Delete(entity);
            this.HTRepository.Commit();
            return true;
        }

        [HttpPost, Route("update-city")]
        [AllowAnonymous]
        public bool UpdateCity([FromBody]CityModel model)
        {
            if (model == null) return false;
            var entity = this.HTRepository.CityRepository.GetAll()
                .Include(x => x.District)
                .FirstOrDefault(x => x.Id == model.Id);
            if (entity == null) return false;
            entity.Name = model.Name;
            foreach (var item in entity.District)
            {
                var en = model.District.FirstOrDefault(x => x.Id == item.Id);
                if (en != null)
                {
                    item.Name = en.Name;
                }
            }

            this.HTRepository.CityRepository.Save(entity);
            this.HTRepository.Commit();
            return true;
        }

        [HttpPost, Route("add-district")]
        [AllowAnonymous]
        public DistrictModel AddLanguage([FromBody]DistrictModel model)
        {
            if (model == null) return null;
            var CatEntity = this.HTRepository.CityRepository.GetAll()
                .FirstOrDefault(x => x.Id == model.CityId.GetValueOrDefault());
            if (CatEntity == null) return null;
            if (CatEntity.District == null) CatEntity.District = new List<District>();

            var LangEntity = new District();
            LangEntity.Name = model.Name;

            CatEntity.District.Add(LangEntity);
            this.HTRepository.CityRepository.Save(CatEntity);
            this.HTRepository.Commit();

            return AutoMapper.Mapper.Map<District, DistrictModel>(LangEntity); ;
        }

        [HttpPost, Route("delete-district")]
        [AllowAnonymous]
        public bool DeleteLanguage([FromBody]int Id)
        {
            var entity = this.HTRepository.DistrictRepository.GetAll()
                .FirstOrDefault(x => x.Id == Id);
            if (entity == null) return false;

            this.HTRepository.DistrictRepository.Delete(entity);
            this.HTRepository.Commit();
            return true;
        }
    }
}
