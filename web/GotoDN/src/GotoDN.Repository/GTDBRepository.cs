
using HTActive.Core;
using GotoDN.Entities;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace GotoDN.Repository
{
    public class GTDBUnitOfWork : BaseUnitOfWork<GTDBEntities>
    {
        public GTDBUnitOfWork(GTDBEntities entity)
            : base(entity)
        {
        }
    }
    public class HTRepository
    {
	    public IServiceProvider ServiceProvider{get;private set;}
		public IBaseUnitOfWork<GTDBEntities> GTDBUnitOfWork{get;private set;}
        public HTRepository(IBaseUnitOfWork<GTDBEntities> unitOfWork, IServiceProvider _serviceProvider)
        {
			this.GTDBUnitOfWork = unitOfWork;
			this.ServiceProvider = _serviceProvider;
		}
        public void Commit()
        {
            this.GTDBUnitOfWork.Commit();
        }
        #region Repositories
        private IClaimRepository _ClaimRepository;
        public IClaimRepository ClaimRepository 
		{ 
			get
			{
				return _ClaimRepository ?? 
				(_ClaimRepository = ServiceProvider.GetService<IClaimRepository>());
			}
		}
		private IImageRepository _ImageRepository;
        public IImageRepository ImageRepository 
		{ 
			get
			{
				return _ImageRepository ?? 
				(_ImageRepository = ServiceProvider.GetService<IImageRepository>());
			}
		}
		private IRoleRepository _RoleRepository;
        public IRoleRepository RoleRepository 
		{ 
			get
			{
				return _RoleRepository ?? 
				(_RoleRepository = ServiceProvider.GetService<IRoleRepository>());
			}
		}
		private IRoleClaimRepository _RoleClaimRepository;
        public IRoleClaimRepository RoleClaimRepository 
		{ 
			get
			{
				return _RoleClaimRepository ?? 
				(_RoleClaimRepository = ServiceProvider.GetService<IRoleClaimRepository>());
			}
		}
		private IUserRepository _UserRepository;
        public IUserRepository UserRepository 
		{ 
			get
			{
				return _UserRepository ?? 
				(_UserRepository = ServiceProvider.GetService<IUserRepository>());
			}
		}
		private IUserLoginTokenRepository _UserLoginTokenRepository;
        public IUserLoginTokenRepository UserLoginTokenRepository 
		{ 
			get
			{
				return _UserLoginTokenRepository ?? 
				(_UserLoginTokenRepository = ServiceProvider.GetService<IUserLoginTokenRepository>());
			}
		}
		private IUserProfileRepository _UserProfileRepository;
        public IUserProfileRepository UserProfileRepository 
		{ 
			get
			{
				return _UserProfileRepository ?? 
				(_UserProfileRepository = ServiceProvider.GetService<IUserProfileRepository>());
			}
		}
		private IUserRoleRepository _UserRoleRepository;
        public IUserRoleRepository UserRoleRepository 
		{ 
			get
			{
				return _UserRoleRepository ?? 
				(_UserRoleRepository = ServiceProvider.GetService<IUserRoleRepository>());
			}
		}
		private ICategoryRepository _CategoryRepository;
        public ICategoryRepository CategoryRepository 
		{ 
			get
			{
				return _CategoryRepository ?? 
				(_CategoryRepository = ServiceProvider.GetService<ICategoryRepository>());
			}
		}
		private ICategoryLanguageRepository _CategoryLanguageRepository;
        public ICategoryLanguageRepository CategoryLanguageRepository 
		{ 
			get
			{
				return _CategoryLanguageRepository ?? 
				(_CategoryLanguageRepository = ServiceProvider.GetService<ICategoryLanguageRepository>());
			}
		}
		private IHTServiceRepository _HTServiceRepository;
        public IHTServiceRepository HTServiceRepository 
		{ 
			get
			{
				return _HTServiceRepository ?? 
				(_HTServiceRepository = ServiceProvider.GetService<IHTServiceRepository>());
			}
		}
		private IHTServiceLanguageRepository _HTServiceLanguageRepository;
        public IHTServiceLanguageRepository HTServiceLanguageRepository 
		{ 
			get
			{
				return _HTServiceLanguageRepository ?? 
				(_HTServiceLanguageRepository = ServiceProvider.GetService<IHTServiceLanguageRepository>());
			}
		}
		private IPlaceRepository _PlaceRepository;
        public IPlaceRepository PlaceRepository 
		{ 
			get
			{
				return _PlaceRepository ?? 
				(_PlaceRepository = ServiceProvider.GetService<IPlaceRepository>());
			}
		}
		private IPlaceLanguageRepository _PlaceLanguageRepository;
        public IPlaceLanguageRepository PlaceLanguageRepository 
		{ 
			get
			{
				return _PlaceLanguageRepository ?? 
				(_PlaceLanguageRepository = ServiceProvider.GetService<IPlaceLanguageRepository>());
			}
		}
		private ICityRepository _CityRepository;
        public ICityRepository CityRepository 
		{ 
			get
			{
				return _CityRepository ?? 
				(_CityRepository = ServiceProvider.GetService<ICityRepository>());
			}
		}
		private IDistrictRepository _DistrictRepository;
        public IDistrictRepository DistrictRepository 
		{ 
			get
			{
				return _DistrictRepository ?? 
				(_DistrictRepository = ServiceProvider.GetService<IDistrictRepository>());
			}
		}
		private IPlaceImageRepository _PlaceImageRepository;
        public IPlaceImageRepository PlaceImageRepository 
		{ 
			get
			{
				return _PlaceImageRepository ?? 
				(_PlaceImageRepository = ServiceProvider.GetService<IPlaceImageRepository>());
			}
		}
		private IPlaceMoreInfoRepository _PlaceMoreInfoRepository;
        public IPlaceMoreInfoRepository PlaceMoreInfoRepository 
		{ 
			get
			{
				return _PlaceMoreInfoRepository ?? 
				(_PlaceMoreInfoRepository = ServiceProvider.GetService<IPlaceMoreInfoRepository>());
			}
		}
		private IGDNConfigurationRepository _GDNConfigurationRepository;
        public IGDNConfigurationRepository GDNConfigurationRepository 
		{ 
			get
			{
				return _GDNConfigurationRepository ?? 
				(_GDNConfigurationRepository = ServiceProvider.GetService<IGDNConfigurationRepository>());
			}
		}
		#endregion
    }
	
    public static class RegisterServiceHelper
    {
        public static void RegisterRepository(IServiceCollection services)
        {
			services.AddScoped<IClaimRepository, ClaimRepository>();
			services.AddScoped<IImageRepository, ImageRepository>();
			services.AddScoped<IRoleRepository, RoleRepository>();
			services.AddScoped<IRoleClaimRepository, RoleClaimRepository>();
			services.AddScoped<IUserRepository, UserRepository>();
			services.AddScoped<IUserLoginTokenRepository, UserLoginTokenRepository>();
			services.AddScoped<IUserProfileRepository, UserProfileRepository>();
			services.AddScoped<IUserRoleRepository, UserRoleRepository>();
			services.AddScoped<ICategoryRepository, CategoryRepository>();
			services.AddScoped<ICategoryLanguageRepository, CategoryLanguageRepository>();
			services.AddScoped<IHTServiceRepository, HTServiceRepository>();
			services.AddScoped<IHTServiceLanguageRepository, HTServiceLanguageRepository>();
			services.AddScoped<IPlaceRepository, PlaceRepository>();
			services.AddScoped<IPlaceLanguageRepository, PlaceLanguageRepository>();
			services.AddScoped<ICityRepository, CityRepository>();
			services.AddScoped<IDistrictRepository, DistrictRepository>();
			services.AddScoped<IPlaceImageRepository, PlaceImageRepository>();
			services.AddScoped<IPlaceMoreInfoRepository, PlaceMoreInfoRepository>();
			services.AddScoped<IGDNConfigurationRepository, GDNConfigurationRepository>();
		}
    }
}