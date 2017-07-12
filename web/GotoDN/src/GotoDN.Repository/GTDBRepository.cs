
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
    public class GTDBRepository
    {
	    public IServiceProvider ServiceProvider{get;private set;}
		public IBaseUnitOfWork<GTDBEntities> GTDBUnitOfWork{get;private set;}
        public GTDBRepository(IBaseUnitOfWork<GTDBEntities> unitOfWork, IServiceProvider _serviceProvider)
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
		}
    }
}