using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GotoDN.Entities
{
    public class PlaceImage
    {
        [Key]
        public int Id { get; set; }
        public int PlaceLangId { get; set; }
        public int? ImageId { get; set; }

        [ForeignKey("PlaceLangId")]
        public PlaceLanguage PlaceLanguage { get; set; }

        [ForeignKey("ImageId")]
        public Image Image { get; set; }
    }
}
