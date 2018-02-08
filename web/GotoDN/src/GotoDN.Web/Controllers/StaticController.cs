using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GotoDN.Repository;
using Microsoft.AspNetCore.Mvc;

namespace GotoDN.Web.Controllers
{
    public class StaticController : BaseController
    {
        public StaticController(HTRepository repository) : base(repository)
        {
        }
        public IActionResult Admin()
        {
            return View();
        }
    }
}
