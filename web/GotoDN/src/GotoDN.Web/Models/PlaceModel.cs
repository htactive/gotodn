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
        public int Latitude { get; set; }
        public int Longitude { get; set; }

        public bool IsCategorySlider { get; set; }
        public bool IsServiceSlider { get; set; }
        public List<PlaceLanguageModel> PlaceLanguages { get; set; }
    }

    public class PlaceLanguageModel
    {
        public int Id { get; set; }
        public int? PlaceId { get; set; }
        public string Title { get; set; }
        public string Icon { get; set; }
        public int? ImageId { get; set; }

        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public LanguageEnums Language { get; set; }

        public PlaceModel Place { get; set; }
        public ImageModel Image { get; set; }
    }
}
