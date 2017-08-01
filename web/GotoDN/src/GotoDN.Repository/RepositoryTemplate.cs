
using HTActive.Core;
using GotoDN.Entities;
namespace GotoDN.Repository
{
    public partial class ClaimRepository : BaseRepository<Claim, GTDBEntities>, IClaimRepository
    {
        public ClaimRepository(IBaseUnitOfWork<GTDBEntities> unitOfWork)
            : base(unitOfWork)
        {

        }
		protected override int GetKeyId(Claim model)
        {
            return model.Id;
        }
	}

    public partial class ImageRepository : BaseRepository<Image, GTDBEntities>, IImageRepository
    {
        public ImageRepository(IBaseUnitOfWork<GTDBEntities> unitOfWork)
            : base(unitOfWork)
        {

        }
		protected override int GetKeyId(Image model)
        {
            return model.Id;
        }
	}

    public partial class RoleRepository : BaseRepository<Role, GTDBEntities>, IRoleRepository
    {
        public RoleRepository(IBaseUnitOfWork<GTDBEntities> unitOfWork)
            : base(unitOfWork)
        {

        }
		protected override int GetKeyId(Role model)
        {
            return model.Id;
        }
	}

    public partial class RoleClaimRepository : BaseRepository<RoleClaim, GTDBEntities>, IRoleClaimRepository
    {
        public RoleClaimRepository(IBaseUnitOfWork<GTDBEntities> unitOfWork)
            : base(unitOfWork)
        {

        }
		protected override int GetKeyId(RoleClaim model)
        {
            return model.Id;
        }
	}

    public partial class UserRepository : BaseRepository<User, GTDBEntities>, IUserRepository
    {
        public UserRepository(IBaseUnitOfWork<GTDBEntities> unitOfWork)
            : base(unitOfWork)
        {

        }
		protected override int GetKeyId(User model)
        {
            return model.Id;
        }
	}

    public partial class UserLoginTokenRepository : BaseRepository<UserLoginToken, GTDBEntities>, IUserLoginTokenRepository
    {
        public UserLoginTokenRepository(IBaseUnitOfWork<GTDBEntities> unitOfWork)
            : base(unitOfWork)
        {

        }
		protected override int GetKeyId(UserLoginToken model)
        {
            return model.Id;
        }
	}

    public partial class UserProfileRepository : BaseRepository<UserProfile, GTDBEntities>, IUserProfileRepository
    {
        public UserProfileRepository(IBaseUnitOfWork<GTDBEntities> unitOfWork)
            : base(unitOfWork)
        {

        }
		protected override int GetKeyId(UserProfile model)
        {
            return model.Id;
        }
	}

    public partial class UserRoleRepository : BaseRepository<UserRole, GTDBEntities>, IUserRoleRepository
    {
        public UserRoleRepository(IBaseUnitOfWork<GTDBEntities> unitOfWork)
            : base(unitOfWork)
        {

        }
		protected override int GetKeyId(UserRole model)
        {
            return model.Id;
        }
	}

    public partial class CategoryRepository : BaseRepository<Category, GTDBEntities>, ICategoryRepository
    {
        public CategoryRepository(IBaseUnitOfWork<GTDBEntities> unitOfWork)
            : base(unitOfWork)
        {

        }
		protected override int GetKeyId(Category model)
        {
            return model.Id;
        }
	}

    public partial class CategoryLanguageRepository : BaseRepository<CategoryLanguage, GTDBEntities>, ICategoryLanguageRepository
    {
        public CategoryLanguageRepository(IBaseUnitOfWork<GTDBEntities> unitOfWork)
            : base(unitOfWork)
        {

        }
		protected override int GetKeyId(CategoryLanguage model)
        {
            return model.Id;
        }
	}

    public partial class HTServiceRepository : BaseRepository<HTService, GTDBEntities>, IHTServiceRepository
    {
        public HTServiceRepository(IBaseUnitOfWork<GTDBEntities> unitOfWork)
            : base(unitOfWork)
        {

        }
		protected override int GetKeyId(HTService model)
        {
            return model.Id;
        }
	}

    public partial class HTServiceLanguageRepository : BaseRepository<HTServiceLanguage, GTDBEntities>, IHTServiceLanguageRepository
    {
        public HTServiceLanguageRepository(IBaseUnitOfWork<GTDBEntities> unitOfWork)
            : base(unitOfWork)
        {

        }
		protected override int GetKeyId(HTServiceLanguage model)
        {
            return model.Id;
        }
	}

    public partial class PlaceRepository : BaseRepository<Place, GTDBEntities>, IPlaceRepository
    {
        public PlaceRepository(IBaseUnitOfWork<GTDBEntities> unitOfWork)
            : base(unitOfWork)
        {

        }
		protected override int GetKeyId(Place model)
        {
            return model.Id;
        }
	}

    public partial class PlaceLanguageRepository : BaseRepository<PlaceLanguage, GTDBEntities>, IPlaceLanguageRepository
    {
        public PlaceLanguageRepository(IBaseUnitOfWork<GTDBEntities> unitOfWork)
            : base(unitOfWork)
        {

        }
		protected override int GetKeyId(PlaceLanguage model)
        {
            return model.Id;
        }
	}

    public partial class CityRepository : BaseRepository<City, GTDBEntities>, ICityRepository
    {
        public CityRepository(IBaseUnitOfWork<GTDBEntities> unitOfWork)
            : base(unitOfWork)
        {

        }
		protected override int GetKeyId(City model)
        {
            return model.Id;
        }
	}

    public partial class DistrictRepository : BaseRepository<District, GTDBEntities>, IDistrictRepository
    {
        public DistrictRepository(IBaseUnitOfWork<GTDBEntities> unitOfWork)
            : base(unitOfWork)
        {

        }
		protected override int GetKeyId(District model)
        {
            return model.Id;
        }
	}

    public partial class PlaceImageRepository : BaseRepository<PlaceImage, GTDBEntities>, IPlaceImageRepository
    {
        public PlaceImageRepository(IBaseUnitOfWork<GTDBEntities> unitOfWork)
            : base(unitOfWork)
        {

        }
		protected override int GetKeyId(PlaceImage model)
        {
            return model.Id;
        }
	}

    public partial class PlaceMoreInfoRepository : BaseRepository<PlaceMoreInfo, GTDBEntities>, IPlaceMoreInfoRepository
    {
        public PlaceMoreInfoRepository(IBaseUnitOfWork<GTDBEntities> unitOfWork)
            : base(unitOfWork)
        {

        }
		protected override int GetKeyId(PlaceMoreInfo model)
        {
            return model.Id;
        }
	}
}