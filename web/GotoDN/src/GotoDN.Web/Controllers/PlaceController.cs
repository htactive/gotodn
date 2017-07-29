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
using System.IO;

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
                .Include("PlaceLanguages.PlaceImages.Image")
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
            entity.Fax = model.Fax;
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
                    if (item.PlaceImages == null) item.PlaceImages = new List<PlaceImage>();
                    item.PlaceImages.Clear();
                    item.PlaceImages.AddRange(en.PlaceImages.Take(10).Select(t => new PlaceImage
                    {
                        ImageId = t.ImageId,
                        PlaceLangId = en.Id,
                    }));
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
        public GetGridResponseModel<SearchPlaceModel> Filter([FromBody]GetGridRequestModel request)
        {
            var query = this.HTRepository.PlaceRepository.GetAll();
            query = query.Include("PlaceLanguages")
                .Include("Category.CategoryLanguages").Include("HTService.HTServiceLanguages")
                .Include(x => x.City).Include(x => x.District);

            var searchQuery = query.Select(q => new SearchPlaceModel
            {
                Id = q.Id,
                Title = q.PlaceLanguages.FirstOrDefault(t => t.Language == LanguageEnums.English).Title,
                CategoryId = q.CategoryId,
                CategoryName = q.Category.CategoryLanguages.FirstOrDefault(t => t.Language == LanguageEnums.English).Title,
                ServiceId = q.HTServiceId,
                ServiceName = q.HTServiceId != null ? q.HTService.HTServiceLanguages.FirstOrDefault(t => t.Language == LanguageEnums.English).Title : "",
                CityId = q.CityId,
                City = q.City.Name,
                DistrictId = q.DistrictId,
                District = q.District.Name,
                IsCategorySlider = q.IsCategorySlider,
                IsHomeSlider = q.IsHomeSlider,
                StartDate = q.StartDate,
                EndDate = q.EndDate,
                Rating = q.Rating,
                IsEvent = q.Category.IsEvent
            });

            // search
            if (!string.IsNullOrEmpty(request.Search))
            {
                var search = request.Search.ToLower().Trim();
                var searchInt = 0;
                var canParse = int.TryParse(search,out searchInt);

                searchQuery = searchQuery.Where(x => (x.City != null && x.City.ToLower().Contains(search))
                || (x.District != null && x.District.ToLower().Contains(search))
                || (x.Title != null && x.Title.ToLower().Contains(search))
                || (x.CategoryName != null && x.CategoryName.ToLower().Contains(search))
                || (x.ServiceName != null && x.ServiceName.ToLower().Contains(search))
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
                            searchQuery = searchQuery.Where(x => x.Title != null && x.Title.ToLower().Contains(search));
                            break;
                        case "Category":
                            searchQuery = searchQuery.Where(x => x.CategoryName != null && x.CategoryName.ToLower().Contains(search));
                            break;
                        case "Service":
                            searchQuery = searchQuery.Where(x => x.ServiceName != null && x.ServiceName.ToLower().Contains(search));
                            break;
                        case "City":
                            searchQuery = searchQuery.Where(x => x.City != null && x.City.ToLower().Contains(search));
                            break;
                        case "District":
                            searchQuery = searchQuery.Where(x => x.District != null && x.District.ToLower().Contains(search));
                            break;
                        case "HomeHighlight":
                            if (search.Equals("0"))
                            {
                                searchQuery = searchQuery.Where(x => !x.IsHomeSlider.HasValue || !x.IsHomeSlider.Value);
                            }
                            else if (search.Equals("1"))
                            {
                                searchQuery = searchQuery.Where(x => x.IsHomeSlider.HasValue && x.IsHomeSlider.Value);
                            }
                            break;
                        case "CategoryHighlight":
                            if (search.Equals("0"))
                            {
                                searchQuery = searchQuery.Where(x => !x.IsCategorySlider.HasValue || !x.IsCategorySlider.Value);
                            }
                            else if (search.Equals("1"))
                            {
                                searchQuery = searchQuery.Where(x => x.IsCategorySlider.HasValue && x.IsCategorySlider.Value);
                            }
                            break;
                        case "IsEvent":
                            if (search.Equals("0"))
                            {
                                searchQuery = searchQuery.Where(x => !x.IsEvent.HasValue || !x.IsEvent.Value);
                            }
                            else if (search.Equals("1"))
                            {
                                searchQuery = searchQuery.Where(x => x.IsEvent.HasValue && x.IsEvent.Value);
                            }
                            break;
                        case "Ranking":
                            int searchInt = 0;
                            var canParse = int.TryParse(search, out searchInt);
                            searchQuery = searchQuery.Where(x => x.Rating == (float)searchInt);
                            break;
                        case "StartDate":
                            var json = JsonConvert.DeserializeObject<CompareModel>(search);
                            if (json != null)
                            {
                                var startTime0h = json.date.Value;
                                var endTime24h = json.date.Value.AddHours(23).AddMinutes(59).AddSeconds(59);
                                var comparator = json.comparator;
                                searchQuery = searchQuery.Where(x => x.StartDate.HasValue);
                                if (comparator.Equals("="))
                                {
                                    searchQuery = searchQuery.Where(x => x.StartDate.Value >= startTime0h && x.StartDate.Value <= endTime24h);
                                }
                                else if (comparator.Equals(">"))
                                {
                                    searchQuery = searchQuery.Where(x => x.StartDate.Value > endTime24h);
                                }
                                else if (comparator.Equals("<"))
                                {
                                    searchQuery = searchQuery.Where(x => x.StartDate.Value < startTime0h);
                                }
                                else if (comparator.Equals(">="))
                                {
                                    searchQuery = searchQuery.Where(x => x.StartDate.Value >= startTime0h);
                                }
                                else if (comparator.Equals("<="))
                                {
                                    searchQuery = searchQuery.Where(x => x.StartDate.Value <= endTime24h);
                                }
                                else if (comparator.Equals("!="))
                                {
                                    searchQuery = searchQuery.Where(x => x.StartDate.Value < startTime0h || x.StartDate.Value > endTime24h);
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
                                searchQuery = searchQuery.Where(x => x.EndDate.HasValue);
                                if (comparator.Equals("="))
                                {
                                    searchQuery = searchQuery.Where(x => x.EndDate.Value >= startTime0h && x.EndDate.Value <= endTime24h);
                                }
                                else if (comparator.Equals(">"))
                                {
                                    searchQuery = searchQuery.Where(x => x.EndDate.Value > endTime24h);
                                }
                                else if (comparator.Equals("<"))
                                {
                                    searchQuery = searchQuery.Where(x => x.EndDate.Value < startTime0h);
                                }
                                else if (comparator.Equals(">="))
                                {
                                    searchQuery = searchQuery.Where(x => x.EndDate.Value >= startTime0h);
                                }
                                else if (comparator.Equals("<="))
                                {
                                    searchQuery = searchQuery.Where(x => x.EndDate.Value <= endTime24h);
                                }
                                else if (comparator.Equals("!="))
                                {
                                    searchQuery = searchQuery.Where(x => x.EndDate.Value < startTime0h || x.EndDate.Value > endTime24h);
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
                    searchQuery = request.IsAsc ? searchQuery.OrderBy(x => x.Id) : searchQuery.OrderByDescending(x => x.Id);
                    break;
                case "Name":
                    searchQuery = request.IsAsc ? searchQuery.OrderBy(x => x.Title) : searchQuery.OrderByDescending(x => x.Title);
                    break;
                case "Category":
                    searchQuery = request.IsAsc ? searchQuery.OrderBy(x => x.CategoryName) : searchQuery.OrderByDescending(x => x.CategoryName);
                    break;
                case "Service":
                    searchQuery = request.IsAsc ? searchQuery.OrderBy(x => x.ServiceName) : searchQuery.OrderByDescending(x => x.ServiceName);
                    break;
                case "City":
                    searchQuery = request.IsAsc ? searchQuery.OrderBy(x => x.City) : searchQuery.OrderByDescending(x => x.City);
                    break;
                case "District":
                    searchQuery = request.IsAsc ? searchQuery.OrderBy(x => x.District) : searchQuery.OrderByDescending(x => x.District);
                    break;
                case "HomeHighlight":
                    searchQuery = request.IsAsc ? searchQuery.OrderBy(x => x.IsHomeSlider) : searchQuery.OrderByDescending(x => x.IsHomeSlider);
                    break;
                case "CategoryHighlight":
                    searchQuery = request.IsAsc ? searchQuery.OrderBy(x => x.IsCategorySlider) : searchQuery.OrderByDescending(x => x.IsCategorySlider);
                    break;
                case "StartDate":
                    searchQuery = request.IsAsc ? searchQuery.OrderBy(x => x.StartDate) : searchQuery.OrderByDescending(x => x.StartDate);
                    break;
                case "EndDate":
                    searchQuery = request.IsAsc ? searchQuery.OrderBy(x => x.EndDate) : searchQuery.OrderByDescending(x => x.EndDate);
                    break;
                case "Ranking":
                    searchQuery = request.IsAsc ? searchQuery.OrderBy(x => x.Rating) : searchQuery.OrderByDescending(x => x.Rating);
                    break;
                case "IsEvent":
                    searchQuery = request.IsAsc ? searchQuery.OrderBy(x => x.IsEvent) : searchQuery.OrderByDescending(x => x.IsEvent);
                    break;
            }
            // count
            var totalRecord = searchQuery.Count();

            // take
            var models = searchQuery.Skip((request.CurrentPage - 1) * request.PageSize).Take(request.PageSize).ToList();

            ////map
            //var models = entities.Select(x => AutoMapper.Mapper.Map<Place, PlaceModel>(
            //    x, opt =>
            //    {
            //        opt.AfterMap((ent, mod) =>
            //        {
            //            mod.Category = AutoMapper.Mapper.Map<CategoryModel>(ent.Category);
            //            mod.HTService = AutoMapper.Mapper.Map<HTServiceModel>(ent.HTService);
            //        });
            //    })).ToList();

            var response = new GetGridResponseModel<SearchPlaceModel>();
            response.DataSource = models;
            response.TotalRecord = totalRecord;
            return response;
        }

        [HttpGet, Route("get-place-by-id")]
        [AllowAnonymous]
        public PlaceModel GetPlaceById(int id)
        {
            var query = this.HTRepository.PlaceRepository.GetAll();
            var entity = query.Include("PlaceLanguages.Image").Include("PlaceLanguages.PlaceImages.Image")
                .Include("Category.CategoryLanguages").Include("HTService.HTServiceLanguages")
                .Include(x => x.City).Include(x => x.District).FirstOrDefault(q => q.Id == id);
            if (entity == null) return null;
            var model = AutoMapper.Mapper.Map<Place, PlaceModel>(
                entity, opt =>
                {
                    opt.AfterMap((ent, mod) =>
                    {
                        mod.Category = AutoMapper.Mapper.Map<CategoryModel>(ent.Category);
                        mod.HTService = AutoMapper.Mapper.Map<HTServiceModel>(ent.HTService);
                    });
                });
            return model;
        } 

        [HttpPost, Route("save-imported-place")]
        [AllowAnonymous]
        public bool SaveImportedPlace([FromBody]List<ImportPlaceGroupModel> model)
        {
            this.HTRepository.GTDBUnitOfWork.DbContext.ChangeTracker.AutoDetectChangesEnabled = false;
            this.HTRepository.GTDBUnitOfWork.DbContext.ChangeTracker.QueryTrackingBehavior = Microsoft.EntityFrameworkCore.QueryTrackingBehavior.NoTracking;
            var enImportPlaceG = model.FirstOrDefault(t => t.Language == LanguageEnums.English);
            if (enImportPlaceG == null) return false;
            var cateEntities = this.HTRepository.CategoryLanguageRepository.GetAll().ToList();
            var serviceEntities = this.HTRepository.HTServiceLanguageRepository.GetAll().ToList();
            var cityEntities = this.HTRepository.CityRepository.GetAll().ToList();
            var dicstrictEntities = this.HTRepository.DistrictRepository.GetAll().Include(t => t.City).ToList();
            var enImportPlaceNames = enImportPlaceG.ImportPlaces.Select(t => t.PlaceName).ToList();
            var placeEntities = this.HTRepository.PlaceRepository.GetAll()
                .Include("PlaceLanguages.Image")
                .Include("PlaceLanguages.PlaceImages")
                .Where(x => x.PlaceLanguages
                    .Any(p => p.Language == LanguageEnums.English && enImportPlaceNames.Contains(p.Title, StringComparer.CurrentCultureIgnoreCase)))
                .ToList();
            for (int i = 0; i < enImportPlaceG.ImportPlaces.Count; i++)
            {
                var enImportPlace = enImportPlaceG.ImportPlaces[i];

                var viImportPlaceG = model.FirstOrDefault(t => t.Language == LanguageEnums.Vietnamese);
                var viImportPlace = viImportPlaceG != null && viImportPlaceG.ImportPlaces.Count > i ? viImportPlaceG.ImportPlaces[i] : null;

                var jaImportPlaceG = model.FirstOrDefault(t => t.Language == LanguageEnums.Japanese);
                var jaImportPlace = jaImportPlaceG != null && jaImportPlaceG.ImportPlaces.Count > i ? jaImportPlaceG.ImportPlaces[i] : null;

                var chiImportPlaceG = model.FirstOrDefault(t => t.Language == LanguageEnums.Chinese);
                var chiImportPlace = chiImportPlaceG != null && chiImportPlaceG.ImportPlaces.Count > i ? chiImportPlaceG.ImportPlaces[i] : null;

                var koImportPlaceG = model.FirstOrDefault(t => t.Language == LanguageEnums.Korean);
                var koImportPlace = koImportPlaceG != null && koImportPlaceG.ImportPlaces.Count > i ? koImportPlaceG.ImportPlaces[i] : null;

                var frImportPlaceG = model.FirstOrDefault(t => t.Language == LanguageEnums.France);
                var frImportPlace = frImportPlaceG != null && frImportPlaceG.ImportPlaces.Count > i ? frImportPlaceG.ImportPlaces[i] : null;

                if (enImportPlace.PlaceInValid) continue;
                var placeEntity = placeEntities
                .FirstOrDefault(x => x.PlaceLanguages
                                .Any(p => p.Language == LanguageEnums.English && p.Title.Equals(enImportPlace.PlaceName, StringComparison.CurrentCultureIgnoreCase)));
                if (placeEntity == null) placeEntity = new Place();
                placeEntity.UpdatedDate = DateTimeHelper.GetDateTimeNow();
                placeEntity.Address = enImportPlace.Address;
                var city = cityEntities.FirstOrDefault(c => c.Name.Trim().ToLower() == enImportPlace.City.Trim().ToLower());
                placeEntity.CityId = city != null ? city.Id : (int?)null;
                placeEntity.CloseTime = DateTime.Parse(enImportPlace.CloseTime);
                var district = dicstrictEntities.FirstOrDefault(d => d.Name.Trim().ToLower() == enImportPlace.District.Trim().ToLower());
                placeEntity.DistrictId = district != null ? district.Id : (int?)null;
                placeEntity.IsCategorySlider = enImportPlace.IsCategorySlider;
                placeEntity.IsHomeSlider = enImportPlace.IsHomeSlider;
                placeEntity.OpenTime = DateTime.Parse(enImportPlace.OpenTime);
                placeEntity.Phone = enImportPlace.Phone;
                placeEntity.Fax = enImportPlace.Fax;
                placeEntity.Website = enImportPlace.Website;
                var cateE = cateEntities.FirstOrDefault(ca => ca.Language == LanguageEnums.English && ca.Title.ToLower() == enImportPlace.Category.ToLower());
                if (cateE != null)
                {
                    placeEntity.CategoryId = cateE.CategoryId;
                }
                var serviceE = serviceEntities.FirstOrDefault(s => s.Language == LanguageEnums.English && s.Title.ToLower() == enImportPlace.Service.ToLower());
                if (serviceE != null)
                {
                    placeEntity.HTServiceId = serviceE.HTServiceId;
                }

                HTRepository.PlaceRepository.Save(placeEntity);

                SaveImportLanguage(placeEntity, enImportPlace, LanguageEnums.English);
                SaveImportLanguage(placeEntity, viImportPlace, LanguageEnums.Vietnamese);
                SaveImportLanguage(placeEntity, jaImportPlace, LanguageEnums.Japanese);
                SaveImportLanguage(placeEntity, chiImportPlace, LanguageEnums.Chinese);
                SaveImportLanguage(placeEntity, koImportPlace, LanguageEnums.Korean);
                SaveImportLanguage(placeEntity, frImportPlace, LanguageEnums.France);
            }
            HTRepository.Commit();
            this.HTRepository.GTDBUnitOfWork.DbContext.ChangeTracker.AutoDetectChangesEnabled = true;
            this.HTRepository.GTDBUnitOfWork.DbContext.ChangeTracker.QueryTrackingBehavior = Microsoft.EntityFrameworkCore.QueryTrackingBehavior.TrackAll;
            return true;
        }

        private void SaveImportLanguage(Place placeEntity, ImportPlaceModel importPlace, LanguageEnums lang)
        {
            if (importPlace == null) return;
            var placeLanguage = placeEntity.PlaceLanguages != null ? placeEntity.PlaceLanguages.FirstOrDefault(p => p.Language == lang) : null;
            if (placeLanguage == null)
            {
                placeLanguage = new PlaceLanguage();
            }
            placeLanguage.Title = importPlace.PlaceName;
            placeLanguage.Language = lang;
            if (placeLanguage.ImageId.HasValue && placeLanguage.ImageId != 0)
            {
                placeLanguage.Image.Url = importPlace.CoverImage;
            }
            else
            {
                placeLanguage.Image = new Image
                {
                    Url = importPlace.CoverImage
                };
            }
            placeLanguage.Description = importPlace.Description;
            placeLanguage.UpdatedDate = DateTimeHelper.GetDateTimeNow();
            placeLanguage.PlaceId = placeEntity.Id;
            HTRepository.PlaceLanguageRepository.Save(placeLanguage);
            if (!importPlace.PlaceImageError && importPlace.PlaceImages != null && importPlace.PlaceImages.Count > 0)
            {
                var imgs = importPlace.PlaceImages.Select(img => new Image
                {
                    Url = img
                }).Take(10).ToList();
                this.HTRepository.ImageRepository.Save(imgs);

                var placeImgs = placeLanguage.PlaceImages;
                if (placeImgs != null)
                {
                    HTRepository.PlaceImageRepository.Delete(placeImgs);
                }
                placeImgs = imgs.Select(t => new PlaceImage
                {
                    PlaceLangId = placeLanguage.Id,
                    ImageId = t.Id
                }).ToList();
                HTRepository.PlaceImageRepository.Save(placeImgs);
            }
        }

        [HttpPost, Route("translate-place-language")]
        [AllowAnonymous]
        public PlaceLanguageModel TranslateServiceLanguage([FromBody]PlaceModel model)
        {
            if (model == null || model.PlaceLanguages == null || model.PlaceLanguages.Count != 2) return null;
            var entity = model.PlaceLanguages[0];
            if (entity == null) return null;
            var enPlaceLanguage = model.PlaceLanguages[1];
            if (enPlaceLanguage == null) return null;
            entity.Title = TranslateHelper.TranslateText(enPlaceLanguage.Title, TranslateHelper.GetLanguageCode(entity.Language ?? LanguageEnums.English));
            entity.Description = TranslateHelper.TranslateText(enPlaceLanguage.Description, TranslateHelper.GetLanguageCode(entity.Language ?? LanguageEnums.English));
            entity.ImageId = enPlaceLanguage.ImageId;
            entity.Image = enPlaceLanguage.Image;
            entity.PlaceImages = enPlaceLanguage.PlaceImages;
            return entity;
        }

        [HttpPost, Route("translate-all-place-language")]
        [AllowAnonymous]
        public PlaceModel TranslateAllServiceLanguage([FromBody]PlaceModel model)
        {
            if (model == null || model.PlaceLanguages == null) return null;
            var enPlaceLanguage = model.PlaceLanguages
                .FirstOrDefault(x => x.Language == LanguageEnums.English);
            if (enPlaceLanguage == null) return null;
            foreach (var entity in model.PlaceLanguages)
            { 
                if (entity.Id == enPlaceLanguage.Id) continue;
                entity.Title = TranslateHelper.TranslateText(enPlaceLanguage.Title, TranslateHelper.GetLanguageCode(entity.Language ?? LanguageEnums.English));
                entity.Description = TranslateHelper.TranslateText(enPlaceLanguage.Description, TranslateHelper.GetLanguageCode(entity.Language ?? LanguageEnums.English));
                entity.ImageId = enPlaceLanguage.ImageId;
                entity.Image = enPlaceLanguage.Image;
                entity.PlaceImages = enPlaceLanguage.PlaceImages;
            }
            return model;
        }
        [HttpGet, Route("download-template-high-level")]
        [AllowAnonymous]
        public FileResult DownloadTemplateHighLevel()
        {
            var filePath = Directory.GetCurrentDirectory() + @"\Resources\ImportTemplate.xlsx";
            var stream = new MemoryStream(System.IO.File.ReadAllBytes(filePath));
            var response = File(stream, "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "ImportTemplate_" + DateTime.Now.Ticks + ".xlsx");
            return response;
        }
    }
}
