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

        [HttpGet, Route("get-all")]
        [AllowAnonymous]
        public List<CityModel> GetAll()
        {
            var entities = this.HTRepository.CityRepository.GetAll()
                .Take(1000).ToList();

            var models = entities.Select(x => AutoMapper.Mapper.Map<City, CityModel>(x)).ToList();

            return models;
        }

        [HttpPost, Route("filter")]
        [AllowAnonymous]
        public GetGridResponseModel<CityModel> Filter([FromBody]GetGridRequestModel request)
        {
            var query = this.HTRepository.CityRepository.GetAll();
            query = query.Include(x => x.Districts);
            // search
            if (!string.IsNullOrEmpty(request.Search))
            {
                var search = request.Search.ToLower().Trim();
                query = query.Where(x => (x.Name != null && x.Name.ToLower().Contains(search))
                //|| (x.Districts != null && x.Districts.Any(y => y.Name != null && y.Name.ToLower().Contains(search)))
                );
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
            entity.Name = "Tên tỉnh thành";

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
                .Include(x => x.Districts)
                .FirstOrDefault(x => x.Id == model.Id);
            if (entity == null) return false;
            entity.Name = model.Name;
            foreach (var item in entity.Districts)
            {
                var en = model.Districts.FirstOrDefault(x => x.Id == item.Id);
                if (en != null)
                {
                    item.Name = en.Name;
                }
            }

            this.HTRepository.CityRepository.Save(entity);
            this.HTRepository.Commit();
            return true;
        }
       

        [HttpPost, Route("delete-district")]
        [AllowAnonymous]
        public bool DeleteDistrict([FromBody]int Id)
        {
            var entity = this.HTRepository.DistrictRepository.GetAll()
                .FirstOrDefault(x => x.Id == Id);
            if (entity == null) return false;

            this.HTRepository.DistrictRepository.Delete(entity);
            this.HTRepository.Commit();
            return true;
        }

        [HttpPost, Route("filter-district")]
        [AllowAnonymous]
        public GetGridResponseModel<DistrictModel> FilterDistrict([FromBody]GetGridRequestModel request)
        {
            var query = this.HTRepository.DistrictRepository.GetAll();
            query = query.Include(x => x.City);
            // search
            if (!string.IsNullOrEmpty(request.Search))
            {
                var search = request.Search.ToLower().Trim();
                query = query.Where(x => (x.Name != null && x.Name.ToLower().Contains(search)
                || (x.City != null && x.City.Name != null && x.City.Name.ToLower().Contains(search))
                ));
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
                case "City":
                    query = request.IsAsc ? query.OrderBy(x => (x.City !=null ? x.City.Name : "")) : query.OrderByDescending(x => (x.City != null ? x.City.Name : ""));
                    break;
            }
            // count
            var totalRecord = query.Count();

            // take
            var entities = query.Skip((request.CurrentPage - 1) * request.PageSize).Take(request.PageSize).ToList();

            //map
            var models = entities.Select(x => AutoMapper.Mapper.Map<District, DistrictModel>(
                x, opt =>
                {
                    opt.AfterMap((ent, mod) =>
                    {
                        mod.City = AutoMapper.Mapper.Map<CityModel>(ent.City);
                    });
                })).ToList();

            var response = new GetGridResponseModel<DistrictModel>();
            response.DataSource = models;
            response.TotalRecord = totalRecord;
            return response;
        }

        [HttpPost, Route("create-district")]
        [AllowAnonymous]
        public DistrictModel CreateDistrict()
        {
            var entity = new District();
            entity.Name = "Tên quận huyện";

            this.HTRepository.DistrictRepository.Save(entity);
            this.HTRepository.Commit();
            return AutoMapper.Mapper.Map<District, DistrictModel>(entity);
        }

        [HttpPost, Route("update-district")]
        [AllowAnonymous]
        public bool UpdateDistrict([FromBody]DistrictModel model)
        {
            if (model == null) return false;
            var entity = this.HTRepository.DistrictRepository.GetAll()
                .FirstOrDefault(x => x.Id == model.Id);
            if (entity == null) return false;
            entity.Name = model.Name;
            entity.CityId = model.CityId;

            this.HTRepository.DistrictRepository.Save(entity);
            this.HTRepository.Commit();
            return true;
        }
    }
}
