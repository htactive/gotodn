using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GotoDN.Web.Models
{
    public class GetGridRequestModel
    {
        public int CurrentPage { get; set; }
        public string SortExpression { get; set; }
        public bool IsAsc { get; set; }
        public int PageSize { get; set; }
        public string Search { get; set; }
        public List<KeyValuePair<string, object>> Parameters { get; set; }
    }

    public class GridColumnFilterRequest
    {
        public string ColumnName { get; set; }
        public List<string> FilterValue { get; set; }
    }

    public class GetGridResponseModel<T>
    {
        public int? TotalRecord { get; set; }
        public List<T> DataSource { get; set; }
    }
}
