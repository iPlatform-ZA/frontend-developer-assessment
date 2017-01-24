FrontEndApplication.controller('musicBrainzController', function ($scope, musicBrainzService, ngToast, toastMessageService) {

    $scope.artists = [];

    $scope.selectedArtistId = "";

    $scope.Releases = {};

    $scope.searchTerm = '';

    $scope.searchArtists = function () {

        if ($scope.searchTerm.trim().length > 0) {

            musicBrainzService.getArtists($scope.searchTerm).then(function (response) {

                $scope.artists = response.data.artists;

            }, function (response) {

                ngToast.create(toastMessageService.getErrorConnectingToServer());

            });

        } else {

            ngToast.create(toastMessageService.getSearchTermRequired());
        }
    };

    $scope.showReleasesForArtist = function (artistId) {

        $scope.Releases = {};

        if ($scope.selectedArtistId === artistId) {
            $scope.selectedArtistId = '';
            return;
        }

        $scope.selectedArtistId = artistId;

        musicBrainzService.getReleases(artistId)
            .then(function (response) {

                $scope.Releases[artistId] = response.data.releases;
            },
            function (error) {

                ngToast.create(toastMessageService.getErrorConnectingToServer());

            });
    };

    $scope.showOrHideReleases = function (artistId) {

        return ($scope.selectedArtistId === artistId);
    }

    $scope.getShowHideMessage = function (artistId) {

        if ($scope.selectedArtistId === artistId) {
            return "Hide Releases";
        } else {
            return "Show Releases";
        }
    }

    $scope.addToFavourites = function (release) {

        release.isFavourite = true;

        musicBrainzService.saveReleaseAsFavourite(release);

        ngToast.create(toastMessageService.getSuccessAddingToFavourites());
    }
});



