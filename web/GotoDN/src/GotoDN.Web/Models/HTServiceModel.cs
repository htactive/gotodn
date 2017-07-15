using GotoDN.Common;
using System;
using System.Collections.Generic;
using System.Linq;

namespace GotoDN.Web.Models
{
    public class HTServiceModel 
    {
        public int Id { get; set; }
        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public int? CategoryId { get; set; }

        public CategoryModel Category { get; set; }
        public List<HTServiceLanguageModel> HTServiceLanguages { get; set; }
    }

    public class HTServiceLanguageModel
    {
        public int Id { get; set; }
        public int? HTServiceId { get; set; }
        public string Title { get; set; }
        public string Icon { get; set; }
        public int? ImageId { get; set; }

        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public LanguageEnums? Language { get; set; }
    
        public HTServiceModel HTService { get; set; }
        public ImageModel Image { get; set; }
    }
}
