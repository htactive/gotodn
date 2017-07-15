using GotoDN.Common;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GotoDN.Entities
{
    public class PlaceLanguage
    {
        [Key]
        public int Id { get; set; }
        public int? PlaceId { get; set; }
        public string Title { get; set; }
        public string Icon { get; set; }
        public int? ImageId { get; set; }

        public DateTime? CreatedDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public LanguageEnums? Language { get; set; }

        [ForeignKey("PlaceId")]
        public Place Place { get; set; }
        [ForeignKey("ImageId")]
        public Image Image { get; set; }
    }
}
