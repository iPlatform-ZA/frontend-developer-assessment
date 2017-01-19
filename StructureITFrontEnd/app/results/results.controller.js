define(["angularAMD"], function (angularAMD) {

    angularAMD
        .controller("resultsController", resultsController);

    resultsController.$inject = ["$scope", "appServices"];

    function resultsController(scope, appService) {
        var vm = this;
        vm.shortList = [];
        vm.releaseData = [];

        vm.addToShortList = function (artist) {
            var hasBeenAdded = false;
            $.each(vm.shortList, function (ref, value) {
                if (value == artist) {
                    hasBeenAdded = true;
                }
            });

            if (hasBeenAdded == false) {
                vm.shortList.push(artist);
            }
            
        };

        vm.btnShortListClicked = function() {
            scope.$$childTail.shortListCtrl.showShortList();
        }

        vm.addReleaseToFavourites = function (release) {
            $.each(scope.$root.mainContainerCtrl.favourites, function(ref, value) {
                if (value.artistId == release.artistId) {
                    $("#" + release.releaseId).removeClass("glyphicon-star-empty");
                    $("#" + release.releaseId).addClass("glyphicon-star");
                    value.releases.push(release);
                };
            });


        };

        vm.showReleases = function (artist) {
            if (artist.show) {
                vm.releaseData = [];
                artist.show = false;
                $("#" + artist.artistId).text("Show Releases");
            } else {
                artist.show = true;
                $("#" + artist.artistId).text("Hide Releases");

                appService.getReleaseData(artist.artistId).then(function (response) {
                    var dataArray = [];
                    var xml = $(response.data);
                    var releases = $(xml).find("release");
                    $.each(releases, function (ref, value) {

                        var date = $(value).find("date").first().text();
                        var title = $(value).find("title").text();
                        var label = $(value).find("label").find("name").text();
                        var numTracks = $(value).find("medium-list").find("track-count").text();

                        dataArray.push({
                            artistId: $(value).find("artist").attr("id"),
                            releaseId:$(value).attr("id"),
                            title: title,
                            date: date,
                            label: label,
                            numTracks: numTracks
                        });

                    });

                    vm.releaseData = dataArray;

                });
            }
            
           
        };

    };

});