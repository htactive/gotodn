using GotoDN.Repository;
using GotoDN.Web.Authentication;
using GotoDN.Web.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GotoDN.Web.Controllers
{
    [Route("image")]
    public class ImageController:BaseController
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
            var fileKey = string.Format("coms/img/coms_{0}.png", Guid.NewGuid().ToString());

            var image = await this.CreateNewImage(stream, fileKey);

            return Mappers.Mapper.ToModel(image);
        }

    }
}
