using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace GotoDN.Entities
{
    public class PlaceMoreInfo
    {
		[Key]
        public int Id { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }
        public int? IconId { get; set; }
        public bool? IsHalf { get; set; }

        public int PlaceLangId { get; set; }

        [ForeignKey("PlaceLangId")]
        public PlaceLanguage PlaceLanguage { get; set; }

        [ForeignKey("IconId")]
        public Image Icon { get; set; }
    }
}
