﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GotoDN.Repository;
using Microsoft.AspNetCore.Mvc;

namespace GotoDN.Web.Controllers
{
    public class StaticController : BaseController
    {
        public StaticController(GTDBRepository repository) : base(repository)
        {
        }
        [Route("{*url}")]
        public IActionResult Admin()
        {
            return View();
        }
    }
}
