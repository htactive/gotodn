using GotoDN.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GotoDN.Entities
{
    public class CategoryLanguage
    {
        [Key]
        public int Id { get; set; }
        public int? CategoryId { get; set; }
        public string Title { get; set; }
        public int? IconId { get; set; }
        public int? ImageId { get; set; }

        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }

        public LanguageEnums? Language{ get; set; }

        [ForeignKey("CategoryId")]
        public Category Category { get; set; }
        [ForeignKey("ImageId")]
        public Image Image { get; set; }
        [ForeignKey("IconId")]
        public Image Icon { get; set; }
    }
}
