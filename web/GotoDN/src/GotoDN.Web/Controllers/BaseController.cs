﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using GotoDN.Repository;
using Newtonsoft.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc.Filters;
using GotoDN.Common;
using GotoDN.Entities;
using Amazon.S3;
using Amazon.S3.Model;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using GotoDN.Web.Models;

namespace GotoDN.Web.Controllers
{

    public class BaseController : Controller
    {
        protected HTRepository HTRepository { get; private set; }

        public BaseController(HTRepository repository)
        {
            this.HTRepository = repository;
            Configuration = repository.ServiceProvider.GetService<IOptions<ConfigurationHelper>>()?.Value;
        }

        protected ConfigurationHelper Configuration { get; set; }
        
        protected static readonly string _awsAccessKey = "AKIAIYL5LVNRMSEDJJMA";

        protected static readonly string _awsSecretKey = "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";

        protected static readonly string _bucketName = "dfwresource";

        public override void OnActionExecuting(ActionExecutingContext context)
        {
            ViewBag.CurrentUser = this.CurrentUser;
            base.OnActionExecuting(context);
        }

        private UserModel currentUser;

        protected UserModel CurrentUser
        {
            get
            {
                if (currentUser == null)
                {
                    string jwt = this.HttpContext.Request.Cookies["auth"];

                    if (string.IsNullOrEmpty(jwt) || jwt == "null") return null;

                    var payloadString = JwtHelper.Decode(jwt);

                    if (string.IsNullOrEmpty(payloadString)) return null;

                    var payLoad = JsonConvert.DeserializeObject<Dictionary<string, string>>(payloadString);
                    var token = payLoad["token"];
                    if (string.IsNullOrEmpty(token)) return null;

                    var loginSession = HTRepository.UserLoginTokenRepository.GetAll()
                        .Include("User.UserProfiles.Image")
                        .Include("User.UserRoles.Role")
                        .FirstOrDefault(x => x.Token == token);
                    if (loginSession == null || loginSession.User == null) return null;

                    //Check if user was banned
                    if (loginSession?.User?.UserStatusId == UserStatusEnums.Deactive) return null;

                    if (loginSession.ExpiredDated < DateTimeHelper.GetDateTimeNow())
                    {
                        return null;
                    }

                    currentUser = Mappers.Mapper.ToModel(loginSession.User);
                    if (currentUser != null)
                    {
                        currentUser.UserProfiles = loginSession.User.UserProfiles.Select(x =>
                        {
                            var profile = Mappers.Mapper.ToModel(x);
                            if (profile != null)
                            {
                                profile.Image = Mappers.Mapper.ToModel(x.Image);
                            }
                            return profile;
                        }).ToList();
                        currentUser.UserRoles = loginSession.User.UserRoles.Select(x =>
                        {
                            var role = Mappers.Mapper.ToModel(x);
                            if (role != null)
                            {
                                role.Role = Mappers.Mapper.ToModel(x.Role);
                            }
                            return role;
                        }).ToList();
                    }
                }
                return currentUser;
            }
        }
        
        private async Task UploadImageStreamToAWSS3(string s3FileKey, System.IO.Stream stream)
        {

            try
            {
                IAmazonS3 client;
                using (client = new AmazonS3Client(_awsAccessKey, _awsSecretKey, Amazon.RegionEndpoint.APSoutheast1))
                {
                    var request = new PutObjectRequest()
                    {
                        BucketName = _bucketName,
                        AutoResetStreamPosition = true,
                        AutoCloseStream = true,
                        CannedACL = S3CannedACL.PublicRead,
                        Key = s3FileKey,
                        InputStream = stream,
                        ContentType = "image/png"
                    };

                    var response = await client.PutObjectAsync(request);

                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        protected async Task<Image> CreateNewImage(System.IO.Stream stream, string fileKey)
        {
            await this.UploadImageStreamToAWSS3(fileKey, stream);
            var image = new Image() { Id = 0, S3FileKey = fileKey };
            this.HTRepository.ImageRepository.Save(image);
            this.HTRepository.Commit();
            return image;
        }

        protected string BuildTemplate(string template, Dictionary<string, string> tokens)
        {
            if (string.IsNullOrEmpty(template)) return template;
            foreach (var token in tokens)
            {
                template = template.Replace(token.Key, token.Value);
            }
            return template;
        }
    }
}