FrontEndApplication.controller('lastfmController', function ($scope, lastfmService, ngToast, toastMessageService) {

    $scope.artists = [];

    $scope.shortlist = [];

    $scope.shortlistVisible = false;
      
    $scope.searchTerm = '';

    $scope.searchArtists = function () {

        if ($scope.searchTerm.trim().length > 0) {

            lastfmService.getArtists($scope.searchTerm).then(function (response) {

                $scope.artists = response.data.results.artistmatches.artist;

            }, function (response) {

                ngToast.create(toastMessageService.getErrorConnectingToServer());

            });

        } else {

            ngToast.create(toastMessageService.getSearchTermRequired());
        }
    };
        
    $scope.addToFavourites = function (artist) {

        artist.isFavourite = true;

        lastfmService.saveAsFavourite(artist);

        ngToast.create(toastMessageService.getSuccessAddingToFavourites());
    };

    $scope.addToShortlist = function (artist) {

        if ($.inArray(artist, $scope.shortlist) === -1) {

            artist.isShortlisted = true;

            $scope.shortlist.push(artist);

            console.log($scope.shortlist.length);
        }
    };

    $scope.displayShortlist = function () {

        $scope.shortlistVisible = !$scope.shortlistVisible;

    };

});



