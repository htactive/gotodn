using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using GotoDN.Web.Authentication;
using Microsoft.EntityFrameworkCore;
using GotoDN.Entities;
using GotoDN.Repository;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Net;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.AspNetCore.Authentication;
using HTActive.Core;
using GotoDN.Web.Models;
using System.Reflection;

namespace GotoDN.Web
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();

            if (env.IsDevelopment())
            {
                // This will push telemetry data through Application Insights pipeline faster, allowing you to view results immediately.
                builder.AddApplicationInsightsSettings(developerMode: true);
            }
            Configuration = builder.Build();
        }

        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddApplicationInsightsTelemetry(Configuration);
            services.AddMvc().AddJsonOptions(options =>
            {
                options.SerializerSettings.ContractResolver = new Newtonsoft.Json.Serialization.DefaultContractResolver();
            });

            services.AddScoped<IAuthorizationHandler, HTAuthorizationHandler>();
            services.Configure<ConfigurationHelper>(Configuration);
            services.AddScoped(opt =>
            {
                var optionBuilder = new DbContextOptionsBuilder<GTDBEntities>();
                optionBuilder.UseMySql(Configuration.GetConnectionString("GTDBConnection"));
                return optionBuilder.Options;
            });
            services.AddScoped<GTDBEntities>();
            services.AddScoped<GTDBUnitOfWork>();
            services.AddScoped<HTRepository>();
            services.AddScoped<IBaseUnitOfWork<GTDBEntities>, GTDBUnitOfWork>();
            RegisterServiceHelper.RegisterRepository(services);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            AutoMapper.Mapper.Initialize(cf =>
            {
                cf.CreateMap<Category, CategoryModel>();
                cf.CreateMap<CategoryModel, Category>();

                cf.CreateMap<CategoryLanguage, CategoryLanguageModel>();
                cf.CreateMap<CategoryLanguageModel, CategoryLanguage>();

                cf.CreateMap<HTService, HTServiceModel>();
                cf.CreateMap<HTServiceModel, HTService>();

                cf.CreateMap<HTServiceLanguage, HTServiceLanguageModel>();
                cf.CreateMap<HTServiceLanguageModel, HTServiceLanguage>();

                cf.CreateMap<Place, PlaceModel>();
                cf.CreateMap<PlaceModel, Place>();

                cf.CreateMap<PlaceLanguage, PlaceLanguageModel>();
                cf.CreateMap<PlaceLanguageModel, PlaceLanguage>();

  
                cf.CreateMap<Image, ImageModel>();
            });
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();

            app.UseApplicationInsightsRequestTelemetry();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                //app.UseBrowserLink();
            }
            else
            {
                app.UseDeveloperExceptionPage();
                //app.UseExceptionHandler("/Home/Error");
            }

            app.UseApplicationInsightsExceptionTelemetry();

            app.UseStaticFiles();

            app.UseCookieAuthentication(new CookieAuthenticationOptions()
            {
                AuthenticationScheme = "ExternalCookiesAuthentication",
                AutomaticAuthenticate = true,
                AutomaticChallenge = false,
                Events = new CookieAuthenticationEvents()
                {
                    OnRedirectToLogin = ctx =>
                    {
                        ctx.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                        return Task.FromResult(0);
                    }
                }
            });

            app.UseFacebookAuthentication(new FacebookOptions()
            {
                AppId = Configuration["Authentication:Facebook:AppId"],
                AppSecret = Configuration["Authentication:Facebook:AppSecret"],
                SignInScheme = "ExternalCookiesAuthentication",
                Events = new CustomOAuthEvents()
            });
            app.UseGoogleAuthentication(new GoogleOptions()
            {
                ClientId = Configuration["Authentication:Google:ClientId"],
                ClientSecret = Configuration["Authentication:Google:ClientSecret"],
                SignInScheme = "ExternalCookiesAuthentication"
            });
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    "adminHtml",
                    "admin/{*url}",
                    defaults: new { controller = "Static", action = "Admin" }
                    );

                routes.MapRoute(
                    "indexHtml",
                    "search/{*url}",
                    defaults: new { controller = "Static", action = "App" }
                    );

                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });

        }
    }
    public class CustomOAuthEvents : OAuthEvents
    {
        public override Task RemoteFailure(FailureContext context)
        {
            context.HandleResponse();
            context.Response.Redirect("/account/login");
            return base.RemoteFailure(context);
        }
    }
}
