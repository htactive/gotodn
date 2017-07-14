
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
}