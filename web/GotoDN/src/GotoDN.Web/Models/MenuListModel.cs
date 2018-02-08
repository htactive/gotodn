using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GotoDN.Web.Models
{
    public class MenuListModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Icon { get; set; }
        public string Image { get; set; }
        public int? Order { get; set; }
        public List<MenuItemModel> Items { get; set; }
    }

    public class MenuItemModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }
    }

}
