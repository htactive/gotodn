using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GotoDN.Entities
{
    public class UserProfile
    {
        [Key]
        public int Id { get; set; }
        public int? UserId { get; set; }
        public string Email { get; set; }
        public int? AvatarId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public bool? WasVerifiedEmail { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }

        [ForeignKey("AvatarId")]
        public Image Image { get; set; }
    }
}
