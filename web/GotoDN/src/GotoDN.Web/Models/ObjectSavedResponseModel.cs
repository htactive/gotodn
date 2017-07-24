using System.Collections.Generic;

namespace GotoDN.Web.Models
{
    public class ObjectSavedResponseModel<TModel>
    {
        public bool IsSuccess { get; set; }
        public string ErrorCode { get; set; }
        public string ErrorMessage { get; set; }
        public TModel Model { get; set; }
    }
}
