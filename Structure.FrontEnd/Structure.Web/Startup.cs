using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Structure.Web.Startup))]
namespace Structure.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
