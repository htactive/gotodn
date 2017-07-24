using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GotoDN.Entities
{
    public class Image
    {
        [System.ComponentModel.DataAnnotations.Key]
        public int Id { get; set; }
        public string Url { get; set; }
        public string S3FileKey { get; set; }
    }
}
