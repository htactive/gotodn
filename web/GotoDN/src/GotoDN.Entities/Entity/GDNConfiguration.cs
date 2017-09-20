using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GotoDN.Entities
{
    public class GDNConfiguration
    {
        [Key]
        public int Id { get; set; }

        public int NumOfScreenShowAd { get; set; }
    }
}
