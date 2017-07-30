using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GotoDN.Web.Models
{
    public class SliderModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string SubTitle { get; set; }
        public string Url { get; set; }
        public DateTime? CreateDate { get; set; }
        public bool? IsEvent { get; set; }
        public bool? IsCategorySlider { get; set; }
    }
}
