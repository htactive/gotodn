using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GotoDN.Entities
{
    public class Claim
    {
        [Key]
        public int Id { get; set; }
        public string ClaimName { get; set; }

        public List<RoleClaim> RoleClaims { get; set; }
    }
}
