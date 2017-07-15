using GotoDN.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GotoDN.Web.Models
{
    public class CategoryLanguageModel
    {
        public int Id { get; set; }
        public int? CategoryId { get; set; }
        public string Title { get; set; }
        public string Icon { get; set; }
        public int? ImageId { get; set; }
        public LanguageEnums? Language{ get; set; }

        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        
        public CategoryModel Category { get; set; }
        public ImageModel Image { get; set; }
    }
}
