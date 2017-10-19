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
        public bool? IsDistrictGovernment { get; set; }
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

        public List<PlaceMoreInfoModel> PlaceMoreInfo { get; set; }

        public PlaceModel Place { get; set; }
        public ImageModel Image { get; set; }
        public ImageModel Icon { get; set; }
    }

    public class PlaceMoreInfoModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
        public int? IconId { get; set; }
        public bool? IsHalf { get; set; }
        public int? Order { get; set; }

        public int PlaceLangId { get; set; }

        public PlaceLanguageModel PlaceLanguage { get; set; }
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

    public class SearchPlaceModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public int? CategoryId { get; set; }
        public string CategoryName { get; set; }
        public int? ServiceId { get; set; }
        public string ServiceName { get; set; }
        public int? CityId { get; set; }
        public string City { get; set; }
        public int? DistrictId { get; set; }
        public string District { get; set; }
        public bool? IsCategorySlider { get; set; }
        public bool? IsHomeSlider { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public bool? IsEvent { get; set; }
        public float? Rating { get; set; }
    }

    public class AppSearchPlaceModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string CategoryName { get; set; }
        public string ServiceName { get; set; }
        public bool? IsCategorySlider { get; set; }
        public bool? IsHomeSlider { get; set; }
        public bool? IsEvent { get; set; }
        public string City { get; set; }
        public string District { get; set; }
        public string Description { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Address { get; set; }
        public ImageModel CoverImage { get; set; }
        public string Phone { get; set; }
        public string OpenTime { get; set; }
        public string CloseTme { get; set; }
        public DateTime? CreateDate { get; set; }
    }

    public class AppFavoritePlaceModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public ImageModel CoverImage { get; set; }
        public string City { get; set; }
        public string District { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
    }

    public class AppServicePlaceModel
    {
        public int Id { get; set; }
        public string ImageUrl { get; set; }
        public float? Star { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
    }

    public class AppPlaceModel
    {
        public int Id { get; set; }
        public string ImageUrl { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public float? Star { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Website { get; set; }
        public DateTime? OpenTime { get; set; }
        public DateTime? CloseTime { get; set; }
        public string City { get; set; }
        public string District { get; set; }
    }

    public class AppPlaceImageModel
    {
        public int Id { get; set; }
        public string ImageUrl { get; set; }
    }
}
