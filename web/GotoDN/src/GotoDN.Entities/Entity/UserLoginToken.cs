using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GotoDN.Entities
{
    public class UserLoginToken
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Token { get; set; }
        public DateTime LastLoginDated { get; set; }
        public DateTime ExpiredDated { get; set; }
        public bool? IsRememberMe { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }
    }
}
