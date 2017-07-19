using GotoDN.Common;
using System;
using System.Collections.Generic;

namespace GotoDN.Web.Models
{
    public class CityModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<DistrictModel> District { get; set; }
    }

    public class DistrictModel
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public int? CityId { get; set; }
        public CityModel City { get; set; }
    }
}
