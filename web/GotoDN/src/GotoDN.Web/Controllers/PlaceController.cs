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
    [Route("place")]
    public class PlaceController : BaseController
    {
        public PlaceController(HTRepository repository) : base(repository)
        {
        }

        [HttpGet, Route("get-all")]
        [AllowAnonymous]
        public List<PlaceModel> GetAll()
        {
            var entities = this.HTRepository.PlaceRepository.GetAll()
                .Include("PlaceLanguages.Image")
                .Include("PlaceLanguages.Icon")
                .Take(1000).ToList();

            var models = entities.Select(x => AutoMapper.Mapper.Map<Place, PlaceModel>(x)).ToList();

            return models;
        }

        [HttpPost, Route("create-place")]
        [AllowAnonymous]
        public PlaceModel CreatePlace()
        {
            var entity = new Place();
            entity.CreatedDate = Common.DateTimeHelper.GetDateTimeNow();
            entity.UpdatedDate = Common.DateTimeHelper.GetDateTimeNow();

            entity.PlaceLanguages = new List<PlaceLanguage>()
            {
                new PlaceLanguage()
                {
                    Title = "Chưa đặt tên",
                    Language = LanguageEnums.Vietnamese,
                    UpdatedDate = DateTimeHelper.GetDateTimeNow(),
                    CreatedDate = DateTimeHelper.GetDateTimeNow(),
                }
            };

            this.HTRepository.PlaceRepository.Save(entity);
            this.HTRepository.Commit();
            return AutoMapper.Mapper.Map<Place, PlaceModel>(entity);
        }

        [HttpPost, Route("delete-place")]
        [AllowAnonymous]
        public bool DeletePlace([FromBody]int Id)
        {
            var entity = this.HTRepository.PlaceRepository.GetAll()
                .FirstOrDefault(x => x.Id == Id);
            if (entity == null) return false;
            this.HTRepository.PlaceRepository.Delete(entity);
            this.HTRepository.Commit();
            return true;
        }

        [HttpPost, Route("update-place")]
        [AllowAnonymous]
        public bool UpdatePlace([FromBody]PlaceModel model)
        {
            if (model == null) return false;
            var entity = this.HTRepository.PlaceRepository.GetAll()
                .Include("PlaceLanguages.Image")
                .Include("PlaceLanguages.Icon")
                .FirstOrDefault(x => x.Id == model.Id);
            if (entity == null) return false;
            entity.UpdatedDate = DateTimeHelper.GetDateTimeNow();
            entity.Address = model.Address;
            entity.City = model.City;
            entity.CloseTime = model.CloseTime;
            entity.District = model.District;
            entity.EndDate = model.EndDate;
            entity.IsCategorySlider = model.IsCategorySlider;
            entity.IsHomeSlider = model.IsHomeSlider;
            entity.Latitude = model.Latitude;
            entity.Longitude = model.Longitude;
            entity.OpenTime = model.OpenTime;
            entity.Phone = model.Phone;
            entity.Rating = model.Rating;
            entity.StartDate = model.StartDate;
            entity.Website = model.Website;
            entity.HTServiceId = model.HTServiceId;
            entity.CategoryId = model.CategoryId;

            foreach (var item in entity.PlaceLanguages)
            {
                var en = model.PlaceLanguages.FirstOrDefault(x => x.Id == item.Id);
                if (en != null)
                {
                    item.Title = en.Title;
                    item.ImageId = en.Image != null ? en.Image.Id : (int?)null;
                    item.IconId = en.Icon != null ? en.Icon.Id : (int?)null;
                    item.Description = en.Description;
                    item.UpdatedDate = DateTimeHelper.GetDateTimeNow();
                }
            }

            this.HTRepository.PlaceRepository.Save(entity);
            this.HTRepository.Commit();
            return true;
        }

        [HttpPost, Route("add-language")]
        [AllowAnonymous]
        public PlaceLanguageModel AddLanguage([FromBody]PlaceLanguageModel model)
        {
            if (model == null) return null;
            var CatEntity = this.HTRepository.PlaceRepository.GetAll()
                .FirstOrDefault(x => x.Id == model.PlaceId.GetValueOrDefault());
            if (CatEntity == null) return null;
            if (CatEntity.PlaceLanguages == null) CatEntity.PlaceLanguages = new List<PlaceLanguage>();

            var LangEntity = new PlaceLanguage();
            LangEntity.PlaceId = model.PlaceId;
            LangEntity.Language = model.Language;
            LangEntity.Title = model.Title;
            LangEntity.UpdatedDate = DateTimeHelper.GetDateTimeNow();
            LangEntity.CreatedDate = DateTimeHelper.GetDateTimeNow();

            CatEntity.PlaceLanguages.Add(LangEntity);
            this.HTRepository.PlaceRepository.Save(CatEntity);
            this.HTRepository.Commit();

            return AutoMapper.Mapper.Map<PlaceLanguage, PlaceLanguageModel>(LangEntity); ;
        }

        [HttpPost, Route("delete-language")]
        [AllowAnonymous]
        public bool DeleteLanguage([FromBody]int Id)
        {
            var entity = this.HTRepository.PlaceLanguageRepository.GetAll()
                .FirstOrDefault(x => x.Id == Id);
            if (entity == null) return false;

            this.HTRepository.PlaceLanguageRepository.Delete(entity);
            this.HTRepository.Commit();
            return true;
        }
    }
}
