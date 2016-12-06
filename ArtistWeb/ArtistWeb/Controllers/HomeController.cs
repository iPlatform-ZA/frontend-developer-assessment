using System.Web.Mvc;

namespace ArtistWeb.Controllers
{
    public class HomeController :
        Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult SearchArtist()
        {
            return View();
        }

        public ActionResult SearchRelease()
        {
            return View();
        }
    }
}
