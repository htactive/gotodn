using GotoDN.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GotoDN.Web.Models
{
    public class CategoryModel
    {
        public int Id { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public int? Priority { get; set; }
        public bool? IsEvent { get; set; }
        public List<CategoryLanguageModel> CategoryLanguages { get; set; }
        public List<PlaceModel> Places { get; set; }
        public List<HTServiceModel> HTServices { get; set; }
    }

    public class CategoryLanguageModel
    {
        public int Id { get; set; }
        public int? CategoryId { get; set; }
        public string Title { get; set; }
        public int? IconId { get; set; }
        public int? ImageId { get; set; }

        public LanguageEnums? Language { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }

        public CategoryModel Category { get; set; }
        public ImageModel Image { get; set; }
        public ImageModel Icon { get; set; }
    }
}
