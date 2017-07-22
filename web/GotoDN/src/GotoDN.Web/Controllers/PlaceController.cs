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
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

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
        [HTAuthorize]
        public PlaceModel CreatePlace()
        {
            var entity = new Place();
            entity.CreatedDate = Common.DateTimeHelper.GetDateTimeNow();
            entity.UpdatedDate = Common.DateTimeHelper.GetDateTimeNow();

            entity.PlaceLanguages = new List<PlaceLanguage>()
            {
                new PlaceLanguage()
                {
                    Title = "Place's Name",
                    Language = LanguageEnums.English,
                    UpdatedDate = DateTimeHelper.GetDateTimeNow(),
                    CreatedDate = DateTimeHelper.GetDateTimeNow(),
                },
                new PlaceLanguage()
                {
                    Title = "",
                    Language = LanguageEnums.Vietnamese,
                    UpdatedDate = DateTimeHelper.GetDateTimeNow(),
                    CreatedDate = DateTimeHelper.GetDateTimeNow(),
                },
                new PlaceLanguage()
                {
                    Title = "",
                    Language = LanguageEnums.France,
                    UpdatedDate = DateTimeHelper.GetDateTimeNow(),
                    CreatedDate = DateTimeHelper.GetDateTimeNow(),
                },
                new PlaceLanguage()
                {
                    Title = "",
                    Language = LanguageEnums.Chinese,
                    UpdatedDate = DateTimeHelper.GetDateTimeNow(),
                    CreatedDate = DateTimeHelper.GetDateTimeNow(),
                },
                new PlaceLanguage()
                {
                    Title = "",
                    Language = LanguageEnums.Korean,
                    UpdatedDate = DateTimeHelper.GetDateTimeNow(),
                    CreatedDate = DateTimeHelper.GetDateTimeNow(),
                },
                new PlaceLanguage()
                {
                    Title = "",
                    Language = LanguageEnums.Japanese,
                    UpdatedDate = DateTimeHelper.GetDateTimeNow(),
                    CreatedDate = DateTimeHelper.GetDateTimeNow(),
                }
            };

            this.HTRepository.PlaceRepository.Save(entity);
            this.HTRepository.Commit();
            return AutoMapper.Mapper.Map<Place, PlaceModel>(entity);
        }

        [HttpPost, Route("delete-place")]
        [HTAuthorize]
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
        [HTAuthorize]
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
            entity.CityId = model.CityId;
            entity.CloseTime = model.CloseTime;
            entity.DistrictId = model.DistrictId;
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
        [HTAuthorize]
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

            return AutoMapper.Mapper.Map<PlaceLanguage, PlaceLanguageModel>(LangEntity);
        }

        [HttpPost, Route("delete-language")]
        [HTAuthorize]
        public bool DeleteLanguage([FromBody]int Id)
        {
            var entity = this.HTRepository.PlaceLanguageRepository.GetAll()
                .FirstOrDefault(x => x.Id == Id);
            if (entity == null) return false;

            this.HTRepository.PlaceLanguageRepository.Delete(entity);
            this.HTRepository.Commit();
            return true;
        }

        [HttpPost, Route("filter")]
        [AllowAnonymous]
        public GetGridResponseModel<PlaceModel> Filter([FromBody]GetGridRequestModel request)
        {
            var query = this.HTRepository.PlaceRepository.GetAll();
            query = query.Include("PlaceLanguages.Image").Include("PlaceLanguages.Icon")
                .Include("Category.CategoryLanguages").Include("HTService.HTServiceLanguages")
                .Include(x => x.City).Include(x => x.District);
            // search
            if (!string.IsNullOrEmpty(request.Search))
            {
                var search = request.Search.ToLower().Trim();
                query = query.Where(x => (x.City != null && !string.IsNullOrEmpty(x.City.Name) && x.City.Name.ToLower().Contains(search))
                || (x.District != null && !string.IsNullOrEmpty(x.District.Name) && x.District.Name.ToLower().Contains(search))
                || (x.PlaceLanguages.Any(y => y.Title.ToLower().Contains(search)))
                || (x.Category != null &&
                x.Category.CategoryLanguages.DefaultIfEmpty().First().Title.ToLower().Contains(search))
                || (x.HTService != null &&
                x.HTService.HTServiceLanguages.DefaultIfEmpty().First().Title.ToLower().Contains(search))
                );
            }

            // filter
            if (request.Parameters != null)
            {
                foreach (var item in request.Parameters)
                {
                    var search = item.Value.ToString().ToLower().Trim();
                    switch (item.Key)
                    {
                        case "Name":
                            query = query.Where(x => x.PlaceLanguages.Any(y => y.Title.ToLower().Contains(search)));
                            break;
                        case "Category":
                            query = query.Where(x => x.Category != null &&
                    x.Category.CategoryLanguages.DefaultIfEmpty().First().Title.ToLower().Contains(search));
                            break;
                        case "Service":
                            query = query.Where(x => x.HTService != null &&
                    x.HTService.HTServiceLanguages.DefaultIfEmpty().First().Title.ToLower().Contains(search));
                            break;
                        case "City":
                            query = query.Where(x => x.City != null &&
                    x.City.Name.ToLower().Contains(search));
                            break;
                        case "District":
                            query = query.Where(x => x.District != null &&
                    x.District.Name.ToLower().Contains(search));
                            break;
                        case "Highlight":
                            if (search.Equals("0"))
                            {
                                query = query.Where(x => (!(bool)x.IsHomeSlider && !(bool)x.IsCategorySlider)
                                || (x.IsHomeSlider == null && !(bool)x.IsCategorySlider)
                                || (!(bool)x.IsHomeSlider && !x.IsCategorySlider == null)
                                || (!x.IsHomeSlider == null && !x.IsCategorySlider == null)
                                );
                            }
                            else if (search.Equals("1"))
                            {
                                query = query.Where(x => x.IsCategorySlider.Value || x.IsHomeSlider.Value);
                            }
                            break;
                        case "Ranking":
                            query = query.Where(x => x.Rating == float.Parse(search));
                            break;
                        case "StartDate":
                            var json = JsonConvert.DeserializeObject<CompareModel>(search);
                            if (json != null)
                            {
                                var startTime0h = json.date.Value;
                                var endTime24h = json.date.Value.AddHours(23).AddMinutes(59).AddSeconds(59);
                                var comparator = json.comparator;
                                if (comparator.Equals("="))
                                {
                                    query = query.Where(x => x.StartDate.Value >= startTime0h && x.StartDate.Value <= endTime24h);
                                }
                                else if (comparator.Equals(">"))
                                {
                                    query = query.Where(x => x.StartDate.Value > endTime24h);
                                }
                                else if (comparator.Equals("<"))
                                {
                                    query = query.Where(x => x.StartDate.Value < startTime0h);
                                }
                                else if (comparator.Equals(">="))
                                {
                                    query = query.Where(x => x.StartDate.Value >= startTime0h);
                                }
                                else if (comparator.Equals("<="))
                                {
                                    query = query.Where(x => x.StartDate.Value <= endTime24h);
                                }
                                else if (comparator.Equals("!="))
                                {
                                    query = query.Where(x => x.StartDate.Value < startTime0h || x.StartDate.Value > endTime24h);
                                }
                            }
                            break;
                        case "EndDate":
                            var jsonD = JsonConvert.DeserializeObject<CompareModel>(search);
                            if (jsonD != null)
                            {
                                var startTime0h = jsonD.date.Value;
                                var endTime24h = jsonD.date.Value.AddHours(23).AddMinutes(59).AddSeconds(59);
                                var comparator = jsonD.comparator;
                                if (comparator.Equals("="))
                                {
                                    query = query.Where(x => x.EndDate.Value >= startTime0h && x.EndDate.Value <= endTime24h);
                                }
                                else if (comparator.Equals(">"))
                                {
                                    query = query.Where(x => x.EndDate.Value > endTime24h);
                                }
                                else if (comparator.Equals("<"))
                                {
                                    query = query.Where(x => x.EndDate.Value < startTime0h);
                                }
                                else if (comparator.Equals(">="))
                                {
                                    query = query.Where(x => x.EndDate.Value >= startTime0h);
                                }
                                else if (comparator.Equals("<="))
                                {
                                    query = query.Where(x => x.EndDate.Value <= endTime24h);
                                }
                                else if (comparator.Equals("!="))
                                {
                                    query = query.Where(x => x.EndDate.Value < startTime0h || x.EndDate.Value > endTime24h);
                                }
                            }
                            break;
                    }
                }
            }

            // sort
            switch (request.SortExpression)
            {
                case "Id":
                    query = request.IsAsc ? query.OrderBy(x => x.Id) : query.OrderByDescending(x => x.Id);
                    break;
                case "Name":
                    query = request.IsAsc ? query.OrderBy(x => x.PlaceLanguages.DefaultIfEmpty().First().Title) : query.OrderByDescending(x => x.PlaceLanguages.DefaultIfEmpty().First().Title);
                    break;
                case "Category":
                    query = request.IsAsc ? query.OrderBy(x => x.Category.CategoryLanguages.DefaultIfEmpty().First().Title) : query.OrderByDescending(x => x.Category.CategoryLanguages.DefaultIfEmpty().First().Title);
                    break;
                case "Service":
                    query = request.IsAsc ? query.OrderBy(x => x.HTService.HTServiceLanguages.DefaultIfEmpty().First().Title) : query.OrderByDescending(x => x.HTService.HTServiceLanguages.DefaultIfEmpty().First().Title);
                    break;
                case "City":
                    query = request.IsAsc ? query.OrderBy(x => x.City.Name) : query.OrderByDescending(x => x.City.Name);
                    break;
                case "District":
                    query = request.IsAsc ? query.OrderBy(x => x.District.Name) : query.OrderByDescending(x => x.District.Name);
                    break;
                case "Highlight":
                    query = request.IsAsc ? query.OrderBy(x => x.IsCategorySlider.Value || x.IsHomeSlider.Value) : query.OrderByDescending(x => x.IsCategorySlider.Value || x.IsHomeSlider.Value);
                    break;
                case "StartDate":
                    query = request.IsAsc ? query.OrderBy(x => x.StartDate) : query.OrderByDescending(x => x.StartDate);
                    break;
                case "EndDate":
                    query = request.IsAsc ? query.OrderBy(x => x.EndDate) : query.OrderByDescending(x => x.EndDate);
                    break;
                case "Ranking":
                    query = request.IsAsc ? query.OrderBy(x => x.Rating) : query.OrderByDescending(x => x.Rating);
                    break;
            }
            // count
            var totalRecord = query.Count();

            // take
            var entities = query.Skip((request.CurrentPage - 1) * request.PageSize).Take(request.PageSize).ToList();

            //map
            var models = entities.Select(x => AutoMapper.Mapper.Map<Place, PlaceModel>(
                x, opt =>
                {
                    opt.AfterMap((ent, mod) =>
                    {
                        mod.Category = AutoMapper.Mapper.Map<CategoryModel>(ent.Category);
                        mod.HTService = AutoMapper.Mapper.Map<HTServiceModel>(ent.HTService);
                    });
                })).ToList();

            var response = new GetGridResponseModel<PlaceModel>();
            response.DataSource = models;
            response.TotalRecord = totalRecord;
            return response;
        }
    }
}
