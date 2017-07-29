using GotoDN.Common;
using GotoDN.Repository;
using GotoDN.Web.Authentication;
using GotoDN.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace GotoDN.Web.Controllers
{
    [Route("image")]
    public class ImageController : BaseController
    {
        public ImageController(HTRepository repository) : base(repository) { }

        [Route("upload-new-on-home-image"), HttpPost]
        [AllowAnonymous]
        public async Task<ImageModel> UploadNewOnHomeImage(IFormFile file)
        {
            if (file == null) return null;
            var stream = file.OpenReadStream();
            var fileKey = string.Format("home/img/home_{0}.png", Guid.NewGuid().ToString());

            var image = await this.CreateNewImage(stream, fileKey);

            return Mappers.Mapper.ToModel(image);
        }
        [Route("upload-new-image-for-description"), HttpPost]
        [AllowAnonymous]
        public async Task<ImageModel> UploadNewImageForDescription(IFormFile file)
        {
            if (file == null) return null;
            var stream = file.OpenReadStream();
            var fileKey = string.Format("desc/img/desc_{0}.png", Guid.NewGuid().ToString());

            var image = await this.CreateNewImage(stream, fileKey);

            return Mappers.Mapper.ToModel(image);
        }

        [Route("upload-new-image"), HttpPost]
        [AllowAnonymous]
        public async Task<ImageModel> UploadNewImageForCommon(IFormFile file)
        {
            if (file == null) return null;
            var stream = file.OpenReadStream();
            var fileKey = string.Format("coms/img/coms_{0}.jpg", Guid.NewGuid().ToString());
            Stream compressStream = new MemoryStream();
            compressStream = ImageHelper.CompressImage(stream, 80);
            var image = await this.CreateNewImage(compressStream, fileKey);
            return Mappers.Mapper.ToModel(image);
        }

        [Route("upload-multi-image"), HttpPost]
        [AllowAnonymous]
        public async Task<List<ImageModel>> UploadMultiImage()
        {
            var imageModels = new List<ImageModel>();
            var files = Request.Form.Files;
            if (files == null || files.Count == 0) return null;
            for (int i = 0; i < files.Count; i++)
            {
                var file = files[i];
                var stream = file.OpenReadStream();
                var fileKey = string.Format("coms/img/coms_{0}.jpg", Guid.NewGuid().ToString());
                Stream compressStream = new MemoryStream();
                compressStream = ImageHelper.CompressImage(stream, 80);
                var image = await this.CreateNewImage(compressStream, fileKey);
                imageModels.Add(Mappers.Mapper.ToModel(image));
            }
            return imageModels;
        }

        [Route("upload-new-icon"), HttpPost]
        [AllowAnonymous]
        public async Task<ImageModel> UploadNewIcon(IFormFile file)
        {
            if (file == null) return null;
            var stream = file.OpenReadStream();
            var fileKey = string.Format("coms/img/coms_{0}.png", Guid.NewGuid().ToString());
            Stream compressStream = new MemoryStream();
            compressStream = ImageHelper.ScaleIcon(stream, 256, 256);
            var image = await this.CreateNewImage(compressStream, fileKey);
            return Mappers.Mapper.ToModel(image);
        }

        [Route("import-excel-high-level"), HttpPost]
        [AllowAnonymous]
        public List<ImportPlaceGroupModel> ImportExcelHighLevel(IFormFile file)
        {
            if (file == null) return null;
            var stream = file.OpenReadStream();
            var package = new ExcelPackage(stream);
            var importedPlaces = new List<ImportPlaceModel>();
            var cateEntities = this.HTRepository.CategoryLanguageRepository.GetAll().ToList();
            var serviceEntities = this.HTRepository.HTServiceLanguageRepository.GetAll().ToList();
            var cityEntities = this.HTRepository.CityRepository.GetAll().ToList();
            var dicstrictEntities = this.HTRepository.DistrictRepository.GetAll().Include(t => t.City).ToList();
            try
            {
                for (int i = 0; i < package.Workbook.Worksheets.Count; i++)
                {
                    var currentLang = ExcelHelper.Languages[i];
                    ExcelWorksheet workSheet = package.Workbook.Worksheets[currentLang];

                    for (int r = 2; r <= workSheet.Dimension.End.Row; r++)
                    {
                        var iPlace = new ImportPlaceModel();
                        #region Read & Verify data
                        iPlace.Language = ExcelHelper.GetLangEnums(currentLang);
                        int c = workSheet.Dimension.Start.Column;
                        if (string.IsNullOrWhiteSpace((string)workSheet.Cells[r, c].Value))
                            continue;
                        if (c <= workSheet.Dimension.End.Column)
                            iPlace.PlaceName = workSheet.Cells[r, c++].Value.ToString();
                        if (c <= workSheet.Dimension.End.Column)
                        {
                            var cate = workSheet.Cells[r, c++].Value.ToString();

                            var currentCate = cateEntities
                                .FirstOrDefault(l => (l.Language == ExcelHelper.GetLangEnums(currentLang) || l.Language == LanguageEnums.English)
                                                        && l.Title.ToLower().Equals(cate.ToLower()));

                            if (currentCate != null)
                            {
                                iPlace.Category = currentCate.Title;
                            }
                            else
                            {
                                iPlace.Category = cate;
                                iPlace.CategoryNotExist = true;
                            }
                        }
                        if (c <= workSheet.Dimension.End.Column)
                        {
                            var serv = workSheet.Cells[r, c].Value != null ? workSheet.Cells[r, c].Value.ToString() : "";
                            if(serv.Trim().ToLower() == "" || serv.Trim().ToLower() == "none")
                            {
                                iPlace.Service = "";
                            } else
                            {
                                var currentService = serviceEntities
                                    .FirstOrDefault(l => (l.Language == ExcelHelper.GetLangEnums(currentLang) || l.Language == LanguageEnums.English)
                                                            && l.Title.ToLower() == serv.ToLower());
                                if (currentService != null)
                                {
                                    iPlace.Service = currentService.Title;
                                }
                                else
                                {
                                    iPlace.Service = serv;
                                    iPlace.ServiceNotExist = true;
                                }
                            }
                            c++;
                        }
                        if (c <= workSheet.Dimension.End.Column)
                        {
                            iPlace.Description = workSheet.Cells[r, c++].Value.ToString();
                        }
                        if (c <= workSheet.Dimension.End.Column)
                        {
                            iPlace.CoverImage = workSheet.Cells[r, c++].Value.ToString();
                        }
                        if (c <= workSheet.Dimension.End.Column)
                        {
                            iPlace.IsHomeSlider = workSheet.Cells[r, c++].Value.ToString() == "Yes";
                        }
                        if (c <= workSheet.Dimension.End.Column)
                        {
                            iPlace.IsCategorySlider = workSheet.Cells[r, c++].Value.ToString() == "Yes";
                        }
                        if (c <= workSheet.Dimension.End.Column)
                        {
                            iPlace.City = workSheet.Cells[r, c].Value.ToString();
                            if (!cityEntities.Any(t => t.Name.ToLower() == workSheet.Cells[r, c].Value.ToString().Trim().ToLower()))
                                iPlace.CityNotExist = true;
                            c++;
                        }
                        if (c <= workSheet.Dimension.End.Column)
                        {
                            iPlace.District = workSheet.Cells[r, c].Value.ToString();
                            if (!(dicstrictEntities.Any(t => t.Name.ToLower() == workSheet.Cells[r, c].Value.ToString().Trim().ToLower() && t.City.Name.ToLower() == iPlace.City.ToLower())))
                                iPlace.DistrictNotExist = true;
                            c++;
                        }
                        if (c <= workSheet.Dimension.End.Column)
                        {
                            iPlace.Address = workSheet.Cells[r, c++].Value.ToString();
                        }
                        if (c <= workSheet.Dimension.End.Column)
                        {
                            iPlace.Phone = workSheet.Cells[r, c++].Value.ToString();
                        }
                        if (c <= workSheet.Dimension.End.Column)
                        {
                            iPlace.Fax = workSheet.Cells[r, c++].Value.ToString();
                        }
                        if (c <= workSheet.Dimension.End.Column)
                        {
                            iPlace.OpenTime = workSheet.Cells[r, c++].Value.ToString();
                        }
                        if (c <= workSheet.Dimension.End.Column)
                        {
                            iPlace.CloseTime = workSheet.Cells[r, c++].Value.ToString();
                        }
                        if (c <= workSheet.Dimension.End.Column)
                        {
                            iPlace.Website = workSheet.Cells[r, c++].Value.ToString();
                        }
                        if (c <= workSheet.Dimension.End.Column)
                        {
                            try
                            {
                                var additionalInfoValue = workSheet.Cells[r, c++].Value.ToString();
                                iPlace.AdditionalInfo = additionalInfoValue.Split('\n').Select(t => new KeyValuePair<string, string>(t.Trim().Split(':').ToList()[0].Trim(), t.Trim().Split(':').ToList()[1].Trim())).ToList();
                            }
                            catch
                            {
                                iPlace.AdditionalInfoError = true;
                            }

                        }
                        if (c <= workSheet.Dimension.End.Column)
                        {
                            try
                            {
                                var imagesValue = workSheet.Cells[r, c++].Value.ToString();
                                iPlace.PlaceImages = imagesValue.Split('\n').Select(t => t.Trim()).ToList();
                            }
                            catch
                            {
                                iPlace.PlaceImageError = true;
                            }
                        }
                        #endregion
                        importedPlaces.Add(iPlace);
                    }
                }
            }
            catch
            {
                return null;
            }

            var placeGroup = new List<ImportPlaceGroupModel>();
            placeGroup = importedPlaces.GroupBy(t => t.Language).Select(t => new ImportPlaceGroupModel
            {
                Language = t.Key,
                ImportPlaces = t.AsQueryable().OrderByDescending(a => (a.PlaceInValid || a.PlaceImageError)).ToList()
            }).ToList();

            return placeGroup;
        }
    }
}
