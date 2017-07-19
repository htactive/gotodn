using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GotoDN.Entities
{
    public class District
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public int? CityId { get; set; }

        [ForeignKey("CityId")]
        public City City { get; set; }
    }
}
