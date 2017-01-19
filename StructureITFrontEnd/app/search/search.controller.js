define(["angularAMD"], function (angularAMD) {

    angularAMD
        .controller("searchController", searchController);

    searchController.$inject = ["$scope", "appServices"];

    function searchController(scope, appService) {
        var vm = this;

        vm.lastfmSearch = function()
        {
            appService.search($("#txtSearch" + vm.ident).val()).then(function (response) {
                scope.$parent.mainContainerCtrl.data = response.data;
                $("results").show();
            });
        }

        vm.musicBrainzArtistSearch = function() {
            appService.getArtistViaMusicBrainz($("#txtSearch" + vm.ident).val()).then(function(response) {
                var xml = $(response.data);

                var artists = $(xml).find("artist");
                var dataArray = [];
                $.each(artists, function(ref, value) {
                    var artistId = $(value).attr("id");
                    var title = $(value).find("name").first().text();

                    dataArray.push({
                        artistId: artistId,
                        Name: title,
                        show:false
                    });


                });
                scope.$parent.mainContainerCtrl.data = dataArray;
                $("results").show();


            });
        }


      
    };

});