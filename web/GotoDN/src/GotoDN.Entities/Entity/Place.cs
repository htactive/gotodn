using GotoDN.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GotoDN.Entities
{
    public class Place
    {
        [Key]
        public int Id { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public int? Latitude { get; set; }
        public int? Longitude { get; set; }
        public int? HTServiceId { get; set; }

        public bool? IsCategorySlider { get; set; }
        public bool? IsServiceSlider { get; set; }

        [ForeignKey("HTServiceId")]
        public HTService HTService { get; set; }
        public List<PlaceLanguage> PlaceLanguages { get; set; }
    }
}
