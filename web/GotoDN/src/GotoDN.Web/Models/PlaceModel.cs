using GotoDN.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GotoDN.Web.Models
{
    public class PlaceModel
    {
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
        public DateTime? OpenTime { get; set; }
        public DateTime? CloseTime { get; set; }
        public string Website { get; set; }

        public int? Latitude { get; set; }
        public int? Longitude { get; set; }
        public int? HTServiceId { get; set; }
        public int? CategoryId { get; set; }

        public HTServiceModel HTService { get; set; }
        public CategoryModel Category { get; set; }
        public List<PlaceLanguageModel> PlaceLanguages { get; set; }

        public CityModel City { get; set; }
        public DistrictModel District { get; set; }
    }

    public class PlaceLanguageModel
    {
        public int Id { get; set; }
        public int? PlaceId { get; set; }
        public string Title { get; set; }
        public int? IconId { get; set; }
        public int? ImageId { get; set; }
        public string Description { get; set; }

        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public LanguageEnums? Language { get; set; }

        public List<PlaceImageModel> PlaceImages { get; set; }

        public PlaceModel Place { get; set; }
        public ImageModel Image { get; set; }
        public ImageModel Icon { get; set; }
    }

    public class PlaceImageModel
    {
        public int Id { get; set; }
        public int PlaceLangId { get; set; }
        public int? ImageId { get; set; }
        
        public ImageModel Image { get; set; }
    }

    public class CompareModel
    {
        public DateTime? date { get; set; }
        public string comparator { get; set; }
    }
}
