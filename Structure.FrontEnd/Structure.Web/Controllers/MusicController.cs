using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Structure.Web.Controllers
{
    public class MusicController : Controller
    {
        public ActionResult LastFM()
        {
            return View();
        }

        public ActionResult MusicBrainz()
        {
            return View();
        }

        public ActionResult ShortLists()
        {
            return View();
        }

        public ActionResult Favourites()
        {
            return View();
        }

    }
}