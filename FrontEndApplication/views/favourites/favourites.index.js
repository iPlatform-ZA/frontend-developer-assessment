FrontEndApplication.controller('favouritesController', function ($scope, $http, favouritesService) {

    init();
   
    function init() {

        $scope.realeases = favouritesService.getFavouriteReleases();

        $scope.artists = favouritesService.getFavouriteArtists();
    }

    $scope.removeFavouriteArtist = function (artist) {
        
        $scope.artists = favouritesService.removeFavouriteArtist(artist);
    };
    
    $scope.removeFavouriteRelease = function (release) {       

        $scope.realeases = favouritesService.removeFavouriteRelease(release);
    };


});