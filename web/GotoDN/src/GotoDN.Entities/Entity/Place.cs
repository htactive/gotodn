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
        public bool? IsCategorySlider { get; set; }
        public bool? IsHomeSlider { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public float? Rating { get; set; }
        public int? CityId { get; set; }
        public int? DistrictId { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Fax { get; set; }
        public DateTime? OpenTime { get; set; }
        public DateTime? CloseTime { get; set; }
        public string Website { get; set; }

        public int? Latitude { get; set; }
        public int? Longitude { get; set; }
        public int? HTServiceId { get; set; }
        public int? CategoryId { get; set; }

        [ForeignKey("HTServiceId")]
        public HTService HTService { get; set; }
        [ForeignKey("CategoryId")]
        public Category Category { get; set; }
        public List<PlaceLanguage> PlaceLanguages { get; set; }

        [ForeignKey("CityId")]
        public City City { get; set; }
        [ForeignKey("DistrictId")]
        public District District { get; set; }
    }
}
