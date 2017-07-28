using GotoDN.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GotoDN.Web.Models
{
    public class ImportPlaceModel
    {
        public  ImportPlaceModel()
        {
            AdditionalInfo = new List<KeyValuePair<string, string>>();
            PlaceImages = new List<string>();
        }

        public bool PlaceInValid
        {
            get
            {
                return CategoryNotExist || ServiceNotExist || CityNotExist || DistrictNotExist;
            }
        }

        public string PlaceName { get; set; }
        public bool PlaceDuplicate { get; set; }
        public string Category { get; set; }
        public bool CategoryNotExist { get; set; }
        public string Service { get; set; }
        public bool ServiceNotExist { get; set; }
        public string Description { get; set; }
        public string CoverImage { get; set; }
        public bool? IsCategorySlider { get; set; }
        public bool? IsHomeSlider { get; set; }
        public string City { get; set; }
        public bool CityNotExist { get; set; }
        public string District { get; set; }
        public bool DistrictNotExist { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Fax { get; set; }
        public string OpenTime { get; set; }
        public string CloseTime { get; set; }
        public string Website { get; set; }
        public List<KeyValuePair<string,string>> AdditionalInfo { get; set; }
        public bool AdditionalInfoError { get; set; }
        public List<string> PlaceImages { get; set; }
        public bool PlaceImageError { get; set; }
        public LanguageEnums? Language { get; set; }
    }

    public class ImportPlaceGroupModel
    {
        public ImportPlaceGroupModel()
        {
            ImportPlaces = new List<ImportPlaceModel>();
        }
        public LanguageEnums? Language { get; set; }
        public List<ImportPlaceModel> ImportPlaces { get; set; }
    }
}
