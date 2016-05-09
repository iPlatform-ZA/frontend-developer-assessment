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

        public ActionResult Search()
        {
            return View();
        }
    }
}
