using GotoDN.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GotoDN.Entities
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public UserStatusEnums? UserStatusId { get; set; }
        public string ProviderKey { get; set; }
        public string ProviderName { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? UpdatedDate { get; set; }

        public List<UserProfile> UserProfiles { get; set; }
        public List<UserRole> UserRoles { get; set; }
        public List<UserLoginToken> UserLoginTokens { get; set; }
    }
}
