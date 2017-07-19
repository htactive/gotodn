
using HTActive.Core;
using GotoDN.Entities;
namespace GotoDN.Repository
{
    public partial interface IClaimRepository : IBaseRepository<Claim>
    {
    }

    public partial interface IImageRepository : IBaseRepository<Image>
    {
    }

    public partial interface IRoleRepository : IBaseRepository<Role>
    {
    }

    public partial interface IRoleClaimRepository : IBaseRepository<RoleClaim>
    {
    }

    public partial interface IUserRepository : IBaseRepository<User>
    {
    }

    public partial interface IUserLoginTokenRepository : IBaseRepository<UserLoginToken>
    {
    }

    public partial interface IUserProfileRepository : IBaseRepository<UserProfile>
    {
    }

    public partial interface IUserRoleRepository : IBaseRepository<UserRole>
    {
    }

    public partial interface ICategoryRepository : IBaseRepository<Category>
    {
    }

    public partial interface ICategoryLanguageRepository : IBaseRepository<CategoryLanguage>
    {
    }

    public partial interface IHTServiceRepository : IBaseRepository<HTService>
    {
    }

    public partial interface IHTServiceLanguageRepository : IBaseRepository<HTServiceLanguage>
    {
    }

    public partial interface IPlaceRepository : IBaseRepository<Place>
    {
    }

    public partial interface IPlaceLanguageRepository : IBaseRepository<PlaceLanguage>
    {
    }

    public partial interface ICityRepository : IBaseRepository<City>
    {
    }

    public partial interface IDistrictRepository : IBaseRepository<District>
    {
    }
}