define(['plugins/router', 'durandal/app',  'bootstrap'], function (router, app) {
    return {
        router: router, 
        activate: function () {
            router.makeRelative({ moduleId: 'viewmodels' }); 
            router.map([
                // Navigation Controler urls
                 { route: '', moduleId: 'home/index', title: 'Home', nav: true, hash: "#/", hclass: 'fa fa-dashboard fa-lg' },
                 { route: 'last*details', moduleId: 'last/index', title: 'last.fm', nav: true, hash: "#last", hclass: 'fa fa-lastfm fa-lg' },
                 { route: 'brainz*details', moduleId: 'brainz/index', title: 'Music Brainz', nav: true, hash: '#brainz', hclass: 'fa fa-headphones fa-lg' },
                  { route: 'favourites', moduleId: 'favourites/index', title: 'Favourites', 
                  nav: true , hash: "#favourites",hclass: 'fa fa-heart fa-lg' },
                 { route: 'favourites/artists/:*details', hash: "#favourites/artists",
                  moduleId: 'favourites/add', title: 'Favourite Artists', nav: false },
                 { route: 'favourites/release/:*details', hash: "#favourites/release"
                 , moduleId: 'favourites/releases', title: 'Favourite Releases', nav: false },
            ]).buildNavigationModel()
             .mapUnknownRoutes("notfound", "notfound");

            return router.activate();
       }
    };
});
