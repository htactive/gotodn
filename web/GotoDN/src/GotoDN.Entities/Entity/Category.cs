using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace GotoDN.Entities
{
    public class Category
    {
        [Key]
        public int Id { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public bool? IsEvent { get; set; }
        public bool? IsGovernment { get; set; }
        public List<CategoryLanguage> CategoryLanguages { get; set; }
        public List<Place> Places { get; set; }
        public List<HTService> HTServices { get; set; }
        public int? Order { get; set; }
    }
}
