var FrontEndApplication = angular.module('FrontEndApplication', ['ngRoute', 'angular-loading-bar', 'ngToast', 'LocalStorageModule'])
.config(function ($routeProvider) {
    $routeProvider
    .when('/music-brainz', {
        templateUrl: '/views/music-brainz/music-brainz.index.html',
        controller: 'musicBrainzController'
    })
    .when('/last-fm', {
        templateUrl: '/views/last-fm/last-fm.index.html',
        controller: 'lastfmController'
    })
    .when('/favourites', {
        templateUrl: '/views/favourites/favourites.index.html',
        controller: 'favouritesController'
    })
    .when('/home', {
        templateUrl: '/views/home/home.index.html',
        controller: 'homeController'
    })
    .otherwise({
          redirectTo: '/home'
      });
})
  .config(function (localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix('FrontEndApplication');
  })
.config(['ngToastProvider', function (ngToast) {
    ngToast.configure({
        verticalPosition: 'top',
        horizontalPosition: 'left',
        maxNumber: 2
    });
}])
.run(function (localStorageService) {
    localStorageService.clearAll();
    console.log('clearing local storage');
});
